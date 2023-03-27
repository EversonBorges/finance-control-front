import { useState } from 'react'
import DatePicker from 'tailwind-datepicker-react'

const options = {
	autoHide: true,
	todayBtn: true,
	clearBtn: false,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-gradient-to-t from-gray-600 dark:bg-gradient-to-t dark:from-gray-600 dark:bg-dark-100",
		todayBtn: "bg-red-800 hover:bg-red-400 hover:text-gray-900 dark:bg-emerald-400 dark:text-gray-900 hover:dark:bg-emerald-800 hover:dark:text-gray-200",
		clearBtn: "bg-black text-gray-200 hover:bg-gray-400 hover:text-gray-900 hover:dark:bg-gray-900",
		icons: "",
		text: "text-bold text-gray-900 bg-gray-200 dark:text-black dark:bg-gray-400 rounded-2xl ",
		disabledText: "text-gray-900",
		input: "bg-transparent dark:bg-transparent border-1 border-gray-400 p-0 pl-2 text-center cursor-pointer sm:hover:scale-110",
		inputIcon: "fill-transparent",
		selected: "bg-red-800 hover:bg-red-400 hover:text-gray-900 dark:bg-emerald-400 dark:text-gray-200 hover:dark:bg-emerald-800 rounded-2xl  hover:dark:text-gray-200",
	},
  icons: { 
   
},
	datepickerClassNames: "top-15",
	defaultDate: new Date(),
	language: "pt",
}

function Datepicker({handleChange}) {
    const [show, setShow] = useState(false)
    const handleClose = (state) => {
        setShow(state)
      }
  return (
    <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose}/>
  )
}

export default Datepicker