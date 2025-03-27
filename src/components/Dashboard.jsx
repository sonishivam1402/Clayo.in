import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

export const Dashboard = () => {

    const {user} = useContext(UserContext);

    if (!user) return <h2>Please Login!!</h2>
    
    return <div>Welcome {user.username} !!</div>
    
}
