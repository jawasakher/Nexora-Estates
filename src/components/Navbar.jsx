import React from 'react'

const Navbar = ({active, setMenuOpened, containerStyles}) => {
  const navLinks =[
    { path: "/", title: "Home" },
    { path: "/listing", title: "Listing" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title:"Contact" },
  ];
  return (
    <div>
      Navbar
    </div>
  )
}

export default Navbar
