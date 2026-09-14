'use client'
import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useLocationsFilter } from '@/contexts/locations-filter'
import { ListUnits } from './ListUnits'
import { RESULTS_ANCHOR_ID } from './SearchGym'

export function CarousselListUnits() {
  const { results, isLoading, isError } = useLocationsFilter()

  if (isLoading) {
    return (
      <p
        id={RESULTS_ANCHOR_ID}
        className="text-gray-500 py-12 scroll-mt-24"
        role="status"
      >
        Carregando unidades...
      </p>
    )
  }

  if (isError) {
    return (
      <p
        id={RESULTS_ANCHOR_ID}
        className="text-red py-12 scroll-mt-24"
        role="alert"
      >
        Não foi possível carregar as unidades. Tente novamente mais tarde.
      </p>
    )
  }

  if (results.length === 0) {
    return (
      <p
        id={RESULTS_ANCHOR_ID}
        className="text-gray-500 py-12 text-center px-6 scroll-mt-24"
        role="status"
      >
        Nenhuma unidade encontrada para os filtros selecionados.
      </p>
    )
  }

  return (
    <Carousel id={RESULTS_ANCHOR_ID} className="scroll-mt-24">
      <CarouselContent className="w-full h-full container pb-6 px-4 lg:w-[960px] flex justify-start items-center gap-2">
        {/* A API repete o mesmo `id` em unidades diferentes, então a chave
            combina id + título para se manter única. */}
        {results.map((location) => (
          <CarouselItem
            key={`${location.id}-${location.title}`}
            className="basis-1/3"
          >

            <ListUnits location={location} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
