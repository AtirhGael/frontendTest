// File: App.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import '../component/mainContentStyles.css';
import RegisterForm from "../component/Register";
import LoginForm from "../component/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser, signupUser } from "../redux/data/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


interface SignUpState {
  name: string;
  email: string;
  password: string;
}
interface SignInState {
  name: string;
  email: string;
  password: string;
}

const Authentication: React.FC = () => {

  const [type, setType] = useState<string>("signIn");

  const [state, setState] = useState<SignInState>({
    name: 'cypher prime',
    email: "",
    password: ""
  });
  const [registerState, setregisterState] = useState<SignUpState>({
    name: "",
    email: "",
    password: ""
  });
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

  

  const navigate = useNavigate()

  const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginOnSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const { email, password } = state;

    dispatch(loginUser({ email, password }))
    if (error !== null) {
      toast.error(error)
    } else {
      toast.success('Successfully loggenIn!!!! Enjoy')
      console.log(user);
      setState({
        name: '',
        email: "",
        password: ""
      })
      navigate('/dashboard')

    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setregisterState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const { name, email, password } = registerState;
    dispatch(signupUser({ name, email, password }));
    if (isAuthenticated === false) {
      toast.error(error)
      console.log('====================================');
      console.log(isAuthenticated);
      console.log('====================================');
    } else {
      toast.success('Successfully Registered!!! Enjoy')
      console.log('====================================');
      console.log(isAuthenticated);
      console.log('====================================');
      setregisterState({
        name: "",
        email: "",
        password: ""
      })
      navigate('/dashboard')

    }
  };

  const handleOnClick = (text: string): void => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass: string =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="login-container">
      <div className={containerClass} id="container" >
        <RegisterForm
          state={registerState}
          handleChange={handleChange}
          handleOnSubmit={handleOnSubmit}
        />
        <LoginForm
          state={state}
          handleChange={handleLoginChange}
          handleOnSubmit={handleLoginOnSubmit}
        />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello ENNOV!</h1>
              <p>
                Test submission by <b>TAMANJI COURAGE</b>
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                {loading ? 'Loading' : 'Sign In'}

              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello ENNOV!</h1>
              <p>Test submission by <b>TAMANJI COURAGE</b></p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                {loading ? 'Loading' : 'Sign Up'}

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
