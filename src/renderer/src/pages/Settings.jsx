import Editlogin from '../components/EditLogin'
import EditNameSalary from '../components/Editnamesalary'

const Settings = () => {
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
        <Editlogin />
        <br></br>
        <EditNameSalary />
      </div>
    </div>
  )
}

export default Settings
