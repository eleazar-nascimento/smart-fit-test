'use client'
import {
  LocationProps,
  // LocationsProps,
  verifyLocked,
} from '@/api/get-locations'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Checkbox,
} from '@nextui-org/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useLocation } from '@/api/use-locations'
// import useSWR from 'swr'

export function SearchGym() {
  const [selected, setSelected] = useState<string>('6:00 às 12:00')
  const [listUnits, setListUnits] = useState<LocationProps[] | undefined>([])
  const [hasLocked, setHasLocked] = useState<boolean>(false)
  // const { data, error, isLoading } = useSWR<LocationsProps[]>(
  //   'locations',
  //   listUnits,
  // )

  const { locations } = useLocation()

  const handleSearchGymLocations = () => {
    setListUnits(verifyLocked(listUnits, hasLocked))
  }

  const getLocationsData = useCallback(async () => {
    setListUnits(verifyLocked(locations?.locations, hasLocked))
  }, [hasLocked, locations?.locations])

  useEffect(() => {
    getLocationsData()
  }, [getLocationsData])

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
            defaultValue={selected}
            onValueChange={(value) => setSelected(value)}
          >
            <div className="flex items-center justify-between border-y-2  border-gray-200">
              <RadioGroupItem className="text-gray-500" value="6:00 às 12:00">
                Manhã
              </RadioGroupItem>
              <span className="text-gray-500">6:00 às 12:00</span>
            </div>
            <div className="flex items-center justify-between border-y-2  border-gray-200">
              <RadioGroupItem className="text-gray-500" value="12:00 às 18:00">
                Tarde
              </RadioGroupItem>
              <span className="text-gray-500">12:00 às 18:00</span>
            </div>
            <div className="flex items-center justify-between border-y-2  border-gray-200">
              <RadioGroupItem className="text-gray-500" value="18:00 às 23:00">
                Noite
              </RadioGroupItem>
              <span className="text-gray-500">18:00 às 23:00</span>
            </div>
          </RadioGroup>

          <div className="w-full flex lg:flex-row justify-between items-center pt-8 min-[320px]:flex-col min-[320px]:gap-5">
            <Checkbox
              className="text-dark-grey min-[320px]:text-lg"
              defaultChecked={hasLocked}
              isSelected={hasLocked}
              onValueChange={(value) => setHasLocked(value)}
            >
              Exibir unidades fechadas
            </Checkbox>

            <span className="text-dark-grey min-[320px]:text-lg">
              Resultados encontrados:{' '}
              <span className="text-dark-grey font-bold">
                {listUnits ? listUnits.length : 0}
              </span>
            </span>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-center gap-8 w-full">
          <Button
            className="bg-yellow text-dark-grey font-bold lg:text-base rounded-md h-12 min-[320px]:break-normal min-[320px]:text-xs min-[320px]:whitespace-normal"
            fullWidth
            onClick={() => handleSearchGymLocations()}
          >
            ENCONTRAR UNIDADE
          </Button>
          <Button
            className="bg-white text-dark-grey font-bold border-2 border-gray-200 rounded-md h-12 lg:text-base min-[320px]:text-xs"
            fullWidth
            onClick={() => setHasLocked(false)}
          >
            LIMPAR
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
