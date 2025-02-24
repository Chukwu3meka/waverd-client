"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;

export default ThemeProvider;
