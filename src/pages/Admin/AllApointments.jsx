// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import { useState } from 'react'

// const Allappointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } =
//     useContext(AdminContext)
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments()
//     }
//   }, [aToken])

//   const { uploadLabReport, fetchLabReports } = useContext(AdminContext)
// const [selectedFile, setSelectedFile] = useState(null)

// const handleFileChange = e => {
//   setSelectedFile(e.target.files[0])
// }

// const handleUpload = (appointmentId, userId) => {
//   if (selectedFile) {
//     uploadLabReport(selectedFile, appointmentId, userId)
//     setSelectedFile(null)
//   } else {
//     toast.error('No file selected')
//   }
// }


//   return (
//     <div className='w-full max-w-6xl m-5'>
//       <p className='mb-3 text-lg font-medium'>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b '>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//           <p>Lab Reports</p>
//         </div>
//         {appointments.map((item, index) => (
//           <div
//             className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
//             key={index}
//           >
//             <p className='max-sm:hidden'>{index + 1}</p>
//             <div className='flex items-center gap-2'>
//               <img
//                 className='w-8 rounded-full'
//                 src={item.userData.image}
//                 alt=''
//               />{' '}
//               <p>{item.userData.name}</p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>
//               {slotDateFormat(item.slotDate)},{item.slotTime}
//             </p>
//             <div className='flex items-center gap-2'>
//               <img
//                 className='w-8 rounded-full bg-gray-200'
//                 src={item.docData.image}
//                 alt=''
//               />{' '}
//               <p>{item.docData.name}</p>
//             </div>
//             <p>
//               {currency}
//               {item.amount}
//             </p>
//             {item.cancelled ? (
//               <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className='text-green-400 text-xs font-medium'>completed</p>
//             ) : (
//               <img
//                 onClick={() => cancelAppointment(item._id)}
//                 className='w-10 cursor-pointer'
//                 src={assets.cancel_icon}
//                 alt=''
//               />
//             )}
//             ;<div className='flex flex-col gap-1'>
//   <label className='text-xs'>Upload Report</label>
//   <input type='file' onChange={handleFileChange} className='text-xs' />
//   <button
//     className='text-blue-500 underline text-xs'
//     onClick={() => handleUpload(item._id, item.userId)}
//   >
//     Upload
//   </button>
// </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Allappointments
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Allappointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
    uploadLabReport
  } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  const [uploaded, setUploaded] = useState({})

  const [selectedFile, setSelectedFile] = useState({})
  const [reportType, setReportType] = useState({})

const handleFileChange = (e, appointmentId) => {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    return toast.error('File too large (max 5MB)')
  }

  setSelectedFile({ ...selectedFile, [appointmentId]: file })
}

  const handleTypeChange = (e, appointmentId) => {
    setReportType({ ...reportType, [appointmentId]: e.target.value })
  }

const handleUpload = async (appointmentId, userId) => {
  const file = selectedFile[appointmentId]
  const type = reportType[appointmentId]

  if (!file || !type) {
    return toast.error('Please select a file and report type')
  }

  const res = await uploadLabReport(file, appointmentId, userId, type)

  if (res.success) {
    toast.success('Lab report uploaded')
    setUploaded({ ...uploaded, [appointmentId]: true })

    setSelectedFile({ ...selectedFile, [appointmentId]: null })
    setReportType({ ...reportType, [appointmentId]: '' })
  } else {
    toast.error(res.message || 'Upload failed')
  }
}
const [labReports, setLabReports] = useState({})

const loadReports = async () => {
  const reportsMap = {}
  for (const item of appointments) {
    const reports = await fetchLabReports(item.userData._id)
    reportsMap[item._id] = reports.filter(r => r.appointmentId === item._id)
  }
  setLabReports(reportsMap)
}


console.log(appointments)

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* Grid Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr_3fr] py-3 px-6 border-b font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Lab Reports</p>
        </div>

        {/* Appointments List */}
        {appointments.map((item, index) => (
          
          <div
            key={index}
            className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr_3fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50 gap-2'
          >
            <p className='max-sm:w-full text-sm'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={item.userData.image}
                alt='user'
              />
              <p className='truncate'>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className='max-sm:w-full text-sm'>
              {calculateAge(item.userData.dob)}
            </p>

            {/* Slot */}
            <p className='max-sm:w-full text-sm'>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full object-cover bg-gray-200'
                src={item.docData.image}
                alt='doctor'
              />
              <p className='truncate'>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className='text-sm'>
              {currency}
              {item.amount}
            </p>

            {/* Status or Cancel */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-semibold'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-semibold'>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-6 cursor-pointer'
                src={assets.cancel_icon}
                alt='Cancel'
              />
            )}

            {/* Lab Report Upload */}
            <div className='flex flex-col gap-1'>
              <select
                className='text-xs border px-1 py-0.5 rounded'
                onChange={e => handleTypeChange(e, item._id)}
                value={reportType[item._id] || ''}
              >
                <option value=''>Select Type</option>
                <option value='Blood Test'>Blood Test</option>
                <option value='Urine Test'>Urine Test</option>
                <option value='X-Ray'>X-Ray</option>
                <option value='MRI'>MRI</option>
              </select>

              <input
                type='file'
                className='text-xs file:border-0 file:py-1 file:px-2 file:bg-blue-100 file:text-blue-800 rounded'
                onChange={e => handleFileChange(e, item._id)}
              />

              <button
                onClick={() => handleUpload(item._id, item.userData._id)}
                className='bg-blue-500 text-white rounded px-2 py-1 text-xs mt-1 hover:bg-blue-600 transition'
              >
                Upload
              </button>
            </div>
          </div>
        ))}
       

      </div>
    </div>
  )
}

export default Allappointments
