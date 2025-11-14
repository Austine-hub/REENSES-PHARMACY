import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

interface NavLink {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  key: string;
  path?: string;
  links?: NavLink[];
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const navItems: NavItem[] = [
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
      label: "Shop By System",
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
    { label: "Prescription", key: "prescription", path: "/prescription" },
    { label: "Contact", key: "contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(target)
      );
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenDropdown(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <a href="/" className={styles.logoLink} aria-label="Reenses Pharmacy Home">
            <div className={styles.logoImageContainer}>
              <img 
                src="/logo.png" 
                alt="Reenses Pharmacy Logo" 
                className={styles.logoImage}
              />
            </div>
            <div className={styles.logoTextContainer}>
              <span className={styles.logoText}>REENSES</span>
              <span className={styles.logoSubtitle}>Pharmacy</span>
              <span className={styles.logoTagline}>Your Health is Our Priority</span>
            </div>
          </a>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={`${styles.navList} ${isMobileMenuOpen ? styles.navListOpen : ''}`}>
            {navItems.map((item) => (
              <li
                key={item.key}
                className={`${styles.navItem} ${item.links ? styles.hasDropdown : ''}`}
               ref={(el) => {
                    dropdownRefs.current[item.key] = el;
                  }}

              >
                {item.links ? (
                  <>
                    <button
                      className={`${styles.navLink} ${styles.dropdownToggle} ${
                        openDropdown === item.key ? styles.dropdownActive : ''
                      }`}
                      onClick={() => toggleDropdown(item.key)}
                      aria-expanded={openDropdown === item.key}
                      aria-haspopup="true"
                      type="button"
                    >
                      {item.label}
                      <span className={styles.dropdownIcon} aria-hidden="true">
                        ▾
                      </span>
                    </button>
                    <ul
                      className={`${styles.dropdownMenu} ${
                        openDropdown === item.key ? styles.dropdownMenuOpen : ''
                      }`}
                    >
                      {item.links.map((link) => (
                        <li key={link.path} className={styles.dropdownItem}>
                          <a
                            href={link.path}
                            className={styles.dropdownLink}
                            onClick={handleNavLinkClick}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.path}
                    className={styles.navLink}
                    onClick={handleNavLinkClick}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cartWrapper}>
          <a href="/cart" className={styles.cartLink} aria-label="Shopping Cart">
            <svg 
              className={styles.cartIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M9 2L7.17 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H21C22.1 20 23 19.1 23 18V6C23 4.9 22.1 4 21 4H16.83L15 2H9ZM9 4H15L16.83 6H21V18H3V6H7.17L9 4Z" 
                fill="currentColor"
              />
              <path 
                d="M7 10V12C7 13.66 8.34 15 10 15H14C15.66 15 17 13.66 17 12V10H15V12C15 12.55 14.55 13 14 13H10C9.45 13 9 12.55 9 12V10H7Z" 
                fill="currentColor"
              />
            </svg>
            <span className={styles.cartBadge}>0</span>
          </a>
        </div>

        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;