import trol from '../images/trol.png';

function Header(){
    return(
        <header>
            <img src={trol} className="trolImg" alt="trol-logo-img" />
            <h3 className='logoText'>Meme Generator</h3>
            <p>React</p>
        </header>
    )
}

export default Header;