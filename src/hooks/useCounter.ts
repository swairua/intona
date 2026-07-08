import { useState, useEffect, useRef } from 'react'

export function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const stepTime = Math.max(16, duration / target)
          let current = 0
          const timer = setInterval(() => {
            current += 1
            setCount(current)
            if (current >= target) {
              clearInterval(timer)
              setCount(target)
            }
          }, stepTime)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}
