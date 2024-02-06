/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZODF0yh0DlK
 */

import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Editlogin = () => {
  const [formUsername, setFormUserame] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [showLoading, setShowLoading] = useState(false) // Assuming this is defined in your component

  const handleChangeUsername = (event) => {
    setFormUserame(event.target.value)
  }

  const handleChangePassword = (event) => {
    setFormPassword(event.target.value)
  }

  const handleSubmit = async (e) => {
    setShowLoading(true)
    e.preventDefault() // Prevent default form submission behavior
    console.log('Username: ', formUsername, ' Password: ', formPassword)
    const formData = {
      username: formUsername,
      password: formPassword
    }
    try {
      const response = await fetch('http://localhost:9999/api/test/verifylogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.status === 200) {
        console.log('Login successful')
        localStorage.setItem('username', formUsername)
        localStorage.setItem('password', formPassword)
        setShowLoading(false)

        // Show a success toast notification
        toast.success('Data successfully updated!', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        setShowLoading(false)
        console.log('Login failed')

        // Optionally, show an error toast notification
        toast.error('Failed to update data.', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    } catch (error) {
      setShowLoading(false)
      console.error('There was an error submitting the form:', error)

      // Optionally, show an error toast notification
      toast.error('Failed to update data.', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <ToastContainer />
      {showLoading ? (
        <div className="loading-screen">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center space-y-4">
            {' '}
            <label className="text-white">Edit Login</label>
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
      )}
    </div>
  )
}

export default Editlogin
