export interface SFSection {
  heading: string
  bullets: string[]
  subBullets?: Record<number, string[]>
}

interface Props {
  trigger: string
  bullets?: string[]
  sections?: SFSection[]
  onViewSF: () => void
  onContinue: () => void
}

export function SFInterstitial({ trigger, bullets, sections, onViewSF, onContinue }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-4">
        <div className="bg-[#0071B9] px-6 py-4">
          <p className="text-white font-semibold text-base">⚡ Meanwhile in the Backend...</p>
          <p className="text-blue-100 text-sm mt-1">{trigger}</p>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Flat bullets mode */}
          {bullets && (
            <div className="space-y-2.5">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#0071B9] shrink-0 mt-0.5">✦</span>
                  <span className="text-sm text-[#0E0E0F]">{b}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sectioned mode */}
          {sections && sections.map((sec, si) => (
            <div key={si}>
              <p className="text-xs font-semibold text-[#0071B9] uppercase tracking-wide mb-2 border-b border-[#E8E9EB] pb-1">
                {sec.heading}
              </p>
              <div className="space-y-1.5">
                {sec.bullets.map((b, bi) => (
                  <div key={bi}>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                      <span className="text-sm text-[#0E0E0F]">{b}</span>
                    </div>
                    {sec.subBullets?.[bi]?.map((sub, subi) => (
                      <div key={subi} className="flex items-start gap-2 ml-6 mt-1">
                        <span className="text-[#8D9199] shrink-0 mt-0.5 text-xs">↳</span>
                        <span className="text-xs text-[#55575C]">{sub}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 flex gap-3 justify-end border-t border-[#E8E9EB] pt-4">
          <button
            onClick={onViewSF}
            className="bg-[#0071B9] text-white rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005A96] transition-colors"
          >
            See Salesforce record →
          </button>
          <button
            onClick={onContinue}
            className="border border-[#D1D3D6] text-[#55575C] rounded-lg px-5 py-2.5 text-sm cursor-pointer hover:bg-[#F7F7F8] transition-colors"
          >
            Continue customer flow
          </button>
        </div>
      </div>
    </div>
  )
}
