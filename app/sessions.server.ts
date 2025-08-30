import { createCookieSessionStorage } from "react-router";

type SessionData = {
	orderId: string;
};

type SessionFlashData = {
	error: string;
};

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__awkwardOrderData",
			httpOnly: true,
			maxAge: 60,
			path: "/",
			sameSite: "lax",
		},
	});

export { getSession, commitSession, destroySession };
