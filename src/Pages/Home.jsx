import React from 'react'
import HeroSection from '../components/Home Components/HeroSection'
import AboutSection from '../components/Home Components/AboutSection'
import Posts from '../components/Home Components/Posts'
import Categories from '../components/Home Components/Categories'
import HomeJourney from '../components/Home Components/HomeJourney'
import Authors from '../components/Home Components/Authors'
import Partners from '../components/Home Components/Partners'
import Testimonials from '../components/Home Components/Testimonials'
import Teamjoin from '../components/Home Components/Teamjoin'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Posts/>
      <AboutSection />
      <Categories/>
      <HomeJourney/>
      <Authors />
      <Partners/>
      <Testimonials />
      <Teamjoin />
    </div>
  )
}

export default Home