import { ReactNode, createContext, useEffect, useReducer } from "react";

interface User {
  message: string;
  userName: string;
  email: string;
  _id: string;
}
interface AppState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
type AuthAction = { type: "LOGIN_SUCCESS"; payload: User } | { type: "LOGOUT" };

const getUserFromLocalStorage = (): User | null => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

const INITIAL_STATE: AppState = {
  // user: JSON.parse(localStorage.getItem("user") || null),
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

// export const AuthContext = createContext(INITIAL_STATE);
export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  error: string | null;
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: null,
  loading: false,
  error: null,
  dispatch: () => {},
});

const AuthReducer = (state: AppState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
