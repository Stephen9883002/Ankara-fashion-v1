function CheckoutModal(props) {
	return (
		<section id="checkout-section">
			<div
				id="paymentModal"
				className={`payment-modal ${props.isCheckoutOpen ? 'is-open' : ''}`}
				aria-hidden={props.isCheckoutOpen ? 'false' : 'true'}
				onClick={(e) => {
					if (e.target === e.currentTarget) props.onClose();
				}}
			>
				<div className="checkout-container">
					<div className="checkout-header">
						<button
							className="close-modal"
							type="button"
							aria-label="Close checkout"
							onClick={props.onClose}
						>
							&times;
						</button>
						<h2>Secure Checkout</h2>
						<p>Complete your order using Bank Transfer</p>
					</div>

					<div className="checkout-grid">
						<div className="billing-details">
							<h3>Billing Details</h3>
							{/* <div className="contact-links">
								<a href="mailto:ankarafashion@gmail.com">
									ankarafashion@gmail.com
								</a>
								<a href="tel:+234555555555">+234-555-555-555</a>
							</div> */}
							<input
								type="text"
								placeholder="Full Name"
								aria-label="Full Name"
							/>
							<input
								type="email"
								placeholder="Email Address"
								aria-label="Email Address"
							/>
							<input
								type="tel"
								placeholder="Phone Number"
								aria-label="Phone Number"
							/>
							<input
								type="text"
								placeholder="Delivery Address"
								aria-label="Delivery Address"
							/>
						</div>

						<div className="payment-details">
							<div className="recommended-tag">❌ Not Available</div>
							<h3>Bank Transfer</h3>
							<p>
								<strong>Bank:</strong> GTBank
							</p>
							<p>
								<strong>Account Name:</strong> Ankara Fashion
							</p>
							<p>
								<strong>Account Number:</strong> Not Available
							</p>
							<p>
								After succesfull payment, order confirmation will be sent to the
								email address provided with order number.
							</p>
							<input
								type="text"
								placeholder="Reference"
								aria-label="Reference"
							/>
						</div>

						<div className="cart-summary">
							<h3>Order Summary</h3>
							<div className="recommended-tag">Recommended ✔</div>
							<div id="checkout-cart-items">
								{props.checkoutItems.map((item) => (
									<div className="cart-item" key={item.id}>
										{' '}
										<img src={item.image} alt={item.title} />{' '}
										<div className="cart-info">
											{' '}
											<h3>{item.title}</h3>{' '}
											<p>
												{item.title} x {item.qty} — {item.price}
											</p>{' '}
										</div>{' '}
									</div>
								))}
							</div>
							<h3 className="total-line">
								Total: ₦
								<span id="checkout-total">
									{' '}
									{props.checkoutItems
										.reduce(
											(total, item) => total + item.numericPrice * item.qty,
											0,
										)
										.toLocaleString()}{' '}
								</span>
							</h3>
							<button id="place-order-btn" type="button">
								Paystack Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CheckoutModal;
