interface LayoutState {
  route: string;
  width: number;
  height: number;
  displayHeader: boolean;
}

interface AccountState {
  profile: Profile;
  authenticated: boolean;
}

type RootState = {
  account: AccountState;
  layout: LayoutState;
};
