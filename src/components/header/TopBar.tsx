// ==========================
// TopBar.tsx — Refactored
// ==========================

import { useState, useEffect, memo } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import styles from "./TopBar.module.css";

interface PromoMessage {
  id: number;
  text: string;
}

interface SocialIcon {
  icon: React.ReactNode;
  id: string;
  label: string;
}

interface TopBarProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ROTATION_INTERVAL = 4000; // 4 seconds

// Promo Messages
const PROMO_MESSAGES: PromoMessage[] = [
  { id: 1, text: "🎉 Flash Sale! Get 50% OFF on all products today only!" },
  { id: 2, text: "🚚 Free shipping on orders over $50 - Limited time!" },
  { id: 3, text: "⭐ New arrivals just dropped! Shop the latest collection now!" },
  { id: 4, text: "💰 Special offer: Buy 2 Get 1 Free on selected items!" },
];

// Social Icons data
const SOCIAL_ICONS: SocialIcon[] = [
  { icon: <FaFacebookF />, id: "facebook", label: "Facebook" },
  { icon: <FaTwitter />, id: "twitter", label: "Twitter" },
  { icon: <FaInstagram />, id: "instagram", label: "Instagram" },
  { icon: <FaLinkedinIn />, id: "linkedin", label: "LinkedIn" },
];

const TopBar = memo(({ setIsVisible }: TopBarProps) => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  useEffect(() => {
    if (PROMO_MESSAGES.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
      }, ROTATION_INTERVAL);

      return () => clearInterval(interval);
    }
  }, []);

  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    };

    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.topbarWrapper}>
      <div className={styles.topbar} role="banner">
        <div className={styles.container}>
          {/* Promo Messages */}
          <div className={styles.promoSection}>
            <div className={styles.promoWrapper}>
              {PROMO_MESSAGES.map((msg, index) => (
                <p
                  key={msg.id}
                  className={`${styles.promoText} ${
                    index === currentPromoIndex ? styles.active : ""
                  }`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {msg.text}
                </p>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <nav className={styles.socialSection} aria-label="Social media links">
            {SOCIAL_ICONS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleSocialClick(btn.id)}
                className={styles.socialIcon}
                aria-label={`Visit our ${btn.label} page`}
                type="button"
              >
                {btn.icon}
              </button>
            ))}
          </nav>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className={styles.closeButton}
            aria-label="Close announcement banner"
            type="button"
          >
            <IoMdClose aria-hidden="true" focusable="false" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              animationDuration: `${ROTATION_INTERVAL}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
});

TopBar.displayName = "TopBar";
export default TopBar;