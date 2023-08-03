import { useState } from "react";
import { useLocation } from "react-router-dom";

const AuthForm = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    props.onAuth(email, password);
    if (location.pathname === "/sign-in") {
      props.setUser(email);
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__title">{`${props.title}`}</h1>
      <form
        className="auth__form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          className="auth__input"
          required
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          autoComplete="email"
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          className="auth__input"
          required
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          autoComplete="password"
          placeholder="Пароль"
          onChange={handleChange}
        ></input>
        <button className="auth__btn-submit btn-hover" type="submit">
          {`${props.text}`}
        </button>
        {props.children}
      </form>
    </div>
  );
};

export default AuthForm;
