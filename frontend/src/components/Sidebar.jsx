import {
  Link,
  useLocation,
} from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ menuItems }) => {

  const location = useLocation();



  return (

    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-top">

        <h2 className="logo">
          Smart Campus
        </h2>

      </div>



      {/* Navigation Menu */}
      <ul className="menu">

        {menuItems.map((item, index) => (

          <li
            key={index}
            className={
              location.pathname === item.path
                ? "active"
                : ""
            }
          >

            <Link
              to={item.path}
              className="sidebar-link"
            >
              {item.name}
            </Link>

          </li>

        ))}

      </ul>



      {/* Bottom Section */}
      <div className="sidebar-bottom">

        <p>
          Smart Campus AI
        </p>

      </div>

    </div>
  );
};

export default Sidebar;