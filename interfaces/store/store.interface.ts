interface LayoutState {
  route: string;
  width: number;
  height: number;
  displayHeader: boolean;
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl";
}

interface AccountState {
  profile: Profile;
  authenticated: boolean;
}

type RootState = {
  account: AccountState;
  layout: LayoutState;
};
