import React, { useReducer, useState } from 'react';
import api from '../api';
import { setTokenAction, tokenReducer } from '../data/token';

interface User {
  username: string, 
  password: string
}

interface loginProp {
  setUpdate : React.Dispatch<React.SetStateAction<boolean>>
}

const isValidUser = (username: string, password: string): string | true => {
  if (username.length < 5) return "Username must be at least 5 letters";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only be alphanumeric with the exception of '_'"; 
  if (password.length < 8) return "Password must be at least 8 letters";
  return true;
}

const Login: React.FC<loginProp> = ({ setUpdate }) => {
  const [token, dispatch] = useReducer(tokenReducer, { token: '' });
  const [login, setLogin] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {

    /**
     * TODO:  
     * ! 1. instant verify useEffect login / signout
     * * 2. delete account
     * ? 3. json verify 
     * * 4. store documents uniquely based on user 
     */

    e.preventDefault();
    try {
      // * Valid user login
      const validUser = isValidUser(user.username, user.password)
      if (validUser !== true) throw new Error(validUser);

      const response = login 
        ? await api.post('/auth/login', user)
        : await api.post('/auth/register', user)
      
      console.log("Backend Response: ", response)

      const { token } = response.data;
      if (!token) throw new Error ("Undefined token")
      console.log("token: ", token, typeof token)
      dispatch(setTokenAction(token));
      setUpdate(true)

    } catch (err : any) {
      console.log("-----------------------------------")
      setError(true);
      if (err.response && err.response.data) setErrorMessage(err.response.data)
      else if (err.message) setErrorMessage(err.message);
      else setErrorMessage("An unexpected error occurred");
      console.log("-----------------------------------")
    }
  };

  const handleSwitch : () => void = () => {
    setLogin(!login)
    setError(false)
    setErrorMessage("")
  }


  return (
    <div>
      {login ? <h1 className="text-gray-50" >Login</h1> : <h1 className="text-gray-50" >Register</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-50" >Username:</label>
          <input 
            type="text"
            defaultValue={user.username}
            onFocus={(e) => e.target.value = ''}
            onClick={() => setError(false)}
            onBlur={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div>
          <label className="text-gray-50" >Password:</label>
          <input 
            type="password"
            defaultValue={user.password}
            onFocus={(e) => e.target.value = ''}
            onClick={() => setError(false)}
            onBlur={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {
          error
          ? <div className='text-red-500'>{errorMessage}</div>
          : <></>
        }
        {
          login 
          ? <div><button className="text-gray-50" type="submit">Login</button></div>
          : <div><button className="text-gray-50" type="submit">Register</button></div>
        }
      </form>
      {
        !login 
        ? <div><button className="text-gray-50" onClick={handleSwitch}>Switch to Login</button></div>
        : <div><button className="text-gray-50" onClick={handleSwitch}>Switch to Register</button></div>
      }
    </div>
  );
};

export default Login;
