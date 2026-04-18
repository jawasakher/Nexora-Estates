import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Listing from './pages/Listing'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <main>
      <Header/>

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/listing' element={<Listing/>}/>
      </Routes>
      
    </main>
  )
}

export default App
