import { useState } from 'react'
import type { View, DocSignStatus } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setPrimaryBankSelected: (b: boolean) => void
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function ACHForm({ setView, setPrimaryBankSelected, docSignStatus, isLoggedIn, onLogout }: Props) {
  const [bankName, setBankName] = useState('')
  const [holder, setHolder] = useState('')
  const [accountNum, setAccountNum] = useState('')
  const [confirmAccount, setConfirmAccount] = useState('')
  const [routing, setRouting] = useState('')
  const [confirmRouting, setConfirmRouting] = useState('')
  const [accountType, setAccountType] = useState('')

  const canSubmit = bankName && holder && accountNum && confirmAccount && routing && confirmRouting && accountType

  const handleSubmit = () => {
    setPrimaryBankSelected(true)
    // S10: go through processing/result flow. All others: straight to sf-interstitial-3
    setView('ach-processing')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="REG-4" name="ACH Form" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Bank Account</h2>
          <p className="text-sm text-[#55575C] mb-8">Please enter your bank account details:</p>

          <div className="space-y-4">
            {/* Bank Name */}
            <input
              type="text"
              placeholder="Bank Name"
              value={bankName}
              onChange={e => setBankName(e.target.value)}
              className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]"
            />

            {/* Account Holder Name */}
            <input
              type="text"
              placeholder="Account Holder Name"
              value={holder}
              onChange={e => setHolder(e.target.value)}
              className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]"
            />

            {/* Account Type */}
            <select
              value={accountType}
              onChange={e => setAccountType(e.target.value)}
              className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] cursor-pointer text-[#55575C]"
            >
              <option value="">Account Type</option>
              <option>Checking</option>
              <option>Savings</option>
            </select>

            {/* Account number row */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bank Account Number"
                value={accountNum}
                onChange={e => setAccountNum(e.target.value)}
                className="border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]"
              />
              <input
                type="text"
                placeholder="Confirm Bank Account Number"
                value={confirmAccount}
                onChange={e => setConfirmAccount(e.target.value)}
                className="border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]"
              />
            </div>

            {/* Routing number row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Routing Number"
                  value={routing}
                  onChange={e => setRouting(e.target.value)}
                  className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]"
                />
                <p className="text-xs text-[#8D9199] mt-1 ml-1">9-digit routing number</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Confirm Routing Number"
                  value={confirmRouting}
                  onChange={e => setConfirmRouting(e.target.value)}
                  className="w-full border border-[#D1D3D6] rounded-lg px-3 py-3 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8]"
                />
                <p className="text-xs text-[#8D9199] mt-1 ml-1">9-digit routing number</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button
              onClick={() => setView('banking')}
              className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline"
            >
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
