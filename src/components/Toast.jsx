import React from 'react'
import { ToastContainer } from 'react-toastify';

function Toast() {
  return (
    <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
  )
}

export default Toast