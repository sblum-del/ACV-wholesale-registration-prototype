import type { View } from '../../../types'
import { ALL_ROOFTOPS } from './DGSelectRooftops'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  selectedRooftops: string[]
  dgSituation: 'net-new' | 'existing' | null
}

export function DGSuccess({ setView, selectedRooftops, dgSituation }: Props) {
  const rooftops = ALL_ROOFTOPS.filter(r => selectedRooftops.includes(r.id))
  const isNew = dgSituation === 'net-new'

  const manualSteps = [
    isNew
      ? 'Build parent Dealer Group account record in Salesforce for Group One Automotive, then link all rooftop child accounts'
      : 'Configure new rooftop accounts within the existing Group One Automotive parent-child structure in Salesforce',
    'Upload primary contacts per rooftop where applicable; reverse the auto-assigned default primary as needed',
    'Collect POA + applicable Tax Resale Certs offline; upload manually to each Application record',
    'Confirm banking accounts with the dealer group corporate contact offline; mark confirmed accounts in NetSuite per rooftop',
    'Once all line items verified, manually approve each Application record → removes "Never Activated" status → account activated',
  ]

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col">
      <ScreenLabel id="DG-9" name="Dealer Group — Registration Submitted" />
      <div className="bg-white border-b border-[#E8E9EB] h-20 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <span className="bg-[#0C2340] text-white text-[10px] font-semibold rounded px-2 py-1 uppercase tracking-wide">
            Dealer Group — Group One Automotive
          </span>
        </div>
        <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
          ← Lobby
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">

          {/* Customer-facing success */}
          <div className="bg-white border-2 border-[#0C2340] rounded-2xl p-10 text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#0C2340] flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-4xl font-bold">✓</span>
            </div>
            <h1 className="font-bold text-3xl text-[#0E0E0F] mb-3">Thank you, Group One Automotive!</h1>
            <p className="text-[#55575C] text-base mb-2">
              We've received your registration request for <strong>{rooftops.length} rooftop{rooftops.length > 1 ? 's' : ''}</strong>.
            </p>
            <p className="text-[#55575C] text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              Because of the scale and complexity of a dealer group registration, our team will provide you with dedicated <strong>White Glove service</strong> to guide you through the rest of the process. A specialist from our team will be in touch within 1 business day to coordinate next steps.
            </p>

            {/* Rooftops summary */}
            <div className="bg-[#F7F7F8] rounded-xl p-4 text-left mb-6">
              <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">Rooftops submitted</p>
              <div className="grid grid-cols-2 gap-2">
                {rooftops.map((r, i) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0C2340] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#0E0E0F]">{r.name}</p>
                      <p className="text-[10px] text-[#55575C]">{r.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#8D9199]">
              A confirmation has been sent to corporate@grouponeauto.com
            </p>
          </div>

          {/* Internal / Janelle's team section */}
          <div className="bg-white border-2 border-[#FCA5A5] rounded-2xl overflow-hidden">
            <div className="bg-[#FFF0F0] border-b border-[#FCA5A5] px-6 py-4 flex items-center gap-3">
              <span className="text-red-600 font-bold text-xs uppercase tracking-wide">⚠️ NOT CUSTOMER FACING</span>
              <span className="text-red-600 text-sm font-semibold">— Janelle's Team: Required Manual Steps</span>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#55575C] mb-4">
                Automated record creation is complete. The following steps must be completed manually before any rooftop can be activated.
                Approval of each Application record works the same as single-dealer registration (removes "Never Activated" status) — but each requirement line item is manually approved rather than automated.
              </p>
              <ol className="space-y-3">
                {manualSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[#0E0E0F] leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="text-center mt-6">
            <button onClick={() => setView('lobby')} className="text-sm text-[#004E7D] cursor-pointer hover:underline">
              ← Return to Lobby
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
