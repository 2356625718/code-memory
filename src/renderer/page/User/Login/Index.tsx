import React, { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import User from '../User'

const Index: React.FC = () => {
  const [page, setPage] = useState<string>('login')

  if (page !== 'user' && sessionStorage.getItem('user')) {
    setPage('user')
  }

  const changePage = (change: string) => {
    setPage(change)
  }

  return (
    <>
      { page === 'login' && <Login changePage={changePage}></Login> }
      { page === 'register' && <Register changePage={changePage}></Register>}
      { page === 'user' && <User></User>}
    </>
  )
}

export default Index;