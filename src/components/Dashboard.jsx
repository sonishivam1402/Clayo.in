import React from 'react'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export const Dashboard = () => {

    const {user} = useContext(GlobalContext);

    if (!user) return <h2>Please Login!!</h2>
    
    return <div>Welcome {user.username} !!</div>
    
}
