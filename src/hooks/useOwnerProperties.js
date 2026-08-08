import { useQuery } from '@tanstack/react-query'
import { useAppContext } from '../context/AppContext.jsx'
import { getOwnerProperties } from '../services/owner.js'
import { queryKeys } from '../query/queryKeys.js'

export const useOwnerProperties = () => {
  const { authReady, isOwner, getToken, user } = useAppContext()
  const ownerId = user?.id || 'me'

  return useQuery({
    queryKey: queryKeys.properties.owner(ownerId),
    enabled: authReady && isOwner,
    queryFn: async () => {
      const result = await getOwnerProperties({ getToken })
      return Array.isArray(result?.data) ? result.data : []
    },
    staleTime: 30 * 1000,
  })
}