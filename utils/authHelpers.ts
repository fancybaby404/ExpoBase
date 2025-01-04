import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { QueryClient } from "@tanstack/react-query";
import {
	GoogleSignin,
	isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";

const queryClient = new QueryClient();
const router = useRouter();

export const handleLogout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error("Error during logout:", error.message);
		return;
	}
	await queryClient.invalidateQueries({ queryKey: ["user"] });
	router.push("/sign-in");
};

/**
 * Handles Google login, signs in the user with Supabase, and invalidates the user cache.
 * @returns A promise resolving to void or rejecting with an error message.
 */
export const handleLogin = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();
		if (isSuccessResponse(userInfo)) {
			const { data, error } = await supabase.auth.signInWithIdToken({
				provider: "google",
				token: userInfo.data.idToken as string,
			});

			if (error) {
				throw error;
			}

			// Trigger refresh
			await queryClient.invalidateQueries({ queryKey: ["user"] });

			router.replace("/");
		} else {
			throw new Error("no ID token present!");
		}
	} catch (error) {
		handleLoginError(error);
	}
};

/**
 * Handles login errors and maps them to user-friendly messages.
 * @param error - The error object from the Google Sign-In process.
 * @returns A string representing the user-friendly error message.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  const handleLoginError = (error: any): string => {
    if (error?.code) {
        switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
                return "Login cancelled by user.";
            case statusCodes.IN_PROGRESS:
                return "Login is already in progress.";
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                return "Google Play Services not available or outdated.";
            default:
                return "An unknown error occurred during login.";
        }
    }
    return "An unexpected error occurred.";
};
