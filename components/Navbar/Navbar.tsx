import React from 'react'
import NavItem from './NavItem'

const Navbar = () => {
  const NavLinks = [
    {
      title: 'Materii',
      link: '/',
    },
    {
      title: 'Informatii',
      link: '/info',
    },
    {
      title: 'Admin',
      link: '/admin',
    },
    {
      title: 'Contact',
      link: '/contact',
    },
  ]

  return (
    <nav className="flex bg-uvt-blue items-center gap-3 justify-between px-4 py-5">
      <div className='text-2xl font-bold text-white'>MO-UVT</div>
      <ul className="flex items-center gap-3">
        {NavLinks.map((link) => (
          <NavItem
            key={link['title']}
            title={link['title']}
            link={link['link']}
          />
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
