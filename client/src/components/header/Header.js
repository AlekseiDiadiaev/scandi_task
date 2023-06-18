import './header.scss'
import Button from '../button/Button'


function Header({ children }) {

    return (
        <>
            <div className="container">
                <header className="header">
                    <h1 className="header__title">{children}</h1>
                    <div className="header__btns">
                        <Button>ADD</Button>
                        <Button>MASS DELETE</Button>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Header;
