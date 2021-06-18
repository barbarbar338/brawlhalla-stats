import useSWR from "swr";
import { API_URL, API_VERSION } from "./config";

export const useAPI = <T>(cache: string, path: string) => {
	return useSWR<T>(cache, async () => {
		const res = await fetch(`${API_URL}/${API_VERSION}/${path}`);
		const body = await res.json();
		return body.data;
	});
};
