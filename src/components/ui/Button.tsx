import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]',
          variant === 'outline' && 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg',
          variant === 'ghost' && 'text-secondary hover:text-primary hover:bg-gray-100 rounded-lg',
          variant === 'secondary' && 'bg-accent text-white hover:bg-secondary shadow-lg hover:shadow-xl hover:-translate-y-0.5',
          size === 'sm' && 'px-3 py-2 text-sm rounded-lg min-h-10',
          size === 'md' && 'px-6 py-3 text-base rounded-lg min-h-12',
          size === 'lg' && 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl min-h-12 sm:min-h-14',
          className,
        )}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
