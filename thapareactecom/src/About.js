import React, { useContext } from 'react'
import Herosection from './components/Herosection'
import {  useProductContext } from './context/productcontext';

const About = () => {

  const {MyName}=useProductContext();
const myData={
  name:"MY ECOMMERCE"
}

  return (
    <>
    {MyName}
   <Herosection myData={myData} />
   </>
  )
}

export default About
