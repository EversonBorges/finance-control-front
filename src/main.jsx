import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import Summary from './Routes/summary/Summary.jsx'
import MonthDetails from './Routes/summary/summaryMonth/MonthDetails.jsx'
import Revenues from './Routes/summary/summaryMonth/revenues/Revenues.jsx'
import Expenses from './Routes/summary/summaryMonth/expenses/Expenses.jsx'

const router = createBrowserRouter([{
    element: <App />,
    children: [
      {///cards
        path: "/",
        element: <Summary/>
      },
      {
        path: "/month-details/revenues/:year/:month",
        element: <Revenues/>
      },
      {
        path: "/month-details/investments/:year/:month",
        element: <Revenues/>
      },
      {
        path: "/month-details/credit-card/:year/:month",
        element: <Revenues/>
      },
      {
        path: "/month-details/expenses/:year/:month/:classification",
        element: <Expenses/>
      },
      {
        path: "/month-details/:month/:year",
        element: <MonthDetails/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router}/>
 // </React.StrictMode>,
)
