import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import Summary from './Routes/summary/Summary.jsx'
import MonthDetails from './Routes/summary/summaryMonth/MonthDetails.jsx'
import Revenues from './Routes/summary/summaryMonth/revenues/Revenues.jsx'
import Expenses from './Routes/summary/summaryMonth/expenses/Expenses.jsx'
import Investments from './Routes/summary/summaryMonth/investments/Investments.jsx'
import ModalCreditCard from './Routes/summary/summaryMonth/creditCard/ModalCreditCard.jsx'
import ModalCategory from './Routes/summary/summaryMonth/category/ModalCategory.jsx'
import ModalTransactions from './Routes/summary/summaryMonth/ModalTransactions.jsx'
import MyChart from './graphics/MyChart.jsx'
import ModalJobManager from './Routes/summary/summaryMonth/ModalJobManager.jsx'
import { PreviousRouteProvider } from './contexts/PreviousRouteContext.jsx'

const router = createBrowserRouter([{
    element: <App />,
    children: [
      {///cards
        path: "/",
        element: <MyChart/>
      },
      {
        path: "/summary",
        element: <Summary/>
      },
      {
        path: "/month-details/revenues/:year/:month",
        element: <Revenues/>
      },
      {
        path: "/month-details/investments/:year/:month",
        element: <Investments/>
      },
      {
        path: "/month-details/expenses/:year/:month/:classification",
        element: <Expenses/>
      },
      {
        path: "/revenues/:year",
        element: <Revenues home={true}/>
      },
      {
        path: "/investments/:year",
        element: <Investments home={true}/>
      },
      {
        path: "/expenses/:year",
        element: <Expenses home={true}/>
      },
      {
        path: "/month-details/:month/:year",
        element: <MonthDetails/>
      },
      {
        path: "/credit-cards",
        element: <ModalCreditCard show={true} home={true}/>
      },
      {
        path: "/category",
        element: <ModalCategory show={true} home={true}/>
      },
      {
        path: "/transactions",
        element: <ModalTransactions show={true}/>
      },
      {
        path: "/job-manager",
        element: <ModalJobManager show={true}/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <PreviousRouteProvider>
    <RouterProvider router={router}/>
  </PreviousRouteProvider>
 // </React.StrictMode>,
)
