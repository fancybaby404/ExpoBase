import { View, Text } from "react-native";
import React from "react";
import Auth from "../../components/Auth";
// import Auth from "../../components/Auth";
import GoogleAuth from "../../components/GoogleAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {

	return (

		<SafeAreaView className="h-full flex flex-col justify-between p-8">
			<Auth/>
			<GoogleAuth />
		</SafeAreaView>
	);
};

export default SignIn;
