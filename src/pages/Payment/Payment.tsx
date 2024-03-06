import { PenLine, Building, Mail, Phone, User } from 'lucide-react'
import { RadioGroup } from '@/components/ui/radio-group'

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import vnpay from '/Images/movies/vnpay2.png'
import momo from '/Images/movies/momo.png'
import mb from '/Images/movies/mb.png'
import PaymentItem from './components/PaymentItem'
import { useState } from 'react'

const listPaymentMethods = [
  { _id: 1, image: vnpay, cardNumber: 1234, value: '1' },
  { _id: 2, image: momo, cardNumber: 1234, value: '2' },
  { _id: 3, image: mb, cardNumber: 1234, value: '3' }
]
function Payment() {
  const [cardSelected, setCardSelected] = useState<number>(1)
  return (
    <div className="">
      <Accordion
        type="single"
        collapsible
        className="bg-background-four my-[28px] dark:shadow-lg"
      >
        <AccordionItem value="item-1" className="shadow-xl">
          <AccordionTrigger className="px-10 py-5 border-[1px] border-primary-movieColor  text-2xl rounded-t-lg">
            User Information
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
                      Name :
                    </span>
                  </div>

                  <span className="ms-10 text-2xl flex items-end text-primary-movieColor truncate font-semibold overflow-hidden">
                    Envidi
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
                    Envidi
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
                      Address :
                    </span>
                  </div>

                  <p className="ms-10 text-2xl flex items-end truncate   text-primary-movieColor text-ellipsis overflow-hidden font-semibold ">
                    Ha NoiCity ccccccccccccccccccccccccccccccccccdvddvfvcc
                  </p>
                </div>

                <div className="flex items-center  px-6 py-5 md:basis-1/2 xs:basis-full  bg-background-secondary my-2 rounded-lg">
                  <div className="w-36 flex items-center">
                    <span className="mb-1.5">
                      <Phone size={16} />{' '}
                    </span>
                    <span className="text-2xl ms-2 flex items-end min-w-32">
                      Phone :
                    </span>
                  </div>
                  <span className="ms-10 text-2xl flex items-end text-primary-movieColor font-semibold">
                    0987654321
                  </span>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary-movieColor px-7 py-3 mt-2 text-2xl">
                    <PenLine size={16} className="mr-3" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="xs:max-w-[415px]  md:max-w-[435px] lg:max-w-[455px] xl:max-w-[475px] p-10">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-primary-movieColor">
                      Edit profile
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
                        Name
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
                    <div className="grid grid-cols-4 items-center gap-4 my-1    ">
                      <Label
                        htmlFor="username"
                        className="text-right text-2xl text-primary-movieColor font-semibold"
                      >
                        Phone
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
                        Address
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
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col shadow-xl">
        <div className="border-[1px] border-border-borderPayment border-b-transparent rounded-t-xl px-10 py-5 text-2xl">
          Payment method
        </div>
        <div className="flex  px-10 py-10 border-[1px] rounded-b-xl  border-border-borderPayment">
          <RadioGroup
            defaultValue={'1'}
            className="grid w-full xl:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1  gap-5"
          >
            {listPaymentMethods?.map((method) => {
              return (
                <PaymentItem
                  cardSelected={cardSelected}
                  method={method}
                  key={method._id}
                  setCardSelected={setCardSelected}
                />
              )
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default Payment
