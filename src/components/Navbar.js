import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="position-relative">
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url(https://plus.unsplash.com/premium_vector-1683141228251-e07ff7ab1073?bg=FFFFFF&q=80&w=2966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        ></div>
        <div
          className="container d-flex flex-column"
          style={{ minHeight: "100vh" }}
        >
          <nav className="navbar navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand " to={"/"}>
              BABY REINDEER
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
            >
              <ul className="navbar-nav">
                <li className="nav-item nav-link me-4 active">
                  <NavLink className="nav-item nav-link me-4 active" to={"/"}>
                    Home
                    {/* <span className="sr-only">(current)</span> */}
                  </NavLink>
                </li>
                <li className="nav-item nav-link me-4 active">
                  <NavLink className="nav-item nav-link me-4" to={"/products"}>
                    Product
                  </NavLink>
                </li>
                <NavLink
                  className="nav-item nav-link me-4 mt-2 active"
                  to={"/cart"}
                >
                  <i className="bi bi-cart4 mt-5"></i>
                </NavLink>
              </ul>
            </div>
          </nav>
          <div className="row justify-content-center my-auto">
            <div className="col-md-4 text-center">
              <h2>BABY REINDEER</h2>
              <p className="text-muted mb-0">
                In the realm of sight, where dreams take flight <br />
                A vision crystalline, pure and bright <br />
                Like a reindeer's gaze, through the darkest night <br />
                Our eyewear brings clarity, a guiding light
              </p>
              <button className="btn btn-dark rounded-0 mt-6">
                EXPLORE MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
