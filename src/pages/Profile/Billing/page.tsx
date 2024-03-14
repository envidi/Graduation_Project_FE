import { Separator } from '@/components/ui/separator'
import ProfileBill from './ProfileBill'

export default function ProfileBillPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[19px] font-medium">Your Bill</h3>
        <p className="text-2xl text-muted-foreground ">
            You can view all your transactions here
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <ProfileBill />
    </div>
  )
}
