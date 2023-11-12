import logo from '../images/logo.svg'
// import { pageLinks, socialLinks } from '../data'
// import PageLinks from './PageLinks'
// import SocialLink from './SocialLink'
const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='nav-center'>
                <div className='nav-header'>
                    <img src={logo} className='nav-logo' alt='backroads' />
                    <button type='button' className='nav-toggle' id='nav-toggle'>
                    <i className='fas fa-bars'></i>
                    </button>
                </div>


                <ul class="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Tours</a></li>
                </ul>

                {/* <PageLinks parentClass='nav-links' itemClass='nav-link' /> */}

                <ul class="nav-icons">
                    <li><a href="https://github.com/boyeonJ"><i class="fa-brands fa-github"></i></a></li>
                    <li><a href="https://velog.io/@boyeon_jeong"><i class="fa-brands fa-vimeo-v"></i></a></li>
                </ul>


                {/* <ul className='nav-icons'>
                    {socialLinks.map((link) => {
                    return <SocialLink {...link} key={link.id} itemClass='nav-icon' />
                    })}
                </ul> */}
            </div>
        </nav>
    )
}
export default Navbar

