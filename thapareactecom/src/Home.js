import React from 'react'
import Herosection from './components/Herosection'
import Services from './components/Services'
import Trusted from './components/Trusted'
import FeatureProduct from './components/FeatureProduct'

 export const Home = () => {

   const myData={
    name:"MY STORE"
   }
  return (
    <>
  <Herosection myData={myData}/>
  <FeatureProduct/>
    <Services/>
    <Trusted/>
    </>
  )
}


