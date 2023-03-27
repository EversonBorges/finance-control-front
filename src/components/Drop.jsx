import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'

export default function Drop() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
            <nav>
                    <Bars3Icon className=" fill-gray-100 opacity-75 h-6 block space-y-2 cursor-pointer" onClick={() => setIsNavOpen((prev) => !prev)} />
                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                            className="absolute top-0 left-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                        </div>
                        <ul className="flex flex-col items-center mt-12 px-2 text-xs bg-light-200 dark:bg-dark-200 rounded-b-sm pb-2">
                            <li className="border-b  border-gray-900 dark:border-gray-400">
                            <Link to={"/"} className="text-gray-200">Home</Link>
                            </li>
                            <li className="border-b  border-gray-900 dark:border-gray-400 ">
                            <Link to={"/card-register"} className="text-gray-200">Card</Link>
                            </li>
                        </ul>
                    </div>
            </nav>
    );
}
