import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useContext } from "react";
import { SummaryContext } from "../contexts/SummaryContext";
import ThemeService from "../utils/style";

const ToggleTheme = () => {
    const systemPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const pageClasses = document.documentElement.classList;
    const { theme, setTheme } = useContext(SummaryContext);

    ThemeService.themeLight

    useEffect(() => {
        if (systemPreferences) {
            pageClasses.add('dark');
            setTheme('dark');
        } else {
            pageClasses.remove('dark');
            setTheme('light');
        }
    }, [systemPreferences, setTheme, pageClasses]);

    const toggle = () => {
        if (theme === 'dark') {
            pageClasses.remove('dark');
            setTheme('light');
        } else {
            pageClasses.add('dark');
            setTheme('dark');
        }
    };

    return (
        <div className="sm:hover:scale-110">
            <MoonIcon
                className={`icon-toggle-theme ${theme === 'dark' ? 'hidden' : 'block'} text-gray-900`}
                onClick={toggle}
            />
            <SunIcon
                className={`icon-toggle-theme ${theme === 'dark' ? 'block' : 'hidden'} text-gray-100`}
                onClick={toggle}
            />
        </div>
    );
};

export default ToggleTheme;
