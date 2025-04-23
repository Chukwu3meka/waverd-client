interface LayoutState {
  route: string;
  width: number;
  height: number;
  displayHeader: boolean;
}

interface AccountState extends Profile {
  authenticated: boolean;
}

type RootState = {
  account: AccountState;
  layout: LayoutState;
};
