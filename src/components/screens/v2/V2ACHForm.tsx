import { useRef, useState } from 'react'
import type { View, DocSignStatus, ActiveScenario } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { StepSidebar } from '../../shared/StepSidebar'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeScenario: ActiveScenario
  setPrimaryBankSelected: (b: boolean) => void
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function V2ACHForm({ setView, activeScenario, setPrimaryBankSelected, docSignStatus, isLoggedIn, onLogout }: Props) {
  const combineLpoaAndTax = activeScenario === 'v2-base'
  const showTaxResale = activeScenario !== 'v2-5pct'
  const [bankName, setBankName] = useState('')
  const [holder, setHolder] = useState('')
  const [accountType, setAccountType] = useState('')
  const [accountNum, setAccountNum] = useState('')
  const [confirmAccount, setConfirmAccount] = useState('')
  const [routing, setRouting] = useState('')
  const [confirmRouting, setConfirmRouting] = useState('')
  const [voidedCheckFile, setVoidedCheckFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canSubmit = !!(bankName && holder && accountType && accountNum && confirmAccount && routing && confirmRouting && voidedCheckFile)

  const handleSubmit = () => {
    setPrimaryBankSelected(true)
    setView('sf-interstitial-3')
  }

  const inputClass = 'w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]'
  const labelClass = 'text-sm text-[#0E0E0F] mb-1 block'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-6" name="ACH Form" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} showTimeEstimate={false} lpoaFullName={true} combineLpoaAndTax={combineLpoaAndTax} showTaxResale={showTaxResale} />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Add Bank Account</h2>
          <p className="text-sm text-[#55575C] mb-8">All fields are required. Please have a voided check ready to upload.</p>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Bank Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Chase Bank" value={bankName} onChange={e => setBankName(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Account Holder Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Full name as it appears on the account" value={holder} onChange={e => setHolder(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Account Type <span className="text-red-500">*</span></label>
              <select
                value={accountType}
                onChange={e => setAccountType(e.target.value)}
                className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] cursor-pointer text-[#55575C]"
              >
                <option value="">Select account type...</option>
                <option>Checking</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Bank Account Number <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Account Number" value={accountNum} onChange={e => setAccountNum(e.target.value)} className="border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]" />
                <input type="text" placeholder="Confirm Account Number" value={confirmAccount} onChange={e => setConfirmAccount(e.target.value)} className="border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Routing Number <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Routing Number" value={routing} onChange={e => setRouting(e.target.value)} className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]" />
                  <p className="text-xs text-[#8D9199] mt-1 ml-1">9-digit routing number</p>
                </div>
                <div>
                  <input type="text" placeholder="Confirm Routing Number" value={confirmRouting} onChange={e => setConfirmRouting(e.target.value)} className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]" />
                  <p className="text-xs text-[#8D9199] mt-1 ml-1">9-digit routing number</p>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Upload Voided Check <span className="text-red-500">*</span></label>
              <p className="text-xs text-[#8D9199] mb-2">A voided check is required to verify your bank account details.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={e => setVoidedCheckFile(e.target.files?.[0]?.name ?? null)}
              />
              {voidedCheckFile ? (
                <div className="flex items-center gap-3 border border-[#00A576] bg-[#ECFDF5] rounded-lg px-4 py-3">
                  <span className="text-[#00A576] text-lg">✓</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0E0E0F] truncate">{voidedCheckFile}</p>
                    <p className="text-xs text-[#00A576]">File selected</p>
                  </div>
                  <button
                    onClick={() => { setVoidedCheckFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    className="text-xs text-[#55575C] hover:text-[#0E0E0F] cursor-pointer shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#D1D3D6] rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#0077D8] hover:bg-[#F7FBFF] transition-colors"
                >
                  <span className="text-2xl">📎</span>
                  <p className="text-sm font-medium text-[#0077D8]">Click to upload voided check</p>
                  <p className="text-xs text-[#8D9199]">JPG, PNG, or PDF accepted</p>
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('v2-banking')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton disabled={!canSubmit} onClick={handleSubmit}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
