'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export interface SidebarProps {
    url: string,
    name: string,
    classname?: string,
  }
  
  export function SidebarDesktopLink({url, name} : SidebarProps) {
    const pathname = usePathname()
    let highlight_class = pathname == url ? "is-active" : "";

    if (url == "/procedural/topic" && pathname == "/")  highlight_class = "is-active";

    return (
      <li><Link href={url} className={highlight_class} >{name}</Link></li>
    )
  }
  
  export function SidebarMobileLink({url, name, classname} : SidebarProps) {
    return (
      <Link href={url} className={classname}>{name}</Link>
    )
  }
  