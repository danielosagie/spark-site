import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { WhoItIsFor } from '@/components/WhoItIsFor'
import { Trust } from '@/components/Trust'
import { GetApp } from '@/components/GetApp'
import { Closing } from '@/components/Closing'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhoItIsFor />
      <GetApp />
      <Closing />
    </>
  )
}
