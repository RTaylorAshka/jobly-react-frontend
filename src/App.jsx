import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import useLocalStorage from './hooks/localStorage'
import NavBar from './NavBar'
import Error from './helpers/Error'
import LoginForm from './routes/users/LoginForm'
import SignupForm from './routes/users/SignupForm'
import Logout from './routes/users/Logout'
import Home from './routes/users/Home'
import Jobs from './routes/jobs/Jobs'
import JobDetails from './routes/jobs/JobDetails'
import Companies from './routes/companies/Companies'
import CompanyProfile from './routes/companies/CompanyProfile'
import UserProfile from './routes/users/UserProfile'



function App() {

  //Get and set username and token in local storage
  const [user, setUser] = useLocalStorage('user', null)

  //Remove user from local storage
  async function logoutUser() {
    setUser(null)
  }


  return (
    <BrowserRouter>
      <NavBar user={user} logoutUser={logoutUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm setUser={setUser} />} />
        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/logout' element={<Logout logoutUser={logoutUser} />} />
        <Route path='/profile' element={<UserProfile user={user} />} />
        <Route path='/companies' element={<Companies />} />
        <Route path='/companies/:handle' element={<CompanyProfile />} />
        <Route path='/jobs' element={<Jobs user={user} />} />
        <Route path='/jobs/:id' element={<JobDetails user={user} />} />
        <Route path='*' element={<Error />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
