import { useState } from 'react'
import type { View, ActiveTab, GmailContext } from '../../types'
import { BrowserTabBar } from '../shared/BrowserTabBar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
  gmailContext: GmailContext
  onLobby?: () => void
  setLoggedIn: (b: boolean) => void
}

export function GmailMFA({ setView, activeTab, setActiveTab, gmailContext, onLobby, setLoggedIn }: Props) {
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setConfirmed(true)
    setLoggedIn(true)
  }

  const handleResume = () => {
    setActiveTab('acv')
    setView('select-dealership')
  }

  return (
    <div className="h-screen flex flex-col">
      <ScreenLabel id="AUTH-6" name="Gmail — MFA Confirmation Email" />
      <BrowserTabBar activeTab={activeTab} setActiveTab={setActiveTab} gmailContext={gmailContext} setView={setView} acvView="check-email-mfa" onLobby={onLobby} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#F5F5F5] border-r border-[#E8E9EB] p-4 shrink-0">
          <p className="font-bold text-2xl text-[#444] mb-6">Gmail</p>
          {['Inbox 2', 'Starred', 'Snoozed', 'Sent', 'Drafts', 'More'].map((item, i) => (
            <div key={item} className={`text-sm py-2 px-4 rounded-full cursor-pointer mb-1
              ${i === 0 ? 'bg-[#D3E3FD] font-semibold text-[#0E0E0F]' : 'text-[#55575C] hover:bg-[#E8E9EB]'}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Email list */}
        <div className="w-96 border-r border-[#E8E9EB] shrink-0 overflow-y-auto">
          <div className="bg-[#EBF2FE] border-b border-[#E8E9EB] p-4 cursor-pointer">
            <div className="flex justify-between">
              <span className="font-semibold text-sm text-[#0E0E0F]">ACV Auctions</span>
              <span className="text-xs text-[#55575C]">2:02 PM</span>
            </div>
            <p className="text-sm text-[#0E0E0F]">Confirm your email address</p>
          </div>
          <div className="bg-white border-b border-[#E8E9EB] p-4 cursor-pointer hover:bg-[#F5F5F5]">
            <div className="flex justify-between">
              <span className="text-sm text-[#0E0E0F]">Aaron Richbart via DocuSign</span>
              <span className="text-xs text-[#55575C]">2:59 PM</span>
            </div>
            <p className="text-sm text-[#55575C]">Documents for your DocuSign Signature</p>
          </div>
        </div>

        {/* Email body */}
        <div className="flex-1 p-8 overflow-y-auto bg-white">
          <h3 className="font-semibold text-xl text-[#0E0E0F]">Confirm your email address</h3>
          <p className="text-xs text-[#55575C] mt-1 mb-4">ACV Auctions &lt;noreply@acvauctions.com&gt; • to me • 2:02 PM</p>
          <div className="border-b border-[#E8E9EB] mb-4" />

          <div className="max-w-lg">
            <div className="bg-[#F26522] rounded-t-lg p-4 text-center">
              <span className="text-white font-bold text-xl">ACV AUCTIONS</span>
            </div>
            <div className="border border-[#E8E9EB] border-t-0 rounded-b-lg p-8 text-center">
              {!confirmed ? (
                <>
                  <p className="text-sm text-[#0E0E0F] mb-3">Hi James,</p>
                  <p className="text-sm text-[#55575C] mb-2">
                    Thank you for creating your ACV Auctions account. Please confirm your email address by clicking the button below.
                  </p>
                  <p className="text-sm text-[#55575C] mb-6">
                    Once confirmed, you'll be able to log in and continue your dealership registration.
                  </p>
                  <PrimaryButton onClick={handleConfirm} className="mx-auto">
                    Confirm Email Address
                  </PrimaryButton>
                  <p className="text-xs text-[#999] mt-6">If you didn't create an ACV account, you can safely ignore this email.</p>
                  <p className="text-xs text-[#999] mt-1">© 2026 ACV Auctions, Inc. • 640 Ellicott St, Buffalo, NY 14203</p>
                </>
              ) : (
                <>
                  {/* Confirmation success state */}
                  <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-[#00A576]">✓</span>
                  </div>
                  <h4 className="font-bold text-xl text-[#0E0E0F] mb-2">Email Confirmed!</h4>
                  <p className="text-sm text-[#55575C] mb-1">
                    Thank you for validating your credentials, James.
                  </p>
                  <p className="text-sm text-[#55575C] mb-6">
                    Your ACV account is now active. Click below to log in and continue your registration.
                  </p>
                  <PrimaryButton onClick={handleResume} className="mx-auto">
                    Log In & Resume Registration →
                  </PrimaryButton>
                  <p className="text-xs text-[#999] mt-6">© 2026 ACV Auctions, Inc. • 640 Ellicott St, Buffalo, NY 14203</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
