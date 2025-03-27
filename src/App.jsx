import { } from 'react'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { NewArrivals } from './components/NewArrivals'
import { GridBanner } from './components/GridBanner'
import { ProductComponent } from './components/ui/ProductCardComponent'

function App() {
  return (
    <UserContextProvider>
      <NavBar/>
      <Hero/>
      <NewArrivals/>
      <ProductComponent/>
    </UserContextProvider>
  )
}

export default App
