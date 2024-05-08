// !!! DON'T RE-ORDER THE ARRANGEMENT OF THIS FILE - iT WILL AFFECT ITS LAYOUT IN THE APP

import { Wc, Computer, Directions, Webhook, Engineering, Insights, HomeMaxOutlined, Home } from "@mui/icons-material";

import { Routes } from "interfaces/utils/constants.interface";

const routes: Routes[] = [
  // ? Nav Route
  { research: null, title: "PROFILES", Icon: Engineering, path: "/console/console-profiles" },
  { research: null, title: "APIHUB CORE", Icon: Webhook, path: "/console/console-apihub" },
  // { research: null, searchOnly: false, title: "FOOTBALL MANAGER", Icon: Computer, path: "/console/software" },
  // { research: null, searchOnly: false, title: "TRANSLATION MODULE", Icon: Computer, path: "/console/software" },
  // { research: null, searchOnly: false, title: "JOBS & CAREER", Icon: Computer, path: "/console/software" },
  // { research: null, searchOnly: false, title: "AGRICULTURE", Icon: Computer, path: "/console/software" },
  // { research: null, searchOnly: false, title: "LOGS", Icon: Directions, path: "/console/subsidiaries" },

  // ? Console Apihub
  { research: "console-apihub", title: "Endpoints", Icon: Insights, path: "/console/apihub-endpoints" },
  { research: "console-apihub", title: "API Hub Home", Icon: Home, path: "/console/apihub-home" },
];

export default routes;
