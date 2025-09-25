// // PastPrescriptions.js
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'

// const PastPrescriptions = () => {
//   const { userId } = useParams() // Access the userId from the URL
//   const [prescriptions, setPrescriptions] = useState([])

// //   useEffect(() => {
// //     const fetchPrescriptions = async () => {
// //       try {
// //         const response = await axios.get(
// //           `/api/doctor/prescriptions/${userId}` // Updated API endpoint
// //         )
// //         console.log('Fetched prescription response:', response.data)

// //         setPrescriptions(response.data.prescriptions) // Assuming response contains an array of prescriptions
// //       } catch (error) {
// //         console.error('Error fetching prescriptions:', error)
// //       }
// //     }
// useEffect(() => {
//   const fetchPrescriptions = async () => {
//     try {
// const response = await axios.get(
//   `http://localhost:4000/api/doctor/prescriptions/${userId}`
// )
//       const data = response.data

//       if (data && data.success && Array.isArray(data.prescriptions)) {
//         setPrescriptions(response.data.prescriptions)
//       } else {
//         setPrescriptions([]) // fallback if not an array
//       }
//     } catch (error) {
//       console.error('Error fetching prescriptions:', error)
//       setPrescriptions([]) // fallback on error
//     }
//   }

//   fetchPrescriptions()
// }, [userId])


//   return (
//     <div className='container mx-auto p-4'>
//       <h2 className='text-2xl font-bold mb-4'>Past Prescriptions</h2>
//       {prescriptions.length > 0 ? (
//         <div className='space-y-4'>
//           {prescriptions.map((prescription, index) => (
//             <div key={index} className='border-b pb-4'>
//               <h3 className='text-xl font-semibold'>
//                 Prescription {index + 1}
//               </h3>
//               <p>
//                 <strong>Doctor:</strong> {prescription.doctorName}
//               </p>
//               <p>
//                 <strong>Date:</strong>{' '}
//                 {new Date(prescription.createdAt).toLocaleDateString()}
//               </p>
//               <div className='mt-2'>
//                 <h4 className='font-semibold'>Medicines:</h4>
//                 <ul className='space-y-2'>
//                   {prescription.medicines.map((medicine, idx) => (
//                     <li key={idx} className='bg-gray-100 p-2 rounded'>
//                       <p>
//                         <strong>Medicine:</strong> {medicine.name}
//                       </p>
//                       <p>
//                         <strong>Dosage:</strong> {medicine.dosage}
//                       </p>
//                       <p>
//                         <strong>Frequency:</strong> {medicine.frequency}
//                       </p>
//                       <p>
//                         <strong>Before/After Food:</strong>{' '}
//                         {medicine.timing === 'Before Food' ? 'Before' : 'After'}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No prescriptions found for this user.</p>
//       )}
//     </div>
//   )
// }
//  export default PastPrescriptions
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'

// const PastPrescriptions = () => {
//   const { userId } = useParams()
//   const [prescriptions, setPrescriptions] = useState([])

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/doctor/prescriptions/${userId}`
//         )
//         const data = response.data

//         if (data && data.success && Array.isArray(data.prescriptions)) {
//           setPrescriptions(data.prescriptions)
//         } else {
//           setPrescriptions([])
//         }
//       } catch (error) {
//         console.error('Error fetching prescriptions:', error)
//         setPrescriptions([])
//       }
//     }

//     fetchPrescriptions()
//   }, [userId])

//   return (
//     <div className='container mx-auto p-4'>
//       <h2 className='text-2xl font-bold mb-4'>Past Prescriptions</h2>
//       {prescriptions.length > 0 ? (
//         <div className='space-y-6'>
//           {prescriptions.map((prescription, index) => (
//             <div key={index} className='border-b pb-4'>
//               <h3 className='text-xl font-semibold'>
//                 Prescription {index + 1}
//               </h3>

//               {/* Doctor Info */}
//               <div className='flex items-center gap-4 mt-2'>
//                 {/* <img
//                   src={prescription.doctorId?.image || '/default-doctor.png'}
//                   alt='Doctor'
//                   className='w-16 h-16 rounded-full object-cover'
//                 /> */}
//                 {/* <div>
//                   <p className='font-semibold text-lg'>
//                     {prescription.doctorId?.name || 'N/A'}
//                   </p>
//                   <p className='text-sm text-gray-600'>
//                     {prescription.doctorId?.degree || 'N/A'} -{' '}
//                     {prescription.doctorId?.speciality || 'N/A'}
//                   </p>
//                   <p className='text-sm text-gray-500'>
//                     {prescription.doctorId?.experience || 0} years experience
//                   </p>
//                 </div> */}
//               </div>

//               <p className='mt-2'>
//                 <strong>Date:</strong>{' '}
//                 {new Date(prescription.createdAt).toLocaleDateString()}
//               </p>

//               {/* Medicine Table */}
//               <div className='mt-2'>
//                 <h4 className='font-semibold'>Medicines:</h4>
//                 <ul className='space-y-2'>
//                   {prescription.medicines?.length > 0 ? (
//                     prescription.medicines.map((medicine, idx) => (
//                       <li key={idx} className='bg-gray-100 p-2 rounded'>
//                         <p>
//                           <strong>Medicine:</strong> {medicine.name}
//                         </p>
//                         <p>
//                           <strong>Dosage:</strong> {medicine.dosage}
//                         </p>
//                         <p>
//                           <strong>Frequency:</strong> {medicine.frequency}
//                         </p>
//                         <p>
//                           <strong>Before/After Food:</strong> {medicine.timing}
//                         </p>
//                       </li>
//                     ))
//                   ) : (
//                     <li>No medicines listed</li>
//                   )}
//                 </ul>
//               </div>

//               {/* PDF Button */}
//               <div className='mt-3'>
//                 <button
//                   className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
//                   onClick={() =>
//                     window.open(
//   `http://localhost:4000/api/prescriptions/pdf/${prescription._id}`,
//   '_blank'
// )
//                   }
//                 >
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No prescriptions found for this user.</p>
//       )}
//     </div>
//   )
// }

