import { useEffect, useState } from 'react'
import { Feature } from './Feature'
import HashLoader from 'react-spinners/HashLoader'

const FEATURE_DATA = [
  {
    title: 'Unparalleled Cinematic Experience',
    description:
      'Immerse yourself in stunning visuals and crystal-clear sound, as our state-of-the-art IMAX technology transports you directly into the heart of the action. With a screen that stretches beyond your peripheral vision every frame comes alive with unparalleled brilliance.',
    image_path: '/Images/features/food.webp'
  },
  {
    title: 'Delight in Dolby Atmos',
    description:
      'Experience sound like never before with Dolby Atmos, the epitome audio technology that takes you on an immersive sonic journey.With sound objects moving seamlessly around the theatre, youll be transported into the heart of every scene, making you an integral part of the story.',
    image_path: '/Images/features/sound.webp'
  },
  {
    title: 'Tantalizing Treats',
    description:
      'At our movie theatre, we take your movie-watching experience beyond the screen by offering a delectable array of food items at our concession stand. From freshly buttered popcorn, crispy nachos with zesty cheese dips, to gourmet hotdogs and a variety of refreshing beverages, our concession stand is a culinary paradise for movie enthusiasts.',
    image_path: '/Images/features/food.webp'
  },
  {
    title: 'Luxurious Escape',
    description:
      'Step into a world of opulence and relaxation, designed to cater to your every need before and after the main event. Our Premium Lounge welcomes you with plush leather seating, elegant décor, and a refined ambiance that sets the stage for an unforgettable cinematic journey.',
    image_path: '/Images/features/lounge.webp'
  }
]

export const Features = () => {
  const [featuresData, setFeaturesData] = useState<
    {
      title: string
      description: string
      image_path: string
    }[]
  >([])
  const override = {
    display: 'block',
    margin: '2.4rem auto'
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setFeaturesData(FEATURE_DATA)
    setLoading(false)
  }, [])

  const featuresHtml = featuresData.map((feature, idx) => {
    return <Feature key={idx} {...feature} idx={idx} />
  })

  return (
    <section className="section-features container">
      <h4 className="subheading">What you ll get?</h4>
      <h2 className="section-features-heading heading-secondary">
        Unleash the Movie Magic and Discover Our Spectacular Features
      </h2>

      {loading ? (
        <HashLoader cssOverride={override} color="#eb3656" />
      ) : (
        <div className="feature-contents">{featuresHtml}</div>
      )}
    </section>
  )
}
