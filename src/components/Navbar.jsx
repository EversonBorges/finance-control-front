import React from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
import { ClipboardDocumentListIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Drop from './Drop';

const Navbar = () => {
    return (
        <div>
            <nav className='flex h-10 sm:h-10 bg-gray-300 dark:bg-dark-200 justify-between items-center px-2 fixed w-full'>
                <div className='text-white hidden sm:block'>
                    <ul className=' gap-1 uppercase sm:flex hidden text-gray-900 dark:text-gray-100'>
                        <li className='sm:hover:scale-150 '>
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
                <div className='text-gray-900 dark:text-gray-100 flex flex-col sm:flex-row items-center gap-2 sm:hover:scale-125'>
                    <ClipboardDocumentListIcon className="h-7 hidden sm:block text-gray-900 dark:text-gray-100 cursor-pointer" />
                    <h1 className='text-gray-900 dark:text-gray-100 uppercase'>Controle de Finanças</h1>
                </div>
                <div className='flex gap-2'>
                    <UserCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-150' />
                    <ToggleTheme />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
