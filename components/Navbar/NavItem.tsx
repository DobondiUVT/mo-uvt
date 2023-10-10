import Link from 'next/link'
import React from 'react'

type NavItemProps = {
  link: string
  title: string
}

const NavItem = ({ link, title }: NavItemProps) => {
  return (
    <li>
      <Link href={link} className="px-4 hover:bg-gray-100 h-full flex items-center">
        {title}
      </Link>
    </li>
  )
}

export default NavItem
