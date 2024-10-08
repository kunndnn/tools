function NoPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "96px",
    color: "#ff6b6b",
    margin: 0,
  },
  message: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
};
export default NoPage;
