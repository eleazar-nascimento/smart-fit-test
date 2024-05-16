import { Footer } from '@/components/Footer'
import { Guidelines } from '@/components/Guidelines'
import { Header } from '@/components/Header'
import { SearchGym } from '@/components/SearchGym'
import { Title } from '@/components/Title'
import { NextUIProvider } from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center ">
        <Header />
        <Title />
        <SearchGym />
        <Guidelines />
        <Footer />
      </main>
    </NextUIProvider>
  )
}
