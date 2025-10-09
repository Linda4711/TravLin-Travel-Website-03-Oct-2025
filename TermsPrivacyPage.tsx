import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { FileText, Download } from 'lucide-react';

interface TermsPrivacyPageProps {
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToCruises: () => void;
  onNavigateToTravelOptions: () => void;
  onNavigateToContact: () => void;
  onNavigateToStories: () => void;
}

const TermsPrivacyPage: React.FC<TermsPrivacyPageProps> = ({
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToCruises,
  onNavigateToTravelOptions,
  onNavigateToContact,
  onNavigateToStories
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEOHead 
        title="Terms & Privacy - TravLin Travel | Legal Information & Policies"
        description="Read TravLin Travel's Terms & Conditions, Privacy Policy, and Customer Acceptance Form. Professional travel agency policies, legal information, and service fees."
        page="contact"
      />

      {/* Header */}
      <Header 
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={onNavigateToContact}
        onNavigateToStories={onNavigateToStories}
      />

      {/* Main Content - Inline Terms & Privacy */}
      <main className="relative bg-white pt-24 pb-16">
        <div className="content-container max-w-5xl">
          
          {/* Page Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="section-heading mb-0">Terms & Privacy</h1>
                <p className="text-sm text-gray-600">Effective 01 Jul 2025</p>
              </div>
            </div>
            <div className="section-divider"></div>
          </div>

          {/* Document Downloads */}
          <div className="mb-8 p-4 bg-blue-100 border-l-4 border-blue-600 rounded-r-lg shadow-sm">
            <h3 className="component-heading mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Document Downloads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <a
                href="/TravLin-Travel-Schedule-of-Fees-ATIA-Fee-Flyer-JUL25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-white border-2 border-blue-500 rounded text-blue-700 hover:bg-blue-50 transition-colors font-medium"
              >
                <FileText className="w-4 h-4 mr-2" />
                Schedule of Professional Service Fees
              </a>
              <a
                href="/TravLin-Travel-Travel-Information-ONLY-JUL25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-white border-2 border-blue-500 rounded text-blue-700 hover:bg-blue-50 transition-colors font-medium"
              >
                <FileText className="w-4 h-4 mr-2" />
                Travel Information & Terms
              </a>
              <a
                href="/TravLin-Travel-Customer-Acceptance-ONLY-JUL25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-white border-2 border-blue-500 rounded text-blue-700 hover:bg-blue-50 transition-colors font-medium"
              >
                <FileText className="w-4 h-4 mr-2" />
                Customer Acceptance Form
              </a>
            </div>
          </div>

          {/* Terms & Conditions Content */}
          <div className="prose prose-lg max-w-none">
            <div className="border-b-2 border-blue-600 pb-3 mb-6">
              <h2 className="section-subheading mb-0">Terms & Conditions</h2>
            </div>
            
            <p className="text-description mb-4">
              Please read the following terms and conditions carefully.
            </p>
            
            <p className="text-description mb-6">
              You must not make any booking unless you are 18 years of age or older and understand and agree with the following terms and conditions. These terms and conditions apply to bookings you make with a Consultant (instore, over the phone or by email) as well as online bookings made via our website. These terms and conditions govern our relationship with you. Once we accept a booking from you on behalf of a Supplier, you will also have a separate contract with the Supplier, which will be governed by other terms and conditions. It is your responsibility to make yourself aware of those other terms and conditions.
            </p>

            {/* Executive Summary */}
            <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
              <h3 className="component-heading text-orange-800 mb-3">
                Executive Summary
              </h3>
              <p className="text-description-small text-orange-700 mb-3">
                Although you should read all of the terms and conditions, the following is a summary of the most important:
              </p>
              <ul className="list-disc list-inside text-description-small text-orange-700 space-y-2">
                <li>Prices, including, in some cases, of confirmed bookings, may be subject to change.</li>
                <li>Some confirmed bookings are non-refundable if cancelled by you and it is your responsibility to check if this applies.</li>
                <li>We will be entitled to retain our service fees even if a booking is cancelled or does not proceed for any reason which is not our fault.</li>
                <li>It is your responsibility to make yourself aware of all information relevant to your travel plans, including but not limited to visa requirements and health precautions.</li>
                <li>We are not your agent and may receive additional fees or other incentives from Suppliers.</li>
                <li>We are not liable for the accuracy of any published Supplier content including websites and brochures.</li>
              </ul>
            </div>

            {/* Detailed Terms Content */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Prices and Taxes</h4>
                <div className="space-y-3">
                  <p className="text-description">
                    All prices that we quote are in Australian Dollars and based on twin share accommodation unless otherwise stated. Please note that prices quoted are subject to change at the discretion of the Supplier prior to booking. Price changes may occur after booking because of matters outside our control which increase the cost of the Product. Such factors include adverse currency fluctuations, fuel surcharges, taxes and airfare increases.
                  </p>
                  <p className="text-description">
                    Please contact your Consultant for up-to-date prices. Even if paid in full, a price may change because of matters outside our control.
                  </p>
                  <p className="text-description">
                    Prices include all applicable taxes requiring payment prior to departure, and may be subject to adjustment in the event of an increase in those taxes. On other occasions, you may be liable for taxes in addition to the quoted price of the Product. For example, there may be a local tax charged at some airports or resorts.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Products</h4>
                <p className="text-description">
                  All Products that we quote on are subject to availability and may be withdrawn or varied by the Supplier without notice.
                </p>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Fees and Surcharges</h4>
                <div className="space-y-3">
                  <p className="text-description">
                    A variety of fees and surcharges may be payable to us, including booking or reservation fees, cancellation and amendment fees, credit card merchant fees, insurance claim processing fees or fees for adhoc services performed as required. You may see our current schedule of professional service fees at service-fees.
                  </p>
                  <p className="text-description">
                    Payment by credit card will incur a surcharge to offset our cost of acceptance of payment by credit card. The surcharge varies depending on credit card type, it is your responsibility to advise the correct credit card type to ensure that the appropriate surcharge is applied. We accept no responsibility for an inappropriate surcharge being applied if the correct card type has not been advised, and the surcharge applied shall not be refundable.
                  </p>
                  <p className="text-description">
                    You authorise us to charge all monies payable by you in relation to any booking we make on your behalf or other services we have procured or provided to the credit card or debit card designated by you. If payment is not received from the card issuer or its agents for any reason, you agree to pay us all amounts due immediately on demand.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Change and Cancellation Fees</h4>
                <div className="space-y-3">
                  <p className="text-description">
                    Be aware that some confirmed bookings are not refundable if cancelled, and also may not be transferable to another date or otherwise changed. Alternatively, a change may only be permissible subject to payment of an additional fee or charge. It is your responsibility to check if a booking is non-refundable or will incur charges for changing it before placing the booking.
                  </p>
                  <p className="text-description">
                    Changes and cancellations of confirmed bookings may incur fees from Suppliers in addition to our service fees. Suppliers' fees are outlined in their relevant terms and conditions.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Refunds</h4>
                <div className="space-y-3">
                  <p className="text-description">
                    Your entitlement to a refund for cancelled bookings is subject to the relevant Supplier's terms and conditions. If you are entitled to a refund then, subject to the Supplier's terms and conditions, we will arrange for it to be supplied to us on your behalf, unless we expressly agree with you otherwise.
                  </p>
                  <p className="text-description">
                    If we are managing or arranging a refund for a cancelled booking on your behalf it will not be paid to you until the Supplier provides the refund to us, and we will not be liable for any delay on the part of the Supplier. Be aware that typically airlines will take between 60-90 days to process a refund. Please note that if we are entitled to a service fee for placing a booking, we will remain entitled to this fee if you cancel the booking or the Supplier fails to provide you with the Product for any reason (other than our default), including in an event of Force Majeure. We will be entitled to deduct our service fee from any refund we receive on your behalf before remitting the balance to you.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Deposits and Payments</h4>
                <div className="space-y-3">
                  <p className="text-description">
                    You will be required to pay a deposit (or deposits) when booking. The deposit amount varies depending on the Product booked and lead time to travel. In some instances, full payment is required at the time of booking and your consultant will advise the deposit amount at the time of booking. All deposits are non-refundable for changes of mind or cancellations by you (subject to your rights under the Australian Consumer Law). Where a deposit has been collected, final payment is required no later than six weeks prior to departure. Failure to make payment by the due date may result in your booking being cancelled and deposits forfeited.
                  </p>
                  <p className="text-description">
                    Payments made by direct deposit may take up to three business days to process. If you are paying by this method, you will need to make the payment at least three business days prior to the actual due date. You must notify you Consultant of your payment once it has been made.
                  </p>
                  <p className="text-description">
                    Payments made by personal cheque (excluding bank cheques) require five business days to process. If you are paying by this method, you will need to make the payment at least three business days prior to the actual due date. You agree not to stop payment of the cheque even when you cancel a booking. You agree that we may apply the proceeds of the cheque to satisfy any liability you have to us or to a Supplier, including any liability in respect of cancellation fees, before refunding the balance to you.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Information</h4>
                <p className="text-description">
                  Our responsibility is solely to arrange a booking of a Product in accordance with your instructions. It is your responsibility to make yourself aware of all information that it is necessary or desirable to know in order to make optimum use of the Product and to undertake travel generally. We strongly recommend that you read our travel information at travel-information which may be relevant, especially in relation to passport and visa requirements. Please note that this information is provided as a guide only, and although it is accurate to the best of our knowledge, we do not warrant that it is completely up-to-date at all times. Further, we do not warrant that it is comprehensive and it may not address a topic that is relevant to your travel plans. It is your responsibility to further investigate and confirm any matters that are applicable to you.
                </p>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Special Requirements</h4>
                <p className="text-description">
                  You must inform your consultant regarding any special requirements you may have for your travel arrangements such as special meal and seating requests, room type or disabled access prior to making a booking. If you do not specifically inform us we will assume that you do not have any such requirements, and the booking will be made on that basis.
                </p>
              </div>

              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="component-heading text-gray-900 mb-3">Frequent Flyer and Loyalty Programs</h4>
                <p className="text-description">
                  When booking with one of our Consultants, it is your responsibility to let them know your frequent flyer membership details (or other applicable loyalty program details) for inclusion in your booking. Notwithstanding that your details may be included in the booking, we cannot guarantee that the Supplier will credit you with points for your booking.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-blue-50 border-t-2 border-blue-600 rounded-b-lg">
              <h3 className="component-heading mb-3">Ready to Start Your Journey?</h3>
              <p className="text-description mb-4">
                Now that you understand our terms and conditions, we're here to help you plan your dream vacation. Contact us today for personalized travel planning and expert advice.
              </p>
              <button
                onClick={() => onNavigateToContact()}
                className="travlin-button-standard travlin-button-blue"
              >
                Contact TravLin Travel
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        onContactClick={onNavigateToContact}
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={onNavigateToContact}
        onNavigateToStories={onNavigateToStories}
      />
    </div>
  );
};

export default TermsPrivacyPage;
