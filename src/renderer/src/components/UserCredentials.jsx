/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZODF0yh0DlK
 */

import { useState } from 'react'
const { ipcRenderer } = window.require('electron')

const UserCredentials = () => {
  const [formUsername, setFormUsername] = useState('')
  const [formPassword, setFormPassword] = useState('')

  // Example inside AutomaticForm component
  const handleChangeUsername = (event) => {
    setFormUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setFormPassword(event.target.value)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission behavior
    console.log(formUsername, formPassword)
    try {
      ipcRenderer.send('start-verifyLoginDetails-task', {
        username: formUsername,
        password: formPassword
      })
    } catch (error) {
      console.error('There was an error submitting the form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center space-y-4">
        {' '}
        <input
          className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
          placeholder="Username"
          type="text"
          onChange={handleChangeUsername}
        />
        <input
          className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
          placeholder="Password"
          type="password"
          onChange={handleChangePassword}
        />
        <button type="submit" className="bg-green-500 text-white w-32 rounded-full">
          Submit
        </button>
      </div>
    </form>
  )
}

export default UserCredentials
