export const LOGO = "✌";
export const OAUTH_PROVIDERS = ["facebook", "twitter", "google"];
export const BREAKPOINTS = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 };
export const NETWORK_ERROR = "Unable to connect to the internet. Please check your internet connection and try again.";
export const INIT_PROFILE: Profile = { role: "dummy", theme: "system", name: "", handle: "", avatar: "/images/layouts/profile.webp" };

export const SOCIAL_ACCOUNTS: SocialAccounts[] = [
  { id: "linkedin", title: "LinkedIn", image: "/images/social/linkedin.png", href: "https://www.linkedin.com/in/chukwu3meka/" },
  { id: "instagram", title: "Instagram", image: "/images/social/instagram.png", href: "https://www.instagram.com/Chukwuemeka_Maduekwe" },
  { id: "twitter", title: "Twitter", image: "/images/social/twitter.png", href: "https://twitter.com/Chukwu3meka/" },
  // {id:"pinterest",title:"Pinterest",image:"/images/social/pinterest.png",href: "https://www.pinterest.com/viewcrunch/"],
  { id: "github", title: "Github", image: "/images/social/github.png", href: "https://github.com/Chukwu3meka/WaveRD-Web/issues" },
  // {id:"youtube",title:"YouTube",image:"/images/social/youtube.png",href: "https://www.youtube.com/channel/UCs_hSlk3N8bxP5xHSdKw3IQ/"],
  { id: "whatsapp", title: "Whatsapp", image: "/images/social/whatsapp.png", href: "https://wa.me/+2347064417213" },
  { id: "phone", title: "Phone", image: "/images/social/phone.png", href: "tel:+234(706)-441-7213" },
  { id: "facebook", title: "Facebook", image: "/images/social/facebook.png", href: "https://web.facebook.com/Chukwu3meka" },
];

export const COMPETITIONS: Competition[] = [
  { title: "Bundesliga", id: "bundesliga", image: "/images/competitions/bundesliga.png" },
  { title: "Champions League", id: "championsLeague", image: "/images/competitions/champions-league.png" },
  { title: "Eredivisie", id: "eredivisie", image: "/images/competitions/eredivisie.png" },
  { title: "Europa League", id: "europaLeague", image: "/images/competitions/europa-league.png" },
  { title: "La Liga", id: "laLiga", image: "/images/competitions/la-liga.png" },
  { title: "Ligue 1", id: "ligue1", image: "/images/competitions/ligue-1.png" },
  { title: "Premier League", id: "premierLeague", image: "/images/competitions/premier-league.png" },
  { title: "Serie A", id: "serieA", image: "/images/competitions/serie-a.png" },
];
