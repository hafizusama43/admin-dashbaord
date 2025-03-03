'use client'
import { Switch } from '@/components/ui/switch'
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { Moon, Sun } from 'lucide-react';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return <div />
    }

    return (
        <Switch id="airplane-mode" checked={resolvedTheme === 'dark'} onCheckedChange={(e) => e ? setTheme('dark') : setTheme('light')}>{resolvedTheme === 'light' ? <Sun /> : <Moon />}</Switch>
    )
}

export default ThemeSwitcher
