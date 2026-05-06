import { useState, useEffect } from "react";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import { Navbar } from "./Navbar";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const [active, setActive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setshowSearch] = useState(false);

  const location = useLocation();
  const { navigate, user } = useAppContext();
  const { openSignIn } = useClerk();

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const BookingIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 12h-5" />
      <path d="M15 8h-5" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0V5a2 2 0 1 0-4 0V2a1 1 0 0 0 1 1h3" />
    </svg>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setActive(window.scrollY > 10);
      } else {
        setActive(true);
      }

      if (window.scrollY > 10) {
        setMenuOpened(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header
      className={`${
        active
          ? "bg-white/95 backdrop-blur-md py-3 shadow-lg shadow-black/5"
          : "py-4"
      } fixed top-0 w-full left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="max-padd-container">
        <div className="flexBetween">
          
          {/* Logo */}
          <div className="flex flex-1">
            <Link to="/">
              <img
                src={assets.logoImg}
                alt="Logo"
                className={`${
                  !active ? "invert" : ""
                } h-20 transition-all duration-200`}
              />
            </Link>
          </div>

          {/* Navbar */}
          <Navbar
            active={active}
            setMenuOpened={setMenuOpened}
            containerStyles={`${
              menuOpened
                ? "fixed top-20 right-4 z-50 flex w-[84vw] max-w-72 translate-y-0 flex-col gap-y-3 rounded-2xl bg-white/95 p-4 opacity-100 shadow-xl backdrop-blur-md"
                : "fixed top-20 right-4 z-50 flex w-[84vw] max-w-72 -translate-y-4 flex-col gap-y-3 rounded-2xl bg-white/95 p-4 opacity-0 shadow-xl backdrop-blur-md pointer-events-none lg:pointer-events-auto lg:static lg:opacity-100 lg:flex-row lg:gap-x-2 lg:bg-transparent lg:p-1 lg:shadow-none"
            }`}
          />

          {menuOpened && (
            <div
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] lg:hidden"
              onClick={() => setMenuOpened(false)}
            />
          )}

          {/* Right Side */}
          <div className="flex sm:flex-1 items-center sm:justify-end gap-x-3 sm:gap-x-6">
            
            {/* Search */}
            <div className="relative hidden sm:flex items-center">
              <div className="bg-white/90 rounded-full px-3 py-2 flex items-center gap-2">
                <img src={assets.search} className="size-4 opacity-60" />
                {showSearch && (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none bg-transparent text-sm"
                  />
                )}
              </div>

              <button
                onClick={() => setshowSearch((p) => !p)}
                className="absolute right-0 bg-gradient-to-r from-secondary to-tertiary px-3 py-1 rounded-full text-xs font-semibold"
              >
                {showSearch ? "Close" : "Search"}
              </button>
            </div>

            {/* Menu */}
            <div>
              <img
                src={menuOpened ? assets.close : assets.menu}
                onClick={toggleMenu}
                className="lg:hidden cursor-pointer"
              />
            </div>

            {/* User */}
            <div>
              {user ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "42px",
                        height: "42px",
                      },
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Bookings"
                      labelIcon={<BookingIcon />}
                      onClick={() => navigate("/my-bookings")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button
                  onClick={openSignIn}
                  className="btn-secondary flexCenter gap-2 rounded-full"
                >
                  Login
                  <img src={assets.user} />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;