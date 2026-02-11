import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/adminlogo.png";
import certificate from "../assets/Certified001.png";

const customDropdownMenuStyle = {
  minWidth: "100px",
  padding: "1px 0",
};

const customDropdownItemStyle = {
  fontSize: "0.9rem",
  padding: "5px 25px",
  height: "28px",
};

const NavbarTop = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const navItemStyle = {
    fontSize: "clamp(0.9rem, 0.9vw, 0.90rem)",
    whiteSpace: "nowrap",
    padding: "4px 12px"
  };

  const handleConfirmLogout = () => {
    sessionStorage.removeItem("admin");
    window.dispatchEvent(new Event("storage"));
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="bg-white border-bottom top-0 z-3">
        <div className="container-fluid d-flex justify-content-center align-items-center gap-3 py-2">
          <img
            src={logo}
            alt="SSSIT Logo - ISO Certified Computer Education Institute"
            width="300"
            height="80"
            decoding="async"
            className="rounded"
            style={{ objectFit: "contain", borderRadius: "20px" }}
          />
          <img
            src={certificate}
            alt="ISO 9001:2015 Certification - SSSIT Computer Education"
            width="300"
            height="80"
            decoding="async"
            className="rounded"
            style={{ objectFit: "contain", borderRadius: "20px" }}
          />
        </div>
      </header>

      {/* Navbar Section */}
      <nav className="navbar navbar-expand shadow-sm py-1 z-1 w-100 mt-0" role="navigation" aria-label="Main navigation">
        <div className="container-fluid justify-content-center">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex flex-wrap justify-content-center align-items-center gap-2">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/"
                  style={navItemStyle}
                  aria-label="Navigate to home page"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown nav-pills" >
                <NavLink
                  className="nav-link dropdown-toggle text-white fw-semibold"
                  to="#"
                  id="admissionDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-haspopup="true"
                  style={navItemStyle}
                >
                  Admission Enroll
                </NavLink>
                <ul
                  className="dropdown-menu text-center"
                  aria-labelledby="admissionDropdown"
                  role="menu"
                  style={customDropdownMenuStyle}
                >
                  <li role="none">
                    <NavLink className="dropdown-item" to="/enroll/new" style={customDropdownItemStyle} role="menuitem">
                      New Student
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="dropdown-item" to="/enroll/old" style={customDropdownItemStyle} role="menuitem">
                      Old Student
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="dropdown-item" to="/edit" style={customDropdownItemStyle} role="menuitem">
                      Edit Student
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="dropdown-item" to="/delete" style={customDropdownItemStyle} role="menuitem">
                      Delete Student
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/fees"
                  style={navItemStyle}
                >
                  Fee Receipts
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/search-id"
                  style={navItemStyle}
                >
                  Search Students
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/arrears"
                  style={navItemStyle}
                >
                  Arrears List
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/faculty"
                  style={navItemStyle}
                >
                  Faculty Details
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/add-course"
                  style={navItemStyle}
                >
                  Add Course
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/export"
                  style={navItemStyle}
                >
                  Export Details
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold"
                  to="/student-details"
                  style={navItemStyle}
                >
                  Break Details
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle text-white fw-semibold"
                  to="#"
                  id="examDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={navItemStyle}
                >
                  Exam Details
                </NavLink>
                <ul
                  className="dropdown-menu text-center"
                  aria-labelledby="examDropdown"
                  style={customDropdownMenuStyle}
                >
                  <li>
                    <NavLink className="dropdown-item" to="/add_exam_student" style={customDropdownItemStyle}>
                      Exam Details
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/exam_written_students"
                      style={customDropdownItemStyle}
                    >
                      Written Students
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/certificate_details" style={customDropdownItemStyle}>
                      Certificate Details
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <button
                  className="btn nav-link text-white fw-semibold"
                  onClick={() => setShowLogoutConfirm(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    ...navItemStyle,
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center admin-login-bg"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            fontFamily: "Poppins, sans-serif",
            overflow: "hidden",
            perspective: "1000px",
            zIndex: 9999,
          }}
        >
          {/* Falling Software Language Logos */}
          <div className="falling-logos-container">
            <div className="falling-logo-java">
              <div className="java-logo">☕</div>
              <div className="java-name">Java</div>
            </div>
            <div className="falling-logo-python">
              <div className="python-logo">🐍</div>
              <div className="python-name">Python</div>
            </div>
            <div className="falling-logo-office">
              <div className="office-logo">📊</div>
              <div className="office-name">MS Office</div>
            </div>
            <div className="falling-logo-react">
              <div className="react-logo">⚛️</div>
              <div className="react-name">React</div>
            </div>
            <div className="falling-logo-javascript">
              <div className="js-logo">JS</div>
              <div className="js-name">JavaScript</div>
            </div>
            <div className="falling-logo-html">
              <div className="html-logo">&lt;/&gt;</div>
              <div className="html-name">HTML5</div>
            </div>
            <div className="falling-logo-css">
              <div className="css-logo">{ }</div>
              <div className="css-name">CSS3</div>
            </div>
            <div className="falling-logo-node">
              <div className="node-logo">📦</div>
              <div className="node-name">Node.js</div>
            </div>
            <div className="falling-logo-database">
              <div className="db-logo">🗄️</div>
              <div className="db-name">SQL</div>
            </div>
            <div className="falling-logo-git">
              <div className="git-logo">🔀</div>
              <div className="git-name">Git</div>
            </div>
            <div className="falling-logo-docker">
              <div className="docker-logo">🐳</div>
              <div className="docker-name">Docker</div>
            </div>
            <div className="falling-logo-aws">
              <div className="aws-logo">☁️</div>
              <div className="aws-name">AWS</div>
            </div>
            <div className="falling-logo-linux">
              <div className="linux-logo">🐧</div>
              <div className="linux-name">Linux</div>
            </div>
            <div className="falling-logo-angular">
              <div className="angular-logo">🅰️</div>
              <div className="angular-name">Angular</div>
            </div>
            <div className="falling-logo-vue">
              <div className="vue-logo">💚</div>
              <div className="vue-name">Vue.js</div>
            </div>
            <div className="falling-logo-php">
              <div className="php-logo">🐘</div>
              <div className="php-name">PHP</div>
            </div>
            <div className="falling-logo-ruby">
              <div className="ruby-logo">💎</div>
              <div className="ruby-name">Ruby</div>
            </div>
          </div>

          <div
            className="admin-reset-modal"
            style={{
              width: "700px",
              padding: "20px",
              overflow: "hidden",
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg)",
         
             
            }}
          >
            <div className="text-center mb-3">
              <div className="logo-3d-container">
                <img
                  src={logo}
                  alt="Logo"
                  className="admin-logo"
                  style={{ height: 80, width: 300, objectFit: "contain" }}
                />
              </div>
            </div>

            <h3 className="text-center fw-bold admin-title">Confirm Logout</h3>
            <div className="subtitle-3d text-center mb-4">Are you sure you want to logout?</div>

            <div className="d-flex gap-3 justify-content-center ">
              <button
                className="btn btn-secondary admin-modal-btn"
                style={{ width: "150px" }}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger admin-modal-btn "
                style={{ width: "150px" }}
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarTop;
