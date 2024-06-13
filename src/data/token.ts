export interface AuthState {
  token: string;
}

type AuthAction =
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'CLEAR_TOKEN' };

export const tokenReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_TOKEN":
      state.token = action.payload;
      localStorage.setItem('token', state.token);
      return state;
    case "CLEAR_TOKEN":
      state.token = '';
      localStorage.clear();
      return state;
    default:
      return state;
  }
};

export const setTokenAction = (token: string): AuthAction => ({ type: 'SET_TOKEN', payload: token });
export const clearTokenAction = (): AuthAction => ({ type: 'CLEAR_TOKEN' });
