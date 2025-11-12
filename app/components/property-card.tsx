import { Link } from "react-router";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import type { Property } from "~/data/properties";
import styles from "./property-card.module.css";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link to={`/properties/${property.id}`} className={`${styles.card} ${className || ""}`}>
      <div className={styles.imageWrapper}>
        <img src={property.images[0]} alt={property.title} className={styles.image} />
        {property.featured && <div className={styles.badge}>Featured</div>}
      </div>
      <div className={styles.content}>
        <div className={styles.price}>{formattedPrice}</div>
        <h3 className={styles.title}>{property.title}</h3>
        <div className={styles.location}>
          <MapPin size={16} />
          {property.location}
        </div>
        <div className={styles.details}>
          <div className={styles.detail}>
            <Bed size={18} />
            {property.bedrooms} Beds
          </div>
          <div className={styles.detail}>
            <Bath size={18} />
            {property.bathrooms} Baths
          </div>
          <div className={styles.detail}>
            <Square size={18} />
            {property.sqft.toLocaleString()} sqft
          </div>
        </div>
      </div>
    </Link>
  );
}
