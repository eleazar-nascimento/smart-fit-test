'use client'

import { PERIODS, PeriodKey } from '@/api/get-locations'
import { useLocationsFilter } from '@/contexts/locations-filter'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
} from '@nextui-org/react'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

export const RESULTS_ANCHOR_ID = 'unidades'

export function SearchGym() {
  const {
    period,
    setPeriod,
    showClosedUnits,
    setShowClosedUnits,
    clearFilters,
    resultsCount,
    isLoading,
  } = useLocationsFilter()

  const handleSearchGymLocations = () => {
    document
      .getElementById(RESULTS_ANCHOR_ID)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="w-full bg-white h-full flex items-center justify-center pb-12 min-[320px]:px-6">
      <Card className="bg-white lg:w-[900px] h-full rounded-md border-4 border-gray-200">
        <CardHeader className="flex gap-3 items-center">
          <Image
            src="/images/icon-hour.png"
            alt="icone de hora"
            width={25}
            height={25}
          />
          <p className="text-tiny text-gray-500 font-light text-sm">Horário</p>
        </CardHeader>
        <CardBody>
          <h2 className="text-gray-500 font-light text-2xl pl-4 pb-2">
            Qual período quer treinar?
          </h2>

          <RadioGroup
            value={period ?? ''}
            onValueChange={(value) => setPeriod(value as PeriodKey)}
            aria-label="Período de treino"
          >
            {PERIODS.map(({ key, label, range }) => (
              <div
                key={key}
                className="flex items-center justify-between border-y-2 border-gray-200 py-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    className="text-gray-500"
                    value={key}
                    id={`period-${key}`}
                  />
                  <label
                    htmlFor={`period-${key}`}
                    className="text-gray-500 cursor-pointer"
                  >
                    {label}
                  </label>
                </div>
                <span className="text-gray-500">{range}</span>
              </div>
            ))}
          </RadioGroup>

          <div className="w-full flex lg:flex-row justify-between items-center pt-8 min-[320px]:flex-col min-[320px]:gap-5">
            <Checkbox
              className="text-dark-grey min-[320px]:text-lg"
              isSelected={showClosedUnits}
              onValueChange={setShowClosedUnits}
            >
              Exibir unidades fechadas
            </Checkbox>

            <span className="text-dark-grey min-[320px]:text-lg">
              Resultados encontrados:{' '}
              <span className="text-dark-grey font-bold">
                {isLoading ? '...' : resultsCount}
              </span>
            </span>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-center gap-8 w-full">
          <Button
            className="bg-yellow text-dark-grey font-bold lg:text-base rounded-md h-12 min-[320px]:break-normal min-[320px]:text-xs min-[320px]:whitespace-normal"
            fullWidth
            onClick={handleSearchGymLocations}
          >
            ENCONTRAR UNIDADE
          </Button>
          <Button
            className="bg-white text-dark-grey font-bold border-2 border-gray-200 rounded-md h-12 lg:text-base min-[320px]:text-xs"
            fullWidth
            onClick={clearFilters}
          >
            LIMPAR
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
