import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from './appearance-form'

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[19px] font-medium">Appearance</h3>
        <p className="text-2xl text-muted-foreground ">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <AppearanceForm />
    </div>
  )
}
