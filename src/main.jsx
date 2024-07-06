import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import CardRegister from './Routes/summary/CardRegister'
import Transaction from './Routes/summary/summaryMonth/revenues/Transaction.jsx'
import Cards from './Routes/summary/Summary.jsx'
import MonthDetails from './Routes/summary/summaryMonth/revenues/MonthDetails.jsx'

const router = createBrowserRouter([{
    element: <App />,
    children: [
      {///cards
        path: "/",
        element: <Cards/>
      },
      {
        path: "/card-register",
        element: <CardRegister/>
      },
      {
        path: "/month-details/revenues/:id",
        element: <Transaction/>
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
