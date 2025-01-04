import React, { useState } from "react";
import {
	Alert,
	StyleSheet,
	View,
	AppState,
	Text,
	Button,
	TouchableOpacity,
} from "react-native";
import { supabase } from "@/lib/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	// const handleLoginWithOAuth = (provider: "github" | "google") => {
	// 	supabase.auth.signInWithOAuth({
	// 		provider,
	// 		options: {
	// 			// this just redirects you to the page u were on when u tried to access a page but not logged in
	// 			redirectTo: "/",
	// 		},
	// 	});
	// };

	const redirectTo = makeRedirectUri();
	const createSessionFromUrl = async (url: string) => {
		const { params, errorCode } = QueryParams.getQueryParams(url);

		if (errorCode) throw new Error(errorCode);
		const { access_token, refresh_token } = params;

		if (!access_token) return;

		const { data, error } = await supabase.auth.setSession({
			access_token,
			refresh_token,
		});
		if (error) throw error;
		return data.session;
	};

	const performOAuth = async (provider: "github" | "google") => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo,
				skipBrowserRedirect: true,
			},
		});
		if (error) throw error;

		const res = await WebBrowser.openAuthSessionAsync(
			data?.url ?? "",
			redirectTo,
		);

		if (res.type === "success") {
			const { url } = res;
			await createSessionFromUrl(url);
		}
	};

	const url = Linking.useURL();
	if (url) createSessionFromUrl(url);

	return (
		<>
			<View />

			<View>
				<Text className="text-center font-black text-6xl shadow-2xl">
					<Text>Expo</Text>
					<Text className="text-yellow-400">Base</Text>
				</Text>
				<Text className="text-center font-black text-3xl">🚀📱</Text>
			</View>

		
		</>
	);
}
