import React from 'react'
import Hero from '../Hero'
import Features from '../Features'
import Footer from '../Footer'
import Sponsors from '../Frameworks'

const HomePage = () => {



  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.3 // Reduce or remove duration
  //     }
  //   }
  // };

  // const fadeInVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       duration: 0.5 // Reduce or remove duration
  //     }
  //   }
  // };


  return (
    <>

      
        <Hero />


        <Features />
      


      <Sponsors />
    </>
  )
}

export default HomePage