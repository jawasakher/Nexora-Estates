import { Link } from "react-router-dom";

export const Navbar = ({ active, setMenuOpened, containerStyles }) => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/listing", label: "Listing" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const handleNavClick = () => {
    setMenuOpened(false);
  };

  return (
    <nav className={containerStyles}>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={handleNavClick}
          className="hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
