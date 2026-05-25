import {withRouter} from 'react-router-dom'
import './index.css'
import { FaRegUser } from "react-icons/fa";
import Cookies from "js-cookie";

const Header = props => {
  const {name} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const { history } = props;
    history.replace("/");
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <h1 className="header-main-heading">Quizora</h1>
        <div className="user-details-logout-container">
          <div className="profile-iamge-name-container">
            <div><FaRegUser /></div>
            <h1 className="name-heading">{name}</h1>
          </div>
          <button type="button" className="logout-desktop-btn" onClick={onLogout}>
            Logout
          </button>
          <button type="button" className="logout-mobile-btn">
            <img
              src="https://res.cloudinary.com/dgkjelk9d/image/upload/v1779389755/logout-icon_v9ne4d.webp"
              alt="logout icon"
              className="logout-icon"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)


