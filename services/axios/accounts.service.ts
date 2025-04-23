import service from "./service";

class AccountsService {
  accountsServiceUrl = "/accounts";

  getProfile = async (): Promise<NonPaginatedResponse<Profile>> => {
    return service.get(this.accountsServiceUrl + "/profile");
  };

  setTheme = async (payload: ThemePayload): Promise<NonPaginatedResponse<null>> => {
    return service.post(this.accountsServiceUrl + "/theme", payload);
  };

  signin = async (payload: SigninPayload): Promise<NonPaginatedResponse<Profile>> => {
    return service.post(this.accountsServiceUrl + "/signin", payload);
  };

  exists = async ({ data, variant }: ExistsPayload): Promise<NonPaginatedResponse<any>> => {
    return service.post(this.accountsServiceUrl + `/${variant}_exists`, { [variant]: data });
  };

  signup = async (payload: SignupPayload): Promise<NonPaginatedResponse<any>> => {
    return service.post(this.accountsServiceUrl + "/signup", payload);
  };

  initPasswordReset = async (payload: InitPassResetService): Promise<NonPaginatedResponse<any>> => {
    return service.post(this.accountsServiceUrl + "/initiate-password-reset", payload);
  };

  confPasswordReset = async (payload: ConfPassResetService): Promise<NonPaginatedResponse<any>> => {
    return service.post(this.accountsServiceUrl + "/confirm-password-reset", payload);
  };

  initDataDeletion = async (payload: DataDeletionService): Promise<NonPaginatedResponse<any>> => {
    return service.post(this.accountsServiceUrl + "/data-deletion", payload);
  };
}

export default AccountsService;
