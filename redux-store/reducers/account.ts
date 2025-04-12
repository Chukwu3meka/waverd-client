import { INIT_PROFILE } from "@lib/constants";

const initState: AccountState = { ...INIT_PROFILE, authenticated: false };

export const accountReducer = (state: AccountState = initState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_PROFILE":
      return { profile: data, authenticated: !!data.handle };
    case "SET_THEME":
    // return { ...state, profile: { ...state.profile, theme: data } };
    default:
      return state;
  }
};
