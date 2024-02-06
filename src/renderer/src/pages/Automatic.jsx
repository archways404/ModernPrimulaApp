import AutomaticForm from '../components/AutomaticForm'
import DateForm from '../components/DateForm'
import UserCredentials from '../components/UserCredentials'

import { useState } from 'react'
import { useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

const Automatic = () => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const name = localStorage.getItem('name')
  const salary = localStorage.getItem('salary')

  // Determine initial display states based on localStorage
  const [displayLoginForm, setDisplayLoginForm] = useState(!username || !password)
  const [displayInputForm, setDisplayInputForm] = useState(
    username && password && (!name || !salary)
  )

  useEffect(() => {
    ipcRenderer.on('verifyLoginDetails-task-complete', (event, arg) => {
      console.log(arg)
      if (arg.status === 'success') {
        localStorage.setItem('username', arg.username)
        localStorage.setItem('password', arg.password)
        setDisplayLoginForm(false)
        setDisplayInputForm(true)
        window.location.reload()
      } else {
        console.log('username and/or password is not defined or incorrect')
        console.log('status: ', arg.status)
      }
    })

    return () => {
      ipcRenderer.removeAllListeners('verifyLoginDetails-task-complete')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center pt-20 pr-10 pl-20">
      <h1 className="text-6xl font-bold tracking-tighter mb-10">
        <span className="text-red-500">M</span>
        <span className="text-yellow-500">o</span>
        <span className="text-green-500">d</span>
        <span className="text-blue-500">e</span>
        <span className="text-indigo-500">r</span>
        <span className="text-purple-500">n</span>
        <span className="text-pink-500">P</span>
        <span className="text-red-500">r</span>
        <span className="text-yellow-500">i</span>
        <span className="text-green-500">m</span>
        <span className="text-blue-500">u</span>
        <span className="text-indigo-500">l</span>
        <span className="text-purple-500">a</span>
      </h1>
      {displayLoginForm ? <UserCredentials /> : displayInputForm ? <AutomaticForm /> : <DateForm />}
    </div>
  )
}

export default Automatic
