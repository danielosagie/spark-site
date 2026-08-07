import { Hero } from '@/components/Hero'
import { FeatureSwitcher } from '@/components/FeatureSwitcher'
import { WhoItIsFor } from '@/components/WhoItIsFor'
import { Trust } from '@/components/Trust'
import { GetApp } from '@/components/GetApp'
import { Closing } from '@/components/Closing'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSwitcher />
      <WhoItIsFor />
      <Trust />
      <Closing />
      <GetApp />
    </>
  )
}
