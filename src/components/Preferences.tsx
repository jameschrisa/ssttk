import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Preferences() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Preferences</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application Preferences</CardTitle>
          <CardDescription>Customize your application settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">Preferences management functionality coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
