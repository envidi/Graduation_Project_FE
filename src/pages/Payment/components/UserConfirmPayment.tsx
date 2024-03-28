import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { PenLine, Building, Mail, Phone, User } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ContextMain } from '@/context/Context'
import { useContext } from 'react'

function UserConfirmPayment() {
  const { userDetail } = useContext(ContextMain)
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-background-four my-[28px] dark:shadow-lg"
    >
      <AccordionItem value="item-1" className="shadow-xl">
        <AccordionTrigger className="px-10 py-5 border-[1px] border-primary-movieColor  text-2xl rounded-t-lg">
          Thông tin người dùng
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden border-[1px] rounded-b-lg border-primary-movieColor border-t-transparent">
          <div className="flex flex-col w-full items-start  px-10 py-10">
            <div className="flex md:items-center md:flex-row xs:flex-col md:gap-10 w-full">
              <div className="flex items-center md:basis-1/2 xs:flex-auto overflow-hidden  px-6 py-5   bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <User size={16} />{' '}
                  </span>
                  <span className="text-2xl ms-2 flex items-end min-w-32">
                    Tên :
                  </span>
                </div>

                <span className="ms-10 text-2xl flex items-end text-primary-movieColor truncate font-semibold overflow-hidden">
                  {userDetail.message.name}
                </span>
              </div>

              <div className="flex items-center md:basis-1/2 xs:basis-full overflow-hidden px-6 py-5 bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <Mail size={16} />{' '}
                  </span>
                  <span className="text-2xl ms-2 flex items-end min-w-32">
                    Email :
                  </span>
                </div>
                <span className="ms-10 text-2xl flex items-end text-primary-movieColor truncate font-semibold overflow-hidden">
                  {userDetail.message.email}
                </span>
              </div>
            </div>

            <div className="flex md:items-center md:flex-row xs:flex-col md:gap-10 w-full">
              <div className="flex items-center md:basis-1/2 xs:basis-full overflow-hidden  px-6 py-5   bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <Building size={16} />{' '}
                  </span>
                  <span className=" text-2xl ms-2 flex items-end min-w-32">
                    Địa chỉ :
                  </span>
                </div>

                <p className="ms-10 text-2xl flex items-end truncate   text-primary-movieColor text-ellipsis overflow-hidden font-semibold ">
                  {userDetail?.message?.address ?? 'No address'}
                </p>
              </div>

              <div className="flex items-center  px-6 py-5 md:basis-1/2 xs:basis-full  bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <Phone size={16} />{' '}
                  </span>
                  <span className="text-2xl ms-2 flex items-end min-w-32">
                    Số điện thoại :
                  </span>
                </div>
                <span className="ms-10 text-2xl flex items-end text-primary-movieColor font-semibold">
                  {userDetail?.message?.mobile ?? 'No phone'}
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary-movieColor px-7 py-3 mt-2 text-2xl">
                  <PenLine size={16} className="mr-3" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent className="xs:max-w-[415px]  md:max-w-[435px] lg:max-w-[455px] xl:max-w-[475px] p-10">
                <DialogHeader>
                  <DialogTitle className="text-3xl text-primary-movieColor">
                    Chỉnh sửa thông tin
                  </DialogTitle>
                  <DialogDescription className="text-2xl">
                    Make changes to your profile here. Click save when youre
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4 my-1    ">
                    <Label
                      htmlFor="name"
                      className="text-right text-2xl text-primary-movieColor font-semibold"
                    >
                      Tên
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 my-1    ">
                    <Label
                      htmlFor="username"
                      className="text-right text-2xl text-primary-movieColor font-semibold"
                    >
                      Email
                    </Label>
                    <Input
                      id="username"
                      defaultValue="phanm711996@gmail.com"
                      className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 my-1">
                    <Label
                      htmlFor="username"
                      className="text-right text-2xl text-primary-movieColor font-semibold"
                    >
                      Điện thoại
                    </Label>
                    <Input
                      id="username"
                      defaultValue="0987654321"
                      className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 my-1    ">
                    <Label
                      htmlFor="username"
                      className="text-right text-2xl text-primary-movieColor font-semibold"
                    >
                      Địa chỉ
                    </Label>
                    <Input
                      id="username"
                      defaultValue="Ha Noi City"
                      className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" variant={'normal'}>
                      Lưu
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default UserConfirmPayment
