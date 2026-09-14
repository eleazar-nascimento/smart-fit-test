'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  LocationProps,
  PeriodKey,
  filterLocations,
} from '@/api/get-locations'
import { useLocation } from '@/api/use-locations'

type LocationsFilterContextValue = {
  period: PeriodKey | null
  setPeriod: (period: PeriodKey | null) => void
  showClosedUnits: boolean
  setShowClosedUnits: (showClosedUnits: boolean) => void
  clearFilters: () => void
  /** Unidades que atendem aos filtros selecionados. */
  results: LocationProps[]
  resultsCount: number
  hasActiveFilters: boolean
  isLoading: boolean
  isError: unknown
}

const LocationsFilterContext =
  createContext<LocationsFilterContextValue | null>(null)

interface LocationsFilterProviderProps {
  children: ReactNode
}

export function LocationsFilterProvider({
  children,
}: LocationsFilterProviderProps) {
  const { locations, isLoading, isError } = useLocation()

  const [period, setPeriod] = useState<PeriodKey | null>(null)
  const [showClosedUnits, setShowClosedUnits] = useState(false)

  const clearFilters = useCallback(() => {
    setPeriod(null)
    setShowClosedUnits(false)
  }, [])

  const results = useMemo(
    () =>
      filterLocations(locations?.locations, {
        period,
        showClosedUnits,
      }),
    [locations?.locations, period, showClosedUnits],
  )

  const value = useMemo<LocationsFilterContextValue>(
    () => ({
      period,
      setPeriod,
      showClosedUnits,
      setShowClosedUnits,
      clearFilters,
      results,
      resultsCount: results.length,
      hasActiveFilters: period !== null || showClosedUnits,
      isLoading,
      isError,
    }),
    [period, showClosedUnits, clearFilters, results, isLoading, isError],
  )

  return (
    <LocationsFilterContext.Provider value={value}>
      {children}
    </LocationsFilterContext.Provider>
  )
}

export function useLocationsFilter() {
  const context = useContext(LocationsFilterContext)

  if (!context) {
    throw new Error(
      'useLocationsFilter must be used within a <LocationsFilterProvider />',
    )
  }

  return context
}
