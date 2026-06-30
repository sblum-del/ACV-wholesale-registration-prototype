import { useRef, useState } from 'react'
import type { View, ActiveScenario } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { StepSidebar } from '../../shared/StepSidebar'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeScenario: ActiveScenario
  tosScrolled: boolean
  setTosScrolled: (b: boolean) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

const TOS_TEXT = `PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING THE ACV AUCTIONS PLATFORM.

1. ACCEPTANCE OF TERMS
By accessing or using the ACV Auctions platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.

2. AUCTION PARTICIPATION
As a registered dealer, you agree to:
  a) Provide accurate and complete registration information at all times
  b) Maintain the security of your account credentials and accept full responsibility for all activities under your account
  c) Honor all winning bids placed through your account within the specified timeframe
  d) Comply with all applicable federal, state, and local laws regarding vehicle sales and purchases
  e) Not engage in shill bidding, bid manipulation, or any form of fraudulent activity

3. PAYMENT TERMS
All transactions conducted through the ACV Auctions platform are subject to our payment policies. You agree to pay all amounts owed for successful purchases within two (2) business days of winning bid. Failure to remit payment may result in account suspension and removal of buying privileges.

4. VEHICLE CONDITION AND DISCLOSURES
Sellers are required to accurately disclose all known material defects of vehicles listed on the platform. ACV Auctions provides condition reports as a convenience, but all sales are final. Buyers are encouraged to review all available information prior to bidding.

5. ACCOUNT RESPONSIBILITIES
You are responsible for maintaining the confidentiality of your account credentials. You agree to notify ACV Auctions immediately of any unauthorized use of your account or any other breach of security. ACV Auctions will not be liable for any loss or damage arising from your failure to comply with this provision.

6. LIMITED POWER OF ATTORNEY
By participating in vehicle transactions on the ACV platform, you authorize ACV Auctions to act as your limited attorney-in-fact for the purpose of completing title transfers. This authorization is limited to actions necessary to effectuate vehicle title transfers for transactions conducted on our platform.

7. PROHIBITED ACTIVITIES
Users may not use the platform to engage in any activity that violates applicable laws, infringes on intellectual property rights, transmits harmful content, or interferes with platform operations.

8. INDEMNIFICATION
You agree to indemnify and hold harmless ACV Auctions, Inc. and its affiliates, officers, agents, employees, and partners from any claim or demand arising from your use of the platform or violation of these terms.

9. LIMITATION OF LIABILITY
In no event shall ACV Auctions be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.

10. MODIFICATIONS TO TERMS
ACV Auctions reserves the right to modify these terms at any time. Continued use of the platform after notification of changes constitutes acceptance of the new terms.

11. TERMINATION
ACV Auctions may terminate or suspend your account at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, ACV Auctions, or third parties.

12. GOVERNING LAW
These terms shall be governed and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.

Last Updated: June 18, 2025`

export function V2TermsOfService({ setView, activeScenario, tosScrolled, setTosScrolled, isLoggedIn, onLogout }: Props) {
  const combineLpoaAndTax = activeScenario === 'v2-base'
  const showTaxResale = activeScenario !== 'v2-5pct'
  const scrollRef = useRef<HTMLDivElement>(null)
  const [agreed, setAgreed] = useState(false)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setTosScrolled(true)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-4" name="Terms of Service" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={1} showTimeEstimate={false} lpoaFullName={true} combineLpoaAndTax={combineLpoaAndTax} showTaxResale={showTaxResale} />
        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Terms of Service</h2>
          <p className="text-sm text-[#55575C] mb-4">Please review the ACV Auctions Terms of Service in full before accepting.</p>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-80 overflow-y-auto bg-[#FAFAFA] border border-[#E8E9EB] rounded-lg p-6"
          >
            <pre className="text-xs leading-relaxed text-[#0E0E0F] whitespace-pre-wrap font-sans">{TOS_TEXT}</pre>
          </div>

          {!tosScrolled && (
            <p className="text-[#F26522] text-sm mt-2">↓ Please scroll to the bottom to continue</p>
          )}

          {tosScrolled && (
            <div className="mt-5 bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-5">
              <p className="font-bold text-sm text-[#0E0E0F] mb-4">
                After reviewing the above ACV Terms of Service, please indicate your agreement.
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#0077D8] cursor-pointer shrink-0"
                />
                <span className="text-sm text-[#0E0E0F]">
                  Yes, I agree to the ACV Auctions Terms of Service <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          )}

          <div className="flex justify-end gap-6 items-center mt-6">
            <button onClick={() => setView('v2-dealership-info')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton disabled={!agreed} onClick={() => setView('sf-interstitial-2')}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
