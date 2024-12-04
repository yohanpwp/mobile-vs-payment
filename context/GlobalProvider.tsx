import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { getCurrentUser } from "@/lib/userdatabase"
import { UserDataProps } from "@/constants/propUser"

interface GlobalContextValue {
  isLoggedIn: boolean;
  user: UserDataProps | null;
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserDataProps | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  propsValue: any;
  setPropsValue: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContextValue>({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoggedIn: () => {}, // Default no-op function to satisfy the type
  setUser: () => {},
  setIsLoading: () => {},
  propsValue: [],
  setPropsValue: () => {}, // Default no-op function to satisfy the type
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [propsValue, setPropsValue] = useState([]);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else { 
          setIsLoggedIn(false);
          setUser(null);
        }
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        setIsLoggedIn,
        setUser,
        setIsLoading,
        propsValue,
        setPropsValue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
