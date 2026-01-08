import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/adminlogo.webp";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const DEFAULT_USERNAME = "admin";
  const DEFAULT_PASSWORD = "admin123";

  const savedUsername =
    localStorage.getItem("admin_username") || DEFAULT_USERNAME;
  const savedPassword =
    localStorage.getItem("admin_password") || DEFAULT_PASSWORD;

  const [resetUsername, setResetUsername] = useState(savedUsername);

  // Disable ALL scroll on the entire page
  useEffect(() => {
    document.body.style.overflow = "hidden";     // <--- MAIN FIX
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const showTempMessage = (msg) => {
    setModalMessage(msg);
    setTimeout(() => setModalMessage(""), 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === savedUsername && password === savedPassword) {
        sessionStorage.setItem(
          "admin",
          JSON.stringify({ username: savedUsername })
        );
        window.dispatchEvent(new Event("storage"));
        navigate("/", { replace: true });
      } else {
        setError("❌ Invalid username or password.");
      }
      setLoading(false);
    }, 600);
  };

  const handleSendOtp = () => {
    if (!email.trim()) {
      showTempMessage("Please enter your email.");
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){2,}@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      showTempMessage("Enter a valid Gmail address (example@gmail.com).");
      return;
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otpCode);

    setModalMessage(`OTP sent successfully! ( ${otpCode})`);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setResetUsername(savedUsername);
      setModalMessage("OTP verified successfully!");
      setStep(3);
    } else {
      showTempMessage("Incorrect OTP. Try again.");
    }
  };

  const handlePasswordReset = () => {
    if (!resetUsername.trim()) {
      showTempMessage("Username cannot be empty.");
      return;
    }
    if (!newPassword.trim()) {
      showTempMessage("Password cannot be empty.");
      return;
    }

    localStorage.setItem("admin_username", resetUsername);
    localStorage.setItem("admin_password", newPassword);

    setModalMessage("Login details updated successfully!");

    setTimeout(() => {
      setShowModal(false);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setModalMessage("");
    }, 1000);
  };

  return (
    <div
      className="w-100 h-100 d-flex justify-content-center align-items-center admin-login-bg"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
        perspective: "1000px",
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
        className="p-4 admin-login-card"
        style={{
          width: "480px",
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

        <h3 className="text-center fw-bold admin-title">Hello Admin!</h3>
        <div className="subtitle-3d text-center mb-4">Welcome to the Future</div>

        {/* LOGIN */}
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <label className="fw-semibold">Username</label>
            <input
              type="text"
              className="form-control shadow-sm admin-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control shadow-sm admin-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 shadow admin-login-btn"
            disabled={loading}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
          >
            <span className="btn-text-3d">{loading ? "Logging in..." : "Login"}</span>
          </button>
        </form>

        {error && (
          <p className="text-center text-danger mt-2 fw-semibold admin-error-message">{error}</p>
        )}

        <div className="text-center mt-2">
          <button
            className="btn btn-link fw-semibold admin-forgot-link"
            onClick={() => setShowModal(true)}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* RESET MODAL */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            className="bg-white rounded shadow admin-reset-modal"
            style={{
              width: "400px",
              padding: "20px",
              overflow: "hidden",
            }}
          >
            <h4 className="fw-bold text-center">Reset Login Details</h4>

            {modalMessage && (
              <p className="text-center fw-semibold text-primary admin-success-message">
                {modalMessage}
              </p>
            )}

            {step === 1 && (
              <>
                <label className="fw-semibold">Enter your Gmail</label>
                <input
                  type="email"
                  className="form-control mb-3 admin-input"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary w-100 admin-modal-btn" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <label className="fw-semibold">Enter OTP</label>
                <input
                  type="text"
                  className="form-control mb-3 admin-input"
                  placeholder="4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button className="btn btn-success w-100 admin-modal-btn" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <label className="fw-semibold">New Username</label>
                <input
                  type="text"
                  className="form-control mb-3 admin-input"
                  value={resetUsername}
                  onChange={(e) => setResetUsername(e.target.value)}
                />

                <label className="fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control mb-3 admin-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  className="btn btn-primary w-100 admin-modal-btn"
                  onClick={handlePasswordReset}
                >
                  Update Login Details
                </button>
              </>
            )}

            <button
              className="btn btn-danger w-100 mt-3 admin-modal-btn"
              onClick={() => {
                setShowModal(false);
                setStep(1);
                setModalMessage("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
