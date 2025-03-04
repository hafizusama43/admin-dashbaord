import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';


export default async function DashboardPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View all analytics here.</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}

