import { useState, ChangeEvent } from "react"

export const LoginCard = () => {
        const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
        const [message, setMessage] = useState<string>("");
        
        const handleLogin = () => {
            setIsLoggedIn(!isLoggedIn)
        }

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
           setMessage(e.target.value);
        }

    return (
        <> 
        <span> Card</span> <br />
            <button onClick={handleLogin}> {isLoggedIn ? "Logout" : "Login"} </button>
            

            <div>
                <input type="text" placeholder="Type a message" value={message} onChange={handleChange}  />
                <p> {message} </p>
            </div>

            
        </>
    )
}