import React, { ChangeEvent, FormEvent } from "react";
import './mainContentStyles.css';
import { GitHub, LinkedIn, WebStories } from "@mui/icons-material";

interface SignInState {
  name:string;
  email: string;
  password: string;
}

interface SignInFormProps {
  state: SignInState;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ state, handleChange, handleOnSubmit }) => {
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="https://tamanjicourage.com" className="social">
            <WebStories />
          </a>
          <a href="http://www.linkedin.com/in/tamanji-courage-7a2963172" className="social">
            <LinkedIn />
          </a>
          <a href="https://github.com/CypherPrime" className="social">
            <GitHub/>
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
