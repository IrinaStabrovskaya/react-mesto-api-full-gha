import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import Header from "./Header";

const Register = (props) => {
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <AuthForm
        title="Регистрация"
        text="Зарегистрироваться"
        onAuth={props.onRegister}
      >
        <div className="auth__wrapper">
          <p className="auth__subtitle">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </div>
      </AuthForm>
    </>
  );
};
export default Register;
