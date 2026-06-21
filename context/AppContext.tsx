import { createContext, ReactNode, useEffect, useState } from "react";

export const AppContext = createContext({
	isLoggedIn: false,
	// expose setter so components can update login state after login/logout
	setIsLoggedIn: (v: boolean) => { },
	navRoutes: [] as any[],
	setNavRoutes: (r: any[]) => { },
});

export const AppProvider = ({
	children,
	initialNavRoutes = [],
}: {
	children: ReactNode;
	initialNavRoutes?: any[];
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Check session on mount. If NEXT_PUBLIC_API_URL is set, we use it; otherwise assume same origin.
		const API_BASE = (process.env.NEXT_PUBLIC_API_URL as string) || "";

		(async () => {
			try {
				const res = await fetch(`${API_BASE}/auth/session`, {
					credentials: "include",
				});

				if (!res.ok) return setIsLoggedIn(false);
				const data = await res.json();

				setIsLoggedIn(Boolean(data?.user));
			} catch (e) {
				setIsLoggedIn(false);
			}
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{ isLoggedIn, setIsLoggedIn }}
		>
			{children}
		</AppContext.Provider>
	);
};
