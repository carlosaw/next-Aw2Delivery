import styles from './styles.module.css';

const SearchInput = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        X
      </div>
      <input
        type="text"
        className={styles.input}
        placeholder="Digite o nome do produto"
      />
    </div>
  );
}

export default SearchInput;