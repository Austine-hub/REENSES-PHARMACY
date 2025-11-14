import { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // <-- Use cart context
import styles from "./Header.module.css";

interface NavLink {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  key?: string;
  path?: string;
  links?: NavLink[];
}

interface HeaderProps {
  logo?: { src: string; alt: string };
  brandName?: string;
  brandSubtitle?: string;
  brandTagline?: string;
  navItems?: NavItem[];
}

const Header = memo(
  ({
    logo,
    brandName = "REENSES PHARMACY",
    brandSubtitle = "Your health, our priority",
    brandTagline = "Quality care for every family member",
    navItems = [
      { label: "Home", key: "home", path: "/" },
      {
        label: "Shop By Category",
        key: "category",
        links: [
          { label: "Skin Care", path: "/categories/skin-care" },
          { label: "Beauty & Cosmetics", path: "/categories/beauty-care-cosmetics" },
          { label: "Vitamins & Supplements", path: "/categories/vitamins-supplements" },
          { label: "Medicine", path: "/categories/medicine" },
          { label: "Hygiene", path: "/categories/general-hygiene" },
          { label: "Home Healthcare", path: "/categories/home-healthcare" },
        ],
      },
      {
        label: "Shop By Condition",
        key: "condition",
        links: [
          { label: "Hypertension", path: "/conditions/htn" },
          { label: "Diabetes", path: "/conditions/diabetes" },
          { label: "Cough, Cold & Flu", path: "/conditions/flu" },
          { label: "UTI", path: "/conditions/uti-infections" },
          { label: "Skin Treatment", path: "/conditions/skin-treatment" },
        ],
      },
      {
        label: "Shop By Body System",
        key: "system",
        links: [
          { label: "Reproductive", path: "/system/reproductive" },
          { label: "Respiratory", path: "/system/respiratory" },
          { label: "Diabetes", path: "/system/diabetes" },
          { label: "GIT", path: "/system/git" },
          { label: "Renal", path: "/system/renal" },
          { label: "Nervous", path: "/system/nervous" },
          { label: "ENT", path: "/system/ent" },
          { label: "Oral Hygiene", path: "/system/oral-hygiene" },
          { label: "MSK", path: "/system/msk" },
        ],
      },
      { label: "Services", path: "/about-us" },
      { label: "Contact", path: "/contact-us" },
    ],
  }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const dropdownRefs = useRef<(HTMLLIElement | null)[]>([]);
    const mobileMenuRef = useRef<HTMLElement>(null);

    const { getTotalItems = () => 0 } = useCart(); // <-- Reactive cart items
    const totalItems = getTotalItems();

    // Close mobile menu on Escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Lock body scroll when menu open
      useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
          return () => {
            document.body.style.overflow = "";
          };

      }, [isMobileMenuOpen]);


    // Close dropdown if clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (activeDropdown !== null) {
          const dropdownEl = dropdownRefs.current[activeDropdown];
          if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
            setActiveDropdown(null);
          }
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeDropdown]);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen((prev) => !prev);
      setActiveDropdown(null);
    };

    const toggleDropdown = (index: number) => {
      setActiveDropdown((prev) => (prev === index ? null : index));
    };

    const closeAllMenus = () => {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    };

    return (
      <>
        <header className={styles.header}>
          <div className={styles.container}>
            {/* Logo Section */}
            <div className={styles.logoWrapper}>
              <Link to="/" className={styles.logoLink} onClick={closeAllMenus}>
                {logo && (
                  <div className={styles.logoImageContainer}>
                    <img src={logo.src} alt={logo.alt} className={styles.logoImage} />
                  </div>
                )}
                <div className={styles.logoTextContainer}>
                  <span className={styles.logoText}>{brandName}</span>
                  <span className={styles.logoSubtitle}>{brandSubtitle}</span>
                  <span className={styles.logoTagline}>{brandTagline}</span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav
              ref={mobileMenuRef}
              className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ""}`}
              aria-label="Main navigation"
            >
              <ul className={styles.navList}>
                {navItems.map((item, index) => (
                  <li
                    key={item.key || item.label}
                                    ref={(el) => {
                    dropdownRefs.current[index] = el;
                  }}

                    className={`${styles.navItem} ${activeDropdown === index ? styles.dropdownActive : ""}`}
                  >
                    {item.links ? (
                      <>
                        <button
                          className={`${styles.navLink} ${styles.dropdownToggle}`}
                          onClick={() => toggleDropdown(index)}
                          aria-expanded={activeDropdown === index}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <span className={styles.dropdownIcon}>▼</span>
                        </button>

                        <ul
                          className={`${styles.dropdownMenu} ${activeDropdown === index ? styles.dropdownMenuOpen : ""}`}
                          role="menu"
                        >
                          {item.links.map((sub, subIndex) => (
                            <li key={subIndex} className={styles.dropdownItem} role="none">
                              <Link to={sub.path} className={styles.dropdownLink} onClick={closeAllMenus} role="menuitem">
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      item.path && (
                        <Link to={item.path} className={styles.navLink} onClick={closeAllMenus}>
                          {item.label}
                        </Link>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Cart Icon */}
            <div className={styles.cartWrapper}>
              <Link
                to="/cart"
                className={styles.cartLink}
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <svg
                  className={styles.cartIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
              </Link>
            </div>

            {/* Hamburger Button */}
            <button
              className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ""}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </header>

        {/* Spacer to prevent overlap */}
        <div style={{ height: "10px" }} />
      </>
    );
  }
);

Header.displayName = "Header";
export default Header;
