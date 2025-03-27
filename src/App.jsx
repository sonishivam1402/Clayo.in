import { } from 'react'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { NewArrivals } from './components/NewArrivals'
import { GridBanner } from './components/GridBanner'
import { CardComponent } from './components/ui/cardComponent'

function App() {
  return (
    <UserContextProvider>
      {/* <NavBar/>
      <Hero/>
      <NewArrivals/>
      <GridBanner/>
      <Login/> */}
      <CardComponent/>
    </UserContextProvider>
  )
}

export default App
