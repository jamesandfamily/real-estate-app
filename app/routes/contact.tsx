import type { Route } from "./+types/contact";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { useScrollAnimation } from "~/hooks/use-scroll-animation";
import styles from "./contact.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - RealtyVibe" },
    { name: "description", content: "Get in touch with RealtyVibe. Have questions about a property? Our expert team is here to help you find your dream home." },
    { property: "og:title", content: "Contact Us - RealtyVibe" },
    { property: "og:description", content: "Get in touch with our expert team." },
  ];
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div
      ref={ref as any}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.page}>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have questions about a property? We're here to help you find your dream home.
          </p>
        </div>

        <div className={styles.content}>
          <AnimatedCard delay={0}>
            <div className={styles.formSection}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your property needs..."
                    className={styles.textarea}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </AnimatedCard>

          <div className={styles.infoSection}>
            <AnimatedCard delay={100}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoTitle}>Email</h3>
                  <p className={styles.infoText}>
                    <a href="mailto:info@realtyvibe.com" className={styles.infoLink}>
                      info@realtyvibe.com
                    </a>
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoTitle}>Phone</h3>
                  <p className={styles.infoText}>
                    <a href="tel:+15551234567" className={styles.infoLink}>
                      (555) 123-4567
                    </a>
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={300}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoTitle}>Office</h3>
                  <p className={styles.infoText}>
                    123 Luxury Lane
                    <br />
                    Beverly Hills, CA 90210
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
