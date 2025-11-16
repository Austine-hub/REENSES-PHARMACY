import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import { 
  FaWind, 
  FaFlask, 
  FaThermometerHalf, 
  FaUtensils, 
  FaHeartbeat, 
  FaPills, 
  FaStethoscope, 
  FaTooth, 
  FaAppleAlt, 
   FaShieldAlt 
} from 'react-icons/fa';
import { 
  MdLocalShipping, 
  MdAssignmentReturn, 
  MdDiscount, 
  MdSupportAgent 
} from 'react-icons/md';
import styles from './Hero.module.css';


import photo1 from '../../assets/consultation.png';
import photo2 from '../../assets/consultation1.png';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface CarouselSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  image: string;
   link: string;   // ⭐ Add this
}


const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navItems: NavItem[] = [
    { icon: <FaFlask />, label: 'Cosmetics', path: 'categories/skin-care' },
    { icon: <FaWind />, label: 'Sneeze', path: '/categories/home-healthcare' },
    { icon: <FaShieldAlt />, label: 'Protection', path: '/products/equipment' },
    { icon: <FaThermometerHalf />, label: 'Cough, Cold, Fever', path: "/conditions/flu" },
    { icon: <FaUtensils />, label: 'Gut Health', path: '/system/git' },
    { icon: <FaHeartbeat />, label: 'Heart Health', path: "/condition/heart" },
    { icon: <FaPills />, label: 'OTC Medication', path: '/products/otc' },
    { icon: <FaStethoscope />, label: 'Prescription Medicine', path: 'products/prescription' },
    { icon: <FaTooth />, label: 'Mouth & Teeth', path: 'conditions/oral-hygiene' },
    { icon: <FaAppleAlt />, label: 'Supplements', path: '/products/supplements' },
  ];

const carouselSlides: CarouselSlide[] = [
{
  id: 1,
  badge: 'Exclusive Health Deals',
  title: 'Wellness & Care, Tailored for You',
  subtitle: '',
  description:
    'Discover premium healthcare products, essential medicines, and wellness solutions that keep you and your family healthy every day.',
  buttonText: 'Shop Now',
  image: photo1,
  link: '/offers' // ⭐ Add this
},

  {
    id: 2,
    badge: 'New Arrivals',
    title: 'Your Health is Our Priority',
    subtitle: '',
    description:
      'Discover Premium Healthcare Products and Expert Medical Guidance for Your Wellbeing',
    buttonText: 'Shop Now',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    link: '/new-arrivals'   // ⭐ Add this
  },
  {
    id: 3,
    badge: 'Special Offer',
    title: 'Quality Care You Can Trust',
    subtitle: '',
    description:
      'Professional Medical Solutions and Personalized Healthcare Services at Your Fingertips',
    buttonText: 'Explore More',
    image: photo2,
    link: '/trending'  // ⭐ Add this
  }
];


  const features = [
    {
      icon: <MdLocalShipping />,
      title: 'Free Delivery',
      description: 'Free shipping on all orders, 100+ INR, real-cond return refund, till arrival',
      link: 'View More',
      color: '#2196F3'
    },
    {
      icon: <MdAssignmentReturn />,
      title: 'Money Return',
      description: 'Free shipping on all orders, 100+ INR, real-cond return refund, till arrival',
      link: 'View More',
      color: '#00BCD4'
    },
    {
      icon: <MdDiscount />,
      title: 'Member Discount',
      description: 'Free shipping on all orders, 100+ INR, real-cond return refund, till arrival',
      link: 'View More',
      color: '#4CAF50'
    },
    {
      icon: <MdSupportAgent />,
      title: 'Online Support 24/7',
      description: 'Free shipping on all orders, 100+ INR, real-cond return refund, till arrival',
      link: 'View More',
      color: '#00BCD4'
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <nav className={styles.navList}>
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path} 
                  className={styles.navItem}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Hero Carousel */}
          <div className={styles.heroCarousel}>
            <div className={styles.carouselContainer}>
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`${styles.carouselSlide} ${
                    index === currentSlide ? styles.active : ''
                  }`}
                >
                  <div className={styles.carouselContent}>
                    <div className={styles.textContent}>
                      <span className={styles.badge}>{slide.badge}</span>
                      <h1 className={styles.heroTitle}>{slide.title}</h1>
                      <p className={styles.heroDescription}>{slide.description}</p>


                      <Link to={slide.link}  className={styles.ctaButton}>
                        {slide.buttonText}
                      </Link>

                    </div>
                    <div className={styles.imageContent}>
                      <img 
                        src={slide.image} 
                        alt="Healthcare professional" 
                        className={styles.heroImage}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button 
                className={`${styles.carouselArrow} ${styles.prevArrow}`}
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button 
                className={`${styles.carouselArrow} ${styles.nextArrow}`}
                onClick={nextSlide}
                aria-label="Next slide"
              >
                ›
              </button>

              {/* Carousel Indicators */}
              <div className={styles.carouselIndicators}>
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${
                      index === currentSlide ? styles.activeIndicator : ''
                    }`}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentSlide(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.featureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className={styles.featureIcon}
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <span style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <a href="#" className={styles.featureLink}>
                  {feature.link} <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;