// import React, { useState } from 'react'
// import { registerSW } from 'virtual:pwa-register'
// import { RegisterSWData } from 'vite-plugin-pwa'

// export default function UpdateNotifier() {
//     const [updateAvailable, setUpdateAvailable] = useState(false)
    
//     const updateSW = registerSW({
//         onNeedRefresh() {
//             setUpdateAvailable(true)
//         },
//         onOfflineReady() {
//             console.log("app is ready to work offline.")
//         }
//     })

//     const handleRefresh = () => {
//         updateSW(true)
//     }
//   return updateAvailable ? (
//     <div className='fixed bottom-4 left-4 bg-yellow-300 text-black p-3 rounded shadow'>
//         <p>New version available!</p>
//         <button onClick={handleRefresh} className='mt-2 px-3 py-1 bg-blue-600 text-white rounded'>Update</button>
//     </div>
//   ) : null
// }