// export default PastPrescriptions
// import React, { useEffect, useState, useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import { PrescriptionContext } from '../context/PrescriptionContext'

// const PastPrescriptions = () => {
//   const { userId } = useParams()
//   const [prescriptions, setPrescriptions] = useState([])
//   const { getPrescriptionsByUser } = useContext(PrescriptionContext)

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       const result = await getPrescriptionsByUser(userId)
//       setPrescriptions(result || [])
//     }

//     fetchPrescriptions()
//   }, [userId])

//   return (
//     <div className='container mx-auto p-4'>
//       <h2 className='text-2xl font-bold mb-4'>Past Prescriptions</h2>
//       {prescriptions.length > 0 ? (
//         <div className='space-y-4'>
//           {prescriptions.map((prescription, index) => (
//             <div key={index} className='border-b pb-4'>
//               <h3 className='text-xl font-semibold'>
//                 Prescription {index + 1}
//               </h3>
//               <p>
//                 <strong>Doctor ID:</strong>{' '}
//                 {prescription.doctorId?.name || prescription.doctorId}
//               </p>
//               <p>
//                 <strong>Date:</strong>{' '}
//                 {new Date(prescription.createdAt).toLocaleDateString()}
//               </p>
//               <div className='mt-2'>
//                 <h4 className='font-semibold'>Medicines:</h4>
//                 <ul className='space-y-2'>
//                   {prescription.medicines.map((medicine, idx) => (
//                     <li key={idx} className='bg-gray-100 p-2 rounded'>
//                       <p>
//                         <strong>Medicine:</strong> {medicine.name}
//                       </p>
//                       <p>
//                         <strong>Dosage:</strong> {medicine.dosage}
//                       </p>
//                       <p>
//                         <strong>Frequency:</strong> {medicine.frequency}
//                       </p>
//                       <p>
//                         <strong>Before/After Food:</strong> {medicine.timing}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No prescriptions found for this user.</p>
//       )}
//     </div>
//   )
// }

// export default PastPrescriptions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PastPrescriptions = () => {
  const { userId } = useParams() // Access the userId from the URL
  const [prescriptions, setPrescriptions] = useState([])

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `https://medease-backend-6bcx.onrender.com/api/doctor/prescriptions/${userId}`
        )
        const data = response.data

        if (data && data.success && Array.isArray(data.prescriptions)) {
          setPrescriptions(data.prescriptions)
        } else {
          setPrescriptions([]) // fallback if not an array
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error)
        setPrescriptions([]) // fallback on error
      }
    }

    fetchPrescriptions()
  }, [userId])

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Past Prescriptions</h2>
      {prescriptions.length > 0 ? (
        <div className='space-y-4'>
          {prescriptions.map((prescription, index) => (
            <div key={index} className='border-b pb-4'>
              <h3 className='text-xl font-semibold'>
                Prescription {index + 1}
              </h3>
              {/* <p>
                <strong>Doctor:</strong> {prescription.doctorId?.name || 'N/A'}
              </p>
              <p>
                <strong>Specialty:</strong>{' '}
                {prescription.doctorId?.specialty || 'N/A'}
              </p>
              <p>
                <strong>Degree:</strong>{' '}
                {prescription.doctorId?.degree || 'N/A'}
              </p> */}
              <p>
                <strong>Date:</strong>{' '}
                {new Date(prescription.createdAt).toLocaleDateString()}
              </p>
              <div className='mt-2'>
                <h4 className='font-semibold'>Medicines:</h4>
                <ul className='space-y-2'>
                  {prescription.medicines?.length > 0 ? (
                    prescription.medicines.map((medicine, idx) => (
                      <li key={idx} className='bg-gray-100 p-2 rounded'>
                        <p>
                          <strong>Medicine:</strong> {medicine.name}
                        </p>
                        <p>
                          <strong>Dosage:</strong> {medicine.dosage}
                        </p>
                        <p>
                          <strong>Frequency:</strong> {medicine.frequency}
                        </p>
                        <p>
                          <strong>Before/After Food:</strong> {medicine.timing}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li>No medicines listed</li>
                  )}
                </ul>
              </div>
              <div className='mt-2'>
                <button
                  className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                  onClick={() =>
                    window.open(
  `https://medease-backend-6bcx.onrender.com/api/prescriptions/pdf/${prescription._id}`,
  '_blank'
)
                    
                  }
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No prescriptions found for this user.</p>
      )}
    </div>
  )
}

export default PastPrescriptions
