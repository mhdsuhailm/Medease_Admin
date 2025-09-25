import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import PrescriptionContextProvider from './context/PrescriptionContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <PrescriptionContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </PrescriptionContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
