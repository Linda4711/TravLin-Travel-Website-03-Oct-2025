import React, { useState } from 'react';
import { X, FileText, Download, Calendar, User, Phone, Mail, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface TermsPrivacyProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'terms' | 'privacy' | 'complaint' | 'customer-acceptance';
  onTabChange: (tab: 'terms' | 'privacy' | 'complaint' | 'customer-acceptance') => void;
}

interface CustomerAcceptanceForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  travelDate: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  signature: string;
}

const TermsPrivacy: React.FC<TermsPrivacyProps> = ({ isOpen, onClose, activeTab, onTabChange }) => {
  const [form, setForm] = useState<CustomerAcceptanceForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    travelDate: '',
    acceptTerms: false,
    acceptMarketing: false,
    signature: ''
  });

  // PDF Links - EXACT filenames from GitHub repository
  const pdfLinks = {
    serviceFees: '/TravLin Travel_Schedule of Fees+ATIA Fee Flyer_JUL25.pdf',
    travelInfo: '/TravLin Travel_Travel Information ONLY_JUL25.pdf',
    customerAcceptance: '/TravLin Travel_Customer Acceptance ONLY_JUL25.pdf'
  }

  if (!isOpen) return null

  const handleInputChange = (field: keyof CustomerAcceptanceForm, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitCustomerAcceptance = () => {
    // Validate required fields
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.acceptTerms || !form.signature) {
      toast.error('Please fill in all required fields and accept the terms.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Show success message
    toast.success('Customer Acceptance Form submitted successfully! We will be in touch soon.');
    
    // Reset form
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      travelDate: '',
      acceptTerms: false,
      acceptMarketing: false,
      signature: ''
    });
    
    // Close modal
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[999999]"
      style={{ zIndex: 999999 }}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        style={{ zIndex: 999999 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              onClick={() => onTabChange('terms')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'terms' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onTabChange('privacy')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'privacy' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onTabChange('complaint')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'complaint' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Complaint Process
            </button>
            <button
              onClick={() => onTabChange('customer-acceptance')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'customer-acceptance' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Customer Acceptance
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms & Conditions</h2>
              
              {/* PDF Download Links */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Important Documents
                </h3>
                <div className="space-y-2">
                  <a
                    href={pdfLinks.serviceFees}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Schedule of Fees & ATIA Fee Flyer
                  </a>
                  <a
                    href={pdfLinks.travelInfo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Travel Information
                  </a>
                  <a
                    href={pdfLinks.customerAcceptance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Customer Acceptance Form
                  </a>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Service Fees</h3>
                <p className="mb-4">
                  TravLin Travel charges service fees in accordance with our Schedule of Fees. These fees cover the cost of professional travel planning, booking services, and ongoing support throughout your travel journey.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Booking Terms</h3>
                <p className="mb-4">
                  All bookings are subject to availability and confirmation by travel suppliers. Deposits may be required to secure bookings, and full payment terms will be advised at the time of booking.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Cancellation Policy</h3>
                <p className="mb-4">
                  Cancellation terms vary by supplier and product type. We will advise you of specific cancellation conditions at the time of booking. Service fees may apply to cancellations.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Travel Insurance</h3>
                <p className="mb-4">
                  We strongly recommend comprehensive travel insurance for all bookings. Travel insurance can protect you against unexpected events that may affect your travel plans.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Liability</h3>
                <p className="mb-4">
                  TravLin Travel acts as an agent for travel suppliers and is not responsible for the acts or omissions of suppliers. Our liability is limited to the service fees paid to us.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</h2>
              
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Information We Collect</h3>
                <p className="mb-4">
                  We collect personal information necessary to provide our travel services, including names, contact details, passport information, and travel preferences.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How We Use Your Information</h3>
                <p className="mb-4">
                  Your personal information is used to arrange travel services, communicate with you about your bookings, and provide customer support. We may also use your information for marketing purposes with your consent.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Information Sharing</h3>
                <p className="mb-4">
                  We share your information with travel suppliers (airlines, hotels, tour operators) as necessary to complete your bookings. We do not sell your personal information to third parties.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Data Security</h3>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Your Rights</h3>
                <p className="mb-4">
                  You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Contact Us</h3>
                <p className="mb-4">
                  If you have any questions about this privacy policy or how we handle your personal information, please contact us at info@travlintravel.com.au or call (07) 3040 0000.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'complaint' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Complaint Process</h2>
              
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Making a Complaint</h3>
                <p className="mb-4">
                  If you have a complaint about our services, we encourage you to contact us directly so we can resolve the issue promptly. You can reach us by phone, email, or in writing.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Our Complaint Resolution Process</h3>
                <p className="mb-4">
                  We are committed to resolving complaints fairly and efficiently. Where possible, we will attempt to resolve your complaint at the first point of contact. If we are unable to resolve your complaint at the first point of contact, we will undertake an investigation of your complaint and provide you with our findings.
                </p>

                <p className="mb-4">
                  If you are satisfied with our proposed decision or actions, we will close your complaint and record the findings for our continuous improvement program. However, if you are not satisfied with our proposed decision or actions, we will record this, and provide you with information on how to escalate your complaint, to the Australian Travel Industry Association (ATIA), for external review under their Australian Travel Accreditation Scheme (ATAS).
                </p>

                <p className="mb-4">
                  ATAS is an industry accreditation scheme that sets the benchmark of quality for the travel industry. ATAS is also responsible for monitoring our compliance with the ATAS Code of Conduct (the Code) and assisting in the resolution of complaints. The Code sets the standards of good practice that ATAS participants must follow when dealing with their customers. As an ATAS participant we have agreed to be bound by the Code. If you would like to know more about the Code you can visit the ATAS website www.atas.com.au.
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

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">ATIA Travel Accreditation Scheme (ATAS)</h3>
                <p className="mb-4">Should you wish to speak to ATAS about your complaint you can contact them in the following ways:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>By completing the online complaint form on their website atas.com.au</li>
                  <li>By calling their 1800 number, 1800 682 827</li>
                  <li>By emailing them at atas@atas.com.au</li>
                  <li>By writing to them at GPO Box 1545, Brisbane Queensland 4001</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Contact Information</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      <span>(07) 3040 0000</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      <span>info@travlintravel.com.au</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      <span>TravLin Travel, Brisbane, Queensland</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customer-acceptance' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Acceptance Form</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  Please complete this form to acknowledge your acceptance of our terms and conditions, and to provide us with the information we need to serve you better.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name *
                    </label>
                    <Input
                      value={form.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      Last Name *
                    </label>
                    <Input
                      value={form.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  <Textarea
                    value={form.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Preferred Travel Date
                  </label>
                  <Input
                    type="date"
                    value={form.travelDate}
                    onChange={(e) => handleInputChange('travelDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Electronic Signature *
                  </label>
                  <Input
                    value={form.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    placeholder="Type your full name as electronic signature"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    By typing your name above, you agree this constitutes a legal signature.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="accept-terms"
                      checked={form.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', !!checked)}
                    />
                    <label htmlFor="accept-terms" className="text-sm text-gray-700 cursor-pointer">
                      I acknowledge that I have read and accept the Terms & Conditions, Privacy Policy, and Complaint Process outlined by TravLin Travel. *
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="accept-marketing"
                      checked={form.acceptMarketing}
                      onCheckedChange={(checked) => handleInputChange('acceptMarketing', !!checked)}
                    />
                    <label htmlFor="accept-marketing" className="text-sm text-gray-700 cursor-pointer">
                      I would like to receive marketing communications and travel updates from TravLin Travel.
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleSubmitCustomerAcceptance}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    Submit Customer Acceptance Form
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacy;
