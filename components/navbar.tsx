"use client";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { UserButton } from "@/features/auth/components/UserButton";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { useAuth } from "@/hooks/useAuth";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [authOpen, setAuthOpen] = useState(false);
	const { isAuthenticated: isLoggedIn, loadingAuth: loading } = useAuth();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [menuOpen]);

	return (
		<>
			<nav
				className={`sticky top-0 z-50 w-full transition-all duration-300 ${
					scrolled
						? "bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-black/8 dark:border-white/8"
						: "bg-white/60 dark:bg-[#0a0a0f]/60 backdrop-blur-md"
				}`}
			>
				<div className="max-w-7xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2.5 no-underline group">
						<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-blue-500/30 group-hover:shadow-md transition-shadow duration-300">
							A
						</div>
						<span className="hidden sm:inline font-semibold text-[0.9rem] text-[#1d1d1f] dark:text-white tracking-tight">
							Adrián
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-1">
						{siteConfig.navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
									pathname === item.href
										? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
										: "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/8"
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>

					{/* Right actions */}
					<div className="flex items-center gap-2">
						{!isLoggedIn && <ThemeSwitch />}

						{!loading && isLoggedIn && <NotificationBell />}

						{!loading && (
							isLoggedIn
								? <UserButton />
								: (
									<button
										onClick={() => setAuthOpen(true)}
										className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
									>
										Iniciar sesión
									</button>
								)
						)}

						{/* Mobile hamburger */}
						<button
							className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
							onClick={() => setMenuOpen(!menuOpen)}
							aria-label="Toggle menu"
						>
							<span className={`block w-4.5 h-px bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
							<span className={`block h-px bg-current rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-3.5"}`} />
							<span className={`block w-4.5 h-px bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile menu overlay */}
			{menuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-sm md:hidden"
					onClick={() => setMenuOpen(false)}
				/>
			)}

			{/* Mobile menu panel */}
			<div
				className={`fixed top-14 left-0 right-0 z-40 md:hidden transition-all duration-300 ${
					menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
				}`}
			>
				<div className="mx-4 mt-2 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 shadow-xl overflow-hidden">
					<div className="p-3 flex flex-col gap-1">
						{siteConfig.navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
									pathname === item.href
										? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
										: "text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
								}`}
							>
								{item.label}
							</Link>
						))}
						{!loading && !isLoggedIn && (
							<button
								onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
								className="mt-1 mx-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium"
							>
								Iniciar sesión
							</button>
						)}
					</div>
				</div>
			</div>

			<AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
		</>
	);
};
