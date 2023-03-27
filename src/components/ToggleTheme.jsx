import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"

const ToggleTheme = () => {

    const systemPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches
    const pageClasses = document.documentElement.classList

    useEffect(() => {
        systemPreferences && pageClasses.add('dark')
    })


    const toggle = () => {
        pageClasses.toggle('dark')
    }

    return <div className="sm:hover:scale-150">
        <MoonIcon className="icon-toggle-theme dark:hidden " onClick={toggle} />
        <SunIcon className="icon-toggle-theme hidden dark:block" onClick={toggle} />
    </div>
}

export default ToggleTheme