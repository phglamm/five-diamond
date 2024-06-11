import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./productCard.css";

export default function ProductCard({
  img,
  text,
  price,
  salePrice,
  salePercent,
  rating,
  pageType,
}) {
  const retailPriceClass =
    pageType === "sale-page" ? "retail-price-sale" : "retail-price-guest";

  return (
    <div className={`product-hit ${pageType}`}>
      <div className="product-img">
        <Link to="/san-pham">
          <img src={img} alt={text} />
        </Link>
        <Link to="/san-pham" className="see-more-red" title="Chi tiết"></Link>
      </div>
      <div className="product-text">
        <p>
          <Link to="/san-pham">{text}</Link>
        </p>
        {salePrice ? (
          <div className="price-info">
            <span className="sale-price">{salePrice}</span>
            <div>
              <span className={retailPriceClass}>{price}</span>
              <span className="sale-percent">(-{salePercent})</span>
            </div>
          </div>
        ) : (
          <span className={retailPriceClass}>{price}</span>
        )}
        {rating && (
          <div className="star-rating">
            <FontAwesomeIcon icon={faStar} />
            <span>{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}
