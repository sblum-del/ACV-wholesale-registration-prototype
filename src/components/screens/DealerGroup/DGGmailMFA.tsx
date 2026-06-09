import { useState } from 'react'
import type { View, ActiveTab } from '../../../types'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
}

export function DGGmailMFA({ setView, activeTab, setActiveTab }: Props) {
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => setConfirmed(true)
  const handleResume = () => {
    setActiveTab('acv')
    setView('dg-situation')
  }

  return (
    <div className="h-screen flex flex-col">
      <ScreenLabel id="DG-5" name="Dealer Group — Gmail MFA" />
      {/* Browser tab bar */}
      <div className="bg-[#3D3D3D] flex flex-col shrink-0">
        <div className="flex items-end px-4 pt-2 gap-1">
          <button
            onClick={() => { setActiveTab('acv'); setView('dg-check-email') }}
            className={`h-9 px-4 rounded-t-lg text-xs flex items-center gap-2 cursor-pointer ${activeTab === 'acv' ? 'bg-white text-[#0E0E0F]' : 'bg-[#5a5a5a] text-[#ccc] hover:bg-[#666]'}`}
          >
            🔒 ACV — Dealer Group Registration
          </button>
          <div className={`h-9 px-4 rounded-t-lg text-xs flex items-center gap-2 ${activeTab === 'gmail' ? 'bg-white text-[#0E0E0F]' : 'bg-[#5a5a5a] text-[#ccc]'}`}>
            📧 Gmail — corporate@grouponeauto.com
          </div>
        </div>
        <div className="bg-[#292929] mx-4 mb-2 rounded-full h-7 flex items-center px-4">
          <span className="text-xs text-[#999]">🔒 mail.google.com/mail/u/0/#inbox</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#F5F5F5] border-r border-[#E8E9EB] p-4 shrink-0">
          <p className="font-bold text-2xl text-[#444] mb-6">Gmail</p>
          {['Inbox 1', 'Starred', 'Sent', 'Drafts'].map((item, i) => (
            <div key={item} className={`text-sm py-2 px-4 rounded-full cursor-pointer mb-1 ${i === 0 ? 'bg-[#D3E3FD] font-semibold text-[#0E0E0F]' : 'text-[#55575C] hover:bg-[#E8E9EB]'}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Email list */}
        <div className="w-80 border-r border-[#E8E9EB] shrink-0">
          <div className="bg-[#EBF2FE] border-b border-[#E8E9EB] p-4 cursor-pointer">
            <div className="flex justify-between">
              <span className="font-semibold text-sm text-[#0E0E0F]">ACV Auctions</span>
              <span className="text-xs text-[#55575C]">2:02 PM</span>
            </div>
            <p className="text-sm text-[#0E0E0F]">Confirm your email address</p>
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
                  <p className="text-sm text-[#0E0E0F] mb-3">Hi,</p>
                  <p className="text-sm text-[#55575C] mb-2">
                    Thank you for creating your Group One Automotive ACV account. Please confirm your email address to continue with dealer group registration.
                  </p>
                  <p className="text-sm text-[#55575C] mb-6 font-medium">
                    You are registering as the centralized corporate contact for all Group One Automotive rooftops.
                  </p>
                  <PrimaryButton onClick={handleConfirm} className="mx-auto">
                    Confirm Email Address
                  </PrimaryButton>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-[#00A576]">✓</span>
                  </div>
                  <h4 className="font-bold text-xl text-[#0E0E0F] mb-2">Email Confirmed!</h4>
                  <p className="text-sm text-[#55575C] mb-6">
                    Your Group One Automotive corporate account is now active. Click below to continue with rooftop selection.
                  </p>
                  <PrimaryButton onClick={handleResume} className="mx-auto">
                    Continue to Rooftop Selection →
                  </PrimaryButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
