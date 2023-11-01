'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues'
    },
  ]

  return (
    <nav className='flex space-x-6 items-center border-b mb-5 px-5 h-14'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {
          links.map((link) => (
            <li key={link.label}><Link 
              href={link.href}
              className={
                classnames({
                  'text-zinc-900': link.href === currentPath,
                  'text-zinc-500': link.href !== currentPath,
                  'hover:text-zinc-800 transition-colors': true
                })
              }
            >
              {link.label}
            </Link></li>
          ))
        }
      </ul>
    </nav>
  )
}

export default NavBar