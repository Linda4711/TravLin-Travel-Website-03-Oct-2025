import React from 'react'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface TravLinButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'blue' | 'orange' | 'yellow' | 'secondary' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'reduced'
  icon?: LucideIcon
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

export default function TravLinButton({ 
  children, 
  onClick, 
  variant = 'blue', 
  size = 'md', 
  icon: Icon, 
  className = '',
  disabled = false,
  style = {},
  type = 'button'
}: TravLinButtonProps) {
  
  const getBaseStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      fontFamily: 'inherit',
      borderRadius: '0', // SQUARE EDGES AS PER FIGMA DESIGN
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
      outline: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none',
      // EXPLICIT HEIGHT - DIFFERENT SIZES
      minHeight: size === 'lg' ? 'var(--button-height-mobile)' : 
                 size === 'reduced' ? 'var(--button-reduced-mobile)' : 'auto'
    }

    switch (variant) {
      case 'orange':
        return {
          ...baseStyle,
          backgroundColor: 'var(--brand-orange)',
          color: 'var(--white)',
          boxShadow: '0 6px 20px rgba(237, 125, 49, 0.25)'
        }
      case 'yellow':
        return {
          ...baseStyle,
          backgroundColor: 'var(--brand-yellow)',
          color: 'var(--gray-800)',
          boxShadow: '0 6px 20px rgba(255, 192, 0, 0.25)'
        }
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          color: 'var(--brand-blue)',
          boxShadow: '0 4px 15px rgba(0, 117, 204, 0.15)',
          border: '2px solid var(--brand-blue)'
        }
      case 'white':
        return {
          ...baseStyle,
          backgroundColor: 'var(--white)',
          color: 'var(--brand-blue)',
          boxShadow: '0 4px 15px rgba(0, 117, 204, 0.15)',
          border: '2px solid var(--brand-blue)'
        }
      default: // blue
        return {
          ...baseStyle,
          backgroundColor: 'var(--brand-blue)',
          color: 'var(--white)',
          boxShadow: '0 6px 20px rgba(0, 117, 204, 0.25)'
        }
    }
  }

  const getHoverStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'orange':
        return {
          backgroundColor: 'var(--brand-orange-dark)',
          boxShadow: '0 8px 25px rgba(237, 125, 49, 0.35)'
        }
      case 'yellow':
        return {
          backgroundColor: 'var(--brand-yellow)', // SAME COLOR - NO CHANGE
          boxShadow: '0 8px 25px rgba(255, 192, 0, 0.35)'
        }
      case 'secondary':
        return {
          backgroundColor: 'var(--brand-blue)',
          color: 'var(--white)',
          boxShadow: '0 6px 20px rgba(0, 117, 204, 0.25)'
        }
      case 'white':
        return {
          backgroundColor: 'var(--gray-50)',
          boxShadow: '0 6px 20px rgba(0, 117, 204, 0.25)'
        }
      case 'blue':
      default:
        return {
          backgroundColor: 'var(--brand-blue)', // SAME COLOR - NO CHANGE
          boxShadow: '0 8px 25px rgba(0, 117, 204, 0.35)'
        }
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4 text-sm'
      case 'lg':
        return 'py-5 px-10 text-lg tracking-wider'
      case 'reduced':
        return 'py-4 px-10 text-lg tracking-wider'
      default: // md
        return 'py-4 px-8 text-base'
    }
  }

  const baseStyles = getBaseStyles()
  const hoverStyles = getHoverStyles()

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getSizeClasses()} ${className}`}
      style={{
        ...baseStyles,
        ...style
      }}
      whileHover={{ 
        scale: 1.05,
        ...hoverStyles
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  )
}