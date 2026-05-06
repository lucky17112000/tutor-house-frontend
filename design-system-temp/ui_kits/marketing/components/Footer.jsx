// Footer
function Footer() {
  return (
    <footer className="th-footer">
      <div className="th-container">
        <div className="th-footer-grid">
          <div>
            <div className="th-brand th-footer-brand">Tutor House</div>
            <p className="th-footer-tag">Empowering minds, shaping futures.</p>
          </div>
          <div>
            <div className="th-footer-h">Product</div>
            <a>Browse Tutors</a><a>How it Works</a><a>Pricing</a>
          </div>
          <div>
            <div className="th-footer-h">Company</div>
            <a>About</a><a>Blog</a><a>Careers</a>
          </div>
          <div>
            <div className="th-footer-h">Legal</div>
            <a>Terms</a><a>Privacy</a><a>Cookies</a>
          </div>
        </div>
        <div className="th-footer-bot">© 2024 Tutor House. All rights reserved.</div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
