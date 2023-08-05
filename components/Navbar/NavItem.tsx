import React from 'react'

type NavItemProps = {
  link: string
  title: string
}

const NavItem = ({ link, title }: NavItemProps) => {
  return (
    <li>
      <a className="text-white hover:text-gray-300 text-lg px-3 py-4" href={link}>
        {title}
      </a>
    </li>
  )
}

export default NavItem
