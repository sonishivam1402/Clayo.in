import { } from 'react'
import './App.css'
import GlobalContextProvider from './context/GlobalContextProvider'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { NewArrivals } from './components/NewArrivals'
import { GridBanner } from './components/GridBanner'
import { ProductComponent } from './components/ui/ProductCardComponent'
import {Cart} from './components/Cart'

function App() {
  return (
    <GlobalContextProvider>
      <NavBar/>
      <Hero/>
      <NewArrivals/>
      <ProductComponent/>
      
    </GlobalContextProvider>
  )
}

export default App
