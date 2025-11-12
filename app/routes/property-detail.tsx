import type { Route } from "./+types/property-detail";
import { useParams, Link } from "react-router";
import { ArrowLeft, MapPin, Bed, Bath, Square, Check, Mail } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { getPropertyById } from "~/data/properties";
import { useScrollAnimation } from "~/hooks/use-scroll-animation";
import styles from "./property-detail.module.css";

export function meta({ params }: Route.MetaArgs) {
  const property = params.id ? getPropertyById(params.id) : undefined;
  
  if (!property) {
    return [
      { title: "Property Not Found - RealtyVibe" },
      { name: "description", content: "The property you're looking for could not be found." },
    ];
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.price);

  return [
    { title: `${property.title} - RealtyVibe` },
    { name: "description", content: `${property.description.substring(0, 155)}...` },
    { property: "og:title", content: property.title },
    { property: "og:description", content: property.description },
    { property: "og:image", content: property.images[0] },
    { property: "og:type", content: "product" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": property.title,
        "description": property.description,
        "image": property.images,
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": typeof window !== "undefined" ? window.location.href : `https://realtyvibe.com/property/${property.id}`
        },
        "brand": {
          "@type": "Brand",
          "name": "RealtyVibe"
        },
        "category": property.type,
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Bedrooms",
            "value": property.bedrooms
          },
          {
            "@type": "PropertyValue",
            "name": "Bathrooms",
            "value": property.bathrooms
          },
          {
            "@type": "PropertyValue",
            "name": "Square Feet",
            "value": property.sqft
          }
        ]
      }
    }
  ];
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  
  return (
    <div
      ref={ref as any}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-out',
      }}
    >
      {children}
    </div>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const property = id ? getPropertyById(id) : undefined;

  if (!property) {
    return (
      <div className={styles.page}>
        <Navigation />
        <div className={styles.container}>
          <h1>Property not found</h1>
          <Link to="/properties" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className={styles.page}>
      <Navigation />

      <div className={styles.container}>
        <Link to="/properties" className={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Properties
        </Link>

        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={property.images[0]} alt={property.title} />
          </div>
          {property.images.slice(1, 4).map((image, index) => (
            <div key={index} className={styles.thumbnailImage}>
              <img src={image} alt={`${property.title} - ${index + 2}`} />
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.header}>
              <h1 className={styles.title}>{property.title}</h1>
              <div className={styles.location}>
                <MapPin size={20} />
                {property.location}
              </div>
              <div className={styles.price}>{formattedPrice}</div>
              <div className={styles.specs}>
                <div className={styles.spec}>
                  <Bed size={24} className={styles.specIcon} />
                  <div>
                    <div className={styles.specValue}>{property.bedrooms}</div>
                    <div className={styles.specLabel}>Bedrooms</div>
                  </div>
                </div>
                <div className={styles.spec}>
                  <Bath size={24} className={styles.specIcon} />
                  <div>
                    <div className={styles.specValue}>{property.bathrooms}</div>
                    <div className={styles.specLabel}>Bathrooms</div>
                  </div>
                </div>
                <div className={styles.spec}>
                  <Square size={24} className={styles.specIcon} />
                  <div>
                    <div className={styles.specValue}>{property.sqft.toLocaleString()}</div>
                    <div className={styles.specLabel}>Square Feet</div>
                  </div>
                </div>
              </div>
            </div>

            <AnimatedSection>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Description</h2>
                <p className={styles.description}>{property.description}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Features</h2>
                <div className={styles.list}>
                  {property.features.map((feature, index) => (
                    <div key={index} className={styles.listItem}>
                      <Check size={18} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Amenities</h2>
                <div className={styles.list}>
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className={styles.listItem}>
                      <Check size={18} />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Interested in this property?</h3>
              <button className={styles.contactButton}>
                <Mail size={20} />
                Inquire Now
              </button>
              <div className={styles.propertyInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Property Type</span>
                  <span className={styles.infoValue}>{property.type}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Property ID</span>
                  <span className={styles.infoValue}>#{property.id}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
