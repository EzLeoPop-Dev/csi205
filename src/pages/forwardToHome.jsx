import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ForWardToHome() {
    const navigate = useNavigate()
    useEffect(()=> navigate('../home') ,[])
    return <h1>ForWardToHome</h1>
}