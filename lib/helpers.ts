export const textToId = (phrase: string) => {
  if (!phrase) throw { message: "Unable to transform string" };
  return phrase.replace(/\s+/g, "-").toLowerCase();
};

export const getSystemTheme = (): Theme => {
  if (!window) throw { message: "Window Environment not accessible" };

  const darkMode = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  return darkMode ? "dark" : "light";
};

export const sleep = async (seconds: number) => {
  if (!seconds) throw { message: "Sleep timer not specified" };
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const capitalize = (phrase: string) => {
  if (!phrase) throw { message: "Unable to capitalize phrase" };

  const words = phrase.split(" "),
    capitalized = words.map((word) => word[0].toUpperCase() + word.slice(1));

  return capitalized.join(" ");
};
