export interface AuthUserProps {
  email: string;
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: AuthUserProps | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

export interface UserDataProps extends AuthUserProps {
  firstName: string;
  lastName?: string;
  confirmPassword: string;
}
