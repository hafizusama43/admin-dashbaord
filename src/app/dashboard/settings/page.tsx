import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>View all settings here.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default page;
