import { useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

const UpdateCheck = () => {
  useEffect(() => {
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available')
      // Notify the user that an update is available
    })

    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded')
      // Prompt the user to install the update
    })
  }, [])

  const restartApp = () => {
    ipcRenderer.send('restart_app')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center pt-20 pr-10 pl-20">
      <div className="flex flex-col items-center space-y-4">
        <button
          className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={restartApp}
        >
          Restart and install updates
        </button>
      </div>
    </div>
  )
}

export default UpdateCheck
