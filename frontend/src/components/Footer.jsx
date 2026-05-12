import "./Footer.css";

const Footer = () => {

  const year = new Date().getFullYear();

  return (

    <footer className="footer">

      <div className="footer-content">

        {/* Left */}
        <p>
          © {year} Smart Campus AI.
          All Rights Reserved.
        </p>



        {/* Right */}
        <div className="footer-info">

          <span>
            support@smartcampus.com
          </span>

          <span>
            +91 9876543210
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;