// Login + Signup cards. Both share the gradient banner shell.
function AuthCard({ mode, onSwitch, onSubmit }) {
  const isSignup = mode === 'signup';
  const [role, setRole] = React.useState('Student');
  const [showPw, setShowPw] = React.useState(false);
  return (
    <section className="th-auth-page">
      <div className="th-auth-bg">
        <div className="th-blob th-blob-1" />
        <div className="th-blob th-blob-2" />
      </div>
      <div className="th-auth-card">
        <div className="th-auth-banner">
          <div className="th-auth-icon">{isSignup ? '🛡️' : '👋'}</div>
          <div className="th-auth-title">{isSignup ? 'Create an account' : 'Welcome back'}</div>
          <div className="th-auth-sub">{isSignup ? 'Enter your information below to get started' : 'Sign in to your account to continue'}</div>
        </div>
        <div className="th-auth-body">
          {isSignup && (
            <div className="th-field">
              <label>Full Name</label>
              <div className="th-input-wrap">
                <span className="th-input-icon">👤</span>
                <input type="text" placeholder="John Doe" defaultValue="" />
              </div>
            </div>
          )}
          <div className="th-field">
            <label>Email Address</label>
            <div className="th-input-wrap">
              <span className="th-input-icon">✉️</span>
              <input type="email" placeholder="you@example.com" defaultValue="alex@tutorhouse.app" />
            </div>
          </div>
          <div className="th-field">
            <label>Password</label>
            <div className="th-input-wrap">
              <span className="th-input-icon">🔒</span>
              <input type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" defaultValue="password123" />
              <button className="th-input-eye" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
            </div>
          </div>
          {isSignup && (
            <div className="th-field">
              <label>I am a...</label>
              <div className="th-role-row">
                {['Student','Tutor'].map(r => (
                  <button key={r}
                          className={"th-role" + (role === r ? " active" : "")}
                          onClick={() => setRole(r)}>{r}</button>
                ))}
              </div>
            </div>
          )}
          <button className="th-btn th-btn-cta th-btn-block" onClick={onSubmit}>
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
          <div className="th-auth-divider"><span>or continue with</span></div>
          <button className="th-btn th-btn-google th-btn-block">
            <svg width="16" height="16" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.79 2.71v2.26h2.9c1.7-1.56 2.69-3.86 2.69-6.61z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26a5.39 5.39 0 0 1-8.06-2.83H1v2.34A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.96 10.71a5.43 5.43 0 0 1 0-3.42V4.96H1a9 9 0 0 0 0 8.08l2.96-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 1 4.96l2.96 2.33C4.65 5.05 6.66 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>
          <p className="th-auth-foot">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <a onClick={onSwitch}>{isSignup ? 'Sign in' : 'Sign up'}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
window.AuthCard = AuthCard;
