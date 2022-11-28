import { Auth } from '@passvault/shared-models';
import { LocalStorage } from '@passvault/shared-services';
import { User } from '@passvault/shared-types';
import { createContext, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type AuthContextState = {
  isAuthenticated: boolean;
  user?: User;
};

type AuthContextValue = [
  state: AuthContextState,
  actions: {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    getUser: () => Promise<void>;
  }
];

const defaultState: AuthContextState = {
  isAuthenticated: !!LocalStorage.get('token'),
};

const AuthContext = createContext<AuthContextValue>([
  defaultState,
  {
    login: async () => undefined,
    logout: async () => undefined,
    signup: async () => undefined,
    getUser: async () => undefined,
  },
]);

export const AuthProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<AuthContextState>(defaultState);

  const login = async (email: string, password: string) => {
    await Auth.login(email, password);
    setState((prev) => ({ ...prev, isAuthenticated: true }));
  };

  const logout = async () => {
    // TODO: implement logout
  };

  const signup = async (email: string, password: string, name: string) => {
    await Auth.signup(email, password, name);
    setState((prev) => ({ ...prev, isAuthenticated: true }));
  };

  const getUser = async () => {
    const userRes = await Auth.getUser();
    setState((prev) => ({ ...prev, user: userRes.data }));
  };

  return (
    <AuthContext.Provider value={[state, { login, logout, signup, getUser }]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
