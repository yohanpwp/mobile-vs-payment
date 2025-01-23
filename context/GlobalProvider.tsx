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
import { useQrHistoryStore } from "./QrHistoryStore";

interface GlobalContextValue {
  isLoggedIn: boolean;
  user: UserDataProps | null;
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserDataProps | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  propsValue: any;
  setPropsValue: Dispatch<SetStateAction<any>>;
  refresh: () => void; 
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
  refresh: () => {},
  logout: () => {}
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [propsValue, setPropsValue] = useState([]);

  const { fetchData } = useQrHistoryStore();
  const router = useRouter();
  const logout = async () => {
    await AsyncStorage.removeItem('@token');
    setUser(null);
    setPropsValue([]);
    setIsLoggedIn(false);
    router.replace("/(auth)/sign-in");
  }

  const refresh = () => {
    getCurrentUser()
      .then((res) => {
        if (res?.message) { 
          logout();
        } else if (res) {
          setIsLoggedIn(true);
          setUser(res);
          fetchData(res); // Fetch QR history data when user logs in
        } else {
          logout();
        }
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    setIsLoading(true);
    refresh();
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
        refresh,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
