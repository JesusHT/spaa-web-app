'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthentication } from '../hooks/useAuthentication';

export default function NavLinks() {
  const pathname = usePathname();
  const isAuthenticate = useAuthentication();
  const router = useRouter();

  if (isAuthenticate === null) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticate) {
    router.push("/");
    return null;
  }

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href="/about"
      >
        About
      </Link>
    </nav>
  )
}
