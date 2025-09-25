import axios from 'axios'
import {createContext, useState} from 'react'
import { toast } from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider =(props)=>{
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])
    // const backendUrl=import.meta.env.BAC
    const [dashData,setDashData]=useState(false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () =>{

        try{
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch (error){
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }

        }catch (error){
            toast.error(error.message)
        }
    }

     const getAllAppointments = async() =>{
       try {
        const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
        

        if(data.success){
          setAppointments(data.appointments)
          console.log(data.appointments)
        } else{
          toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
       }
    }

 const cancelAppointment= async (appointmentId) =>{
      try {

        const {data}=await axios.post(backendUrl+ '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}} )

        if(data.success){
          toast.success(data.message)
          getAllAppointments()
        }else{
          toast.error(data.message)
        }
        
      } catch (error) {
        toast.error(error.message)
      }
    }

     const getDashData=async ()=>{
        try {
          
          const {data}=await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
           if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData);
            
           }else{
                toast.error(data.message)
           }
        } catch (error) {
          toast.error(error.message)
        }
     }

const uploadLabReport = async (file, appointmentId, userId, reportType) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('appointmentId', appointmentId)
    formData.append('patientId', userId)
    formData.append('reportType', reportType)

    const res = await axios.post(
      'https://medease-backend-6bcx.onrender.com/api/admin/upload-lab-report',
      formData,
      {
        headers: {
          aToken,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return res.data // ✅ So the frontend can check success or error
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Upload failed' }
  }
}



const fetchLabReports = async (userId) => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/admin/lab-reports/${userId}`,
      {
        headers: { aToken }
      }
    )
    if (data.success) {
      return data.reports
    } else {
      toast.error(data.message)
      return []
    }
  } catch (err) {
    toast.error(err.message)
    return []
  }
}


   const value ={
     aToken,setAToken,
     backendUrl,doctors,
     getAllDoctors,changeAvailability,
     appointments,setAppointments,
     getAllAppointments,
    cancelAppointment,
    dashData,getDashData,
    uploadLabReport,
fetchLabReports

     
   }
  return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider