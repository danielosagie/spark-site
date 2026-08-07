import { Hero } from '@/components/Hero'
import { FeatureSwitcher } from '@/components/FeatureSwitcher'
import { WhoItIsFor } from '@/components/WhoItIsFor'
import { GetApp } from '@/components/GetApp'
import { Closing } from '@/components/Closing'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSwitcher />
      <WhoItIsFor />
      <Closing />
      <GetApp />
    </>
  )
}
