import styles from "./styles.module.scss";

const Spinner = ({ height = "100vh" }: { height?: string }) => (
  <main className="flex items-center justify-center" style={{ height }}>
    <span className={styles.spinner} />
  </main>
);
export default Spinner;
