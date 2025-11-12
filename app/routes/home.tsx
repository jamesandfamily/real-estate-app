import type { Route } from "./+types/home";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, ArrowRight, Home as HomeIcon, TrendingUp, Award, Shield } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { PropertyCard } from "~/components/property-card";
import { getFeaturedProperties } from "~/data/properties";
import { useGsapScroll, useGsapParallax, useGsapFadeIn, useGsapReveal } from "~/hooks/use-gsap-scroll";
import styles from "./home.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RealtyVibe - Discover Your Dream Home" },
    { name: "description", content: "Explore exceptional properties curated for the most discerning tastes. Browse premium real estate with modern amenities and stunning locations." },
    { property: "og:title", content: "RealtyVibe - Discover Your Dream Home" },
    { property: "og:description", content: "Explore exceptional properties curated for the most discerning tastes." },
    { property: "og:type", content: "website" },
  ];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const featuredProperties = getFeaturedProperties();

  // Refs for GSAP animations
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP scroll animations
  useGsapScroll();
  useGsapParallax(heroImageRef, 0.3);
  useGsapFadeIn(featuredGridRef, { stagger: 0.2, y: 80, duration: 1.2 });
  useGsapFadeIn(statsRef, { stagger: 0.15, y: 50, duration: 1 });
  useGsapFadeIn(featuresRef, { stagger: 0.2, y: 60, duration: 1 });

  // Hero content animation
  useEffect(() => {
    if (!heroContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-search",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.4"
      );
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
  };

  const stats = [
    { icon: HomeIcon, value: "500+", label: "Premium Properties" },
    { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
    { icon: Award, value: "15+", label: "Years of Excellence" },
    { icon: Shield, value: "100%", label: "Verified Listings" },
  ];

  const features = [
    {
      title: "Curated Excellence",
      description: "Every property is handpicked and thoroughly vetted to meet our exceptional standards.",
    },
    {
      title: "Expert Guidance",
      description: "Our experienced team provides personalized support throughout your property journey.",
    },
    {
      title: "Market Insights",
      description: "Stay informed with real-time market data and trends to make confident decisions.",
    },
  ];

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <div className={styles.heroBackground} ref={heroImageRef}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury real estate"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent} ref={heroContentRef}>
          <h1 className={`${styles.heroTitle} hero-title`}>Discover Your Dream Home</h1>
          <p className={`${styles.heroSubtitle} hero-subtitle`}>
            Explore exceptional properties curated for the most discerning tastes
          </p>
          <form onSubmit={handleSearch} className={`${styles.searchBar} hero-search`}>
            <input
              type="text"
              placeholder="Search by location or property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <Search size={20} />
              Search
            </button>
          </form>
        </div>
      </section>

      <section className={styles.stats} ref={statsRef}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon size={32} />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Properties</h2>
          <p className={styles.sectionSubtitle}>Handpicked selections of our most extraordinary listings</p>
        </div>
        <div className={styles.grid} ref={featuredGridRef}>
          {featuredProperties.map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
        <div className={styles.viewAllWrapper}>
          <a href="/properties" className={`${styles.viewAllButton} interactive`}>
            View All Properties
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <section className={styles.features} ref={featuresRef}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </section>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
