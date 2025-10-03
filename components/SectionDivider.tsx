import React from 'react'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`flex justify-center mb-10 ${className}`}>
      <div className="w-32 h-1 rounded-full" 
           style={{
             background: 'linear-gradient(90deg, var(--brand-blue) 0%, var(--brand-orange) 50%, var(--brand-yellow) 100%)'
           }}>
      </div>
    </div>
  )
}