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
  id,
}) {
  const retailPriceClass =
    pageType === "sale-page" ? "retail-price-sale" : "retail-price-guest";

  return (
    <div className={`product-hit ${pageType}`}>
      <Link to={`/chi-tiet-san-pham/${id}`}>
        <div className="product-img">
          <img src={img} alt={text} />
        </div>
        <div className="product-text">
          <p className="product-info-name">
            <Link to={`/chi-tiet-san-pham/${id}`}>{text}</Link>
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
      </Link>
    </div>
  );
}
