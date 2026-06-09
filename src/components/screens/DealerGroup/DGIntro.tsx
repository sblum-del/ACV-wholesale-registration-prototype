import type { View } from '../../../types'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props { setView: (v: View) => void }

export function DGIntro({ setView }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <ScreenLabel id="DG-1" name="Dealer Group — Intro" />
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-[#0C2340] px-6 py-5">
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-[#F59600] text-[#0C2340] text-xs font-bold rounded px-2 py-0.5 uppercase tracking-wide">
              Janelle's Team
            </span>
            <span className="text-white font-bold text-lg">Dealer Group Registration</span>
          </div>
          <p className="text-[#8BAFD4] text-sm">Centralized Operation Model</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">

          {/* URL callout */}
          <div className="bg-[#FFFBEB] border border-[#F59600] rounded-xl p-4">
            <p className="text-sm font-semibold text-[#92400E] mb-1">⚠️ Specialized Entry Point</p>
            <p className="text-sm text-[#92400E] leading-relaxed">
              An SAE or member of Janelle's team will push a <strong>specialized registration URL</strong> that is distinct from the standard dealer registration entry point. This URL is specific to this use case and expectations must be clearly communicated to the Dealer Group before they begin.
            </p>
          </div>

          {/* Centralized definition */}
          <div>
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-2">Centralized Operation Model</p>
            <p className="text-sm text-[#0E0E0F] leading-relaxed">
              <strong>Centralized</strong> refers to one individual from Corporate at the Dealer Group facilitating all registration requirements on behalf of all rooftops. A single point of contact manages the entire process end-to-end.
            </p>
          </div>

          {/* Decentralized definition */}
          <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-lg p-4">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-1">For Contrast — Decentralized Model</p>
            <p className="text-sm text-[#55575C] leading-relaxed">
              <strong>Decentralized</strong> refers to registration of a dealer group where the registration efforts are carried out by members of the individual rooftops themselves — not a single corporate facilitator. This flow does not cover the decentralized model.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end border-t border-[#E8E9EB] pt-4">
          <button
            onClick={() => setView('lobby')}
            className="border border-[#D1D3D6] text-[#55575C] rounded-lg px-5 py-2.5 text-sm cursor-pointer hover:bg-[#F7F7F8]"
          >
            Cancel
          </button>
          <button
            onClick={() => setView('dg-aa-validation')}
            className="bg-[#0C2340] text-white rounded-lg px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#1a3556]"
          >
            Begin Registration →
          </button>
        </div>
      </div>
    </div>
  )
}
