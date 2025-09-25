import React, {useContext, useState} from 'react'
import { AdminContext } from '../context/AdminContext'
// import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
const Login = () => {
    const [state,setState]=useState('Admin')
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken}=useContext(DoctorContext)

    const onSubmitHandler = async (event) =>{

        event.preventDefault()

        try{

            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
                if(data.success || data.sucess){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                    console.log(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{
               const {data}= await axios.post(backendUrl + '/api/doctor/login',{email,password})
               if(data.success || data.sucess){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
                console.log(data.token)
            }else{
                toast.error(data.message)
            }
            }
        }catch (error){

        }
      }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto '><span className='text-primary'>{state}</span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email}  type='email' required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password} type='password' required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
             {
                state === 'Admin'
                ? <p> Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
                : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
             }
        </div>
    </form>
  )
}

export default Login
// import React, {useContext, useState} from 'react'
// import { AdminContext } from '../context/AdminContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Login = () => {
//     const [state,setState]=useState('Admin')
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

//     const {setAToken,backendUrl} = useContext(AdminContext)
//     const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')


//     const onSubmitHandler = async (event) =>{

//         event.preventDefault()

//         try{

//             if(state === 'Admin'){
//                 const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
//                 if(data.success || data.sucess){
//                     localStorage.setItem('aToken',data.token)
//                     setAToken(data.token)
//                     console.log(data.token)
//                 }else{
//                     toast.error(data.message)
//                 }
//             }else{
//                 const {data} = await axios.post(backendUrl +'/api/doctor/login',{email,password})
//                 if(data.success || data.sucess){
//                     localStorage.setItem('dToken',data.token)
//                     setDToken(data.token)
//                     console.log(data.token)
//                 }else{
//                     toast.error(data.message)
//                 }
//             }


//         }catch (error){

//         }
//     }

//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//         <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//             <p className='text-2xl font-semibold m-auto '><span className='text-primary'>{state}</span>Login</p>
//             <div className='w-full'>
//                 <p>Email</p>
//                 <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1'  type='email' required/>
//             </div>
//             <div className='w-full'>
//                 <p>Password</p>
//                 <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required/>
//             </div>
//             <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
//              {
//                 state === 'Admin'
//                 ? <p> Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
//                 : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
//              }
//         </div>
//     </form>
//   )
// }

// export default Login

// import React, { useContext, useState } from 'react';
// import { AdminContext } from '../context/AdminContext';
// import axios from 'axios';

// const Login = () => {
//     const [state, setState] = useState('Admin');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const { setAToken, backendUrl } = useContext(AdminContext);

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();

//         try {
//             if (state === 'Admin') {
//                 const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

//                 // Log the full response to check structure
//                 console.log('Response data:', data);

//                 // Check for both success and sucess
//                 if (data.success || data.sucess) {
//                     console.log('Token:', data.token);
//                     setAToken(data.token);  // Assuming you want to store the token
//                 } else {
//                     console.error('Login failed:', data.message || 'Unknown error');  // Fallback if no message is present
//                 }
//             } else {
//                 // Handle Doctor login or other logic if needed
//             }
//         } catch (error) {
//             console.error('Error during login:', error.message);  // Log any errors encountered
//         }
//     };

//     return (
//         <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//             <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//                 <p className='text-2xl font-semibold m-auto '>
//                     <span className='text-primary'>{state}</span> Login
//                 </p>
//                 <div className='w-full'>
//                     <p>Email</p>
//                     <input 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         value={email} 
//                         className='border border-[#DADADA] rounded w-full p-2 mt-1'  
//                         type='email' 
//                         required 
//                     />
//                 </div>
//                 <div className='w-full'>
//                     <p>Password</p>
//                     <input 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         value={password} 
//                         className='border border-[#DADADA] rounded w-full p-2 mt-1' 
//                         type='password' 
//                         required 
//                     />
//                 </div>
//                 <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
//                 {
//                     state === 'Admin'
//                     ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
//                     : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
//                 }
//             </div>
//         </form>
//     );
// };

// export default Login;
