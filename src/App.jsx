import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import {SummaryProvider} from './contexts/SummaryContext'

function App() {
  return (
    <SummaryProvider>
      <Navbar />
      <Outlet />
    </SummaryProvider>
  )
}

export default App
