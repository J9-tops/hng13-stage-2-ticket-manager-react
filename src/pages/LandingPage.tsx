import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const LandingPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const userJSON = localStorage.getItem("current_user");
    if (userJSON) {
      try {
        setCurrentUser(JSON.parse(userJSON));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);
  return (
    <div className="app">
      <div className="page-wrapper">
        <div className="container-main">
          <Header />

          <main>
            <section className="hero-section">
              <div className="wave-background">
                <svg
                  className="wave"
                  viewBox="0 0 1440 320"
                  preserveAspectRatio="none"
                >
                  <path
                    fill="#E2E8F0"
                    fillOpacity="0.4"
                    d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,128C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                  ></path>
                </svg>
                <svg
                  className="wave wave-2"
                  viewBox="0 0 1440 320"
                  preserveAspectRatio="none"
                >
                  <path
                    fill="#E2E8F0"
                    fillOpacity="0.3"
                    d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                  ></path>
                </svg>
              </div>

              <div className="decorative-circle circle-1"></div>
              <div className="decorative-circle circle-2"></div>
              <div className="blob blob-1"></div>
              <div className="blob blob-2"></div>
              <div className="hero-content">
                <h1 className="hero-title">
                  Effortless Ticket Management for Modern Teams
                </h1>
                <p className="hero-subtitle">
                  Track, organize, and resolve customer requests
                  effortlessly—your ultimate tool for seamless support.
                </p>
                {!currentUser && (
                  <div className="hero-buttons">
                    <Link to="/sign-up" className="btn btn-primary">
                      <span>Get Started</span>
                    </Link>
                    <Link to="/sign-in" className="btn btn-secondary">
                      <span>Login</span>
                    </Link>
                  </div>
                )}
              </div>
            </section>

            <section className="features-section">
              <div className="features-container">
                <div className="features-header">
                  <h2 className="features-label">Why Choose TicketFlow?</h2>
                  <p className="features-title">
                    Everything you need to deliver exceptional support
                  </p>
                  <p className="features-description">
                    Our platform is designed to help you manage customer support
                    with ease and efficiency, from the first contact to
                    resolution.
                  </p>
                </div>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <span className="material-symbols-outlined">
                        checklist
                      </span>
                    </div>
                    <h3 className="feature-title">Streamlined Workflow</h3>
                    <p className="feature-description">
                      Organize and prioritize tickets to ensure timely responses
                      and resolutions. Automate repetitive tasks and focus on
                      what matters.
                    </p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <h3 className="feature-title">Real-time Collaboration</h3>
                    <p className="feature-description">
                      Work together with your team in real-time to solve
                      customer issues faster. Leave internal notes and see who's
                      working on what.
                    </p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <span className="material-symbols-outlined">
                        insights
                      </span>
                    </div>
                    <h3 className="feature-title">Powerful Analytics</h3>
                    <p className="feature-description">
                      Gain valuable insights into your support performance with
                      our detailed analytics. Track key metrics and improve your
                      service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="cta-section">
              <div className="container">
                <div className="cta-box">
                  <h2>Ready to Transform Your Support?</h2>
                  <p>
                    Join thousands of teams already using TicketFlow to deliver
                    amazing support experiences.
                  </p>
                  <Link to="/sign-up" className="btn btn-large">
                    Get Started Free
                  </Link>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
