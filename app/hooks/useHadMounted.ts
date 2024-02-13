import { useEffect, useState } from 'react'

export function useHasMounted() {
  const [hasMounted, sethasMounted] = useState(false)
  useEffect(() => {
    sethasMounted(true)
  }, [])

  return hasMounted
}
