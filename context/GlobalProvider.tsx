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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GlobalContextValue {
  isLoggedIn: boolean;
  user: UserDataProps | null;
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserDataProps | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  propsValue: any;
  setPropsValue: Dispatch<SetStateAction<any>>;
  logout: () => void;
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
  logout: () => {}
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [propsValue, setPropsValue] = useState([]);

  const router = useRouter();
  const logout = async () => {
    await AsyncStorage.removeItem('@token');
    setUser(null);
    setIsLoggedIn(false);
    router.push("/(auth)/sign-in");
  }

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res.message) { 
          logout();
        } else if (res) {
          setIsLoggedIn(true);
          setUser(res);
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
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
