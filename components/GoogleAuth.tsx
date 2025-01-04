import React, { useState } from "react";
import { Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	isErrorWithCode,
	isSuccessResponse,
	GoogleSignin,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import { TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import useUser from "../hooks/useUser";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { handleLogin } from "../utils/authHelpers";

const queryClient = new QueryClient();

GoogleSignin.configure({
	// scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
	// scopes: ["https://www.googleapis.com/auth/"], // what API you want to access on behalf of the user, default is email and profile
	scopes: ["email", "profile"], // Scopes for accessing user's email and profile info (name, picture)
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
	offlineAccess: true,
	forceCodeForRefreshToken: true,
});

const GoogleAuth = () => {
	const { data: user } = useUser();
	const [errorMessage, setErrorMessage] = useState("");

	const router = useRouter();

	const onLoginPress = async () => {
		try {
			await handleLogin();
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			}
		}
	};

	return (
		<>
			<TouchableOpacity
				className="flex flex-row bg-yellow-400 rounded-full text-black py-8 justify-center gap-4"
				onPress={handleLogin}
			>
				<FontAwesome
					className="absolute left-10 self-center"
					name="google"
					size={30}
				/>
				<Text className="text-center text-black font-black text-xl">
					Sign in with Google
				</Text>
			</TouchableOpacity>
			<Text className="text-red-500 absolute bottom-36 flex self-center">
				{errorMessage}
			</Text>
		</>
	);
};

export default GoogleAuth;
