import { useState, useRef, useEffect } from 'react';

function Navbar(props) {
	const [inputValue, setInputValue] = useState('');
	const cartCount = props.cartItems.reduce(
		(total, item) => total + item.qty,
		0,
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navWrapperRef = useRef(null);

	useEffect(() => {
		function handleOutsideClick(e) {
			if (
				isMenuOpen &&
				navWrapperRef.current &&
				!navWrapperRef.current.contains(e.target)
			) {
				setIsMenuOpen(false);
			}
		}
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [isMenuOpen]);

	return (
		<header className="navbar">
			<div className="nav-container">
				<h1 className="logo">Ankara Fashion</h1>
				<h2 className="logo-mobile">ANF-Hub</h2>

				<div className="search-box">
					<input
						id="searchInput"
						type="text"
						placeholder="Search"
						aria-label="Search products"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') props.onSearch(inputValue);
						}}
					/>
					<button
						id="searchBtn"
						type="button"
						aria-label="Search"
						onClick={() => props.onSearch(inputValue)}
					>
						<i className="fas fa-search"></i>
					</button>
				</div>
				<div ref={navWrapperRef}>
					<label htmlFor="menu-toggle" className="hamburger">
						☰
					</label>

					<input
						type="checkbox"
						id="menu-toggle"
						className="menu-toggle"
						checked={isMenuOpen}
						onChange={() => setIsMenuOpen(!isMenuOpen)}
					/>

					<nav className="nav-links" aria-label="Main navigation">
						<a href="#hero" onClick={() => setIsMenuOpen(false)}>
							Home
						</a>
						<a href="#categories" onClick={() => setIsMenuOpen(false)}>
							Categories
						</a>
						<a href="#featured" onClick={() => setIsMenuOpen(false)}>
							Collections
						</a>
						<a href="#best-sellers" onClick={() => setIsMenuOpen(false)}>
							Best Sellers
						</a>
						<a href="#about" onClick={() => setIsMenuOpen(false)}>
							About
						</a>
						<a href="#contact" onClick={() => setIsMenuOpen(false)}>
							Contact
						</a>
						<button
							className="sing-up"
							id="signUpBtn"
							onClick={() => props.onSetAuthView('signup')}
						>
							Sign-up
						</button>
					</nav>
				</div>

				<button
					className="cart-icon"
					type="button"
					aria-label="Open cart"
					onClick={props.onToggleCart}
				>
					<span>🛒</span>
					<span id="cart-count">{cartCount}</span>
				</button>
			</div>
		</header>
	);
}

export default Navbar;
