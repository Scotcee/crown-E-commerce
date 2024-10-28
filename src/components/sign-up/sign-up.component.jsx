import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../../pages/custom-button/custom-button.component";
import {
  signUpWithEmailAndPassword,
  createUserProfileDocument,
} from "./../../firebase/firebase.utils";
import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: null, // For storing error messages
      loading: false, // For managing loading state
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords don't match" });
      return;
    }

    this.setState({ loading: true, error: null }); // Start loading state

    try {
      const { user } = await signUpWithEmailAndPassword(email, password); // Use the new function
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: null, // Clear any previous errors
        loading: false, // Reset loading state
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false }); // Update state with error message
      console.error(error);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, error, loading } =
      this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message */}
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
