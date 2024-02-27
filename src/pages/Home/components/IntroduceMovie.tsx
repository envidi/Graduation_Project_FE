import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import '@/styles/introduce.css'
import { TicketCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import imgBg from '/Images/movies/money_heist-bg.jpg'

function IntroduceMovie() {
  return (
    <div className="relative">
      <div className="">
        <section className="netflix-home-video">
          <div className="top"></div>
          <div className="bottom"></div>
          <img
            className="img-background"
            src={imgBg}
            alt="money_heist"
          />
          <div className="content xs:w-[55%] sm:w-[50%] md:w-[45%] lg:w-[38%] xl:w-[35%]">
            <section className="left xs:ms-10 sm:ms-12 flex flex-col justify-center h-full">
              <img
                className="lg:w-[90%] md:w-[80%] sm:w-[80%] xs:w-[80%]"
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1708832547/money-heist-title-la-casa-de-pap-removebg-preview_qgqeco.png"
                alt=""
              />

              <div className="flex mt-5">
                <Button variant="home_btn" className="btn btn-light m-2">
                  <TicketCheck size={20} /> Get ticket
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="home_outline"
                      className="ms-5 btn btn-secondary m-2 "
                    >
                      <i className="bi bi-info-circle p-0"></i> Trailer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 w-fit">
                    <iframe
                      className="xl:w-[917px] xl:h-[516px] md:w-[517px] md:h-[316px] xs:w-[320px] xs:h-[186px]"
                      src="https://www.youtube.com/embed/_InqQJRqGW4?si=7jJpOKRk9LZYswtd"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-10 ms-2 xs:hidden sm:block xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl text-primary-white leading-10 ">
                Money Heist (La Casa de Papel) is a popular Netflix series about
                a group of robbers with fake names. The Professor is the
                mastermind behind the heists and has a tragic backstory that
                motivates his actions. The show features a diverse cast of
                characters
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default IntroduceMovie
