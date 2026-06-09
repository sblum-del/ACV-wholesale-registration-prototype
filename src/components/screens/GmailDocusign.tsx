import { useState } from 'react'
import type { View, ActiveTab, GmailContext, DealerState, DocSignStatus } from '../../types'
import { BrowserTabBar } from '../shared/BrowserTabBar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
  gmailContext: GmailContext
  dealerState: DealerState
  docSignStatus: DocSignStatus
  setDocSignStatus: (s: DocSignStatus) => void
  onLobby?: () => void
  returnView?: View
}

type SigningStep =
  | 'inbox'
  | 'ds-consent'
  | 'lpoa-why'
  | 'lpoa-doc'
  | 'tax-why'
  | 'tax-doc'
  | 'done'

const STATE_LABELS: Record<DealerState, string> = {
  idaho: 'Idaho',
  alabama: 'Alabama',
  oregon: 'Oregon',
}

export function GmailDocusign({
  setView, activeTab, setActiveTab, gmailContext, dealerState,
  docSignStatus, setDocSignStatus, onLobby, returnView
}: Props) {
  const [step, setStep] = useState<SigningStep>('inbox')
  const [dsAgreed, setDsAgreed] = useState(false)
  const [lpoaSigned, setLpoaSigned] = useState(false)
  const [taxSigned, setTaxSigned] = useState(false)

  const stateName = STATE_LABELS[dealerState]
  const needsTaxDocusign = dealerState === 'idaho'
  const isManual = dealerState === 'alabama'

  const handleReturnToACV = () => {
    setActiveTab('acv')
    setView(returnView ?? 'docusign-prompt-post-banking')
  }

  // Sidebar
  const Sidebar = () => (
    <div className="w-64 bg-[#F5F5F5] border-r border-[#E8E9EB] p-4 shrink-0">
      <p className="font-bold text-2xl text-[#444] mb-6">Gmail</p>
      {['Inbox 2', 'Starred', 'Snoozed', 'Sent', 'Drafts', 'More'].map((item, i) => (
        <div key={item} className={`text-sm py-2 px-4 rounded-full cursor-pointer mb-1
          ${i === 0 ? 'bg-[#D3E3FD] font-semibold text-[#0E0E0F]' : 'text-[#55575C] hover:bg-[#E8E9EB]'}`}>
          {item}
        </div>
      ))}
    </div>
  )

  // Email list
  const EmailList = () => (
    <div className="w-80 border-r border-[#E8E9EB] shrink-0 overflow-y-auto">
      <div className="bg-white border-b border-[#E8E9EB] p-4 cursor-pointer hover:bg-[#F5F5F5]">
        <div className="flex justify-between">
          <span className="text-sm text-[#0E0E0F]">ACV Auctions</span>
          <span className="text-xs text-[#55575C]">2:02 PM</span>
        </div>
        <p className="text-sm text-[#55575C]">Confirm your email address ✓</p>
      </div>
      <div
        onClick={() => setStep('inbox')}
        className={`border-b border-[#E8E9EB] p-4 cursor-pointer ${step === 'inbox' ? 'bg-[#EDE9FE]/30' : 'bg-white hover:bg-[#F5F5F5]'}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-[#0E0E0F]">Aaron Richbart via DocuSign</span>
          <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] rounded px-1.5 py-0.5">External</span>
        </div>
        <p className="text-sm text-[#0E0E0F] font-medium text-xs">Documents for your DocuSign Signature</p>
        <p className="text-xs text-[#55575C]">2:59 PM</p>
      </div>
    </div>
  )

  // ── STEP: INBOX ─────────────────────────────────────────────
  if (step === 'inbox') return (
    <div className="h-screen flex flex-col">
      <ScreenLabel id="REG-10" name="Gmail — DocuSign Email" />
      <BrowserTabBar activeTab={activeTab} setActiveTab={setActiveTab} gmailContext={gmailContext} setView={setView} acvView="docusign-prompt" onLobby={onLobby} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <EmailList />
        <div className="flex-1 p-8 overflow-y-auto bg-white">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-xl text-[#0E0E0F]">Documents for your DocuSign Signature</h3>
            <span className="bg-[#FEF3C7] text-[#92400E] text-xs rounded px-2 py-0.5">External</span>
            <span className="bg-[#E8E9EB] text-xs rounded px-2 py-0.5">Inbox ×</span>
          </div>
          <p className="text-xs text-[#55575C] mt-1 mb-4">
            Aaron Richbart via Docusign Test &lt;dse_demo@docusign.net&gt; • to me • 2:59 PM
          </p>
          <div className="border-b border-[#E8E9EB] mb-4" />
          <div className="max-w-lg">
            <div className="bg-[#2D1D87] rounded-xl p-8 text-center">
              <p className="text-white font-bold text-xl mb-4">📝 docusign</p>
              <p className="text-[#C4B8F7] text-sm mb-3">Aaron Richbart sent you documents to review and sign.</p>
              <p className="text-[#C4B8F7] text-sm mb-1">Documents included:</p>
              <p className="text-white text-sm">• Limited Power of Attorney (LPOA)</p>
              {needsTaxDocusign && <p className="text-white text-sm">• {stateName} Form ST-101 Tax Resale Certificate</p>}
              {isManual && <p className="text-[#C4B8F7] text-sm text-xs mt-1 italic">Tax Resale Certificate will be collected separately by your specialist.</p>}
              <button
                onClick={() => setStep('ds-consent')}
                className="mt-6 bg-[#7C6FCD] hover:bg-[#9080D8] text-white font-semibold rounded-lg px-8 py-3 cursor-pointer transition-colors"
              >
                Review Documents
              </button>
            </div>
            <div className="border border-[#E8E9EB] rounded-lg p-4 mt-4">
              <p className="font-semibold text-sm text-[#0E0E0F]">Aaron Richbart</p>
              <p className="text-[#004E7D] text-sm">arichbart@acvauctions.com</p>
              <p className="text-xs text-[#55575C] mt-1">I am sending you this request for your electronic signature, please review and electronically sign by following the link above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ── STEP: DOCUSIGN CONSENT ───────────────────────────────────
  if (step === 'ds-consent') return (
    <div className="h-screen flex flex-col bg-[#2D1D87]">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-lg w-full p-8">
          <p className="text-[#2D1D87] font-bold text-2xl mb-2">📝 docusign.</p>
          <h3 className="font-semibold text-lg text-[#0E0E0F] mb-1">Review and continue</h3>
          <p className="text-sm text-[#55575C] mb-1 font-medium">Message from Aaron Richbart, ACV Auctions</p>
          <p className="text-sm text-[#55575C] mb-6">
            I am sending you this request for your electronic signature, please review and electronically sign by following the link below.
          </p>
          <p className="text-sm mb-4">
            Please read the <span className="text-[#004E7D] underline cursor-pointer">Electronic Record and Signature Disclosure</span>.
          </p>
          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input type="checkbox" checked={dsAgreed} onChange={e => setDsAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#2D1D87]" />
            <span className="text-sm text-[#0E0E0F]">I agree to use electronic records and signatures. <span className="text-red-500">*</span></span>
          </label>
          <div className="flex items-center justify-between">
            <button className="border border-[#D1D3D6] rounded-lg px-4 py-2 text-sm text-[#55575C]">English (US) ▾</button>
            <div className="flex gap-3">
              <button className="border border-[#D1D3D6] rounded-lg px-4 py-2 text-sm text-[#55575C]">Other Options ▾</button>
              <button
                disabled={!dsAgreed}
                onClick={() => setStep('lpoa-why')}
                className="bg-[#2D1D87] text-white rounded-lg px-6 py-2 text-sm font-semibold cursor-pointer disabled:opacity-40 hover:bg-[#1E1260] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ── STEP: LPOA WHY ───────────────────────────────────────────
  if (step === 'lpoa-why') return (
    <div className="h-screen flex flex-col bg-[#2D1D87] items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden">
        <div className="h-2" style={{ background: 'linear-gradient(to right, #F26522, #E53E3E)' }} />
        <div className="p-10 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-8 w-24 bg-[#F26522] rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">ACV</span>
            </div>
          </div>
          <h2 className="font-bold text-2xl text-[#0E0E0F] mt-6 mb-4">Why we ask for<br />Power of Attorney:</h2>
          <ul className="text-left space-y-3 max-w-sm mx-auto mb-8">
            {[
              'Giving ACV Power of Attorney (POA) allows Titles to transfer more quickly from sellers to buyers',
              'The POA allows ACV to potentially fix minor errors on behalf of the seller',
              'This form is required.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#0E0E0F]">
                <span className="text-[#F26522] mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setStep('lpoa-doc')}
            className="bg-[#2D1D87] text-white rounded-lg px-8 py-3 text-sm font-semibold cursor-pointer hover:bg-[#1E1260] transition-colors"
          >
            Continue to Document →
          </button>
        </div>
        <div className="h-2" style={{ background: 'linear-gradient(to right, #F26522, #E53E3E)' }} />
      </div>
    </div>
  )

  // ── STEP: LPOA DOCUMENT ──────────────────────────────────────
  if (step === 'lpoa-doc') return (
    <div className="h-screen flex flex-col bg-[#2D1D87] items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full my-4">
        <div className="flex items-center justify-between p-4 border-b border-[#E8E9EB]">
          <button
            onClick={() => { setLpoaSigned(true) }}
            className="bg-[#2D1D87] text-white rounded px-4 py-2 text-sm cursor-pointer hover:bg-[#1E1260]"
          >
            Start
          </button>
          <p className="text-red-600 text-xs text-right">DEMONSTRATION DOCUMENT ONLY<br />
            <span className="text-[#55575C]">Docusign Envelope ID: 187620AC-2C30-8700-807D-FA7DE562010E</span>
          </p>
        </div>
        <div className="p-8 overflow-y-auto max-h-[65vh]">
          <div className="text-center mb-6">
            <p className="font-black text-[#F26522] text-2xl">ACV AUCTIONS</p>
            <h3 className="font-bold text-base mt-2">Limited Power of Attorney</h3>
            <p className="text-xs text-[#55575C] mt-1">For vehicles or equipment purchased or sold using the ACV Auctions Online Auction Platform.</p>
          </div>
          <div className="text-xs leading-relaxed text-[#0E0E0F] space-y-3">
            <p>Know All Persons by these presents, that I <span className="border-b border-[#0077D8] inline-block w-32">&nbsp;</span> the undersigned, having the requisite power and authority on behalf of <span className="border-b border-[#0077D8] inline-block w-32">&nbsp;</span> (hereinafter referred to as "Company"), do hereby make, constitute, and appoint ACV Auctions, Inc. and its subsidiaries and affiliates as Company's true and lawful attorney-in-fact.</p>
            <p><strong>Duration.</strong> The rights, powers, and authorities shall commence and be in full force as of the date below and shall remain in full effect thereafter until Company gives notice in writing to ACV Auctions at titles@acvauctions.com that such rights are terminated.</p>
            <p><strong>Severability.</strong> The provisions of this instrument shall be deemed severable, and the invalidity or unenforceability of any provision shall not affect the validity of any other provision.</p>
            <p><strong>Liability.</strong> ACV Auctions shall have no liability with respect to the powers granted herein except for ACV's sole, gross negligence, or willful misconduct.</p>
            <p><strong>Indemnification.</strong> Company will defend, indemnify, and hold harmless ACV, its officers, directors, employees, and agents from all losses or expenses incurred by ACV acting pursuant to this Power of Attorney.</p>
            <p><strong>Governing Law.</strong> This instrument shall be governed by, and interpreted under, the laws of the State of New York.</p>
          </div>
          <div className="mt-8 border-t pt-6 space-y-4">
            <div>
              <span className="border-b border-gray-400 block w-56 mb-1">&nbsp;</span>
              <p className="text-xs text-[#55575C]">Company Name</p>
            </div>
            <div className="flex items-end gap-8">
              <div>
                {!lpoaSigned ? (
                  <button
                    onClick={() => setLpoaSigned(true)}
                    className="bg-[#2D1D87] text-white rounded px-4 py-2 text-xs cursor-pointer hover:bg-[#1E1260] flex items-center gap-2"
                  >
                    ✍ Sign Here
                  </button>
                ) : (
                  <div className="border border-[#00A576] rounded px-4 py-2 bg-[#ECFDF5] flex items-center gap-2">
                    <span className="text-[#00A576] font-bold italic text-sm">James Harlow</span>
                    <span className="text-[#00A576] text-xs">✓</span>
                  </div>
                )}
                <p className="text-xs text-[#55575C] mt-1">Owner/Officer/Manager Name & Title</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0E0E0F]">6/1/2026</p>
                <p className="text-xs text-[#55575C]">Date</p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-[#55575C] mt-6">640 Ellicott St #321 | Buffalo, NY 14203 | 1-800-553-4070</p>
          <p className="text-center text-xs text-[#55575C]">Form POA 5.7.2024.pdf</p>
        </div>
        <div className="p-4 border-t border-[#E8E9EB] flex justify-between items-center">
          <span className="text-xs text-[#55575C]">{lpoaSigned ? '✓ Signature applied' : 'Click "Sign Here" to apply your signature'}</span>
          <button
            disabled={!lpoaSigned}
            onClick={() => {
              setDocSignStatus({ ...docSignStatus, lpoa: 'received' })
              if (needsTaxDocusign) {
                setStep('tax-why')
              } else {
                setStep('done')
              }
            }}
            className="bg-[#2D1D87] text-white rounded-lg px-6 py-2 text-sm font-semibold cursor-pointer disabled:opacity-40 hover:bg-[#1E1260] transition-colors"
          >
            {needsTaxDocusign ? 'Next Document →' : 'Finish & Submit →'}
          </button>
        </div>
      </div>
    </div>
  )

  // ── STEP: TAX RESALE WHY (Idaho only) ───────────────────────
  if (step === 'tax-why' && needsTaxDocusign) return (
    <div className="h-screen flex flex-col bg-[#2D1D87] items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden">
        <div className="h-2" style={{ background: 'linear-gradient(to right, #F26522, #E53E3E)' }} />
        <div className="p-10 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-8 w-24 bg-[#F26522] rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">ACV</span>
            </div>
          </div>
          <h2 className="font-bold text-2xl text-[#0E0E0F] mt-6 mb-4">Why we ask for a<br />Resale Tax Certificate:</h2>
          <ul className="text-left space-y-3 max-w-sm mx-auto mb-8">
            {[
              'Most States require the form as proof that no Sales Tax needs to be collected on inventory purchased via ACV\'s auctions.',
              `${stateName} requires the ST-101 Sales Tax Resale/Exemption Certificate.`,
              'This form is required.'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#0E0E0F]">
                <span className="text-[#F26522] mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setStep('tax-doc')}
            className="bg-[#2D1D87] text-white rounded-lg px-8 py-3 text-sm font-semibold cursor-pointer hover:bg-[#1E1260] transition-colors"
          >
            Continue to Document →
          </button>
        </div>
        <div className="h-2" style={{ background: 'linear-gradient(to right, #F26522, #E53E3E)' }} />
      </div>
    </div>
  )

  // ── STEP: TAX DOC (Idaho ST-101) ────────────────────────────
  if (step === 'tax-doc' && needsTaxDocusign) return (
    <div className="h-screen flex flex-col bg-[#2D1D87] items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full my-4">
        <div className="flex items-center justify-between p-4 border-b border-[#E8E9EB]">
          <div className="flex items-center gap-3">
            <button className="bg-[#2D1D87] text-white rounded px-4 py-2 text-sm cursor-pointer hover:bg-[#1E1260]">Start</button>
            <span className="text-xs text-[#55575C]">Form ST-101 — 1 of 1</span>
          </div>
          <p className="text-red-600 text-xs text-right">DEMONSTRATION DOCUMENT ONLY</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {/* ST-101 Header */}
          <div className="flex items-start justify-between mb-4 border-2 border-[#0E0E0F] p-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-[#00529B] text-white text-xs font-bold px-2 py-1">IDAHO</div>
                <div>
                  <p className="text-xs font-bold">State Tax Commission</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">Form ST-101</p>
              <p className="text-xs font-bold">Sales Tax Resale or Exemption Certificate</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Buyer/Seller fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#0077D8] p-2">
                <p className="text-[10px] text-[#0077D8] font-semibold mb-1">Buyer's Name</p>
                <p className="text-[#0E0E0F]">Metro Ford of Albany</p>
              </div>
              <div className="border border-[#E8E9EB] p-2">
                <p className="text-[10px] text-[#55575C] font-semibold mb-1">Seller's Name</p>
                <p className="text-[#0E0E0F]">ACV Auctions, Inc.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#0077D8] p-2">
                <p className="text-[10px] text-[#0077D8] font-semibold mb-1">Address</p>
                <p className="text-[#0E0E0F]">1450 Central Ave</p>
              </div>
              <div className="border border-[#E8E9EB] p-2">
                <p className="text-[10px] text-[#55575C] font-semibold mb-1">Address</p>
                <p className="text-[#0E0E0F]">640 Ellicott St #321</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-[#0077D8] p-2 col-span-1">
                <p className="text-[10px] text-[#0077D8] font-semibold mb-1">City</p>
                <p className="text-[#0E0E0F]">Albany</p>
              </div>
              <div className="border border-[#0077D8] p-2">
                <p className="text-[10px] text-[#0077D8] font-semibold mb-1">State</p>
                <p className="text-[#0E0E0F]">ID</p>
              </div>
              <div className="border border-[#0077D8] p-2">
                <p className="text-[10px] text-[#0077D8] font-semibold mb-1">Zip</p>
                <p className="text-[#0E0E0F]">83705</p>
              </div>
            </div>

            <div className="border-t pt-3 mt-2">
              <p className="font-semibold mb-2">1. Buying for Resale. I will sell, rent, or lease the goods I am buying in the regular course of my business.</p>
              <p className="mb-1">a. Primary nature of business: <span className="border-b border-[#0077D8] inline-block w-32">buy/sell motor vehicles</span></p>
              <p>b. Check the box that applies: <span className="border border-[#0077D8] bg-[#0077D8]/10 px-2 py-0.5 rounded text-[#0077D8] font-semibold">☑ Idaho registered retailer; seller's permit number</span></p>
            </div>

            {/* Signature section */}
            <div className="border-t pt-4 mt-4">
              <p className="text-xs font-semibold mb-3">By signing this form, I certify that the statements made on this form are true and correct.</p>
              <div className="flex items-end gap-8">
                <div>
                  {!taxSigned ? (
                    <button
                      onClick={() => setTaxSigned(true)}
                      className="bg-[#2D1D87] text-white rounded px-4 py-2 text-xs cursor-pointer hover:bg-[#1E1260] flex items-center gap-2"
                    >
                      ✍ Buyer's Signature
                    </button>
                  ) : (
                    <div className="border border-[#00A576] rounded px-4 py-2 bg-[#ECFDF5] flex items-center gap-2">
                      <span className="text-[#00A576] font-bold italic text-sm">James Harlow</span>
                      <span className="text-[#00A576] text-xs">✓</span>
                    </div>
                  )}
                  <p className="text-[10px] text-[#55575C] mt-1">Buyer's Signature</p>
                </div>
                <div>
                  <div className="border-b border-[#0077D8] w-32 mb-1">
                    <p className="text-xs text-[#0E0E0F]">James Harlow</p>
                  </div>
                  <p className="text-[10px] text-[#55575C]">Buyer's Name (please print)</p>
                </div>
                <div>
                  <p className="text-xs font-medium">6/1/2026</p>
                  <p className="text-[10px] text-[#55575C]">Date</p>
                </div>
              </div>
              <p className="text-[10px] text-[#55575C] mt-3">EFO00149 — Idaho Form ST-101.pdf</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[#E8E9EB] flex justify-between items-center">
          <span className="text-xs text-[#55575C]">{taxSigned ? '✓ Signature applied' : 'Click to apply your signature'}</span>
          <button
            disabled={!taxSigned}
            onClick={() => {
              setDocSignStatus({ ...docSignStatus, lpoa: 'received', taxResale: 'received' })
              setStep('done')
            }}
            className="bg-[#2D1D87] text-white rounded-lg px-6 py-2 text-sm font-semibold cursor-pointer disabled:opacity-40 hover:bg-[#1E1260] transition-colors"
          >
            Finish & Submit →
          </button>
        </div>
      </div>
    </div>
  )

  // ── STEP: DONE ───────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-[#2D1D87] items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-10 text-center">
        <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-[#00A576]">✓</span>
        </div>
        <h3 className="font-bold text-xl text-[#0E0E0F]">Documents Signed Successfully</h3>
        <p className="text-sm text-[#55575C] mt-2">Thank you, James. Your signed documents have been sent to ACV Auctions.</p>

        <div className="mt-5 bg-[#F7F7F8] rounded-xl p-4 text-left space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#00A576]">✓</span>
            <span className="text-[#0E0E0F]">Limited Power of Attorney — <span className="text-[#00A576] font-medium">Received</span></span>
          </div>
          {needsTaxDocusign && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#00A576]">✓</span>
              <span className="text-[#0E0E0F]">{stateName} Form ST-101 — <span className="text-[#00A576] font-medium">Received</span></span>
            </div>
          )}
          {isManual && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#F59600]">⏳</span>
              <span className="text-[#0E0E0F]">Tax Resale Cert — <span className="text-[#F59600] font-medium">Specialist will contact you</span></span>
            </div>
          )}
          {!needsTaxDocusign && !isManual && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#0077D8]">—</span>
              <span className="text-[#0E0E0F]">Tax Resale Cert — <span className="text-[#0077D8] font-medium">Not Required (Oregon)</span></span>
            </div>
          )}
        </div>

        <p className="text-xs text-[#55575C] mt-4">Salesforce Application Record has been updated with document statuses.</p>

        <PrimaryButton
          onClick={handleReturnToACV}
          className="mt-8 w-full justify-center"
        >
          Return to ACV Registration →
        </PrimaryButton>
      </div>
    </div>
  )
}
