import './header.scss'


function Header({ children, title }) {

    return (
        <>
            <div className="container">
                <header className="header">
                    <h1 className="header__title">{title}</h1>
                    <div className="header__btns">
                        {children}
                    </div>
                </header>
            </div>
        </>
    );
}

export default Header;
