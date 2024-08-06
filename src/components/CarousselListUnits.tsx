'use client'
import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ListUnits } from './ListUnits'
import { useLocation } from '@/api/use-locations'

export function CarousselListUnits() {
  const { locations } = useLocation()
  console.log('locations', locations)
  return (
    <Carousel>
      <CarouselContent className="w-full h-full container pb-6 px-4 lg:w-[960px] flex justify-start items-center gap-2">
        {locations?.locations?.map((filterLocations, index: number) => (
          <CarouselItem key={index} className="basis-1/3">
            <ListUnits location={filterLocations} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
