import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'



export const useAuth = () => {

  const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }
  
  return {
    isAuthenticated,
    login,
    logout
  }
}
