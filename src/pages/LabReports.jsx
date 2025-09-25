// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'

// const LabReports = () => {
//   const { userId } = useParams()
//   const [reports, setReports] = useState([])

//   // useEffect(() => {
//   //   const fetchReports = async () => {
//   //     try {
//   //       const res = await axios.get(`/api/labreport/${userId}`)
//   //       setReports(res.data)
//   //     } catch (err) {
//   //       console.error('Error fetching lab reports:', err)
//   //     }
//   //   }
//   //   fetchReports()
//   // }, [userId])

//   useEffect(() => {
//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(`/api/admin/lab-reports/${userId}`)
//       const reportsArray = Array.isArray(response.data.reports)
//         ? response.data.reports
//         : []

//       const sortedReports = reportsArray.sort(
//         (a, b) => new Date(b.date) - new Date(a.date)
//       )
//       setReports(sortedReports)
//     } catch (error) {
//       console.error('Failed to fetch lab reports', error)
//       setReports([]) // fallback to empty array
//     }
//   }

//   fetchReports()
// }, [userId])

//   return (
//     <div className='max-w-4xl mx-auto p-5'>
//       <h2 className='text-xl font-semibold mb-4'>Lab Reports</h2>
//       {reports.length === 0 ? (
//         <p>No lab reports found.</p>
//       ) : (
//         <div className='space-y-4'>
//           {reports.map((report, index) => (
//             <div
//               key={index}
//               className='border p-4 rounded shadow flex flex-col md:flex-row justify-between items-center'
//             >
//               <div>
//                 <p className='font-medium'>{report.reportType}</p>
//                 <p className='text-sm text-gray-500'>
//                   Uploaded on {new Date(report.uploadedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className='mt-2 md:mt-0 flex gap-3'>
//                 <a
//                   href={report.reportUrl}
//                   target='_blank'
//                   rel='noreferrer'
//                   className='text-blue-600 hover:underline'
//                 >
//                   View
//                 </a>
//                 <a
//                   href={report.reportUrl}
//                   download
//                   className='text-green-600 hover:underline'
//                 >
//                   Download
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default LabReports
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom' // get userId from URL

const LabReports = () => {
  const [reports, setReports] = useState([])
const { userId } = useParams() // 👈 gets the patient ID from route params

  // or from context



// useEffect(() => {
//   const fetchReports = async () => {
//     console.log('Frontend userId:', userId) // 👈 Add this
//     try {
//       const response = await axios.get(`/api/admin/lab-reports/${userId}`)
//       console.log('API response:', response.data) // 👈 Add this

//       const fetchedReports = response.data.reports
//       if (Array.isArray(fetchedReports)) {
//         setReports(fetchedReports)
//       } else {
//         setReports([])
//       }
//     } catch (error) {
//       console.error('Failed to fetch lab reports:', error)
//     }
//   }

//   if (userId) fetchReports()
// }, [userId])
useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `https://medease-backend-6bcx.onrender.com/api/admin/lab-reports/${userId}`
      )
      const data = response.data
      if (Array.isArray(data.reports)) {
        setReports(data.reports)
      } else {
        setReports([])
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    }
  }

  if (userId) fetchReports()
}, [userId])


  return (
    <div className='max-w-4xl mx-auto p-5'>
      <h2 className='text-xl font-semibold mb-4'>Lab Reports</h2>
      {Array.isArray(reports) && reports.length === 0 ? (
        <p>No lab reports found.</p>
      ) : (
        <ul className='space-y-4'>
          {reports.map((report, index) => (
            <li key={index} className='bg-white p-4 rounded shadow'>
              <p>
                <strong>Type:</strong> {report.reportType}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(report.uploadedAt).toLocaleDateString()}
              </p>
     <button
  onClick={() => {
    const safeUrl = `https://medease-backend-6bcx.onrender.com/uploads/lab-reports/${encodeURIComponent(
      report.filename
    )}`
    window.open(safeUrl, '_blank', 'noopener,noreferrer')
  }}
  className='text-blue-600 underline'
>
  View Report
</button>     
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LabReports
