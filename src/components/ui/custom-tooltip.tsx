import React from 'react'
import {
    Tooltip,
    TooltipArrow,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TemplateTooltipProps {
    children: React.ReactNode;
    title: string
}
const CustomTooltip: React.FC<TemplateTooltipProps> = ({ children, title }) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white text-center max-w-96" side='bottom'>
                    <p>{title}</p>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip
