export async function getLocations() {
  const res = await fetch(
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json',
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
