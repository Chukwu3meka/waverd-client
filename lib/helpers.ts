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

export const deObfuscate = (phrase: string) => {
  if (!phrase) return;
  let r = "";
  for (let i = 0; i < phrase.length / 2; i++) {
    r += String.fromCharCode(parseInt(phrase.substr(i * 2, 2), 16) ^ 0x7f);
  }
  return r;
};

export const resizeHandler = () => {
  import("@stores/app.store").then((mod) => {
    mod.useAppStore.setState((state) => ({ ...state, layout: { ...state.layout, width: window.innerWidth, height: window.innerHeight } }));

    document.documentElement.style.setProperty("--browserHeight", `${window.innerHeight}px`);

    const footerHeight = document.querySelector("footer")?.getBoundingClientRect().height || 0,
      headerHeight = document.querySelector('header[class$="relative"]')?.getBoundingClientRect().height || 0;

    document.documentElement.style.setProperty("--footerHeight", `${footerHeight}px`);
    document.documentElement.style.setProperty("--headerHeight", `${headerHeight}px`);
    document.documentElement.style.setProperty("--contentHeight", `${window.innerHeight - (footerHeight + headerHeight + 20)}px`);
  });
};
