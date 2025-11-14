import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DiscountCard.module.css';

// Import images - replace with your actual image paths
import toyImage from '../assets/toyHand.png';
import vaccineImage from '../assets/vaccine.png';
import styleImage from '../assets/style-fashion.png';

const DiscountCards: React.FC = () => {
  const cards = [
    {
      id: 1,
      badge: 'Exclusive Discount',
      title: 'Playful Treasures for Happy Kids',
      description: 'Where Every Toy Sparks Creativity and Every Outfit Brings Smiles',
      image: toyImage,
      bgColor: '#B8DFE6',
      link: '/playful-treasures'
    },
    {
      id: 2,
      badge: 'Exclusive Discount',
      title: 'Cheerful Finds for the Little Dreamer',
      description: 'Explore a World of Playful Wonders and Delightful Finds for Every Child',
      image: vaccineImage,
      bgColor: '#D5D5D5',
      link: '/cheerful-finds'
    },
    {
      id: 3,
      badge: 'Exclusive Discount',
      title: 'Where Fun and Style Meet',
      description: 'Discover the Perfect Mix of Fun, Learning, and Style for Your Little Ones',
      image: styleImage,
      bgColor: '#C8D9E4',
      link: '/fun-and-style'
    }
  ];

  return (
    <section className={styles.discountSection}>
      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <article 
            key={card.id} 
            className={styles.card}
            style={{ backgroundColor: card.bgColor }}
          >
            <div className={styles.cardContent}>
              <span className={styles.badge}>{card.badge}</span>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDescription}>{card.description}</p>
              <Link to={card.link} className={styles.viewMoreLink}>
                View More
                <svg 
                  className={styles.arrow} 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  aria-hidden="true"
                >
                  <path 
                    d="M6 3L11 8L6 13" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <div className={styles.cardImageWrapper}>
              <img 
                src={card.image} 
                alt="" 
                className={styles.cardImage}
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>

      <div className={styles.cashbackBanner}>
        <div className={styles.cashbackContent}>
          <div className={styles.cashbackText}>
            <span className={styles.cashbackTitle}>RETURN CASH BACK</span>
            <span className={styles.cashbackDescription}>
              Earn 5% cash back on Bumedi.com{' '}
              <span className={styles.cashbackSubtext}>
                See if you're pre-approved with no credit risk
              </span>
            </span>
          </div>
          <Link to="/cashback" className={styles.discoverButton}>
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscountCards;