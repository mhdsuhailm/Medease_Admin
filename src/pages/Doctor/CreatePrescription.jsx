// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// const BASE_URL = import.meta.env.VITE_BACKEND_URL


// const CreatePrescription = () => {

//   const [patientId, setPatientId] = useState('')

// // Fetch appointment details to get patientId if needed
// useEffect(() => {
//   axios
//     .get(`${BASE_URL}/api/appointments/${appointmentId}`)
//     .then(res => {
//       setPatientId(res.data.patientId) // adjust depending on your response structure
//     })
//     .catch(err => console.log(err))
// }, [])



//   const { appointmentId } = useParams()

//   const [medicines, setMedicines] = useState([])
//   const [form, setForm] = useState({
//     name: '',
//     days: '',
//     dosage: '',
//     food: 'Before'
//   })

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const addMedicine = () => {
//     setMedicines([...medicines, form])
//     setForm({ name: '', days: '', dosage: '', food: 'Before' })
//   }

//   const handleSubmit = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/prescription/create`, {
//         appointmentId,
//         medicines
//       })
//       alert('Prescription saved')
//     } catch (err) {
//       console.log(err)
//       alert('Failed to save')
//     }
//   }

//   return (
//     <div className='p-5 max-w-3xl mx-auto'>
//       <h2 className='text-xl font-bold mb-4'>Create Prescription</h2>

//       <div className='grid gap-3'>
//         <input
//           name='name'
//           value={form.name}
//           onChange={handleChange}
//           placeholder='Medicine Name'
//           className='border p-2'
//         />
//         <input
//           name='days'
//           value={form.days}
//           onChange={handleChange}
//           placeholder='Number of Days'
//           className='border p-2'
//         />
//         <input
//           name='dosage'
//           value={form.dosage}
//           onChange={handleChange}
//           placeholder='Dosage Frequency (e.g., 1-0-1)'
//           className='border p-2'
//         />
//         <select
//           name='food'
//           value={form.food}
//           onChange={handleChange}
//           className='border p-2'
//         >
//           <option value='Before'>Before Food</option>
//           <option value='After'>After Food</option>
//         </select>

//         <button
//           onClick={addMedicine}
//           className='bg-blue-500 text-white px-4 py-2 rounded'
//         >
//           Add Medicine
//         </button>
//       </div>

//       <div className='mt-5'>
//         <h3 className='font-semibold'>Medicines List</h3>
//         <ul className='list-disc pl-5'>
//           {medicines.map((med, index) => (
//             <li
//               key={index}
//             >{`${med.name}, ${med.days} days, ${med.dosage}, ${med.food} food`}</li>
//           ))}
//         </ul>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className='mt-5 bg-green-600 text-white px-4 py-2 rounded'
//       >
//         Submit Prescription
//       </button>
//     </div>
//   )
// }

// export default CreatePrescription
// components/CreatePrescription.jsx
// import React, { useState, useContext, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { PrescriptionContext } from '../../context/PrescriptionContext'
// import { DoctorContext } from '../../context/DoctorContext'

// const CreatePrescription = () => {
//   const { appointmentId } = useParams()
//   const { createPrescription } = useContext(PrescriptionContext)
//   const { appointments } = useContext(DoctorContext)
//   const {dToken,profileData, setProfileData, getProfileData ,backendUrl}= useContext(DoctorContext)
//   console.log(dToken)
//   const [appointment, setAppointment] = useState(null)
//   const [medicines, setMedicines] = useState([
//     { name: '', dosage: '', frequency: '', duration: '' }
//   ])
//   const [advice, setAdvice] = useState('')

//   useEffect(() => {
//     const selectedAppointment = appointments.find(
//       appt => appt._id === appointmentId
//     )
//     setAppointment(selectedAppointment)
//   }, [appointments, appointmentId])

//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicines = [...medicines]
//     updatedMedicines[index][field] = value
//     setMedicines(updatedMedicines)
//   }

//   const addMedicine = () => {
//     setMedicines([
//       ...medicines,
//       { name: '', dosage: '', frequency: '', duration: '' }
//     ])
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     if (!appointment) {
//       toast.error('Appointment not found')
//       return
//     }

//     const prescriptionData = {
//       appointmentId,
//       patientId: appointment.userData._id,
//       medicines,
//       advice,
//       fees: appointment.amount
//     }

//     createPrescription(prescriptionData)
//   }

//   if (!appointment) {
//     return <p>Loading appointment details...</p>
//   }

// //   return (
// //     <div className='create-prescription'>
// //       <h2>Create Prescription for {appointment.userData.name}</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// // <label>Doctor: {profileData?.name}</label>

// //           {/* <label>Doctor: {appointment.doctorData.name}</label> */}
// //         </div>
// //         <div>
// //           <label>Fees: {appointment.amount}</label>
// //         </div>
// //         {medicines.map((med, index) => (
// //           <div key={index}>
// //             <input
// //               type='text'
// //               placeholder='Medicine Name'
// //               value={med.name}
// //               onChange={e =>
// //                 handleMedicineChange(index, 'name', e.target.value)
// //               }
// //               required
// //             />
// //             <input
// //               type='text'
// //               placeholder='Dosage'
// //               value={med.dosage}
// //               onChange={e =>
// //                 handleMedicineChange(index, 'dosage', e.target.value)
// //               }
// //               required
// //             />
// //             <input
// //               type='text'
// //               placeholder='Frequency'
// //               value={med.frequency}
// //               onChange={e =>
// //                 handleMedicineChange(index, 'frequency', e.target.value)
// //               }
// //               required
// //             />
// //             <input
// //               type='text'
// //               placeholder='Duration'
// //               value={med.duration}
// //               onChange={e =>
// //                 handleMedicineChange(index, 'duration', e.target.value)
// //               }
// //               required
// //             />
// //           </div>
// //         ))}
// //         <button type='button' onClick={addMedicine}>
// //           Add Medicine
// //         </button>
// //         <div>
// //           <textarea
// //             placeholder='Advice'
// //             value={advice}
// //             onChange={e => setAdvice(e.target.value)}
// //           ></textarea>
// //         </div>
// //         <button type='submit'>Create Prescription</button>
// //       </form>
// //     </div>
// //   )
// return (
//   <div className='max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10'>
//     <h2 className='text-2xl font-bold mb-6 text-center'>
//       Create Prescription for {appointment.userData.name}
//     </h2>
//     <form onSubmit={handleSubmit} className='space-y-4'>
//       <div className='text-lg'>
//         <label className='font-semibold'>Doctor: </label>
//         <span>{profileData?.name}</span>
//       </div>
//       <div className='text-lg'>
//         <label className='font-semibold'>Fees: </label>
//         <span>{appointment.amount}</span>
//       </div>

//       {medicines.map((med, index) => (
//         <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//           <input
//             type='text'
//             placeholder='Medicine Name'
//             value={med.name}
//             onChange={e => handleMedicineChange(index, 'name', e.target.value)}
//             className='p-2 border border-gray-300 rounded-md'
//             required
//           />
//           <input
//             type='text'
//             placeholder='Dosage'
//             value={med.dosage}
//             onChange={e =>
//               handleMedicineChange(index, 'dosage', e.target.value)
//             }
//             className='p-2 border border-gray-300 rounded-md'
//             required
//           />
//           <input
//             type='text'
//             placeholder='Frequency'
//             value={med.frequency}
//             onChange={e =>
//               handleMedicineChange(index, 'frequency', e.target.value)
//             }
//             className='p-2 border border-gray-300 rounded-md'
//             required
//           />
//           <input
//             type='text'
//             placeholder='Duration'
//             value={med.duration}
//             onChange={e =>
//               handleMedicineChange(index, 'duration', e.target.value)
//             }
//             className='p-2 border border-gray-300 rounded-md'
//             required
//           />
//         </div>
//       ))}

//       <button
//         type='button'
//         onClick={addMedicine}
//         className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
//       >
//         Add Medicine
//       </button>

//       <div>
//         <textarea
//           placeholder='Advice'
//           value={advice}
//           onChange={e => setAdvice(e.target.value)}
//           className='w-full p-2 border border-gray-300 rounded-md'
//         ></textarea>
//       </div>

//       <button
//         type='submit'
//         className='w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700'
//       >
//         Create Prescription
//       </button>
//     </form>
//   </div>
// )

// }

// // export default CreatePrescription
// import React, { useState, useContext, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { PrescriptionContext } from '../../context/PrescriptionContext'
// import { DoctorContext } from '../../context/DoctorContext'
// import { toast } from 'react-hot-toast'

// const CreatePrescription = () => {
//   const { appointmentId } = useParams()
//   const { createPrescription } = useContext(PrescriptionContext)
//   const { appointments, dToken, profileData, backendUrl } =
//     useContext(DoctorContext)

//   const [appointment, setAppointment] = useState(null)
//   const [medicines, setMedicines] = useState([
//     { name: '', dosage: '', frequency: '', duration: '', timing: '' }
//   ])
//   const [advice, setAdvice] = useState('')

//   useEffect(() => {
//     const selectedAppointment = appointments.find(
//       appt => appt._id === appointmentId
//     )
//     setAppointment(selectedAppointment)
//   }, [appointments, appointmentId])

//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicines = [...medicines]
//     updatedMedicines[index][field] = value
//     setMedicines(updatedMedicines)
//   }


//   const downloadPrescription = async id => {
//   try {
//     const response = await fetch(
//       `http://localhost:4000/api/prescriptions/pdf/${id}`
//     )

//     if (!response.ok) throw new Error('Failed to download')

//     const blob = await response.blob()
//     const url = window.URL.createObjectURL(blob)
//     const link = document.createElement('a')
//     link.href = url
//     link.download = `prescription_${id}.pdf`
//     link.click()
//     window.URL.revokeObjectURL(url)
//   } catch (error) {
//     console.error('Download error:', error)
//   }
// }


//   const addMedicine = () => {
//     setMedicines([
//       ...medicines,
//       { name: '', dosage: '', frequency: '', duration: '', timing: '' }
//     ])
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     if (!appointment) {
//       toast.error('Appointment not found')
//       return
//     }

//     const prescriptionData = {
//       appointmentId,
//       patientId: appointment.userData._id,
//       medicines,
//       advice,
//       fees: appointment.amount
//     }

//     await createPrescription(prescriptionData)
//   }

//   if (!appointment) {
//     return <p className='text-center mt-10'>Loading appointment details...</p>
//   }

//   return (
//     <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10'>
//       <h2 className='text-2xl font-semibold mb-6 text-center'>
//         Create Prescription for {appointment.userData.name}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label className='block font-medium'>Doctor:</label>
//           <p>{profileData.name}</p>
//         </div>
//         <div className='mb-4'>
//           <label className='block font-medium'>Fees:</label>
//           <p>₹{appointment.amount}</p>
//         </div>

//         {medicines.map((med, index) => (
//           <div
//             key={index}
//             className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-4'
//           >
//             <input
//               type='text'
//               placeholder='Medicine Name'
//               value={med.name}
//               onChange={e =>
//                 handleMedicineChange(index, 'name', e.target.value)
//               }
//               className='border px-3 py-2 rounded w-full'
//               required
//             />
//             <input
//               type='text'
//               placeholder='Dosage (e.g. 500mg)'
//               value={med.dosage}
//               onChange={e =>
//                 handleMedicineChange(index, 'dosage', e.target.value)
//               }
//               className='border px-3 py-2 rounded w-full'
//               required
//             />
//             <input
//               type='text'
//               placeholder='Frequency (e.g. 1-0-1)'
//               value={med.frequency}
//               onChange={e =>
//                 handleMedicineChange(index, 'frequency', e.target.value)
//               }
//               className='border px-3 py-2 rounded w-full'
//               required
//             />
//             <input
//               type='text'
//               placeholder='Duration (e.g. 5 days)'
//               value={med.duration}
//               onChange={e =>
//                 handleMedicineChange(index, 'duration', e.target.value)
//               }
//               className='border px-3 py-2 rounded w-full'
//               required
//             />
//             <select
//               value={med.timing}
//               onChange={e =>
//                 handleMedicineChange(index, 'timing', e.target.value)
//               }
//               className='border px-3 py-2 rounded w-full'
//               required
//             >
//               <option value=''>Select Timing</option>
//               <option value='Before Food'>Before Food</option>
//               <option value='After Food'>After Food</option>
//             </select>
//           </div>
//         ))}

//         <div className='flex justify-end mb-6'>
//           <button
//             type='button'
//             onClick={addMedicine}
//             className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
//           >
//             Add Medicine
//           </button>
//         </div>

//         <h3 className='text-lg font-semibold mb-2'>Medicines Table</h3>
//         <table className='w-full table-auto border border-gray-300 mb-6'>
//           <thead className='bg-gray-100'>
//             <tr>
//               <th className='border px-2 py-1'>Name</th>
//               <th className='border px-2 py-1'>Dosage</th>
//               <th className='border px-2 py-1'>Frequency</th>
//               <th className='border px-2 py-1'>Duration</th>
//               <th className='border px-2 py-1'>Timing</th>
//             </tr>
//           </thead>
//           <tbody>
//             {medicines.map((med, index) => (
//               <tr key={index}>
//                 <td className='border px-2 py-1'>{med.name}</td>
//                 <td className='border px-2 py-1'>{med.dosage}</td>
//                 <td className='border px-2 py-1'>{med.frequency}</td>
//                 <td className='border px-2 py-1'>{med.duration}</td>
//                 <td className='border px-2 py-1'>{med.timing}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className='mb-6'>
//           <textarea
//             placeholder='Advice for the patient (e.g., Drink plenty of water)'
//             value={advice}
//             onChange={e => setAdvice(e.target.value)}
//             className='w-full border px-3 py-2 rounded'
//           />
//         </div>

//         <div className='text-center'>
//           <button
//             type='submit'
//             className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'
//           >
//             Save Prescription
//           </button>
//         </div>
//         <button onClick={() => downloadPrescription(prescription._id)}>
//   Download Prescription
// </button>

//       </form>
//     </div>
//   )
// }

// export default CreatePrescription
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PrescriptionContext } from '../../context/PrescriptionContext'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const CreatePrescription = () => {
  const { appointmentId } = useParams()
  const { createPrescription } = useContext(PrescriptionContext)
  const { appointments, dToken, profileData } = useContext(DoctorContext)

  const [appointment, setAppointment] = useState(null)
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '', duration: '', timing: '' }
  ])
  const [advice, setAdvice] = useState('')
  const [prescriptionId, setPrescriptionId] = useState(null)

  useEffect(() => {
    const selectedAppointment = appointments.find(
      appt => appt._id === appointmentId
    )
    setAppointment(selectedAppointment)
  }, [appointments, appointmentId])

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines]
    updatedMedicines[index][field] = value
    setMedicines(updatedMedicines)
  }


