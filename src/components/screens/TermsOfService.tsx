import { useRef, useState } from 'react'
import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
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

type SigMethod = 'draw' | 'type' | null

export function TermsOfService({ setView, tosScrolled, setTosScrolled, isLoggedIn, onLogout }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [agreed, setAgreed] = useState(false)
  const [sigMethod, setSigMethod] = useState<SigMethod>(null)
  const [typedName, setTypedName] = useState('')
  const [typedEmail, setTypedEmail] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [sigDone, setSigDone] = useState(false)

  const canContinue = sigDone

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setTosScrolled(true)
    }
  }

  // Canvas drawing
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.strokeStyle = '#0E0E0F'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.stroke()
    setHasDrawn(true)
  }

  const stopDraw = () => setIsDrawing(false)

  const resetCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
    setSigDone(false)
  }

  const canTypeSubmit = typedName.trim().length > 1 && typedEmail.includes('@')

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="REG-2" name="Terms of Service" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={1} showTaxResale={true} />
        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Terms of Service</h2>
          <p className="text-sm text-[#55575C] mb-4">Please review the ACV Auctions Terms of Service in full before signing.</p>

          {/* Scrollable ToS */}
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

          {/* Agreement section — appears after scrolling */}
          {tosScrolled && (
            <div className="mt-5 space-y-5">
              {/* Mandatory checkbox */}
              <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-5">
                <p className="font-bold text-sm text-[#0E0E0F] mb-4">
                  After reviewing the above ACV Terms of Service, please indicate your agreement.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => { setAgreed(e.target.checked); if (!e.target.checked) { setSigMethod(null); setSigDone(false) } }}
                    className="mt-0.5 w-4 h-4 accent-[#0077D8] cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-[#0E0E0F]">
                    Yes, I agree to the ACV Auctions Terms of Service <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Signature method selector */}
              {agreed && (
                <div className="border border-[#E8E9EB] rounded-xl overflow-hidden">
                  {/* Tab toggle */}
                  <div className="flex border-b border-[#E8E9EB]">
                    <button
                      onClick={() => { setSigMethod('draw'); setSigDone(false) }}
                      className={`flex-1 py-3 text-sm font-medium cursor-pointer transition-colors
                        ${sigMethod === 'draw' ? 'bg-white text-[#0077D8] border-b-2 border-[#0077D8]' : 'bg-[#F7F7F8] text-[#55575C] hover:bg-[#EBEBEF]'}`}
                    >
                      ✍ Draw Signature
                    </button>
                    <button
                      onClick={() => { setSigMethod('type'); setSigDone(false) }}
                      className={`flex-1 py-3 text-sm font-medium cursor-pointer transition-colors border-l border-[#E8E9EB]
                        ${sigMethod === 'type' ? 'bg-white text-[#0077D8] border-b-2 border-[#0077D8]' : 'bg-[#F7F7F8] text-[#55575C] hover:bg-[#EBEBEF]'}`}
                    >
                      ⌨ Type Name
                    </button>
                  </div>

                  {/* Draw */}
                  {sigMethod === 'draw' && (
                    <div className="p-5">
                      <p className="text-xs text-[#55575C] mb-3">Draw your signature below:</p>
                      <canvas
                        ref={canvasRef}
                        width={540}
                        height={120}
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={stopDraw}
                        onMouseLeave={stopDraw}
                        className="w-full border border-dashed border-[#D1D3D6] rounded-lg bg-white cursor-crosshair"
                        style={{ touchAction: 'none' }}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <button
                          onClick={resetCanvas}
                          className="text-xs text-[#55575C] border border-[#D1D3D6] rounded px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer"
                        >
                          ↺ Reset Signature
                        </button>
                        <button
                          disabled={!hasDrawn}
                          onClick={() => setSigDone(true)}
                          className="text-xs bg-[#0077D8] text-white rounded px-4 py-1.5 cursor-pointer disabled:opacity-40 hover:bg-[#005BA8] transition-colors"
                        >
                          Apply Signature ✓
                        </button>
                      </div>
                      {sigDone && (
                        <p className="text-xs text-[#00A576] font-medium mt-2">✓ Signature applied — Jun 1, 2026 by James Harlow</p>
                      )}
                    </div>
                  )}

                  {/* Type */}
                  {sigMethod === 'type' && (
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="block text-xs text-[#55575C] mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={typedName}
                          onChange={e => { setTypedName(e.target.value); setSigDone(false) }}
                          placeholder="James Harlow"
                          className="w-full border border-[#D1D3D6] rounded-md px-3 py-2.5 text-sm text-[#0E0E0F] focus:outline-none focus:border-[#0077D8] font-['Georgia',serif] italic text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#55575C] mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          value={typedEmail}
                          onChange={e => { setTypedEmail(e.target.value); setSigDone(false) }}
                          placeholder="jharlow@metrofordalbany.com"
                          className="w-full border border-[#D1D3D6] rounded-md px-3 py-2.5 text-sm text-[#0E0E0F] focus:outline-none focus:border-[#0077D8]"
                        />
                      </div>
                      {typedName && (
                        <div className="bg-[#F7F7F8] rounded-lg p-4 border border-[#E8E9EB]">
                          <p className="text-[10px] text-[#55575C] mb-1">Signature preview:</p>
                          <p className="font-['Georgia',serif] italic text-2xl text-[#0E0E0F]">{typedName}</p>
                        </div>
                      )}
                      <button
                        disabled={!canTypeSubmit}
                        onClick={() => setSigDone(true)}
                        className="w-full text-sm bg-[#0077D8] text-white rounded-lg py-2.5 cursor-pointer disabled:opacity-40 hover:bg-[#005BA8] transition-colors font-medium"
                      >
                        Apply Signature ✓
                      </button>
                      {sigDone && (
                        <p className="text-xs text-[#00A576] font-medium">✓ Signature applied — Jun 1, 2026 by {typedName}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-6 items-center mt-6">
            <button onClick={() => setView('dealership-info')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton disabled={!canContinue} onClick={() => setView('sf-interstitial-2')}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
