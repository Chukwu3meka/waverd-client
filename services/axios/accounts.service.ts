import service from "./service";
import { AxiosError, AxiosResponse } from "axios";

class AccountsService {
  accountsServiceUrl = "/accounts";

  getProfile = async (cookie?: string | null): Promise<NonPaginatedResponse<Profile>> => {
    const path = this.accountsServiceUrl + "/profile",
      cookieOption = { headers: { Cookie: cookie } };

    return await service
      .get(path, cookieOption)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
  };

  setTheme = async (payload: ThemePayload) =>
    await service
      .post(this.accountsServiceUrl + "/theme", payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});

  signin = async (payload: SigninPayload): Promise<NonPaginatedResponse<Profile>> =>
    await service
      .post(this.accountsServiceUrl + "/signin", payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});

  exists = async ({ data, variant }: ExistsPayload) =>
    await service
      .post(this.accountsServiceUrl + `/${variant}_exists`, { [variant]: data })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});

  signup = async (payload: SignupPayload) =>
    await service
      .post(this.accountsServiceUrl + "/signup", payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});

  initPasswordReset = async (payload: InitPassResetService) =>
    await service
      .post(this.accountsServiceUrl + "/initiate-password-reset", payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});

  confPasswordReset = async (payload: ConfPassResetService) =>
    await service
      .post(this.accountsServiceUrl + "/confirm-password-reset", payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});

  initDataDeletion = async (payload: DataDeletionService) =>
    await service
      .post(this.accountsServiceUrl + "/data-deletion", payload)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => err.response?.data || {});
}

export default AccountsService;
