import { useBtcPrice } from "../../hooks/useBtcPrice";
import styles from './game.module.css';

export const PriceTracker = () => {
  const { price, error } = useBtcPrice();

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
  )
}