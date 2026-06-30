import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  mobileNumber: string
  dealerGroup: 'yes' | 'no' | null
  dealerGroupName: string
  dealerType: string
  products?: string[]
  onViewSF: () => void
  nextView?: View
}

const PRODUCT_AUTOMATION: Record<string, string> = {
  Sell: 'Territory Manager (TM) notified — application surfaces on TM activation report — Account Owner assignment triggered',
  Buy: 'IST BDR notified — inbound buy lead flagged for outreach',
  Capital: 'Capital Opportunity created and linked to this Application',
}

export function SFInterstitialDealership({ setView, mobileNumber, dealerGroup, dealerGroupName, dealerType, products, onViewSF, nextView = 'terms-of-service' }: Props) {
  const isV2 = products !== undefined
  const isDealerGroup = isV2 ? dealerGroupName.trim().length > 0 : dealerGroup === 'yes'

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <ScreenLabel id="SF-2" name="Meanwhile — Dealership Info" />
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-4">

        {/* Header */}
        <div className="bg-[#0071B9] px-6 py-4">
          <p className="text-white font-semibold text-base">⚡ Meanwhile in the Backend...</p>
          <p className="text-blue-100 text-sm mt-1">Triggered: User clicked Continue on Dealership Information</p>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* Contact Record */}
          <div>
            <p className="text-xs font-semibold text-[#0071B9] uppercase tracking-wide mb-2 border-b border-[#E8E9EB] pb-1">
              Salesforce — Contact Record Updated
            </p>
            <div className="space-y-1.5">
              {[
                { text: 'Contact Name confirmed — James Harlow', sub: 'Matched from AuctionAccess record' },
                { text: `Email address confirmed — jharlow@metrofordalbany.com`, sub: 'Matched from AuctionAccess record' },
                { text: `Mobile Phone sent to Contact record — ${mobileNumber || '(518) 555-0847'}`, sub: 'Collected during registration — not available in AuctionAccess' },
                { text: 'SMS Opt-In preference recorded on Contact record', sub: 'Dealer communication preference captured' },
              ].map((b, i) => (
                <div key={i}>
                  <div className="flex items-start gap-2">
                    <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                    <span className="text-sm text-[#0E0E0F]">{b.text}</span>
                  </div>
                  <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Account Record */}
          <div>
            <p className="text-xs font-semibold text-[#0071B9] uppercase tracking-wide mb-2 border-b border-[#E8E9EB] pb-1">
              Salesforce — Account Record Updated
            </p>
            <div className="space-y-1.5">
              {[
                { text: 'Dealership Name confirmed — Metro Ford of Albany', sub: 'Matched from AuctionAccess record' },
                { text: 'Office Phone confirmed — (518) 555-0192 ext. 101', sub: 'Matched from AuctionAccess record' },
                { text: 'Business Address confirmed — 1450 Central Ave, Albany, ID 83705', sub: 'Matched from AuctionAccess record' },
                { text: `Dealer Type sent to Account record — ${dealerType || 'Franchise'}`, sub: dealerType === 'Franchise' ? 'Franchise dealer type — Account Owner (TM) notification will be triggered' : 'Non-franchise dealer type — standard assignment logic applies' },
              ].map((b, i) => (
                <div key={i}>
                  <div className="flex items-start gap-2">
                    <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                    <span className="text-sm text-[#0E0E0F]">{b.text}</span>
                  </div>
                  <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Record */}
          <div>
            <p className="text-xs font-semibold text-[#0071B9] uppercase tracking-wide mb-2 border-b border-[#E8E9EB] pb-1">
              Salesforce — Application Record Updated
            </p>
            <div className="space-y-1.5">
              {isV2 ? (
                <>
                  <div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                      <span className="text-sm text-[#0E0E0F]">
                        {isDealerGroup
                          ? `Dealer Group Name recorded on Application — ${dealerGroupName}`
                          : 'Dealer Group Name field on the application remains null'}
                      </span>
                    </div>
                    <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">
                      {isDealerGroup
                        ? 'Used internally to associate with the correct parent account structure.'
                        : 'No dealer group was indicated. This field can be updated by internal teammates in Salesforce if the dealer later provides this information.'}
                    </p>
                  </div>
                  {isDealerGroup && (
                    <div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#F59600] shrink-0 mt-0.5 text-xs">✦</span>
                        <span className="text-sm text-[#0E0E0F] font-medium">
                          ⚡ Application funnelled to Janelle's Major Teams report
                        </span>
                      </div>
                      <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">
                        Real-time notification sent to Janelle's team. Application will appear in the dedicated Dealer Group registrations report for monitoring and assignment.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                      <span className="text-sm text-[#0E0E0F]">
                        Dealer Group field set to — <strong>{isDealerGroup ? 'Yes' : 'No'}</strong>
                        {isDealerGroup && dealerGroupName ? ` (${dealerGroupName})` : ''}
                      </span>
                    </div>
                    <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">
                      {isDealerGroup
                        ? 'Application tagged as Dealer Group. This field remains editable by internal teammates in Salesforce if the classification needs to be updated.'
                        : 'Application not tagged as Dealer Group. This field remains editable by internal teammates in Salesforce if the dealer later indicates group membership.'}
                    </p>
                  </div>
                  {isDealerGroup && (
                    <>
                      <div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#F59600] shrink-0 mt-0.5 text-xs">✦</span>
                          <span className="text-sm text-[#0E0E0F] font-medium">
                            ⚡ Application funnelled to Janelle's Major Teams report
                          </span>
                        </div>
                        <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">
                          Real-time notification sent to Janelle's team. Application will appear in the dedicated Dealer Group registrations report for monitoring and assignment.
                        </p>
                      </div>
                      {dealerGroupName && (
                        <div>
                          <div className="flex items-start gap-2">
                            <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                            <span className="text-sm text-[#0E0E0F]">
                              Dealer Group Name recorded on Application — {dealerGroupName}
                            </span>
                          </div>
                          <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">
                            Used internally to associate with the correct parent account structure.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Products Interested — v2 only */}
          {isV2 && products && products.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#0071B9] uppercase tracking-wide mb-2 border-b border-[#E8E9EB] pb-1">
                Salesforce — Products Interested
              </p>
              <div className="space-y-1.5">
                {products.map(p => (
                  <div key={p}>
                    <div className="flex items-start gap-2">
                      <span className="text-[#F59600] shrink-0 mt-0.5 text-xs">✦</span>
                      <span className="text-sm text-[#0E0E0F] font-medium">{p} — interest recorded on Application</span>
                    </div>
                    <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">{PRODUCT_AUTOMATION[p]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end border-t border-[#E8E9EB] pt-4">
          <button
            onClick={onViewSF}
            className="bg-[#0071B9] text-white rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005A96] transition-colors"
          >
            See Salesforce record →
          </button>
          <button
            onClick={() => setView(nextView)}
            className="border border-[#D1D3D6] text-[#55575C] rounded-lg px-5 py-2.5 text-sm cursor-pointer hover:bg-[#F7F7F8] transition-colors"
          >
            Continue to Terms of Service
          </button>
        </div>
      </div>
    </div>
  )
}
