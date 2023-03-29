import React from 'react'
import { Link } from 'react-router-dom'
import ToggleTheme from './ToggleTheme'
import { ClipboardDocumentListIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Drop from './Drop'

const Navbar = () => {

    return (
        <div>
            <nav className='flex h-12 sm:h-20  bg-light-200 dark:bg-dark-200 justify-between items-center px-2 fixed w-full'>
                <div className='text-white opacity-75 hidden sm:block' >
                    <ul className='text-gray-400 gap-1 sm:flex hidden'>
                        <li className='sm:hover:scale-150'>
                            <Link to={"/"} className="button-link">Home</Link>
                        </li>
                        <li className='sm:hover:scale-125'>
                            <Link to={"/card-register"} className="button-link">Card</Link>
                        </li>
                    </ul>
                </div>
                <div className='sm:hidden'>
                    <Drop />
                </div>
                <div className='text-white opacity-75 flex flex-col sm:flex-row items-center gap-2 sm:hover:scale-125'>
                    <ClipboardDocumentListIcon className="h-10 hidden sm:block text-gray-100 cursor-pointer" />
                    <h1 className=' text-gray-100 sm:text-2xl uppercase '> Controle de Finanças</h1>
                </div>
                <div className='flex gap-2'>
                    <UserCircleIcon className='h-5 sm:h-8 opacity-75 text-gray-100 block cursor-pointer sm:hover:scale-150' />
                    <ToggleTheme />
                </div>
            </nav>
        </div>
    )
}

export default Navbar