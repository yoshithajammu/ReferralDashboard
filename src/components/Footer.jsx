const Footer = () => {
  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Brand section */}
          <div className="col-12 col-md-4 text-center text-md-start mb-2 mb-md-0">
            <span className="footer-brand">Go Business</span>
          </div>
          <div className="col-12 col-md-4 text-center mb-2 mb-md-0">
            <nav className="footer-nav" aria-label="Footer">
              <a href="#about">About</a>
              <a href="#privacy">Privacy</a>
            </nav>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end">
            <span className="small text-muted">
              &copy; 2024 Go Business
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
