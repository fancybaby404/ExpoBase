import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Button, Text, View } from "react-native";
import GoogleAuth from "../../../components/GoogleAuth";
import useUser from "../../../hooks/useUser";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/supabase";
import { QueryClient } from "@tanstack/react-query";
import { handleLogout } from "../../../utils/authHelpers";

const Index = () => {
	const queryClient = new QueryClient();
	const { data: user, refetch: userRefetch } = useUser();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>{user?.email}</Text>
			<Button onPress={handleLogout} title="Log out" />

			{/* <Link className="px-6 py-4 rounded-full bg-neutral-200" href={"/sign-in"}>
				<Text className="text-xl font-bold">Sign In</Text>
			</Link> */}
		</View>
	);
};

export default Index;
