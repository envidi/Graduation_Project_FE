import { Separator } from '@/components/ui/separator'
import WatchList from './WatchList'

function ProfileWatchListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[19px] font-medium">Your Watch List</h3>
        <p className="text-2xl text-muted-foreground ">
          You can view all your watch list here
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <WatchList />
    </div>
  )
}
export default ProfileWatchListPage
