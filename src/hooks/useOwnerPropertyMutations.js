import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../context/AppContext.jsx'
import { queryKeys } from '../query/queryKeys.js'
import {
  createOwnerProperty,
  deleteOwnerProperty,
  toggleOwnerPropertyAvailability,
  updateOwnerProperty,
  normalizeOwnerProperty,
} from '../services/owner.js'

const updatePropertyList = (current = [], updater) => current.map((property) => updater(property)).filter(Boolean)

export const useOwnerPropertyMutations = () => {
  const queryClient = useQueryClient()
  const { getToken, user } = useAppContext()
  const ownerId = user?.id || 'me'
  const ownerPropertiesKey = queryKeys.properties.owner(ownerId)

  const createMutation = useMutation({
    mutationFn: async (input) => createOwnerProperty(input, { getToken }),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ownerPropertiesKey })

      const previous = queryClient.getQueryData(ownerPropertiesKey) || []
      const optimistic = normalizeOwnerProperty({
        ...input,
        _id: `temp_${Date.now()}`,
        images: Array.from(input?.images || []).filter(Boolean).map((file) => URL.createObjectURL(file)),
        isAvailable: true,
      })

      queryClient.setQueryData(ownerPropertiesKey, [...previous, optimistic])
      return { previous }
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ownerPropertiesKey, context.previous)
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(ownerPropertiesKey, (current = []) => {
        const withoutTemp = current.filter((property) => !String(property._id).startsWith('temp_'))
        return [...withoutTemp, result.data]
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ownerPropertiesKey })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ propertyId, input }) => updateOwnerProperty(propertyId, input, { getToken }),
    onMutate: async ({ propertyId, input }) => {
      await queryClient.cancelQueries({ queryKey: ownerPropertiesKey })
      const previous = queryClient.getQueryData(ownerPropertiesKey) || []

      queryClient.setQueryData(ownerPropertiesKey, (current = []) =>
        updatePropertyList(current, (property) =>
          property._id === propertyId
            ? normalizeOwnerProperty({ ...property, ...input })
            : property,
        ),
      )

      return { previous }
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ownerPropertiesKey, context.previous)
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(ownerPropertiesKey, (current = []) =>
        current.map((property) => (property._id === result.data._id ? result.data : property)),
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ownerPropertiesKey })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (propertyId) => deleteOwnerProperty(propertyId, { getToken }),
    onMutate: async (propertyId) => {
      await queryClient.cancelQueries({ queryKey: ownerPropertiesKey })
      const previous = queryClient.getQueryData(ownerPropertiesKey) || []
      queryClient.setQueryData(ownerPropertiesKey, (current = []) => current.filter((property) => property._id !== propertyId))
      return { previous }
    },
    onError: (_error, _propertyId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ownerPropertiesKey, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ownerPropertiesKey })
    },
  })

  const toggleAvailabilityMutation = useMutation({
    mutationFn: async ({ propertyId, nextAvailability }) => toggleOwnerPropertyAvailability(propertyId, nextAvailability, { getToken }),
    onMutate: async ({ propertyId, nextAvailability }) => {
      await queryClient.cancelQueries({ queryKey: ownerPropertiesKey })
      const previous = queryClient.getQueryData(ownerPropertiesKey) || []

      queryClient.setQueryData(ownerPropertiesKey, (current = []) =>
        current.map((property) =>
          property._id === propertyId
            ? { ...property, isAvailable: nextAvailability, status: nextAvailability ? 'available' : 'hidden' }
            : property,
        ),
      )

      return { previous }
    },
    onError: (_error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ownerPropertiesKey, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ownerPropertiesKey })
    },
  })

  return {
    createPropertyMutation: createMutation,
    updatePropertyMutation: updateMutation,
    deletePropertyMutation: deleteMutation,
    toggleAvailabilityMutation,
  }
}