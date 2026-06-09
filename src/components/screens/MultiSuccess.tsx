import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { ALL_5MS } from './MultiSelectDealerships'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  selectedDealerships: string[]
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function MultiSuccess({ setView, selectedDealerships, isLoggedIn, onLogout }: Props) {
  const dealers = ALL_5MS.filter(d => selectedDealerships.includes(d.id))

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col">
      <ScreenLabel id="MULTI-4" name="Multi-Dealer Registration Submitted" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center">

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#00A576] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl font-bold">✓</span>
          </div>

          <h1 className="font-bold text-3xl text-[#0E0E0F] mb-3">You're all set!</h1>
          <p className="text-[#55575C] text-base mb-2">
            We've received your registration request for <strong>{dealers.length} dealerships</strong>.
          </p>
          <p className="text-[#55575C] text-sm mb-8 max-w-lg mx-auto leading-relaxed">
            Because you've selected multiple locations, your account has been flagged for our <strong>White Glove Multi-Dealer Registration Service</strong>. A dedicated ACV specialist will reach out to you within 1 business day to coordinate next steps for each location.
          </p>

          {/* Dealership list */}
          <div className="bg-white border border-[#00A576] rounded-2xl p-6 mb-8 text-left">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-4">Dealerships submitted for registration</p>
            <div className="space-y-3">
              {dealers.map((d, i) => (
                <div key={d.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00A576] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E0F]">{d.name}</p>
                    <p className="text-xs text-[#55575C]">{d.address}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-[#ECFDF5] text-[#00A576] text-[10px] font-semibold rounded-full px-2 py-0.5">
                      Records created
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-white border border-[#E8E9EB] rounded-2xl p-6 mb-8 text-left">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-4">What happens next</p>
            <ol className="space-y-3">
              {[
                { icon: '📞', text: 'Your dedicated ACV specialist will contact you at (518) 555-0847 within 1 business day.' },
                { icon: '📧', text: 'DocuSign documents (LPOA + applicable Tax Resale Certs) will be sent to your email separately for each location.' },
                { icon: '🏦', text: 'Your specialist will guide you through bank account setup for each dealership.' },
                { icon: '📅', text: 'A group onboarding demo will be scheduled at your convenience.' },
                { icon: '✅', text: 'Once all documents are signed and banking is set up, all locations will be activated simultaneously.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-sm text-[#0E0E0F] leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Rep info */}
          <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 mb-8 flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#0077D8] flex items-center justify-center text-white font-bold text-lg shrink-0">
              MZ
            </div>
            <div>
              <p className="font-semibold text-sm text-[#0E0E0F]">Mike Ziewicki — IST Account Rep</p>
              <p className="text-xs text-[#55575C]">Your dedicated ACV representative for all {dealers.length} locations</p>
            </div>
          </div>

          <button
            onClick={() => setView('lobby')}
            className="text-sm text-[#004E7D] cursor-pointer hover:underline"
          >
            ← Return to Lobby
          </button>
        </div>
      </div>
    </div>
  )
}
