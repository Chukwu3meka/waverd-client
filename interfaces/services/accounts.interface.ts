interface SigninPayload {
  email: string;
  password: string;
}

interface ThemePayload {
  theme: Theme;
}

interface ExistsPayload {
  variant: "handle" | "email";
  data: string;
}

interface SignupPayload {
  email: string;
  handle: string;
  name: string;
  password: string;
  theme: string;
}

interface InitPassResetService {
  email: string;
}
interface ConfPassResetService {
  email: string;
  password: string;
}

interface DataDeletionService {
  email: string;
  handle: string;
  comment: string;
  password: string;
}
