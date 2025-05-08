import { getPriceIdForActiveUser } from '@/lib/user'
import { cn } from '@/lib/utils'
import { pricingPlans } from '@/utils/constants'
import { currentUser } from '@clerk/nextjs/server'
import { Crown } from 'lucide-react'
import { Badge } from '../ui/badge'

export default async function PlanBadge() {
  const user = await currentUser()

  if (!user?.id) return null

  const email = user?.emailAddresses?.[0]?.emailAddress

  let priceId: string | null = null
  if (email) {
    priceId = await getPriceIdForActiveUser(email)
  }

  const plan = pricingPlans.find((p) => p.priceId === priceId)

  const planName = plan ? plan.name : 'Assine agora'

  return (
    <a href="/#pricing">
      <Badge
        variant="outline"
        className={cn(
          '[&>svg]:!size-3.5 ml-2 px-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center justify-center cursor-pointer',
          !priceId && 'bg-linear-to-r from-red-100 to-red-200 border-red-300'
        )}
      >
        <Crown
          className={cn(
            ' mr-1 text-amber-600 flex-shrink-0',
            !priceId && 'text-red-600'
          )}
        />
        <span className="inline-block md:text-sm">{planName}</span>
      </Badge>
    </a>
  )
}
