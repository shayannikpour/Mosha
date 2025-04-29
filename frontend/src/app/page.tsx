import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Welcome to Mosha — Master the Piano with Expert Instruction
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600">
          Start your musical journey today with personalized piano lessons from experienced instructors.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/signup"
            className="px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Sign Up
          </Link>
          
          <Link 
            href="/login"
            className="px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-indigo-600"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
