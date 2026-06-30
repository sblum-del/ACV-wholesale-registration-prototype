import { useState } from 'react'
import type { View, ActiveScenario, DocSignStatus } from '../../../types'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeScenario: ActiveScenario
  setDocSignStatus: (s: DocSignStatus) => void
  onLogout?: () => void
}

const RESUME_STATE: Partial<Record<ActiveScenario, { docSign: DocSignStatus; destination: View }>> = {
  'v2-r1':  { docSign: { lpoa: 'pending',  taxResale: 'pending'      }, destination: 'v2-dealership-info'  },
  'v2-r2':  { docSign: { lpoa: 'pending',  taxResale: 'pending'      }, destination: 'v2-terms-of-service' },
  'v2-r3a': { docSign: { lpoa: 'pending',  taxResale: 'pending'      }, destination: 'v2-banking'          },
  'v2-r3b': { docSign: { lpoa: 'pending',  taxResale: 'pending'      }, destination: 'v2-ach-form'         },
  'v2-r4':  { docSign: { lpoa: 'pending',  taxResale: 'pending'      }, destination: 'v2-docusign'         },
  'v2-r5':  { docSign: { lpoa: 'pending',  taxResale: 'not-required' }, destination: 'v2-docusign-lpoa'    },
  'v2-r6a': { docSign: { lpoa: 'pending',  taxResale: 'manual'       }, destination: 'v2-docusign-lpoa'    },
  'v2-r6b': { docSign: { lpoa: 'received', taxResale: 'manual'       }, destination: 'v2-tax-resale-manual'},
}

export function V2Resume5MSelect({ setView, activeScenario, setDocSignStatus, onLogout }: Props) {
  const cfg = RESUME_STATE[activeScenario]
  const [loading, setLoading] = useState(false)

  const handleResume = () => {
    if (!cfg) return
    setLoading(true)
    setDocSignStatus(cfg.docSign)
    setTimeout(() => {
      setLoading(false)
      setView(cfg.destination)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-RESUME" name="Resume — Select Dealership" />
      <div className="border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onLogout} className="text-sm text-[#55575C] cursor-pointer hover:underline">Logout</button>
          <button className="border border-[#004E7D] text-[#004E7D] text-sm rounded-md px-4 py-2 hover:bg-[#F0F6FF] cursor-pointer">Save & Browse ACV</button>
          <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">← Lobby</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
        <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Register Dealership</h2>
        <p className="text-sm text-[#55575C] mb-1">Your AuctionAccess account is linked to 1 dealership.</p>
        <p className="text-sm text-[#55575C] mb-6">Please choose a dealership to continue</p>

        <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-[15px] text-[#0E0E0F]">Metro Ford of Albany</span>
              <span className="bg-[#FFF7ED] text-[#C2410C] text-xs font-medium rounded px-2 py-0.5">In progress</span>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-sm text-[#55575C]">Albany, Idaho</span>
              <span className="font-mono text-xs bg-[#F7F7F8] border border-[#E8E9EB] rounded px-2 py-0.5 text-[#55575C]">5M: 583921</span>
            </div>
          </div>
          <button
            onClick={handleResume}
            className="text-sm font-semibold text-[#004E7D] cursor-pointer hover:underline flex items-center gap-1 shrink-0 ml-4"
          >
            Resume <span className="text-base">›</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-[#0077D8] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#55575C] mt-4 font-medium">Loading your application...</p>
          <p className="text-xs text-[#8D9199] mt-1">Identifying where you left off</p>
        </div>
      )}

      <div className="mt-auto px-10 py-5 flex justify-between text-xs text-[#8D9199] border-t border-[#E8E9EB]">
        <span>© 2021 ACV Auctions, Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="text-[#004E7D] cursor-pointer hover:underline">Terms of Service</span>
          <span className="text-[#004E7D] cursor-pointer hover:underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
