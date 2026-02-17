"use client"

const AUTH_KEY = "isLoggedIn";
const USER_KEY = "user_data";
const USERS_DB_KEY = "registered_users"; // Mock DB

export type User = {
    name: string;
    email: string;
    password?: string;
}

export const auth = {
    signup: (user: User) => {
        if (typeof window !== "undefined") {
            // Save to mock DB
            const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "[]");
            // Check if exists
            const existingIndex = users.findIndex((u: User) => u.email === user.email);
            if (existingIndex >= 0) {
                users[existingIndex] = user; // Update
            } else {
                users.push(user);
            }
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

            // Login
            auth.login(user);
        }
    },
    login: (credentials: { email: string, password?: string, name?: string }) => {
        if (typeof window !== "undefined") {
            let userToLogin = credentials;

            // If name not provided, try to find in DB
            if (!credentials.name) {
                const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "[]");
                const found = users.find((u: User) => u.email === credentials.email);
                if (found) {
                    userToLogin = found;
                } else {
                    // Fallback: Use email as name if not found (better than "User")
                    userToLogin = {
                        ...credentials,
                        name: credentials.email.split("@")[0]
                    };
                }
            }

            localStorage.setItem(AUTH_KEY, "true");
            localStorage.setItem(USER_KEY, JSON.stringify(userToLogin));

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
            window.addEventListener("storage", callback);
            return () => {
                window.removeEventListener("auth-change", callback);
                window.removeEventListener("storage", callback);
            }
        }
        return () => { };
    }
};
