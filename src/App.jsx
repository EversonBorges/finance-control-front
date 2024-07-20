import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { SummaryProvider } from './contexts/SummaryContext'
import { MonthDetailsProvider } from './contexts/MonthDetailsContext'

function App() {
  return (
    <SummaryProvider>
      <MonthDetailsProvider>
        <Navbar />
        <Outlet />
      </MonthDetailsProvider>
    </SummaryProvider>
  )
}

export default App
