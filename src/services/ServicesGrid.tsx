import React from 'react';
import styles from './ServicesGrid.module.css';

// Icon components
const WomenHealthIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M12 12c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" />
  </svg>
);

const MenHealthIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="10" r="7" />
    <path d="M16 4l4-4M20 0v8M20 4h-8" />
  </svg>
);

const CompoundingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    <circle cx="12" cy="12" r="6" />
  </svg>
);

const DeliveryIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h5l3 3v5h-3" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const DermatologyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const PetHealthIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="4" r="2" />
    <circle cx="18" cy="8" r="2" />
    <circle cx="4" cy="8" r="2" />
    <circle cx="6" cy="14" r="2" />
    <circle cx="16" cy="14" r="2" />
    <path d="M11 16c-2 0-4-1-4-3s2-3 4-3 4 1 4 3-2 3-4 3z" />
  </svg>
);

const PainManagementIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M17 7H7M17 17H7" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const PediatricsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  backgroundImage: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, backgroundImage }) => {
  return (
    <article className={styles.card} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            {icon}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.button} aria-label={`View details about ${title}`}>
            View Details →
          </button>
        </div>
      </div>
    </article>
  );
};

const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: <WomenHealthIcon />,
      title: "Women's Health - Hormone Consultations",
      backgroundImage: '/images/womens-health.jpg'
    },
    {
      icon: <MenHealthIcon />,
      title: "Men's Health",
      backgroundImage: '/images/mens-health.jpg'
    },
    {
      icon: <CompoundingIcon />,
      title: "Compounding",
      backgroundImage: '/images/compounding.jpg'
    },
    {
      icon: <DeliveryIcon />,
      title: "Prescription Delivery & Mail",
      backgroundImage: '/images/delivery.jpg'
    },
    {
      icon: <DermatologyIcon />,
      title: "Dermatology",
      backgroundImage: '/images/dermatology.jpg'
    },
    {
      icon: <PetHealthIcon />,
      title: "Pet Health",
      backgroundImage: '/images/pet-health.jpg'
    },
    {
      icon: <PainManagementIcon />,
      title: "Pain Management",
      backgroundImage: '/images/pain-management.jpg'
    },
    {
      icon: <PediatricsIcon />,
      title: "Pediatrics",
      backgroundImage: '/images/pediatrics.jpg'
    }
  ];

  return (
    <section className={styles.servicesSection} aria-labelledby="services-heading">
      <h2 id="services-heading" className={styles.visuallyHidden}>Our Services</h2>
      <div className={styles.grid}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            backgroundImage={service.backgroundImage}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;