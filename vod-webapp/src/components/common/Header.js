import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="container center">
    <nav className="foo">
      <div className="text-center">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "8vh",
            marginBottom: "-40px",
            marginLeft: "15px"
          }}
        ></div>

        <ul>
          <li>
            <h1 style={{ marginTop: -4 }}>
              <a>
                <Link to="/">
                  <strong> VodWebApp</strong>{" "}
                </Link>
              </a>
            </h1>
          </li>
          <li>
            <h2>
              <a>
                <Link to="/">Home</Link>
              </a>
            </h2>
          </li>

          <li>
            <h2>
              <a>
                <Link to="/history">History</Link>
              </a>
            </h2>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;
