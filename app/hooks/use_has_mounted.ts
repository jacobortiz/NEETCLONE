import { useEffect, useState } from 'react'

export default function useHasMounted() {
  const [hasMounted, sethasMounted] = useState(false)
  useEffect(() => {
    sethasMounted(true)
  }, [])

  return hasMounted
}
