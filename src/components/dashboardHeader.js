import logo from '../assets/svgs/logo-blue.svg';
// import logo from '../assets/img/logo.png'
import avatar from '../assets/img/avatar.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const DashboardHeader = () => {
    const { userData } = useSelector((state) => state.auth);
    const getData=JSON.parse(localStorage.getItem('item'));
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary custom-nav px-3">
            <div className="container-fluid">
                <button className="nav-link px-3 text-white d-lg-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    Open
                </button>
                <Link to={"/"} className="navbar-brand" >
                    <img src={logo} width="150px" alt='logo' />
                </Link>
                <div className="navbar" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li></li>
                    </ul>
                    <div className="d-flex">
                        <div className="dropdown">
                            <Link to="/edit-profile" className="nav-link  nav-user d-flex align-items-center gap-2"  role="button" aria-haspopup="false" aria-expanded="false">
                                <span className="account-user-avatar mr-3">
                                    <img src={avatar} alt="User Avatar" width="36" className="rounded-circle" />
                                </span>
                                <span>
                                    <h6 className="my-0 text-light">{getData?.userData?.name}</h6>
                                </span>
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default DashboardHeader;