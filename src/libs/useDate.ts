const { remote } = window.require("electron");
const lang = remote.app.getLocale();

export const useDate = (time: number): string => {
	return new Date(time).toLocaleDateString(lang, {
		month: "short",
		day: "numeric",
		hour12: true,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};
