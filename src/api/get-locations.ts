export type LocationProps = {
  id: number
  title: string
  content: string
  opened: boolean
  mask: string
  towel: string
  fountain: string
  locker_room: string
  schedules: Array<{ weekdays: string; hour: string }>
}

export type LocationsProps = {
  total: number
  locations: Array<LocationProps>
}

export async function getLocations() {
  const response = await fetch(
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json',
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export function verifyLocked(
  data: LocationProps[] | undefined,
  locked: boolean,
) {
  const filterData = data?.filter(
    (location: LocationProps) => location.opened === locked,
  )
  // console.log(filterData)

  return filterData
}
