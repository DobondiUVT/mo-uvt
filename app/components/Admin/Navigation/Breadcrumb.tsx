import { buttonVariants } from '@/components/ui/button'
import { Link } from '%/i18n/navigation'
import React from 'react'

type BreadCrumbItem = {
  title: string
  href?: string
  icon?: React.ReactNode
}
type BreadcrumbProps = {
  links: BreadCrumbItem[]
}

const Breadcrumb = ({ links }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex items-center">
      {links.map((link, index) => (
        <div key={`breadcrumb-${index}`}>
          {index < links.length - 1 ? (
            <div>
              <Link
                className={`${buttonVariants({
                  variant: 'link',
                  size: 'no-padding',
                })} text-zinc-400 hover:text-zinc-800`}
                href={link.href ?? ''}
              >
                {link.title}
              </Link>
              <span className="pr-2 ps-1 text-zinc-400"> / </span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-zinc-800">
              {link.title}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb
