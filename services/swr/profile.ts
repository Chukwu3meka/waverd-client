import useSWR from "swr";
import useAuthStore from "@stores/auth.store";
import AccountsService from "@services/axios/accounts.service";

export function useUser() {
  const accServ = new AccountsService(),
    signin = useAuthStore((state) => state.signin),
    authenticated = useAuthStore((state) => state.data.authenticated),
    { data: res, error, isLoading } = useSWR("profile", () => accServ.getProfile());

  if (res?.success && !authenticated) {
    signin(res?.data);
  }

  return { data: res?.data, isLoading, isError: error };
}
