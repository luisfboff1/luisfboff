'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/estoque', label: 'Estoque' },
    { href: '/vendas', label: 'Vendas' },
    { href: '/vendedores', label: 'Vendedores' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/config', label: 'Configurações' },
  ]

  return (
    <header className="header">
      <Link className="brand" href="/">
        <Image 
          src="/assets/logo.png" 
          alt="Megui's Pet" 
          width={70} 
          height={70}
          quality={100}
          priority
          style={{
            imageRendering: 'crisp-edges',
            filter: 'none'
          }}
        />
        Megui's Pet
      </Link>
      <nav className="nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
