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
