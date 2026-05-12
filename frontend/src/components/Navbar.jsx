import "./Navbar.css";

const Navbar = ({ title }) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };



  return (

    <div className="navbar">

      <h2>{title}</h2>

      <div className="navbar-right">

        <span className="username">
          {user?.fullName}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;