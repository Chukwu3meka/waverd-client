type Theme = "dark" | "light" | "system";

type Role = "admin" | "user" | "dummy" | "test";

interface Profile {
  role: Role;
  name: string;
  theme: Theme;
  handle: string;
  avatar: string;
}

interface SocialAccounts {
  title: "Facebook" | "Twitter" | "Instagram" | "LinkedIn" | "Wave Research" | "Pinterest" | "Github" | "YouTube" | "Fiverr" | "Whatsapp" | "Phone";
  id: string;
  image: string;
  href: string;
}

interface Competition {
  image: string;
  title: string;
  id: string;
}
