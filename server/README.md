# Nexora Estates API

## Local environment

Prisma CLI searches for environment variables from the `server` directory. Create a local `server/.env` file from `server/.env.example` and set `DATABASE_URL` and `CLERK_SECRET_KEY` there. The file is ignored by Git.

The current frontend `.env` at the repository root is not automatically loaded by Prisma CLI.

### PowerShell without copying secrets

From `server/`, load only `DATABASE_URL` into the current shell session:

```powershell
$env:DATABASE_URL = (Get-Content ..\.env | Where-Object { $_ -match '^DATABASE_URL=' } | ForEach-Object { $_ -replace '^DATABASE_URL=', '' }).Trim('"')
npx prisma validate
```

Use the same environment-loading command before `npx prisma db pull` or `npx prisma migrate dev`.

### Recommended local setup

```powershell
Copy-Item .env.example .env
# Edit server/.env and replace DATABASE_URL and CLERK_SECRET_KEY.
npx prisma generate
npx prisma validate
```

Never commit `server/.env` or paste database credentials into source files.

## Media uploads

Media uses signed direct uploads to Cloudinary. Configure these variables in `server/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=nexora-estates/properties
```

The backend exposes:

- `POST /api/v1/owner/media/signature` to create a short-lived upload signature.
- `POST /api/v1/owner/properties/:propertyId/images` to attach the uploaded URL and Cloudinary public ID.
- `PATCH /api/v1/owner/properties/:propertyId/images/reorder` to persist image order.
- `DELETE /api/v1/owner/properties/:propertyId/images/:imageId` to remove metadata and the Cloudinary asset.

All media endpoints require an authenticated `OWNER` or `ADMIN` and enforce property ownership.

## Bookings

Booking creation locks the property row inside a database transaction before checking active booking overlap. Active `PENDING` and `CONFIRMED` bookings use half-open date ranges, so a checkout date can equal another booking's check-in date.

Endpoints:

- `GET /api/v1/bookings` lists the authenticated user's bookings.
- `POST /api/v1/bookings` creates a pending booking request.
- `GET /api/v1/bookings/:id` returns a permitted booking.
- `PATCH /api/v1/bookings/:id/cancel` cancels a pending or confirmed booking.
- `GET /api/v1/owner/bookings` lists bookings for properties owned by the current owner.
- `POST /api/v1/owner/bookings/:id/confirm` confirms a pending booking after a second conflict check.
- `POST /api/v1/owner/bookings/:id/reject` rejects a pending booking with a reason.

Booking status values are `PENDING`, `CONFIRMED`, `REJECTED`, `CANCELLED`, and `COMPLETED`. All protected endpoints require a Clerk Bearer token.
