import { NavLink } from "react-router-dom";
import { useI18n } from '../i18n/I18nContext.jsx'

export const Navbar = ({ setMenuOpened, containerStyles, isOwner = false, isRTL = false }) => {
  const { t } = useI18n()
  const navLinks = [
    { to: "/", label: t('nav.home') },
    { to: "/listing", label: t('nav.listing') },
    { to: "/blog", label: t('nav.blog') },
    { to: "/contact", label: t('nav.contact') },
    ...(isOwner ? [{ to: "/owner", label: t('nav.ownerDashboard') }] : []),
  ];

  const orderedLinks = isRTL ? [...navLinks].reverse() : navLinks

  const handleNavClick = () => {
    setMenuOpened(false);
  };

  return (
    <nav className={`${containerStyles} ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      {orderedLinks.map((link) => (
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
