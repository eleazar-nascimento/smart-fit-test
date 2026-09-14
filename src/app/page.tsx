import { CarousselListUnits } from '@/components/CarousselListUnits'
import { Footer } from '@/components/Footer'
import { Guidelines } from '@/components/Guidelines'
import { Header } from '@/components/Header'
import { SearchGym } from '@/components/SearchGym'
import { Title } from '@/components/Title'
import { LocationsFilterProvider } from '@/contexts/locations-filter'
import { NextUIProvider } from '@nextui-org/react'
import { SWRProvider } from './swr-provider'

export default function Home() {
  return (
    <SWRProvider>
      <NextUIProvider>
        <LocationsFilterProvider>
          <main className="flex min-h-screen flex-col items-center ">
            <Header />
            <Title />
            <SearchGym />
            <Guidelines />
            <CarousselListUnits />
            <Footer />
          </main>
        </LocationsFilterProvider>
      </NextUIProvider>
    </SWRProvider>
  )
}
