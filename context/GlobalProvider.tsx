import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { Models } from "react-native-appwrite";
import { getCurrentUser } from "@/lib/appwrite";

interface GlobalContextValue {
  isLoggedIn: boolean;
  user: Models.Document | null;
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<Models.Document  | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextValue>({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoggedIn: () => {}, // Default no-op function to satisfy the type
  setUser: () => {},
  setIsLoading: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
