import { atom } from "recoil";
import { INIT_PROFILE } from "@lib/constants";

const initProfile: AccountState = { ...INIT_PROFILE, authenticated: false };

export const authProfileState = atom({
  key: "authProfileState",
  default: initProfile,
});

// export const accountReducer = (state: AccountState = initState, { data, type }: { data: any; type: string }) => {
//   switch (type) {
//     case "SET_PROFILE":
//       return { profile: data, authenticated: !!data.handle };
//     case "SET_THEME":
//       return { ...state, profile: { ...state.profile, theme: data } };
//     default:
//       return state;
//   }
// };
