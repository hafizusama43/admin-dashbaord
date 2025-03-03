import React from 'react'
import { MobileNav } from '../sidebar/mobile-navigation'
import { DashboardBreadcrumb } from './dashboard-breadcrum'
import ThemeSwitcher from './theme-switcher'
import { SearchInput } from './search'
import { User } from './user'

const Header = () => {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b py-4 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:bg-white dark:bg-background shadow-sm">
            <MobileNav />
            <DashboardBreadcrumb />
            <div className='flex items-center gap-4 relative ml-auto flex-1 md:grow-0'>
                <ThemeSwitcher />
                <SearchInput />
                <User />
            </div>
        </header>
    )
}

export default Header