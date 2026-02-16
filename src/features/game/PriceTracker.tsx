import { memo } from 'react';
import styles from './game.module.css';

interface PriceTrackerProps {
  price: number | null;
  error: string | null;
}

export const PriceTracker = memo(({ price, error }: PriceTrackerProps) => {
  return (
    <section>
      <h2 className={styles.label}>Current BTC Price</h2>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.priceValue}>
          ${price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      )}
    </section>
  );
});

PriceTracker.displayName = 'PriceTracker';