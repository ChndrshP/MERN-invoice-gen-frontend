import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2 underline">
            <span className="text-xl font-bold">Levitation InfoTech</span>
          </div>
          <Link to={"/login"}> 
          <button
            className="bg-lime-500 hover:bg-lime-600 text-black px-8 py-1 rounded-full text-lg"
          >
            Login
          </button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to <strong>Levitation Infotech</strong></h1>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
        Levitation™ helps Government, MSME’s and Large Enterprises with custom software development like CRM, ERP, HIS, RMS etc
        </p>
        <Link to={"/signup"}>
        <button
          className="bg-gray-800 hover:bg-gray-950 text-lime-500 px-8 py-3 rounded-full text-lg"
        >
          Get Started
        </button>
        </Link>
      </main>

      <footer className="absolute bottom-0 w-full py-6 text-center text-gray-400">
        <p>&copy; 2024 Levitation. All rights reserved.</p>
      </footer>
    </div>
  )
}