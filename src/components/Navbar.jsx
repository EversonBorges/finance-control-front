import React from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
import { ClipboardDocumentListIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Drop from './Drop';

const Navbar = () => {
    return (
        <div>
            <nav className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex h-10 sm:h-10 bg-gray-300 dark:bg-dark-200  items-center px-2 fixed w-full'>
                <div className='flex justify-start'>
                    <div className='text-white hidden sm:block'>
                        <ul className='uppercase sm:flex hidden text-gray-900 dark:text-gray-100'>
                            <li className='sm:hover:scale-110 '>
                                <Link to={"/"} className="button-link">Home</Link>
                            </li>
                            <li className='sm:hover:scale-110 '>
                                <Link to={"/summary"} className="button-link">Summary</Link>
                            </li>
                            <li className='sm:hover:scale-110'>
                                <Link to={"/transactions"} className="button-link">Transações</Link>
                            </li>
                            <li className='sm:hover:scale-110'>
                                <Link to={"/credit-cards"} className="button-link">Cartões</Link>
                            </li>
                            <li className='sm:hover:scale-110'>
                                <Link to={"/category"} className="button-link">Categorias</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='sm:hidden'>
                        <Drop />
                    </div>
                </div>
                <div className='text-gray-900 dark:text-gray-100 flex justify-center flex-col sm:flex-row items-center gap-2 sm:hover:scale-110'>
                    <ClipboardDocumentListIcon className="h-7 hidden sm:block text-gray-900 dark:text-gray-100 cursor-pointer" />
                    <h1 className='text-gray-900 dark:text-gray-100 uppercase'>Controle de Finanças</h1>
                </div>
                <div className='flex justify-end gap-2'>
                    <UserCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                    <ToggleTheme />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
