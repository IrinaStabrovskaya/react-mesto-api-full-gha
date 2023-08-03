import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import Header from "./Header";

const Login = (props) => {
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <AuthForm
        title="Вход"
        text="Войти"
        onAuth={props.onAuthorization}
        setUser={props.setUser}
      />
    </>
  );
};

export default Login;
