import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import CardRegister from './Routes/summary/CardRegister'
import Transaction from './Routes/transaction/Transaction'
import Cards from './Routes/summary/Summary'
import MonthDetails from './Routes/summary/item/MonthDetails.jsx'

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
        path: "/transactions/:id",
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