//   const downloadPrescription = async (id) => {
//   try {
//     const response = await fetch(
//       `http://localhost:4000/api/prescriptions/pdf/${id}`,
//       {
//         method: 'GET'
//       }
//     )

//     if (!response.ok) {
//       throw new Error('Failed to download')
//     }

//     const blob = await response.blob()
//     const url = window.URL.createObjectURL(blob)

//     const link = document.createElement('a')
//     link.href = url
//     link.setAttribute('download', `prescription_${id}.pdf`)
//     document.body.appendChild(link)
//     link.click()

//     // Cleanup
//     document.body.removeChild(link)
//     window.URL.revokeObjectURL(url)

//     toast.success('Prescription downloaded successfully')
//   } catch (error) {
//     console.error('Download error:', error)
//     toast.error('Failed to download prescription')
//   }
// }
const downloadPrescription = async (prescriptionId) => {
  if (!prescriptionId) {
    console.error('Invalid prescription ID')
    return
  }

  try {
    const response = await axios.get(
      `https://medease-backend-6bcx.onrender.com/api/prescriptions/pdf/${prescriptionId}`,
      {
        responseType: 'blob'
      }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `prescription_${prescriptionId}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Download error:', error)
  }
}


  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: '', dosage: '', frequency: '', duration: '', timing: '' }
    ])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!appointment) {
      toast.error('Appointment not found')
      return
    }

    const prescriptionData = {
      appointmentId,
      patientId: appointment.userData._id,
      medicines,
      advice,
      fees: appointment.amount
    }

    try {
      const response = await createPrescription(prescriptionData)
      if (response && response._id) {
        setPrescriptionId(response._id)
        toast.success('Prescription created successfully')
              await downloadPrescription(response._id) // ✅ Download after creation

      }
    } catch (error) {
      toast.error('Failed to create prescription')
    }
  }

  if (!appointment) {
    return <p className='text-center mt-10'>Loading appointment details...</p>
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10'>
      <h2 className='text-2xl font-semibold mb-6 text-center'>
        Create Prescription for {appointment.userData.name}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block font-medium'>Doctor:</label>
          <p>{profileData.name}</p>
        </div>
        <div className='mb-4'>
          <label className='block font-medium'>Fees:</label>
          <p>₹{appointment.amount}</p>
        </div>

        {medicines.map((med, index) => (
          <div
            key={index}
            className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-4'
          >
            <input
              type='text'
              placeholder='Medicine Name'
              value={med.name}
              onChange={e =>
                handleMedicineChange(index, 'name', e.target.value)
              }
              className='border px-3 py-2 rounded w-full'
              required
            />
            <input
              type='text'
              placeholder='Dosage (e.g. 500mg)'
              value={med.dosage}
              onChange={e =>
                handleMedicineChange(index, 'dosage', e.target.value)
              }
              className='border px-3 py-2 rounded w-full'
              required
            />
            <input
              type='text'
              placeholder='Frequency (e.g. 1-0-1)'
              value={med.frequency}
              onChange={e =>
                handleMedicineChange(index, 'frequency', e.target.value)
              }
              className='border px-3 py-2 rounded w-full'
              required
            />
            <input
              type='text'
              placeholder='Duration (e.g. 5 days)'
              value={med.duration}
              onChange={e =>
                handleMedicineChange(index, 'duration', e.target.value)
              }
              className='border px-3 py-2 rounded w-full'
              required
            />
            <select
              value={med.timing}
              onChange={e =>
                handleMedicineChange(index, 'timing', e.target.value)
              }
              className='border px-3 py-2 rounded w-full'
              required
            >
              <option value=''>Select Timing</option>
              <option value='Before Food'>Before Food</option>
              <option value='After Food'>After Food</option>
            </select>
          </div>
        ))}

        <div className='flex justify-end mb-6'>
          <button
            type='button'
            onClick={addMedicine}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Add Medicine
          </button>
        </div>

        <h3 className='text-lg font-semibold mb-2'>Medicines Table</h3>
        <table className='w-full table-auto border border-gray-300 mb-6'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border px-2 py-1'>Name</th>
              <th className='border px-2 py-1'>Dosage</th>
              <th className='border px-2 py-1'>Frequency</th>
              <th className='border px-2 py-1'>Duration</th>
              <th className='border px-2 py-1'>Timing</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => (
              <tr key={index}>
                <td className='border px-2 py-1'>{med.name}</td>
                <td className='border px-2 py-1'>{med.dosage}</td>
                <td className='border px-2 py-1'>{med.frequency}</td>
                <td className='border px-2 py-1'>{med.duration}</td>
                <td className='border px-2 py-1'>{med.timing}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='mb-6'>
          <textarea
            placeholder='Advice for the patient (e.g., Drink plenty of water)'
            value={advice}
            onChange={e => setAdvice(e.target.value)}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div className='text-center'>
          <button
            type='submit'
            className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'
          >
            Save Prescription
          </button>
        </div>

     
          {/* <div className='text-center mt-4'>
            <button
              type='button'
              onClick={() => downloadPrescription(prescriptionId)}
              className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
            >
              Download Prescription
            </button>
          </div> */}
       {
  prescriptionId && (
    <div className='text-center mt-4'>
      <button
        type='button'
        onClick={() => downloadPrescription(prescriptionId)}
        className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
      >
        Download Prescription
      </button>
    </div>
  )
}


        
      </form>
    </div>
  )
}

export default CreatePrescription
