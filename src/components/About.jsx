import {React, useEffect} from 'react'
import { GridBanner } from './GridBanner'

export const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  })

  return (
    <GridBanner />
  )
}
