import React from 'react'

import Aboutcreatives from '../components/About Components/Aboutcreatives'
import Teamjoin from '../components/Home Components/Teamjoin'
import Authorsext from '../components/About Components/Authorsext'
import AboutMission from '../components/About Components/AboutMission'

const About = () => {
  return (
    <div>
      <AboutMission />
      <Aboutcreatives />
      <Authorsext />
      <Teamjoin />
    </div>
  )
}

export default About