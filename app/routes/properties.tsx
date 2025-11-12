import type { Route } from "./+types/properties";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { PropertyCard } from "~/components/property-card";
import { filterProperties } from "~/data/properties";
import styles from "./properties.module.css";

const PROPERTY_TYPES = ["all", "house", "apartment", "condo", "villa", "penthouse"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Property Listings - RealtyVibe" },
    { name: "description", content: "Browse our complete collection of exceptional properties. Filter by price, location, and property type to find your perfect home." },
    { property: "og:title", content: "Property Listings - RealtyVibe" },
    { property: "og:description", content: "Browse our complete collection of exceptional properties." },
  ];
}

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [propertyType, setPropertyType] = useState("all");

  const filteredProperties = filterProperties(searchTerm, priceRange, propertyType);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  return (
    <div className={styles.page}>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Property Listings</h1>
          <p className={styles.subtitle}>Browse our complete collection of exceptional properties</p>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Search</h3>
              <input
                type="text"
                placeholder="Location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Price Range</h3>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className={styles.priceInput}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className={styles.priceInput}
                />
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Property Type</h3>
              <div className={styles.typeButtons}>
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`${styles.typeButton} ${propertyType === type ? styles.active : ""}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsCount}>
                {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className={styles.grid}>
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    style={{
                      animation: `var(--animation-fade-in) 0.4s ease-out ${index * 0.05}s backwards`,
                    }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <h3 className={styles.noResultsTitle}>No properties found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
