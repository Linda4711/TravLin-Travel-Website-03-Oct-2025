import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { X, FileText, Shield, AlertTriangle, Download, Mail, CheckCircle, User, Phone, Calendar, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'

interface TermsPrivacyProps {
  isOpen: boolean
  onClose: () => void
}

interface CustomerAcceptanceForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName?: string
  agreedToTerms: boolean
  agreedToFees: boolean
  agreedToPrivacy: boolean
}

export default function TermsPrivacy({ isOpen, onClose }: TermsPrivacyProps) {
  const [showAcceptanceForm, setShowAcceptanceForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)
  const [form, setForm] = useState<CustomerAcceptanceForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    agreedToTerms: false,
    agreedToFees: false,
    agreedToPrivacy: false
  })

  // Production-safe configuration
  const CONTACT_EMAIL = 'hello@travlintravel.com.au'

  const pdfLinks = {
    serviceFees: 'https://travlintravel.com.au/wp-content/uploads/sites/12/2025/07/TravLin-Travel_Schedule-of-FeesATIA-Fee-Flyer_JUL-25.pdf',
    travelInfo: 'https://travlintravel.com.au/wp-content/uploads/sites/12/2025/07/TravLin-Travel_Travel-Information-ONLY_JUL25.pdf',
    customerAcceptance: 'https://travlintravel.com.au/wp-content/uploads/sites/12/2025/07/TravLin-Travel_Customer-Acceptance-ONLY_JUL25.pdf'
  }

  if (!isOpen) return null

  const handleInputChange = (field: keyof CustomerAcceptanceForm, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitAcceptance = async () => {
    // Validation
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!form.agreedToTerms || !form.agreedToFees || !form.agreedToPrivacy) {
      toast.error('Please agree to all terms and conditions')
      return
    }

    setIsSubmitting(true)

    try {
      // Create acceptance record
      const acceptanceData = {
        customer: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName || 'N/A'
        },
        acceptance: {
          timestamp: new Date().toLocaleString('en-AU', { 
            timeZone: 'Australia/Melbourne',
            year: 'numeric',
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          acceptanceId: `TLT-${Date.now()}`,
          documentsAccepted: ['Service Fees', 'Travel Information', 'Customer Acceptance', 'Privacy Policy'],
          ipAddress: 'Hidden for privacy',
          userAgent: navigator.userAgent.substring(0, 100) // Limit length
        }
      }

      // Store in localStorage for customer reference
      localStorage.setItem('travlin-acceptance-record', JSON.stringify(acceptanceData))

      // Send email notification via EmailJS
      try {
        const emailParams = {
          // Primary EmailJS fields
          to_email: 'hello@travlintravel.com.au',
          from_name: acceptanceData.customer.name,
          from_email: acceptanceData.customer.email,
          subject: `Customer Acceptance Received - ${acceptanceData.acceptance.acceptanceId}`,
          
          // Customer details
          customer_name: acceptanceData.customer.name,
          customer_surname: acceptanceData.customer.name.split(' ').pop() || acceptanceData.customer.name, // Extract surname
          customer_first_name: acceptanceData.customer.name.split(' ')[0] || acceptanceData.customer.name, // Extract first name
          customer_email: acceptanceData.customer.email,
          customer_phone: acceptanceData.customer.phone || 'Not provided',
          business_name: acceptanceData.customer.businessName || 'Private Individual',
          
          // Acceptance details
          acceptance_id: acceptanceData.acceptance.acceptanceId,
          acceptance_reference: acceptanceData.acceptance.acceptanceId,
          timestamp: acceptanceData.acceptance.timestamp,
          documents_accepted: acceptanceData.acceptance.documentsAccepted.join(', '),
          user_agent: acceptanceData.acceptance.userAgent,
          ip_address: acceptanceData.acceptance.ipAddress || 'Hidden for privacy',
          
          // Comprehensive message for email body
          message: `NEW CUSTOMER ACCEPTANCE RECEIVED

CUSTOMER DETAILS:
Name: ${acceptanceData.customer.name}
Surname: ${acceptanceData.customer.name.split(' ').pop() || acceptanceData.customer.name}
Email: ${acceptanceData.customer.email}
Phone: ${acceptanceData.customer.phone || 'Not provided'}
Business: ${acceptanceData.customer.businessName || 'Private Individual'}
Travel for Business: ${acceptanceData.customer.travelForBusiness ? 'Yes' : 'No'}

ACCEPTANCE DETAILS:
Acceptance Reference: ${acceptanceData.acceptance.acceptanceId}
Timestamp: ${acceptanceData.acceptance.timestamp}
Documents Accepted: ${acceptanceData.acceptance.documentsAccepted.join(', ')}
IP Address: ${acceptanceData.acceptance.ipAddress || 'Hidden for privacy'}
User Agent: ${acceptanceData.acceptance.userAgent}

TERMS AND CONDITIONS ACCEPTED:
${acceptanceData.acceptance.documentsAccepted.map(doc => `✓ ${doc}`).join('\n')}

This customer has completed the legal acceptance process and can now proceed with bookings.`,
          
          // Additional template fields for backup
          full_name: acceptanceData.customer.name,
          email: acceptanceData.customer.email,
          phone: acceptanceData.customer.phone || 'Not provided',
          company: acceptanceData.customer.businessName || 'Private Individual',
          reference_id: acceptanceData.acceptance.acceptanceId,
          date_accepted: acceptanceData.acceptance.timestamp,
          accepted_documents: acceptanceData.acceptance.documentsAccepted.join(', ')
        }

        await emailjs.send(
          'service_rlnjyuj',
          'template_270l5y4',
          emailParams,
          'GY6ImN3fkI91A6mGw'
        )

        console.log('✅ Customer acceptance email sent successfully')
      } catch (emailError) {
        console.error('📧 EmailJS error:', emailError)
        // Don't fail the entire process if email fails
      }

      // Brief delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(
        `Terms accepted successfully! Please contact us at ${CONTACT_EMAIL} with your acceptance ID: ${acceptanceData.acceptance.acceptanceId}`,
        { duration: 8000 }
      )

      setSubmissionComplete(true)

    } catch (error) {
      toast.error('Failed to submit acceptance. Please try again.')
      console.error('Acceptance submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      agreedToTerms: false,
      agreedToFees: false,
      agreedToPrivacy: false
    })
    setShowAcceptanceForm(false)
    setSubmissionComplete(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const modalContent = () => {
    if (submissionComplete) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Terms Accepted Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you, {form.firstName}! Please contact us at {CONTACT_EMAIL} with your acceptance ID for next steps.
                Your acceptance ID is: <span className="font-mono text-blue-600">TLT-{Date.now()}</span>
              </p>
              <div className="space-y-3">
                <Button onClick={handleClose} className="w-full">
                  Continue Planning Your Trip
                </Button>
                <Button variant="outline" onClick={resetForm} className="w-full">
                  Submit Another Acceptance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (showAcceptanceForm) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Customer Acceptance Form</h2>
                  <p className="text-sm text-gray-500">Complete to proceed with booking</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAcceptanceForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+61 xxx xxx xxx"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name (Optional)</Label>
                      <Input
                        id="businessName"
                        value={form.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Company/Organization name"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Terms & Conditions Acceptance
                  </h3>
                  
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={form.agreedToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreedToTerms', !!checked)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                        I have read and agree to the <a href={pdfLinks.travelInfo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Travel Information & Terms of Service</a> *
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeFees"
                        checked={form.agreedToFees}
                        onCheckedChange={(checked) => handleInputChange('agreedToFees', !!checked)}
                      />
                      <Label htmlFor="agreeFees" className="text-sm leading-relaxed">
                        I have read and agree to the <a href={pdfLinks.serviceFees} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Schedule of Professional Service Fees</a> *
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreePrivacy"
                        checked={form.agreedToPrivacy}
                        onCheckedChange={(checked) => handleInputChange('agreedToPrivacy', !!checked)}
                      />
                      <Label htmlFor="agreePrivacy" className="text-sm leading-relaxed">
                        I have read and agree to the <a href={pdfLinks.customerAcceptance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Customer Acceptance Form</a> and Privacy Policy and understand how my personal information will be handled *
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Legal Notice */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Legal Notice:</strong> By submitting this form, you acknowledge that any payment for travel components constitutes acceptance of both agency and supplier terms and conditions. This acceptance will be recorded for your reference.
                  </p>
                </div>
              </div>
            </CardContent>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAcceptanceForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitAcceptance}
                  disabled={isSubmitting || !form.agreedToTerms || !form.agreedToFees || !form.agreedToPrivacy}
                  className="flex-1"
                  style={{ backgroundColor: 'var(--brand-orange)' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Terms & Continue
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )
    }

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl border-2 border-gray-200">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--brand-blue)' }}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Terms & Privacy</h2>
                <p className="text-sm text-gray-500">Effective 01 Jul 2025</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-white">
            <div className="space-y-6">
              {/* Quick Access Downloads */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Document Downloads
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <a 
                    href={pdfLinks.serviceFees} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Schedule of Professional Service Fees
                  </a>
                  <a 
                    href={pdfLinks.travelInfo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Travel Information & Terms
                  </a>
                  <a 
                    href={pdfLinks.customerAcceptance} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Customer Acceptance Form
                  </a>
                </div>
              </div>

              {/* Customer Acceptance CTA */}
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--brand-orange)' }}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-orange-800 mb-3">Ready to Proceed with Your Booking?</h3>
                <p className="text-sm text-orange-700 mb-4">
                  Complete our customer acceptance form to acknowledge that you've read and agree to our terms and conditions. 
                  This enables us to proceed with your travel arrangements.
                </p>
                <Button 
                  onClick={() => setShowAcceptanceForm(true)}
                  style={{ backgroundColor: 'var(--brand-orange)' }}
                  className="text-white hover:opacity-90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Customer Acceptance
                </Button>
              </div>

              {/* Executive Summary */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Executive Summary
                </h3>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p>Although you should read all of the terms and conditions, the following is a summary of the most important:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Prices, including, in some cases, of confirmed bookings, may be subject to change.</li>
                    <li>Some confirmed bookings are non-refundable if cancelled by you and it is your responsibility to check if this applies.</li>
                    <li>We will be entitled to retain our service fees even if a booking is cancelled or does not proceed for any reason which is not our fault.</li>
                    <li>It is your responsibility to make yourself aware of all information relevant to your travel plans, including but not limited to visa requirements and health precautions.</li>
                    <li>We are not your agent and may receive additional fees or other incentives from Suppliers.</li>
                    <li>We are not liable for the accuracy of any published Supplier content including websites and brochures.</li>
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose prose-sm max-w-none">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
                
                <p className="mb-4">
                  Please read the following terms and conditions carefully.
                </p>

                <p className="mb-4">
                  You must not make any booking unless you are 18 years of age or older and understand and agree with the following terms and conditions.
                  These terms and conditions apply to bookings you make with a Consultant (instore, over the phone or by email) as well as online bookings made via our website.
                  These terms and conditions govern our relationship with you. Once we accept a booking from you on behalf of a Supplier, you will also have a separate contract with the Supplier, which will be governed by other terms and conditions. It is your responsibility to make yourself aware of those other terms and conditions.
                </p>

                {/* Executive Summary */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Executive Summary
                  </h3>
                  <div className="text-sm text-yellow-700 space-y-2">
                    <p>Although you should read all of the terms and conditions, the following is a summary of the most important:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Prices, including, in some cases, of confirmed bookings, may be subject to change.</li>
                      <li>Some confirmed bookings are non-refundable if cancelled by you and it is your responsibility to check if this applies.</li>
                      <li>We will be entitled to retain our service fees even if a booking is cancelled or does not proceed for any reason which is not our fault.</li>
                      <li>It is your responsibility to make yourself aware of all information relevant to your travel plans, including but not limited to visa requirements and health precautions.</li>
                      <li>We are not your agent and may receive additional fees or other incentives from Suppliers.</li>
                      <li>We are not liable for the accuracy of any published Supplier content including websites and brochures.</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Prices and Taxes</h3>
                <p className="mb-4">
                  All prices that we quote are in Australian Dollars and based on twin share accommodation unless otherwise stated. Please note that prices quoted are subject to change at the discretion of the Supplier prior to booking.
                  Price changes may occur after booking because of matters outside our control which increase the cost of the Product. Such factors include adverse currency fluctuations, fuel surcharges, taxes and airfare increases.
                </p>

                <p className="mb-4">
                  Please contact your Consultant for up-to-date prices. Even if paid in full, a price may change because of matters outside our control.
                </p>

                <p className="mb-4">
                  Prices include all applicable taxes requiring payment prior to departure, and may be subject to adjustment in the event of an increase in those taxes. On other occasions, you may be liable for taxes in addition to the quoted price of the Product. For example, there may be a local tax charged at some airports or resorts.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Products</h3>
                <p className="mb-4">
                  All Products that we quote on are subject to availability and may be withdrawn or varied by the Supplier without notice.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Fees and Surcharges</h3>
                <p className="mb-4">
                  A variety of fees and surcharges may be payable to us, including booking or reservation fees, cancellation and amendment fees, credit card merchant fees,
                  insurance claim processing fees or fees for adhoc services performed as required. You may see our current schedule of professional service fees at service-fees.
                </p>

                <p className="mb-4">
                  Payment by credit card will incur a surcharge to offset our cost of acceptance of payment by credit card. The surcharge varies depending on credit card type, it is your responsibility to advise the correct credit card type to ensure that the appropriate surcharge is applied. We accept no responsibility for an inappropriate surcharge being applied if the correct card type has not been advised, and the surcharge applied shall not be refundable.
                </p>

                <p className="mb-4">
                  You authorise us to charge all monies payable by you in relation to any booking we make on your behalf or other services we have procured or provided to the credit card or debit card designated by you. If payment is not received from the card issuer or its agents for any reason, you agree to pay us all amounts due immediately on demand.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Change and Cancellation Fees</h3>
                <p className="mb-4">
                  Be aware that some confirmed bookings are not refundable if cancelled, and also may not be transferable to another date or otherwise changed. Alternatively, a change may only be permissible subject to payment of an additional fee or charge. It is your responsibility to check if a booking is non-refundable or will incur charges for changing it before placing the booking.
                </p>

                <p className="mb-4">
                  Changes and cancellations of confirmed bookings may incur fees from Suppliers in addition to our service fees. Suppliers' fees are outlined in their relevant terms and conditions.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Refunds</h3>
                <p className="mb-4">
                  Your entitlement to a refund for cancelled bookings is subject to the relevant Supplier's terms and conditions.
                  If you are entitled to a refund then, subject to the Supplier's terms and conditions, we will arrange for it to be supplied to us on your behalf, unless we expressly agree with you otherwise.
                </p>

                <p className="mb-4">
                  If we are managing or arranging a refund for a cancelled booking on your behalf it will not be paid to you until the Supplier provides the refund to us, and we will not be liable for any delay on the part of the Supplier. Be aware that typically airlines will take between 60-90 days to process a refund. Please note that if we are entitled to a service fee for placing a booking, we will remain entitled to this fee if you cancel the booking or the Supplier fails to provide you with the Product for any reason (other than our default), including in an event of Force Majeure. We will be entitled to deduct our service fee from any refund we receive on your behalf before remitting the balance to you.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Deposits and Payments</h3>
                <p className="mb-4">
                  You will be required to pay a deposit (or deposits) when booking. The deposit amount varies depending on the Product booked and lead time to travel. In some instances, full payment is required at the time of booking and your consultant will advise the deposit amount at the time of booking. All deposits are non-refundable for changes of mind or cancellations by you (subject to your rights under the Australian Consumer Law). Where a deposit has been collected, final payment is required no later than six weeks prior to departure. Failure to make payment by the due date may result in your booking being cancelled and deposits forfeited.
                </p>

                <p className="mb-4">
                  Payments made by direct deposit may take up to three business days to process. If you are paying by this method, you will need to make the payment at least three business days prior to the actual due date. You must notify you Consultant of your payment once it has been made.
                </p>

                <p className="mb-4">
                  Payments made by personal cheque (excluding bank cheques) require five business days to process. If you are paying by this method, you will need to make the payment at least five business days prior to the actual due date.
                  You agree not to stop payment of the cheque even when you cancel a booking. You agree that we may apply the proceeds of the cheque to satisfy any liability you have to us or to a Supplier, including any liability in respect of cancellation fees, before refunding the balance to you.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Information</h3>
                <p className="mb-4">
                  Our responsibility is solely to arrange a booking of a Product in accordance with your instructions. It is your responsibility to make yourself aware of all information that it
                  is necessary or desirable to know in order to make optimum use of the Product and to undertake travel generally. We strongly recommend that you read our travel information at travel-information which may be relevant, especially in relation to passport and visa requirements. Please note that this information is provided as a guide only, and although it is accurate to the best of our knowledge, we do not warrant that it is completely up-to-date at all times. Further, we do not warrant that it is comprehensive and it may not address a topic that is relevant to your travel plans. It is your responsibility to further investigate and confirm any matters that are applicable to you.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Special Requirements</h3>
                <p className="mb-4">
                  You must inform your consultant regarding any special requirements you may have for your travel arrangements such as special meal and seating requests, room type or disabled access prior to making a booking. If you do not specifically inform us we will assume that you do not have any such requirements, and the booking will be made on that basis.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Frequent Flyer and Loyalty Programs</h3>
                <p className="mb-4">
                  When booking with one of our Consultants, it is your responsibility to let them know your frequent flyer membership details (or other applicable loyalty program details) for inclusion in your booking. Notwithstanding that your details may be included in the booking, we cannot guarantee that the Supplier will credit you with points for your booking.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Travel Documents</h3>
                <p className="mb-4">
                  If you have booked with a consultant, it is your responsibility to collect all travel documents from us prior to travel unless your consultant is home based/mobile who can come to you. As a general rule, your travel documents will be available for collection two weeks prior to departure, however this will depend on your individual arrangements. Please contact your consultant to confirm when your travel documents are ready for collection. If you have booked online, you should print out and retain your travel documents as provided to you by the website (or in a confirmation email we send you). You must review your travel documents carefully and advise us immediately of any errors in names, dates or timings.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Agency</h3>
                <p className="mb-4">
                  We act as an agent for and sell various travel related products as an agent on behalf of numerous transport, accommodation and other service providers, such as airlines, coach, rail and cruise line operators, as well as travel wholesalers ("Suppliers"). We may receive fees, commissions, gifts or financial incentives from Suppliers in respect of Products we advise you of or arrange on your behalf. Any brochures provided by us to you are supplied by Suppliers, or are prepared by us based on content supplied by Suppliers, and we accept no liability for errors in that material. Your oral or written instructions to us are authority for us to make travel bookings on your behalf and to arrange relevant contracts between you and the applicable Supplier. Notwithstanding this authority, we are not your agent and do not have any fiduciary duty to you. We exercise care in the selection of reputable Suppliers, but we are not ourselves a provider of travel services and have no control over, or liability for, the Products provided by the Suppliers, who are third parties. All bookings are made on your behalf subject to the terms and conditions, including conditions of carriage and limitations of liability, imposed by the Supplier. We recommend that you read them before finalising the transaction and we can provide you with copies of the relevant terms and conditions on request. Your legal rights and remedies in connection with the provision of Products are against the Supplier and, except to the extent a problem is directly and primarily caused by fault on our part, are not against us. Specifically, if for any reason (excluding fault on our part) any Supplier is unable to provide the Product for which you have contracted either at all, or to the requisite standard, your remedies are against that Supplier and not against us.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Liability</h3>
                <p className="mb-4">
                  To the extent permitted by law, we do not accept any liability in contract, tort or otherwise for any injury, damage, loss (including consequential loss), delay, additional expense or inconvenience caused directly or indirectly by the acts, omissions or default, whether negligent or otherwise, of third party providers over whom we have no direct control, an event of Force Majeure affecting you, us or a Supplier or any other event which is beyond our control or which is not preventable by reasonable diligence on our part. Under circumstances where our liability cannot be excluded and where liability may be lawfully limited, such liability is limited to the remedies required of us under applicable law (including the Australian Consumer Law). In particular, we disclaim any liability for any consequential loss, including loss of enjoyment or amenity. This liability clause is subject to your rights under the Australian Consumer Law and nothing in these terms and conditions is intended to limit any rights you may have under the Competition and Consumer Act 2010 (Cth).
                  Without limitation of the disclaimer of liability in the previous paragraph, any obligation we have to you will be suspended during the time and to the extent that we are prevented from, or delayed in, complying with that obligation by an event of Force Majeure.
                  Your rights with respect to a confirmed booking affected by an event of Force Majeure will be subject to the terms and conditions of the relevant Supplier.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Governing Law</h3>
                <p className="mb-4">
                  If any dispute arises between you and us, the laws applicable in VIC will apply. You irrevocably and unconditionally submit to the exclusive jurisdiction of the courts of VIC, and waive any right that you may have to object to an action being brought in those courts.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Summary of Obligations</h3>
                <p className="mb-4">Before making a booking, it is important that you meet the following requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>You are over the age of eighteen (18) and have sufficient funds to pay for the travel services.</li>
                  <li>You have read our terms and conditions and if booking for third parties warrant that you have their authority to do so and have conveyed these terms and conditions to them. You agree to indemnify us and the Supplier against any claims from third parties who have not in fact been properly informed.</li>
                  <li>You have read the terms and conditions of any applicable Suppliers and agree to be bound by those.</li>
                  <li>You are responsible for checking the accuracy of all documents provided to you.</li>
                  <li>You are responsible for confirming departure times of any booked services at least 24 hours prior to travel.</li>
                  <li>You warrant and acknowledge that you have accessed the Smartraveller website http://smartraveller.gov.au for any specific information in relation to your intended destination.</li>
                  <li>You accept that passport, visas and other required identification documents are your responsibility.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Definitions</h3>
                <div className="mb-4 space-y-2">
                  <p><strong>"we" and "us"</strong> means TravLin Travel (ABN 69 613 027 062), and where the context permits, its Consultants.</p>
                  <p><strong>"Consultant"</strong> means an employee of TravLin Travel, with authority to book Products.</p>
                  <p><strong>"you"</strong> means a person who makes a booking for a Product with us.</p>
                  <p><strong>"your Consultant"</strong> means the particular Consultant or Consultants with whom you negotiate the booking of a Product.</p>
                  <p><strong>"Supplier"</strong> means a third party company or person who provides Products, including a wholesaler of such Products.</p>
                  <p><strong>"Product"</strong> means travel and holiday related products and services including accommodation, leisure activities and various forms of transport, including packaged combinations thereof.</p>
                  <p><strong>"Travel documents"</strong> means any document (whether in electronic form or otherwise) used to confirm an arrangement with a Supplier, including (without limitation) airline tickets, hotel vouchers and tour vouchers.</p>
                  <p><strong>"Force Majeure"</strong> means an act of God, peril of the sea, accident of navigation, war (including civil war), sabotage, riot, insurrection, civil commotion, coup d'état, national emergency, martial law, fire (including wildfire), explosion, lightning, flood, tsunami, cyclone, hurricane, tornado or other major weather event, earthquake, landslide, volcanic eruption or other natural catastrophe, epidemic, pandemic, quarantine, outbreaks of infectious disease or any other public health crisis, radiation or radioactive contamination, national strike or other major lack of availability of labour, raw materials or energy beyond the control of the affected party. For the avoidance of doubt, the inability of a party to make a profit or avoid a financial loss, changes in market prices or conditions, or a party's inability to perform its obligations due to insufficiency of finance does not in itself constitute Force Majeure.</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
                  <p className="text-sm text-orange-700">
                    <strong>To proceed with your booking,</strong> please complete our customer acceptance form on to of the page by the button on the top of the page or available at customer-acceptance to acknowledge that you have read and agree to our terms and conditions and professional service fees. Please note regardless of you formally signing the customer acceptance that any payment of any travel component is considered as your acknowledgement in you having read, understood and accepted both agency and supplier Terms and Conditions.
                  </p>
                </div>

                {/* Privacy Section */}
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Privacy</h2>
                
                <p className="mb-4">
                  TravLin Travel, its businesses, websites and apps operate from Australia and this policy provides information in accordance with our obligations under the Privacy Act. We understand that you care how your personal information is handled and we appreciate your trust that we will do so carefully and sensibly and in compliance with the Australian Privacy Principles of the Privacy Act 1988.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Your personal information</h3>
                <p className="mb-4">
                  TravLin Travel and its associated entities may, in the course of arranging travel for you, receive and hold personal information about you, that includes but is not limited to, your full name, your contact details, your business or home address, your date of birth, your passport data, details of any loyalty program memberships, health condition and medical history, concession card number or driver's license number and other data relevant to the services – general and personalised that we provide you.
                </p>

                <p className="mb-4">
                  In these circumstances, you agree that transacting travel bookings authorises us to disclose only the required personal information when required, in order to finalise these travel bookings on your behalf. TravLin Travel will normally only collect your sensitive information with your consent and where it is required for your travel arrangements such as allergies, disabilities that requires special arrangements or in the event of an accident.
                  We may also collect your personal information from others who make a booking on your behalf and they should be authorised to provide us with your information.
                </p>

                <p className="mb-4">
                  Your personal information will be collected when you deal with us over the telephone, send us a letter or an email or visit our website, complete an online registration form, provide information to complete a booking, register as a member, or participate in one of our surveys, competitions or promotions. When you access our website, use any of our mobile applications or open an electronic communication from TravLin Travel, servers may record data regarding your device and the network you are using to connect with us, including your IP address. An IP address is a series of numbers which identify your computer, and which are generally assigned when you access the internet. Alone, IP addresses are not personal information, but we may link IP addresses to other personal information we hold about you and use it for the purpose of fraud prevention and protection. We store personal information in a combination of secure computer storage facilities, and paper-based facilities.
                </p>

                <p className="mb-4">
                  Personal information in email we receive from you, including email addresses, will only be used for the purposes given and are subject to the conditions set out in this privacy statement. However, communications over the Internet are inherently insecure. Sending personal information in an email remains entirely at your own risk and TravLin Travel will not be responsible for any unauthorised use of this information by third parties.
                  We may collect information on website activity, such as the number of visitors, the number of pages viewed, navigation patterns, what systems users have and the date and time of visits. This information is collected for statistical purposes only and will not be used to identify you.
                  We may also utilise "cookies" which enable us to monitor website traffic patterns and to serve you more efficiently if you revisit the site. A "cookie" is a small software file that is placed on your computer and enables our website to recognise your computer upon a return visit. You can set your browser to notify you when you receive a cookie and this will provide you with an opportunity to either accept or reject it in each instance. Please be aware that disabling cookies may impede your use of the website to some extent.
                </p>

                <p className="mb-4">
                  We take reasonable steps to maintain the security of the information we store in our systems or in physical records. We use a combination of security measures to prevent the unauthorised access of our systems and regularly review our security policies. Your personal information will be stored in secured locations both physically and electronically controlled by ourselves, and the offices of our service providers in line with the nature of your travel bookings. Payment details such as credit card details are generally never stored electronically or physically by our office and if this form of payment is your choice, TravLin Travel always recommend advising details over the phone for further enhanced security measure.
                </p>

                <p className="mb-4">
                  We are committed to protecting your personal information and expressly agree not to disclose your personal information unless authorised by you. If you choose not to provide TravLin Travel with the personal information as requested we may not be able to provide you with the full range of our products and services. Your personal information will only be used for these purposes and will not be shared, sold or given to any third parties, unless required or authorised under the exemptions set out in the Privacy Act.
                </p>

                <p className="mb-4">
                  You can request us to provide access to the personal information that we hold about you. You may request us to amend the details of the personal information we hold. We will amend the details on request provided we are satisfied that the amendment is valid. We may in some circumstances request you to provide documentary evidence or other corroboration of validity (e.g. provision of a marriage certificate or a registered deed poll to amend your name). If we do not consider it appropriate to make an amendment we will notify you within a reasonable time including written reasons for the refusal.
                  To request access, request an amendment, request a qualifying statement or make a complaint please contact us using the details provided below.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Marketing</h3>
                <p className="mb-4">
                  Serving customers well is very important to us. As part of this service, we may use your personal information to identify a product or service that you may be interested in. We may with your consent where required by applicable law, use the contact details you have provided to contact you from time to time whether by phone, email, SMS or post to tell you about new or exciting products or services and special offers that we believe may be of interest to you, including information about our business partners' products and services.
                </p>

                <p className="mb-4">
                  You can opt-out of receiving direct marketing communications from us, including communications from us on behalf of our business partners at any time by contacting us at any time, or by using the unsubscribe facility in the electronic communication you receive. By opting out of this kind of advertising you may still receive ads from TravLin Travel or ads from other parties that are broadly targeted by indirect means.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Privacy Complaints</h3>
                <p className="mb-4">
                  If you wish to complain about our handling of your personal information, please contact us with your concerns. We will investigate all complaints and respond to you as soon as practicable. We will need to verify your identity. If we find a complaint justified, we will resolve it. If necessary, we will change our policies and procedures to maintain our high standards of performance, service and customer care.
                </p>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg border mt-8">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Privacy Officer Contact
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>TravLin Travel</strong></p>
                    <p>PO Box 7303, Karingal Centre</p>
                    <p>Karingal VICTORIA 3199</p>
                    <p>Telephone +61 (415) 355 851</p>
                    <p>Email hello@travlintravel.com.au</p>
                  </div>
                </div>

                <p className="mb-4 mt-4 text-sm text-gray-600">
                  TravLin Travel reserves the right to change is privacy policy at any time. It is advisable to review this privacy statement periodically for changes.
                  For our full Complaints and Handling procedure, please refer to below – Complaints and Handling …
                </p>

                {/* Complaints Handling */}
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Complaints Handling Policy and Procedures</h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Objective of the Policy</h3>
                <p className="mb-4">
                  As a responsible travel agent, we seek to maintain and enhance our reputation of providing you with high quality products and services. We value complaints as they assist us to improve our products, services and customer service. We are committed to being responsive to the needs and concerns of our customers or potential customers and to resolving your complaint as quickly as possible.
                </p>

                <p className="mb-4">This policy has been designed to provide guidance to both our customers and staff on the manner in which we receive and manage your complaint. We are committed to being consistent, fair and impartial when managing your complaint. The objective of this policy is to ensure:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>You are aware of our complaint lodgement and handling processes;</li>
                  <li>Both you and our staff understand our complaints management process;</li>
                  <li>Your complaint is investigated impartially with a balanced view of all evidence;</li>
                  <li>We take reasonable steps to actively protect your personal information; and</li>
                  <li>Your complaint is considered on its merits taking into account individual circumstances and needs.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Definition of a Complaint</h3>
                <p className="mb-4">
                  In this policy a complaint means an expression of dissatisfaction by a customer relating to a travel service provided by us.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How a complaint can be made</h3>
                <p className="mb-4">
                  If you are dissatisfied with a travel service provided by us, you should in the first instance consider speaking directly with the staff member/s you have been dealing with. If you are uncomfortable with this or consider the relevant staff member is unable to address your concerns you can lodge a complaint with us in one of the following ways:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>By completing the contact us section on our website - travlintravel.com.au;</li>
                  <li>By telephoning us - +61 (415) 355 851;</li>
                  <li>By writing to us - PO Box 7303, Karingal Centre, Karingal VIC 3199;</li>
                  <li>By emailing us - hello@travlintravel.com.au; and</li>
                  <li>In person (by appointment) speaking to any of our customer service staff.</li>
                </ul>

                <p className="mb-4">
                  If we receive your complaint verbally and we consider it appropriate, we may ask you to put your complaint in writing. Our complaints management process is free of charge.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">The information you will need to tell us</h3>
                <p className="mb-4">
                  When we are investigating your complaint, we will be relying on information provided by you and information we may already be holding. We may need to contact you to clarify details or request additional information where necessary. To help us investigate your complaint quickly and efficiently we will ask you for the following information:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>Your name and contact details;</li>
                  <li>The name of the person you have been dealing with about your travel service;</li>
                  <li>The nature of the complaint;</li>
                  <li>Details of any steps you have already taken to resolve the compliant;</li>
                  <li>Details of conversations you may have had with us that are relevant to your complaint, and</li>
                  <li>Copies of any documentation which supports your complaint.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Help when making a complaint</h3>
                <p className="mb-4">
                  The person receiving or managing your complaint should provide you with any assistance you may need to make your complaint. However, if you consider you need further assistance please inform us of this at the time you are lodging your complaint.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Recording complaints</h3>
                <p className="mb-4">
                  When taking a complaint, we will record your name and contact details. We will also record all details of your complaint including the facts and the cause/s of your complaint, the outcome and any actions taken following the investigation of your complaint. We will also record all dates and times relating to actions taken to resolve the complaint and communications between us. As part of our on-going improvement plan, complaints will be monitored for any identifying trends by management and rectification/remedial action taken to mitigate any identified issues.
                </p>

                <p className="mb-4">
                  If you lodge a complaint, we will record your personal information solely for the purposes of addressing your complaint. Your personal details will actively be protected from disclosure, unless you expressly consent to its disclosure. Where a third-party travel supplier such as a tour operator, was involved in your travel services, we may be required to speak with them to fully investigate your complaint.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Feedback to customers</h3>
                <p className="mb-4">
                  We are committed to resolving your issues at the first point of contact; however, this will not be possible in all circumstances, in which case a more formal complaints process will be followed. We will acknowledge receipt of your complaint within 3 business days and keep you informed of the progress of your complaint throughout our complaint resolution process. We are committed to resolving your complaint within 10 business days of you lodging your complaint, however, this may not always be possible on every occasion. Where we have been unable to resolve your complaint within 10 business days, we will inform you of the reason for the delay and specify a date when we will be in a position to finalise your complaint.
                </p>

                <p className="mb-4">
                  During the investigation of your complaint, we may need to seek further clarification or documentation from you to assist us in resolving your complaint. If we have sought clarification or documentation from you and we are waiting on you to provide this information, we may not be able to meet our 10 business day finalisation commitment. In such circumstances upon receipt of your clarification or documentation we will indicate to you when we expect to finalise your complaint.
                  Once we have finalised your complaint, we will advise you of our findings and any action we have taken. We will do this in writing, unless it has been mutually agreed that we can provide it to you verbally. You have the right to make enquiries about the current status of your complaint at any time by contacting us.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Our six-point complaint process</h3>
                <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                  <li><strong>We acknowledge</strong> - within three days of receiving your complaint we will acknowledge receipt of your complaint.</li>
                  <li><strong>We review</strong> - we undertake an initial review of your complaint and determine what if any additional information or documentation may be required to complete an investigation. We may need to contact you to clarify details or request additional information where necessary.</li>
                  <li><strong>We investigate</strong> - within 10 business days of receiving your complaint we will investigate your complaint objectively and impartially, by considering the information you have provided us, our actions in relation to your dealings with us and any other information that could assist us in investigating your complaint.</li>
                  <li><strong>We respond</strong> - Following our investigation we will notify you of our findings and any actions we may have taken in regards to your complaint.</li>
                  <li><strong>We take action</strong> - where appropriate we amend our business practices or policies.</li>
                  <li><strong>We record</strong> - we will record your complaint for continuous improvement process and monitoring through regular review, your personal information will be recorded in accordance with relevant privacy legislation.</li>
                </ol>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">When you complain about one of our employees</h3>
                <p className="mb-4">
                  If you complain about a member of our staff, we will treat your complaint confidentially, impartially and equally (giving equal treatment to all people). We will investigate your complaint thoroughly by finding out the relevant facts, speaking with the relevant people and verifying explanations where possible. We will also treat our staff member objectively by:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>informing them of any complaint about their performance;</li>
                  <li>providing them with an opportunity to explain the circumstances;</li>
                  <li>providing them with appropriate support; and</li>
                  <li>Updating them on the complaint investigation and the result.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Complaints under investigation by a regulator or law enforcement agency</h3>
                <p className="mb-4">
                  If your complaint is currently being investigated by a relevant federal, state or territory consumer protection regulator or law enforcement agency we may cease to take further action in relation to your complaint pending finalisation of their investigation. We will assist any agency with their investigations.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Our complaint escalation process</h3>
                <p className="mb-4">
                  Where possible, we will attempt to resolve your complaint at the first point of contact. If we are unable to resolve your complaint at the first point of contact, we will undertake an investigation of your complaint and provide you with our findings.
                </p>

                <p className="mb-4">
                  If you are satisfied with our proposed decision or actions, we will close your complaint and record the findings for our continuous improvement program. However, if you are not satisfied with our proposed decision or actions, we will record this, and provide you with information on how to escalate your complaint, to the Australian Travel Industry Association (ATIA), for external review under their Australian Travel Accreditation Scheme (ATAS).
                </p>

                <p className="mb-4">
                  ATAS is an industry accreditation scheme that sets the benchmark of quality for the travel industry. ATAS is also responsible for monitoring our compliance with the ATAS Code of Conduct (the Code) and assisting in the resolution of complaints. The Code sets the standards of good practice that ATAS participants must follow when dealing with their customers. As an ATAS participant we have agreed to be bound by the Code. If you would like to know more about the Code you can visit the ATAS website www.atas.com.au.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">ATIA Travel Accreditation Scheme (ATAS)</h3>
                <p className="mb-4">Should you wish to speak to ATAS about your complaint you can contact them in the following ways:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>By completing the online complaint form on their website atas.com.au</li>
                  <li>By telephoning them on 9287 9900</li>
                  <li>By writing to them at Level 31, 31 Market Street, Sydney NSW 2000.</li>
                  <li>By emailing them at compliance@afta.com.au</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Your rights under Australian Consumer Law</h3>
                <p className="mb-4">
                  You reserve the right to refer your complaint to your relevant federal, state or territory consumer protection agency at any time.
                </p>
              </div>
            </div>
          </CardContent>
          
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                TravLin Travel reserves the right to change its privacy policy at any time. It is advisable to review this privacy statement periodically for changes.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowAcceptanceForm(true)}
                  style={{ backgroundColor: 'var(--brand-orange)' }}
                  className="text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Terms
                </Button>
                <Button onClick={handleClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Render modal content using Portal to escape footer's stacking context
  return createPortal(modalContent(), document.body)
}