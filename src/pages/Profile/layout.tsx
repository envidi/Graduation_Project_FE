// import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'

export const metadata: { title: string; description: string } = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/profile/forms'
  },
  {
    title: 'Account',
    href: '/profile/forms/account'
  },
  {
    title: 'Appearance',
    href: '/profile/forms/appearance'
  },
  {
    title: 'Watch List',
    href: '/profile/watchlist'
  },
  {
    title: 'Bill',
    href: '/profile/bill'
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" rounded-[0.5rem] border border-border-borderProfileContain shadow-md md:shadow-xl mt-32 mx-16">
        <div className=" space-y-11 p-16 pb-16 block mt-3 px-[35px]">
          <div className="space-y-3 ">
            <h2 className="text-5xl font-semibold tracking-tight">Settings</h2>
            <p className="text-muted-foreground text-3xl block">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-20 border border-border-borderProfileContain" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
            <aside className="-mx-6 lg:w-1/5 ">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-7xl lg:ps-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
