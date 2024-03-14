import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CalendarDateRangePicker } from '@/components/react-day-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
function ProfileBill() {
  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder="Enter your bill"
          className="basis-96 text-2xl py-8 border-primary-movieColor"
        />
        <CalendarDateRangePicker className="" />
        <Button className="bg-primary-movieColor text-2xl px-10">Search</Button>
      </div>
      <div className="flex sm:flex-row xs:flex-col xs:relative md:static overflow-hidden rounded-xl">
        <div className=" md:basis-1/4 rounded-xl overflow-hidden xs:absolute top-[-40px] left-0 md:static -z-10 after:content-['*'] after:absolute md:after:hidden  after:top-0 after:left-0 after:bg-black after:opacity-65 after:w-full after:h-full">
          <img
            className="object-contain"
            src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1707899661/scarygirl_nmxrem.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col md:ms-8 xs:ms-0 flex-1  overflow-hidden md:bg-background-secondary xs:p-2 sm:p-5 sm:px-7 rounded-xl">
          <Tabs defaultValue="account" className="">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-background-main sm:opacity-95 md:opacity-100">
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-background-secondary data-[state=active]:text-primary-movieColor text-2xl font-semibold"
              >
                Info movie
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-background-secondary text-2xl data-[state=active]:text-primary-movieColor font-semibold"
                value="password"
              >
                Payment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="mb-5">
                <h3 className="text-2xl">MOON FILM FESTIVAL </h3>
                <p className="text-xl">445, Mount Eden Road, Anytown , USA</p>
              </div>
              <div>
                <h3 className="text-2xl">LOVERS AT DUBLIN</h3>
                <p className="text-xl">A Romantic Musical Film</p>
              </div>

              <div className="flex my-5 w-full justify-between py-3 px-4 border-t border-b border-dashed border-t-primary-movieColor border-b-primary-movieColor">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">Room</span>
                  <div className="text-xl flex gap-2">Room 3</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">TIME</span>
                  <span className="text-xl">05:05 PM</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">JUNE</span>
                  <span className="text-xl">12</span>
                </div>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-2xl">Seat</span>
                    <span className="text-2xl">A5, A6</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-2xl">Food</span>
                    <span className="text-2xl">
                      Burger King( 1 ) , Burger King( 1 )
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="password">
              <ul className="px-4">
                <li className="text-2xl flex justify-between mb-3 mt-8">
                  <span>Ticket</span>
                  <span>ABCD</span>
                </li>
                <li className="text-2xl flex justify-between  mt-5">
                  <span>Date</span>
                  <span>10-20-2024</span>
                </li>
              </ul>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                      Card
                    </TableHead>
                    <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                      Movie
                    </TableHead>
                    <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                      Seat
                    </TableHead>
                    <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                      Food
                    </TableHead>
                    <TableHead className="text-right text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="sm:text-[14px] xs:text-[12px]">
                      VNPay
                    </TableCell>
                    <TableCell className="sm:text-[14px] xs:text-[12px]">
                      200.000
                    </TableCell>
                    <TableCell className="sm:text-[14px] xs:text-[12px]">
                      200.000
                    </TableCell>
                    <TableCell className="sm:text-[14px] xs:text-[12px]">
                      200.000
                    </TableCell>
                    <TableCell className="text-right sm:text-[14px] xs:text-[12px]">
                      2000.000
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter className="bg-background-main  overflow-hidden sm:opacity-85 md:opacity-100">
                  <TableRow className="">
                    <TableCell
                      colSpan={4}
                      className="rounded-bl-xl sm:text-[14px] xs:text-[12px]"
                    >
                      Total
                    </TableCell>
                    <TableCell className="text-right rounded-br-xl sm:text-[14px] xs:text-[12px]">
                      $2,500.00
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default ProfileBill
