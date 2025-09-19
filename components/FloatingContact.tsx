"use client";

import { useState } from "react";

export default function FloatingContact() {
	const [isOpen, setIsOpen] = useState(false);

	const contactLinks = [
		{
			icon: "✉️",
			label: "Email",
			href: "mailto:adrigarcia2020@gmail.com",
			color: "bg-red-500 hover:bg-red-600"
		},
		{
			icon: "💼",
			label: "LinkedIn",
			href: "https://linkedin.com/in/adrian-garcia-torrente",
			color: "bg-blue-600 hover:bg-blue-700"
		},
		{
			icon: "💻",
			label: "GitHub",
			href: "https://github.com/adrigar25",
			color: "bg-gray-800 hover:bg-gray-900"
		}
	];

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{/* Contact Panel */}
			{isOpen && (
				<div className="mb-4 animate-in slide-in-from-right-2 fade-in duration-300">
					<div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-xl p-4 min-w-[200px]">
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-sm font-semibold text-gray-900 dark:text-white">
								Contáctame
							</h3>
							<button
								onClick={() => setIsOpen(false)}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								✕
							</button>
						</div>
						<div className="space-y-2">
							{contactLinks.map((link, index) => (
								<a
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
									style={{ animationDelay: `${index * 100}ms` }}
								>
									<div className={`p-2 rounded-full text-white ${link.color} transition-all duration-200 group-hover:scale-110`}>
										<span className="text-sm">{link.icon}</span>
									</div>
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{link.label}
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Floating Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen
					? "bg-gray-500 hover:bg-gray-600 rotate-45"
					: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
					} text-white font-bold text-xl flex items-center justify-center`}
			>
				{isOpen ? "✕" : "💬"}
			</button>
		</div>
	);
}
