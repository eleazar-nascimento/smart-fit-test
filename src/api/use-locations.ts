import useSWR from 'swr'
import { LocationsProps, getLocations } from './get-locations'

export function useLocation() {
  const { data, error, isLoading } = useSWR<LocationsProps>(
    'locations',
    getLocations,
  )

  return {
    locations: data,
    isLoading,
    isError: error,
  }
}
