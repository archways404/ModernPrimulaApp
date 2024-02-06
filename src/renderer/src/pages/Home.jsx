/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XbhQYHeMz7f
 */

import { useNavigate } from 'react-router-dom'
import UpdateCheck from '../components/UpdateCheck'

const Home = () => {
  const navigate = useNavigate()
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
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => navigate('/automatic')}
          className="bg-red-500 text-black w-32 h-8 rounded-xl"
        >
          Automatic
        </button>
        <button
          onClick={() => navigate('/manual')}
          className="bg-yellow-500 text-black w-32 h-8 rounded-full"
        >
          Manual
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="bg-green-500 text-black w-32 h-8 rounded-t-3xl"
        >
          Settings
        </button>
        <button className="bg-blue-500 text-black w-32 h-8 rounded-b-3xl">Coming Soon...</button>
        <button className="bg-indigo-500 text-black w-32 h-8 rounded-tl-3xl rounded-br-3xl">
          Coming Soon...
        </button>
        <button className="bg-purple-500 text-black w-32 h-8 rounded-tr-3xl rounded-bl-3xl">
          Coming Soon...
        </button>
        <UpdateCheck />
      </div>
    </div>
  )
}

export default Home
