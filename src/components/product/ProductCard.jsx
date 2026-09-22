function ProductCard(props) {
	return (
		<article className="product-card" id={`product-${props.productId}`}>
			<span className={`status ${props.statusClass}`}>{props.statusText}</span>
			<img src={props.image} alt={props.title} />
			<h3>{props.title}</h3>
			<p className="price">{props.price}</p>
			<div className="product-buttons">
				<button className="buy-btn" type="button" onClick={props.onBuyNow}>
					Buy Now
				</button>
				<button className="cart-btn" type="button" onClick={props.onAddToCart}>
					Add To Cart
				</button>
			</div>
		</article>
	);
}
export default ProductCard;
