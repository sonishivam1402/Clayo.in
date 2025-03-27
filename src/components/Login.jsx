import {React, useState, useContext} from 'react'
import GlobalContext from '../context/GlobalContext'

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        setUser({username, password});
    }

  return (
    <div className={"h-screen flex flex-col items-center justify-center"}>
      
      <div className={"p-6 w-sm h-96 gap-6 mx-auto bg-white-200 border-2 border-amber-600 shadow-md  shadow-amber-800 rounded-xl flex flex-col items-center justify-center space-x-4"}>
      <h1>Welcome!!</h1>
        <input  className={"p-2 border-2 rounded-sm"} type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        {" "}
        <input className={"p-2 border-2 rounded-sm"} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className={" border-amber-800!"} onClick={handleSubmit}>Login</button>
      </div>  
    </div>
  )
}
