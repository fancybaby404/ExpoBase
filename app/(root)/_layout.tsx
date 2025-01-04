import { ActivityIndicator, SafeAreaView } from "react-native";
import { Redirect, Slot, useRouter } from "expo-router";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

export default function AppLayout() {
	const { data: user, isLoading } = useUser();
	const router = useRouter();

	useEffect(() => {
		// Redirect to the sign-in page if the user is not authenticated
		if (!isLoading && !user?.id) {
			router.replace("/sign-in");
		}
	}, [isLoading, user, router]);

	// Show a loading indicator while user data is being fetched
	if (isLoading) {
		return (
			<SafeAreaView className="h-full flex justify-center items-center">
				<ActivityIndicator className="text-sky-400" size="large" />
			</SafeAreaView>
		);
	}

	// Always render the Slot to satisfy expo-router's requirements
	return <Slot />;
}
