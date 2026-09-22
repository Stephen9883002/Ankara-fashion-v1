import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import Categories from './components/sections/Categories.jsx';
import Featured from './components/sections/Featured.jsx';
import BestSeller from './components/sections/BestSeller.jsx';
import Gallery from './components/sections/Gallery.jsx';
import NewArrival from './components/sections/NewArrival.jsx';
import AboutBrand from './components/sections/AboutBrand.jsx';
import TrustSection from './components/sections/TrustSection.jsx';
import WhyUs from './components/sections/WhyUs.jsx';
import CategoryProducts from './components/sections/CategoryProducts.jsx';
import Footer from './components/layout/Footer.jsx';
import CardPanel from './components/modals/CardPanel.jsx';
import CheckoutModal from './components/modals/CheckoutModal.jsx';
import AuthModal from './components/modals/AuthModal.jsx';
import product from './data/product.js';
function App() {
	const [activeCategory, setActiveCategory] = useState('');
	const [scrollSignal, setScrollSignal] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	const [scrollTarget, setScrollTarget] = useState(null);
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const cartTotal = cartItems.reduce(
		(total, item) => total + item.numericPrice * item.qty,
		0,
	);
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	const [checkoutItems, setCheckoutItems] = useState([]);
	const [authView, setAuthView] = useState(null);

	function openCheckoutFromCart() {
		if (cartItems.length === 0) {
			alert('Your cart is Empty');
			return;
		}
		setCheckoutItems(cartItems);
		setIsCheckoutOpen(true);
	}
	function closeCheckout() {
		setIsCheckoutOpen(false);
	}
	function openCheckoutWithItem(product) {
		const numericPrice =
			Number.parseInt(product.price.replace(/[^\d]/g, ''), 10) || 0;
		setCheckoutItems([{ ...product, qty: 1, numericPrice }]);
		setIsCheckoutOpen(true);
	}

	function toggleCart() {
		setIsCartOpen((prev) => !prev);
	}
	function addToCart(newItem) {
		setCartItems((prevItems) => {
			const numericPrice =
				Number.parseInt(newItem.price.replace(/[^\d]/g, ''), 10) || 0;

			const existing = prevItems.find((item) => item.id === newItem.id);
			if (existing) {
				return prevItems.map((item) =>
					item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item,
				);
			} else {
				return [...prevItems, { ...newItem, qty: 1, numericPrice }];
			}
		});
	}
	function increaseQty(id) {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, qty: item.qty + 1 } : item,
			),
		);
	}

	function decreaseQty(id) {
		setCartItems((prevItems) => {
			const updated = prevItems.map((item) =>
				item.id === id ? { ...item, qty: item.qty - 1 } : item,
			);
			return updated.filter((item) => item.qty > 0);
		});
	}

	function handleSearch(term) {
		setSearchTerm(term);
		const matches = product.filter((p) =>
			p.title.toLowerCase().includes(term.toLowerCase()),
		);
		if (matches.length === 0) {
			alert('No Products found Matching Your Search.');
		}
	}
	useEffect(() => {
		if (!searchTerm) {
			setScrollTarget(null);
			return;
		}
		const match = product.find((p) =>
			p.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		if (match) {
			if (match.section === 'category') {
				setActiveCategory(match.category);
			}
			setScrollTarget(match.id);
		} else {
			setScrollTarget(null);
		}
	}, [searchTerm]);

	useEffect(() => {
		if (!scrollTarget) return;
		const el = document.getElementById(`product-${scrollTarget}`);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [scrollTarget, activeCategory]);

	function handleCategoryClick(id) {
		setActiveCategory(id);
		setScrollSignal((prev) => prev + 1);
	}
	return (
		<>
			<Navbar
				onSearch={handleSearch}
				cartItems={cartItems}
				onToggleCart={toggleCart}
				onSetAuthView={setAuthView}
			/>
			<Hero />
			<Categories onCategoryClick={handleCategoryClick} />
			<Featured
				searchTerm={searchTerm}
				onAddToCart={addToCart}
				onBuyNow={openCheckoutWithItem}
			/>
			<BestSeller
				onBuyNow={openCheckoutWithItem}
				searchTerm={searchTerm}
				onAddToCart={addToCart}
			/>
			<Gallery />
			<NewArrival
				onBuyNow={openCheckoutWithItem}
				searchTerm={searchTerm}
				onAddToCart={addToCart}
			/>
			<AboutBrand />
			<TrustSection />
			<WhyUs />
			<CategoryProducts
				activeCategory={activeCategory}
				scrollSignal={scrollSignal}
				searchTerm={searchTerm}
				onAddToCart={addToCart}
				onBuyNow={openCheckoutWithItem}
			/>
			<CardPanel
				cartItems={cartItems}
				isCartOpen={isCartOpen}
				onToggleCart={toggleCart}
				onIncreaseQty={increaseQty}
				onDecreaseQty={decreaseQty}
				cartTotal={cartTotal}
				onOpenCheckout={openCheckoutFromCart}
			/>
			<CheckoutModal
				isCheckoutOpen={isCheckoutOpen}
				checkoutItems={checkoutItems}
				onClose={closeCheckout}
			/>
			<AuthModal onSetAuthView={setAuthView} authView={authView} />
			<Footer />
		</>
	);
}
export default App;
