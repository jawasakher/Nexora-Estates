import { NavLink } from "react-router-dom";

export const Navbar = ({ setMenuOpened, containerStyles, isOwner = false }) => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/listing", label: "Listing" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    ...(isOwner ? [{ to: "/owner", label: "Owner Dashboard" }] : []),
  ];

  const handleNavClick = () => {
    setMenuOpened(false);
  };

  return (
    <nav className={containerStyles}>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={handleNavClick}
          className={({ isActive }) =>
            `group relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
              isActive ? "text-slate-950" : "text-current"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`absolute inset-0 -z-10 rounded-full bg-linear-to-r from-secondary/20 to-tertiary/20 transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              />
              <span className='relative z-10'>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
