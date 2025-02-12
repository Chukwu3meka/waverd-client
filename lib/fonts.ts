import { Playfair, Roboto_Mono } from "next/font/google";

const playfair = Playfair({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const fonts = `${playfair.variable} ${roboto_mono.variable}`;

export default fonts;
