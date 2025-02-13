import { Playfair } from "next/font/google";

const playfair = Playfair({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const fonts = `${playfair.variable}`;

export default fonts;
