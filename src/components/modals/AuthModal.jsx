function AuthModal(props) {
	return (
		<div
			id="authModal"
			className={`payment-modal ${props.authView ? 'is-open' : ''}`}
			aria-hidden={props.authView ? 'false' : 'true'}
			onClick={(e) => {
				if (e.target === e.currentTarget) props.onSetAuthView(null);
			}}
		>
			<div className="checkout-container">
				<div className="checkout-header">
					<button
						className="close-modal"
						type="button"
						id="authCloseBtn"
						aria-label="Close auth modal"
						onClick={() => props.onSetAuthView(null)}
					>
						&times;
					</button>
				</div>

				<div
					className={`auth-form ${props.authView === 'signup' ? '' : 'hidden'}`}
					id="signupForm"
				>
					<h2>Create Your Account</h2>
					<p>Join Ankara Fashion today</p>

					<form
						id="signupFormElement"
						onSubmit={(e) => {
							e.preventDefault();
							alert('Signed up successfully');
						}}
					>
						<input
							type="text"
							id="signupName"
							placeholder="Full Name"
							aria-label="Full Name"
							required
						/>
						<input
							type="email"
							id="signupEmail"
							placeholder="Email Address"
							aria-label="Email Address"
							required
						/>
						<input
							type="password"
							id="signupPassword"
							placeholder="Password"
							aria-label="Password"
							required
						/>
						<input
							type="password"
							id="signupConfirmPassword"
							placeholder="Confirm Password"
							aria-label="Confirm Password"
							required
						/>
						<button type="submit" id="createAccountBtn">
							Create Account
						</button>
					</form>

					<p className="auth-switch">
						Already have an account?
						<button
							type="button"
							className="auth-link"
							id="showLoginBtn"
							onClick={() => props.onSetAuthView('login')}
						>
							Log In
						</button>
					</p>
				</div>

				<div
					className={`auth-form ${props.authView === 'login' ? '' : 'hidden'}`}
					id="loginForm"
				>
					<h2>Welcome Back</h2>
					<p>Sign in to your account</p>

					<form
						id="loginFormElement"
						onSubmit={(e) => {
							e.preventDefault();
							alert('Feature coming sooon!');
						}}
					>
						<input
							type="email"
							id="loginEmail"
							placeholder="Email Address"
							aria-label="Email Address"
							required
						/>
						<input
							type="password"
							id="loginPassword"
							placeholder="Password"
							aria-label="Password"
							required
						/>
						<button type="submit" id="signInBtn">
							Sign In
						</button>
					</form>

					<p className="auth-switch">
						Don't have an account?
						<button
							type="button"
							className="auth-link"
							id="showSignupBtn"
							onClick={() => props.onSetAuthView('signup')}
						>
							Sign Up
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
export default AuthModal;
