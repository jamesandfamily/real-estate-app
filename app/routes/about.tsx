import type { Route } from "./+types/about";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { ThemeSwitcher } from "../components/theme-switcher";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Heart, Shield, Target, Users } from "lucide-react";
import styles from "./about.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - RealtyVibe" },
    { name: "description", content: "Learn about RealtyVibe's mission and values" },
  ];
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <section
      ref={ref as any}
      className={styles.section}
      data-visible={isVisible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export default function About() {
  return (
    <div className={styles.page}>
      <Navigation />
      
      <div className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
          alt="Modern architecture"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About RealtyVibe</h1>
          <p className={styles.heroSubtitle}>
            Redefining the Real Estate Experience
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <AnimatedSection>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <div className={styles.content}>
            <p>
              At RealtyVibe, we believe that finding your dream property should be an inspiring journey, 
              not a daunting task. We've created a platform that combines cutting-edge technology with 
              personalized service to transform how people discover and connect with real estate.
            </p>
            <p>
              Our mission is to empower individuals and families to make confident, informed decisions 
              about one of life's most significant investments. Through innovative design, comprehensive 
              property information, and a commitment to excellence, we're setting new standards in the 
              real estate industry.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.values}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Heart size={24} />
              </div>
              <h3 className={styles.valueTitle}>Customer First</h3>
              <p className={styles.valueDescription}>
                Your satisfaction and success are at the heart of everything we do. We're dedicated 
                to providing exceptional service and support throughout your property journey.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Shield size={24} />
              </div>
              <h3 className={styles.valueTitle}>Trust & Transparency</h3>
              <p className={styles.valueDescription}>
                We believe in honest communication and transparent processes. Every property listing 
                is verified, and we provide complete, accurate information to help you make informed decisions.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Target size={24} />
              </div>
              <h3 className={styles.valueTitle}>Innovation</h3>
              <p className={styles.valueDescription}>
                We continuously embrace new technologies and approaches to enhance your experience, 
                from AI-powered search to immersive property visualizations.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Users size={24} />
              </div>
              <h3 className={styles.valueTitle}>Community</h3>
              <p className={styles.valueDescription}>
                We're committed to building strong communities by connecting people with properties 
                and neighborhoods where they can truly thrive and belong.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className={styles.sectionTitle}>By the Numbers</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statLabel}>Properties Listed</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5,000+</div>
              <div className={styles.statLabel}>Happy Clients</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Cities Covered</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Satisfaction Rate</div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.content}>
            <p>
              RealtyVibe was born from a simple observation: the real estate search experience needed 
              to evolve. Founded by a team of technology enthusiasts and real estate professionals, 
              we set out to create a platform that would make property discovery not just efficient, 
              but genuinely enjoyable.
            </p>
            <p>
              Today, we're proud to serve thousands of clients across multiple cities, helping them 
              find not just houses, but homes. Our platform continues to grow and evolve, always with 
              one goal in mind: making your real estate journey exceptional.
            </p>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
