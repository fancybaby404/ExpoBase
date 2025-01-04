/**
 * TabsLayout component renders the bottom navigation bar (tab bar) using Expo Router's Tabs component.
 * It provides navigation between Home, Search, and Profile screens.
 */

import { View, Text } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
	/**
	 * Icon component renders a single tab icon with its corresponding label.
	 * @param {boolean} focused - Indicates whether the tab is currently focused.
	 * @param {string} icon - The name of the Octicon icon to display.
	 * @param {string} title - The label for the tab.
	 */
	const Icon = ({
		focused,
		icon,
		title,
	}: {
		focused: boolean;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		icon: any;
		title: string;
	}) => (
		<View className="flex-1 mt-3 flex flex-col items-center">
			<Octicons
				className="object-contain"
				name={icon}
				title={title}
				color={focused ? "#38bdf8" : "black"}
				size={19}
			/>
			<Text
				className={`w-full text-center mt-1 text-xs ${focused && "text-[#38bdf8]"}`}
			>
				{title}
			</Text>
		</View>
	);

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "white",
					position: "absolute",
					borderTopColor: "#38bdf8",
					borderTopWidth: 1,
					minHeight: 70,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Icon focused={focused} icon="home" title="Home" />
					),
				}}
			/>

			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Icon focused={focused} icon="search" title="Search" />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Icon focused={focused} icon="person" title="Profile" />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
