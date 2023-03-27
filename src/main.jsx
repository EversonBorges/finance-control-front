import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import CardRegister from './Routes/card/CardRegister'
import Transaction from './Routes/transaction/Transaction'
import Cards from './Routes/card/Cards'

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
        path: `/transactions`,
        element: <Transaction/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
