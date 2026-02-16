"use client"

const AUTH_KEY = "isLoggedIn";
const USER_KEY = "user_data"; // New key for user info

export type User = {
    name: string;
    email: string;
}

export const auth = {
    login: (user?: User) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_KEY, "true");
            if (user) {
                localStorage.setItem(USER_KEY, JSON.stringify(user));
            }
            // Dispatch a custom event to notify components of auth change
            window.dispatchEvent(new Event("auth-change"));
        }
    },
    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_KEY);
            localStorage.removeItem(USER_KEY);
            window.dispatchEvent(new Event("auth-change"));
        }
    },
    isAuthenticated: () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(AUTH_KEY) === "true";
        }
        return false;
    },
    getUser: (): User | null => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        }
        return null;
    },
    onChange: (callback: () => void) => {
        if (typeof window !== "undefined") {
            window.addEventListener("auth-change", callback);
            // Also listen for storage events (e.g. tabs)
            window.addEventListener("storage", callback);
            return () => {
                window.removeEventListener("auth-change", callback);
                window.removeEventListener("storage", callback);
            }
        }
        return () => { };
    }
};
