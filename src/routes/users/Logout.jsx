import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Logout({ logoutUser }) {
    //Logs out user and redirects to homepage.

    const navigate = useNavigate()

    useEffect(() => {

        logoutUser()
        navigate('/')

    }, [])
    return (
        <h1>Logging out...</h1>
    )
}

export default Logout;