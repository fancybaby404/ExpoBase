import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export default function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { data } = await supabase.auth.getUser();
			if (data.user) return data.user;
            return null
		},
	});
}
