import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const PrescriptionMenu = ({ appointmentId, userId }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigate = path => {
    navigate(path)
    setShowMenu(false)
  }

  return (
    <div className='relative' ref={menuRef}>
      <img
        src={assets.prescription_icon}
        alt='Prescription'
        className='w-6 h-6 cursor-pointer ml-2'
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10'>
          <button
            className='block w-full text-left px-4 py-2 hover:bg-gray-100'
            onClick={() =>
              handleNavigate(`/create-prescription/${appointmentId}`)
            }
          >
            ➕ Create Prescription
          </button>
          <button
            className='block w-full text-left px-4 py-2 hover:bg-gray-100'
            onClick={() => handleNavigate(`/lab-reports/${userId}`)}
          >
            🧪 Lab Reports
          </button>
          <button
            className='block w-full text-left px-4 py-2 hover:bg-gray-100'
            onClick={() => handleNavigate(`/prescriptions/${userId}`)}
          >
            📜 Past Prescriptions
          </button>
        </div>
      )}
    </div>
  )
}

export default PrescriptionMenu
