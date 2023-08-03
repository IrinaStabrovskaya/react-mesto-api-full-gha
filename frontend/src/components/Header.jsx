const Header = (props) => {
    
  return (    
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container">
        {props.children}           
      </div>
    </header>
  );
}

export default Header;
