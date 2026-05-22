"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = ({href, children}) => {
    const pathname = usePathname();
    
    return (
        <Link href={href}
        className={`${pathname === href ? "bg-[#1A6FBF] text-white rounded-2xl font-bold" : "text-black dark:text-white/80 hover:text-[#1A6FBF] dark:hover:text-[#3FA9D4]"} 
        hover:rounded-3xl`}
        >{children}</Link>
    );
};

export default NavLinks;