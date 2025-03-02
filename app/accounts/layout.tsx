import dynamic from "next/dynamic";

const FooterContainer = dynamic(() => import("@components/shared/footer/footer-container")),
  AccountsContainer = dynamic(() => import("@components/layouts/accounts/accounts-container"));

const AccountsLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="grid-rows-[auto_max-content]">
    <AccountsContainer>{children}</AccountsContainer>
    <FooterContainer />
  </main>
);

export default AccountsLayout;
