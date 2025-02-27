// export const setCssThemeVar = (theme: Theme) => {
//   if (document) {
//     import("./constants").then((module) => {
//       const colors = module.COLORS,
//         mode = theme === "system" ? getSystemTheme() : theme;

//       if (mode === "dark") {
//         document.documentElement.style.setProperty("--theme", "dark");
//         document.documentElement.style.setProperty("--primary-color", colors.darkThemePrimaryColor);
//         document.documentElement.style.setProperty("--inverse-color", colors.darkThemeContrastColor);
//         document.documentElement.style.setProperty("--secondary-color", colors.darkThemeSecondaryColor);
//       } else {
//         document.documentElement.style.setProperty("--theme", "light");
//         document.documentElement.style.setProperty("--primary-color", colors.lightThemePrimaryColor);
//         document.documentElement.style.setProperty("--inverse-color", colors.lightThemeContrastColor);
//         document.documentElement.style.setProperty("--secondary-color", colors.lightThemeSecondaryColor);
//       }
//     });
//   }
// };

export const textToId = (phrase: string) => {
  if (!phrase) throw { message: "Unable to transform string" };
  return phrase.replace(/\s+/g, "-").toLowerCase();
};

export const getSystemTheme = (): Theme => {
  if (!window) throw { message: "Window Environment not accessible" };

  const darkMode = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  return darkMode ? "dark" : "light";
};

export const sleep = async (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
