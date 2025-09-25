import axios from 'axios'
import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export const PrescriptionContext = createContext()

const PrescriptionContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '')
  const [prescriptions, setPrescriptions] = useState([])

  // 🔹 Fetch all prescriptions (doctor-specific or patient-specific depending on role)
  const getPrescriptions = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/prescriptions`,
        {
          headers: { dToken }
        }
      )
      if (data.success) {
        setPrescriptions(data.prescriptions)
        console.log(data.prescriptions)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  // 🔹 Create and save a prescription (doctor submitting for a patient)
  const createPrescription = async prescriptionData => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/create-prescription`,
        prescriptionData,
        {
          headers: { dToken }
        }
      )

      if (data.success) {
        toast.success('Prescription created')
        getPrescriptions()
        return data.prescription // ✅ Return the prescription

      } else {
        toast.error(data.message)
        return null

      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
      return null

    }
  }

  // 🔹 View prescription by appointment or patient ID
  const getPrescriptionByPatient = async patientId => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/prescription/${patientId}`,
        {
          headers: { dToken }
        }
      )
      if (data.success) {
        return data.prescription
      } else {
        toast.error(data.message)
        return null
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
      return null
    }
  }
  // prescriptionController.js


// const getPrescriptionsByUser = async (req, res) => {
//   const { userId } = req.params

//   try {
//     const prescriptions = await PrescriptionModel.find({
//       patientId: new mongoose.Types.ObjectId(userId)
//     }).sort({ createdAt: -1 })

//     res.json({ success: true, prescriptions })
//   } catch (error) {
//     console.error('Error fetching prescriptions:', error)
//     res
//       .status(500)
//       .json({ success: false, message: 'Error fetching prescriptions' })
//   }
// }
const getPrescriptionsByUser = async userId => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/doctor/prescriptions/${userId}`,
      {
        headers: { dToken }
      }
    )
    if (data.success) {
      return data.prescriptions
    } else {
      toast.error(data.message)
      return []
    }
  } catch (error) {
    console.error(error)
    toast.error(error.message)
    return []
  }
}



  const value = {
    prescriptions,
    getPrescriptions,
    createPrescription,
    getPrescriptionByPatient,
    getPrescriptionsByUser

  }

  return (
    <PrescriptionContext.Provider value={value}>
      {children}
    </PrescriptionContext.Provider>
  )
}

export default PrescriptionContextProvider
