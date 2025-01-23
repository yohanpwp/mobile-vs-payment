export interface AuthUserProps {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserDataProps extends AuthUserProps {
  firstName: string;
  lastName?: string;
  confirmPassword: string;
  image?: string;
  email?: string;
}
