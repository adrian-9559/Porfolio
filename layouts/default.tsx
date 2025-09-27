import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Head } from "@/layouts/head";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden theme-transition">
			{/* Background gradient overlay */}
			<div className="fixed inset-0 bg-gradient-to-br from-blue-100/60 via-purple-50/70 to-pink-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 theme-transition"></div>

			{/* Background Effects */}
			<div className="fixed inset-0 pointer-events-none z-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-blue-300/30 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-300/30 to-rose-300/30 dark:from-pink-500/10 dark:to-rose-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
				<div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300/30 to-teal-300/30 dark:from-cyan-500/10 dark:to-teal-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-200/20 to-red-200/20 dark:from-orange-500/5 dark:to-red-500/5 rounded-full blur-3xl animate-pulse delay-4000"></div>
				<div className="absolute top-3/4 left-0 w-60 h-60 bg-gradient-to-br from-indigo-300/25 to-purple-300/25 dark:from-indigo-500/8 dark:to-purple-500/8 rounded-full blur-3xl animate-pulse delay-5000"></div>
			</div>

			{/* Additional color layers for light theme */}
			<div className="fixed inset-0 pointer-events-none z-0 opacity-100 dark:opacity-0 transition-opacity duration-300">
				<div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/40 rounded-full blur-2xl"></div>
				<div className="absolute bottom-20 left-10 w-40 h-40 bg-green-200/40 rounded-full blur-2xl"></div>
				<div className="absolute top-1/3 right-1/3 w-28 h-28 bg-violet-200/40 rounded-full blur-2xl"></div>
			</div>

			{/* Grid Pattern Overlay */}
			<div className="fixed inset-0 opacity-[0.02] dark:opacity-5 pointer-events-none z-0">
				<div className="absolute inset-0" style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgba(100,100,100,.3) 1px, transparent 0)`,
					backgroundSize: '20px 20px'
				}}></div>
			</div>

			<Head />

			<header className="relative z-20">
				<Navbar />
			</header>

			<main className="relative z-10 flex-grow px-4 lg:px-8 pt-14">
				{children}
			</main>

			<footer className="relative z-20 mt-auto py-6">
				<Footer />
			</footer>

			{/* Floating Contact Component */}
			<FloatingContact />
		</div>
	);
}
