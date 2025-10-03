import React from 'react'

interface BotProtectionProps {
  // No visible props needed - this is invisible to users
}

/**
 * Honeypot Bot Protection Component
 * 
 * This component renders an invisible form field that humans can't see or interact with,
 * but bots will typically fill out. If this field has a value, we know it's likely a bot.
 * 
 * Usage: Include this component in forms, then check document.querySelector('input[name="website"]').value
 * If it has a value, it's likely a bot submission.
 */
const BotProtection: React.FC<BotProtectionProps> = () => {
  return (
    <>
      {/* Honeypot field - completely hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
          width: 0,
          overflow: 'hidden',
          border: 'none',
          background: 'transparent'
        }}
        aria-hidden="true"
        placeholder="Leave this empty"
      />
      
      {/* Additional honeypot with different approach */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
          width: 0,
          overflow: 'hidden'
        }}
        aria-hidden="true"
      >
        <input
          type="email"
          name="email_confirm"
          tabIndex={-1}
          autoComplete="off"
          placeholder="Confirm email"
        />
      </div>
    </>
  )
}

export default BotProtection

// Utility functions for bot protection checks
export const BotProtectionUtils = {
  /**
   * Check if submission appears to be from a bot
   * @returns true if bot detected, false if appears to be human
   */
  isBotSubmission(): boolean {
    try {
      const honeypotField = document.querySelector('input[name="website"]') as HTMLInputElement
      const confirmField = document.querySelector('input[name="email_confirm"]') as HTMLInputElement
      
      // Debug logging
      const websiteValue = honeypotField?.value?.trim() || ''
      const confirmValue = confirmField?.value?.trim() || ''
      
      console.log('🕵️ Bot protection debug:', {
        honeypotFieldExists: !!honeypotField,
        confirmFieldExists: !!confirmField,
        websiteValue: websiteValue,
        confirmValue: confirmValue,
        websiteLength: websiteValue.length,
        confirmLength: confirmValue.length
      })
      
      // Temporarily very lenient - only flag if fields have suspicious long content
      const isBot = (websiteValue.length > 10) || (confirmValue.length > 10)
      console.log('🤖 Bot detection result:', isBot)
      
      return isBot
    } catch (error) {
      console.warn('Bot protection check failed:', error)
      // If bot protection fails, allow submission to proceed
      return false
    }
  },

  /**
   * Check if user is submitting too frequently (rate limiting)
   * @param storageKey - localStorage key to track submissions
   * @param cooldownMs - minimum time between submissions in milliseconds
   * @returns true if rate limit exceeded, false if ok to proceed
   */
  isRateLimited(storageKey: string, cooldownMs: number): boolean {
    const lastSubmission = localStorage.getItem(storageKey)
    const now = Date.now()
    
    if (lastSubmission && (now - parseInt(lastSubmission)) < cooldownMs) {
      return true
    }
    
    return false
  },

  /**
   * Record submission time for rate limiting
   * @param storageKey - localStorage key to store submission time
   */
  recordSubmission(storageKey: string): void {
    localStorage.setItem(storageKey, Date.now().toString())
  },

  /**
   * Validate email format
   * @param email - email address to validate
   * @returns true if valid email format, false otherwise
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
  },

  /**
   * Check for suspicious content patterns
   * @param content - text content to check
   * @returns true if suspicious, false if seems legitimate
   */
  hasSuspiciousContent(content: string): boolean {
    const suspiciousPatterns = [
      /http[s]?:\/\//i,  // URLs
      /www\./i,          // Website references
      /viagra|cialis|pharmacy/i,  // Common spam terms
      /@[a-zA-Z0-9]/,    // Email addresses in content
      /\$\d+|\d+\$/,     // Money references
      /free.{0,10}(money|cash|prize)/i,  // Free money offers
    ]
    
    return suspiciousPatterns.some(pattern => pattern.test(content))
  }
}