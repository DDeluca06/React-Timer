export default function Footer() {
    return (
      <footer style={styles.footer}>
        <p>TimeWise &copy; {new Date().getFullYear()}</p>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      textAlign: "center",
      padding: "20px",
      marginTop: "40px",
      borderTop: "1px solid #ddd",
      color: "#666",
      fontSize: "14px",
    },
  };
  