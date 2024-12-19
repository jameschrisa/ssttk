import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      // Here you would typically clear user session, tokens, etc.
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Signing Out</CardTitle>
          <CardDescription>Please wait while we sign you out...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    </div>
  );
}
