'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, createContext, useContext } from 'react'

interface AuthContextType {
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'fr'

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasToken = document.cookie.includes('accessToken');

    if (!hasToken && !pathname.includes('/auth/login')) {
      router.push(`/${locale}/auth/login`);
    }else if (hasToken && pathname.includes('/auth/login')) {
      router.push(`/${locale}`);
    }

    setIsLoading(false)
  }, [pathname, router, locale])

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
