export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      © {currentYear} Megui's Pet — Admin
    </footer>
  )
}
