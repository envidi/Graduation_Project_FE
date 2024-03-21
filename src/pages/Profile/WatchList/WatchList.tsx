import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Grip, LayoutGrid, LayoutList, List, X } from 'lucide-react'
function WatchList() {
  return (
    <Tabs defaultValue="Grip" className="w-full ">
      <TabsList className="grid w-[230px]  grid-cols-4 bg-background-secondary p-2.5">
        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor  py-3"
          value="Grip"
        >
          <Grip size={20} />
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor text-xl py-3"
          value="List"
        >
          <List size={20} />
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor text-xl py-3"
          value="LayoutList"
        >
          <LayoutList size={20} />
        </TabsTrigger>

        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor text-xl py-3"
          value="LayoutGrid"
        >
          <LayoutGrid size={20} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Grip" className="w-full">
        <div className="grid lg:grid-cols-5  sm:grid-cols-4 xs:grid-cols-3  w-full gap-5 mt-3">
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-3 rounded-xl">
              <div className="text-xl my-1.5 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-3 rounded-xl">
              <div className="text-xl my-1.5 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-3 rounded-xl">
              <div className="text-xl my-1.5 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-3 rounded-xl">
              <div className="text-xl my-1.5 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-3 rounded-xl">
              <div className="text-xl my-1.5 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-3 rounded-xl">
              <div className="text-xl my-1.5 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="List">
        <div className="grid md:grid-cols-3 xs:grid-cols-2 w-full gap-5 mt-3">
          <div>
            <div className="relative group overflow-hidden">
              <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-6  text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100 font-semibold">
                  Get ticket
                </Button>
              </div>
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 py-5 pt-3 rounded-xl">
              <div className="text-2xl my-4 mt-1 text-primary-infoMovie">
                Action , Drama , Thriller
              </div>
              <h3 className="text-3xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="LayoutList">
        <div className="flex flex-col w-full gap-5 mt-3">
          <div className="flex">
            <div className="relative group overflow-hidden basis-1/5">
              {/* <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div> */}
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 ms-3  rounded-xl basis-4/5">
              <div className="text-2xl flex justify-between  text-primary-infoMovie">
                <span> Action , Drama , Thriller </span>
                <span className="mr-3 hover:text-primary-movieColor hover:cursor-pointer">
                  <X size={20} />
                </span>
              </div>
              <h3 className="text-3xl font-semibold my-2 text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
              <p className="text-2xl break-all xs:hidden sm:block   mt-2 sm:truncate sm:max-w-3xl md:max-w-6xl md:whitespace-normal    text-ellipsis overflow-hidden">
                During World War II, Lt. Gen. Leslie Groves Jr. appoints
                physicist J. Robert Oppenheimer to work on the top-secret
                Manhattan Project. Oppenheimer and a team of scientists spend
                years developing and designing the atomic bomb. Their work comes
                to fruition on July 16, 1945, as they witness the world s first
                nuclear explosion, forever changing the course of history.
              </p>
              <Button
                variant={'outline'}
                className="border-2 rounded-xl text-2xl mt-6 py-3 text-primary-locationMovie font-bold"
              >
                Get ticket
              </Button>
            </div>
          </div>
          <div className="flex">
            <div className="relative group overflow-hidden basis-1/5">
              {/* <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div> */}
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 ms-3  rounded-xl basis-4/5">
              <div className="text-2xl flex justify-between  text-primary-infoMovie">
                <span> Action , Drama , Thriller </span>
                <span className="mr-3 hover:text-primary-movieColor hover:cursor-pointer">
                  <X size={20} />
                </span>
              </div>
              <h3 className="text-3xl font-semibold my-2 text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
              <p className="text-2xl break-all xs:hidden sm:block   mt-2 sm:truncate sm:max-w-3xl md:max-w-6xl md:whitespace-normal    text-ellipsis overflow-hidden">
                During World War II, Lt. Gen. Leslie Groves Jr. appoints
                physicist J. Robert Oppenheimer to work on the top-secret
                Manhattan Project. Oppenheimer and a team of scientists spend
                years developing and designing the atomic bomb. Their work comes
                to fruition on July 16, 1945, as they witness the world s first
                nuclear explosion, forever changing the course of history.
              </p>
              <Button
                variant={'outline'}
                className="border-2 rounded-xl text-2xl mt-6 py-3 text-primary-locationMovie font-bold"
              >
                Get ticket
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="LayoutGrid">
        <div className="grid lg:grid-cols-2 xs:grid-cols-1 w-full gap-5 mt-3">
        <div className="flex">
            <div className="relative group overflow-hidden lg:basis-1/4 md:basis-1/5 sm:basis-1/3 xs:basis-1/5">
              {/* <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div> */}
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 ms-3  rounded-xl basis-4/5">
              <div className="lg:text-xl sm:text-2xl xs:text-xl flex justify-between  text-primary-infoMovie">
                <span> Action , Drama , Thriller </span>
                <span className="mr-3 hover:text-primary-movieColor hover:cursor-pointer">
                  <X size={20} />
                </span>
              </div>
              <h3 className="lg:text-2xl sm:text-3xl xs:text-2xl font-semibold my-1 text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
              <p className="lg:text-xl sm:text-2xl break-all xs:hidden sm:block   mt-2  lg:truncate md:w-[500px]  lg:w-[200px] text-ellipsis overflow-hidden">
                During World War II, Lt. Gen. Leslie Groves Jr. appoints
                physicist J. Robert Oppenheimer to work on the top-secret
                Manhattan Project. Oppenheimer and a team of scientists spend
                years developing and designing the atomic bomb. Their work comes
                to fruition on July 16, 1945, as they witness the world s first
                nuclear explosion, forever changing the course of history.
              </p>
              <Button
                variant={'outline'}
                className="border-2 rounded-xl lg:text-xl sm:text-2xl xs:text-xl mt-6 py-3 text-primary-locationMovie font-bold"
              >
                Get ticket
              </Button>
            </div>
          </div>
          <div className="flex">
            <div className="relative group overflow-hidden lg:basis-1/4 md:basis-1/5 sm:basis-1/3 xs:basis-1/5">
              {/* <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                  Get ticket
                </Button>
              </div> */}
              <img
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1710826500/Noryang_ucw3ap.jpg"
                alt=""
                className="group-hover:blur-sm transition-all ease-out duration-500"
              />
            </div>
            <div className="shadow-lg px-2 ms-3  rounded-xl basis-4/5">
              <div className="lg:text-xl sm:text-2xl xs:text-xl flex justify-between  text-primary-infoMovie">
                <span> Action , Drama , Thriller </span>
                <span className="mr-3 hover:text-primary-movieColor hover:cursor-pointer">
                  <X size={20} />
                </span>
              </div>
              <h3 className="lg:text-2xl sm:text-3xl xs:text-2xl font-semibold my-1 text-primary-movieColor truncate text-ellipsis overflow-hidden">
                Black Mirror
              </h3>
              <p className="lg:text-xl sm:text-2xl break-all xs:hidden sm:block   mt-2  lg:truncate md:w-[500px]  lg:w-[200px] text-ellipsis overflow-hidden">
                During World War II, Lt. Gen. Leslie Groves Jr. appoints
                physicist J. Robert Oppenheimer to work on the top-secret
                Manhattan Project. Oppenheimer and a team of scientists spend
                years developing and designing the atomic bomb. Their work comes
                to fruition on July 16, 1945, as they witness the world s first
                nuclear explosion, forever changing the course of history.
              </p>
              <Button
                variant={'outline'}
                className="border-2 rounded-xl lg:text-xl sm:text-2xl xs:text-xl mt-6 py-3 text-primary-locationMovie font-bold"
              >
                Get ticket
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default WatchList
