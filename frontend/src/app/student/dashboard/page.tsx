'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJWT } from '@/utils/auth';

export default function StudentDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const decodedToken = decodeJWT(token);
    if (!decodedToken || decodedToken.role !== 'STUDENT') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome to your student dashboard!</p>
      </div>
    </div>
  );
} 