export type ScheduleProps = {
  weekdays: string
  hour: string
}

export type LocationProps = {
  id: number
  title: string
  content?: string
  /**
   * A API não envia `opened` nem `schedules` para as unidades que ainda vão
   * abrir (elas vêm apenas com endereço). Por isso os campos são opcionais.
   */
  opened?: boolean
  mask?: string
  towel?: string
  fountain?: string
  locker_room?: string
  schedules?: Array<ScheduleProps>
  street?: string
  region?: string
  city_name?: string
  state_name?: string
  uf?: string
}

export type LocationsProps = {
  total: number
  locations: Array<LocationProps>
}

export type PeriodKey = 'morning' | 'afternoon' | 'night'

type PeriodDefinition = {
  key: PeriodKey
  label: string
  /** Texto exibido ao lado do radio e usado como `value` do input. */
  range: string
  /** Início do período em minutos desde 00:00. */
  startsAt: number
  /** Fim do período em minutos desde 00:00. */
  endsAt: number
}

const MINUTES_IN_A_DAY = 24 * 60

export const PERIODS: Array<PeriodDefinition> = [
  {
    key: 'morning',
    label: 'Manhã',
    range: '6:00 às 12:00',
    startsAt: 6 * 60,
    endsAt: 12 * 60,
  },
  {
    key: 'afternoon',
    label: 'Tarde',
    range: '12:00 às 18:00',
    startsAt: 12 * 60,
    endsAt: 18 * 60,
  },
  {
    key: 'night',
    label: 'Noite',
    range: '18:00 às 23:00',
    startsAt: 18 * 60,
    endsAt: 23 * 60,
  },
]

export function getPeriodByKey(key: PeriodKey | null) {
  if (!key) {
    return null
  }

  return PERIODS.find((period) => period.key === key) ?? null
}

/**
 * A API devolve horários no formato `06h às 22h` ou `06h30 às 08h30`, além de
 * valores que não são intervalos (`Fechada`, avisos de limpeza, etc.).
 * Retorna `null` quando a string não representa um intervalo válido.
 */
export function parseScheduleHour(hour: string) {
  const match = hour
    .trim()
    .match(/^(\d{1,2})h(\d{2})?\s*às\s*(\d{1,2})h(\d{2})?$/i)

  if (!match) {
    return null
  }

  const [, startHour, startMinutes, endHour, endMinutes] = match

  const startsAt = Number(startHour) * 60 + Number(startMinutes ?? 0)
  let endsAt = Number(endHour) * 60 + Number(endMinutes ?? 0)

  // `16h às 00h` significa que a unidade fecha à meia-noite.
  if (endsAt <= startsAt) {
    endsAt = MINUTES_IN_A_DAY
  }

  return { startsAt, endsAt }
}

/**
 * Uma unidade atende ao período quando algum dos seus horários de
 * funcionamento tem interseção com o intervalo do período escolhido.
 */
export function isOpenDuringPeriod(
  location: LocationProps,
  period: PeriodDefinition,
) {
  if (!location.schedules?.length) {
    return false
  }

  return location.schedules.some((schedule) => {
    const parsedHour = parseScheduleHour(schedule.hour)

    if (!parsedHour) {
      return false
    }

    return (
      parsedHour.startsAt < period.endsAt && parsedHour.endsAt > period.startsAt
    )
  })
}

export type LocationFilters = {
  period: PeriodKey | null
  /** Quando `false`, apenas unidades abertas entram no resultado. */
  showClosedUnits: boolean
}

export function filterLocations(
  locations: LocationProps[] | undefined,
  { period, showClosedUnits }: LocationFilters,
) {
  if (!locations?.length) {
    return []
  }

  const selectedPeriod = getPeriodByKey(period)

  return locations.filter((location) => {
    if (!showClosedUnits && location.opened !== true) {
      return false
    }

    if (!selectedPeriod) {
      return true
    }

    return isOpenDuringPeriod(location, selectedPeriod)
  })
}

export async function getLocations(): Promise<LocationsProps> {
  const response = await fetch(
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json',
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}
