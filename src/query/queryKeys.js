export const queryKeys = {
  properties: {
    all: ['properties'],
    public: () => [...queryKeys.properties.all, 'public'],
    owner: (ownerId = 'me') => [...queryKeys.properties.all, 'owner', ownerId],
    detail: (propertyId) => [...queryKeys.properties.all, 'detail', propertyId],
  },
  bookings: {
    all: ['bookings'],
    user: (userId = 'me') => [...queryKeys.bookings.all, 'user', userId],
    detail: (bookingId) => [...queryKeys.bookings.all, 'detail', bookingId],
  },
  dashboard: {
    all: ['dashboard'],
    stats: (ownerId = 'me') => [...queryKeys.dashboard.all, 'stats', ownerId],
  },
  content: {
    all: ['content'],
    blogs: () => [...queryKeys.content.all, 'blogs'],
  },
  leads: {
    all: ['leads'],
    submit: () => [...queryKeys.leads.all, 'submit'],
  },
}