import { useState, useEffect } from 'react'
import type { View } from '../../../types'
import { ScreenLabel } from '../../shared/ScreenLabel'
interface Props {
  setView: (v: View) => void
  selectedRooftops: string[]
  dgSituation: 'net-new' | 'existing' | null
}

export function DGSFInterstitial({ setView, selectedRooftops, dgSituation }: Props) {
  const n = selectedRooftops.length
  const isNew = dgSituation === 'net-new'
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= 30) {
        clearInterval(interval)
        setTimeout(() => setDone(true), 600)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    {
      heading: 'In Salesforce',
      items: [
        { text: '1 Contact record created — Corporate Contact (default set to Primary)', note: null },
        { text: `${n} Account records created — one per rooftop`, note: 'Multi-Dealer = ✓ on each' },
        { text: `${n} Affiliation records created (Corporate Contact ↔ each Account)`, note: null },
        { text: `${n} Application records created — assigned to Janelle's team (round-robin)`, note: 'Multi-Dealer checkbox = ✓' },
        { text: 'IST Account Rep + Account Owner (TM) assigned to all accounts via territory logic', note: null },
        { text: 'Inactive Reason = Never Activated on all account records', note: null },
      ],
    },
    {
      heading: 'DocuSign — TBD / Under Review',
      items: [
        { text: 'Auto-send of DocuSign envelopes for dealer group registrations is under review', note: 'TBD — not yet determined for V1' },
        { text: 'Expected: LPOA + applicable Tax Resale Certs per rooftop state', note: 'Group B/C routing applies per rooftop address' },
        { text: 'For now: POA and resale cert collection handled manually by Janelle\'s team', note: 'See manual steps below' },
      ],
    },
    {
      heading: 'AuctionAccess API Calls',
      items: [
        { text: `${n} AA registration calls sent — one per rooftop`, note: null },
        { text: 'Each rooftop granted read-only marketplace access', note: 'Buy/sell permissions pending application approval' },
        { text: 'ACV begins consuming AA data and events for each rooftop account', note: null },
      ],
    },
    {
      heading: 'NetSuite & JPMorgan (Banking)',
      items: [
        { text: `${n} NetSuite account records created — one per rooftop`, note: null },
        { text: 'NetSuite calls AuctionAccess per rooftop — pulls all open bank accounts on file → creates bank account records', note: null },
        { text: 'Bank account records run through JPMorgan validation per rooftop', note: null },
        { text: 'JPMorgan results attached to NetSuite bank account records per rooftop', note: null },
      ],
    },
    {
      heading: `Manual Steps — Janelle's Team`,
      isManual: true,
      items: [
        {
          text: isNew
            ? 'STEP 1: Build parent Dealer Group account record in Salesforce for Group One Automotive'
            : 'STEP 1: Configure new rooftops within the existing Group One Automotive parent-child account structure',
          note: isNew
            ? 'Net-new: parent record does not exist yet — must be created manually before child accounts can be linked'
            : 'Existing: parent record already exists — link new child account records to it',
        },
        { text: 'STEP 2: Upload primary contacts for each rooftop if applicable; reverse the auto-assigned default primary where needed', note: null },
        { text: 'STEP 3: Collect POA and applicable Tax Resale Certs offline from the corporate contact; upload manually to each Application record', note: null },
        { text: 'STEP 4: Confirm banking accounts with the dealer group point person offline; manually mark the confirmed account in NetSuite per rooftop', note: null },
        { text: 'STEP 5: Once all line items are met, manually approve each Application record to activate the account', note: 'Approval removes "Never Activated" status — same mechanism as single-dealer reg but each line item manually approved instead of automated' },
      ],
    },
  ]

  let globalIdx = 0
  const flatItems: { section: string; text: string; note: string | null; isManual: boolean; global: number }[] = []
  sections.forEach(sec => {
    sec.items.forEach(item => {
      flatItems.push({ section: sec.heading, text: item.text, note: item.note, isManual: !!(sec as any).isManual, global: globalIdx++ })
    })
  })

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <ScreenLabel id="DG-8" name="Dealer Group — Meanwhile in the Backend" />
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-4">

        <div className="bg-[#0C2340] px-6 py-4">
          <p className="text-white font-semibold text-base">⚡ Meanwhile in the Backend...</p>
          <p className="text-blue-100 text-sm mt-1">
            Triggered: Registration of {n} Group One Automotive rooftop{n > 1 ? 's' : ''} — {isNew ? 'Net-New Dealer Group' : 'Existing Dealer Group — Adding Rooftops'}
          </p>
        </div>

        {!done && (
          <div className="px-6 pt-4 pb-2 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-[#0C2340] border-t-transparent rounded-full animate-spin shrink-0" />
            <span className="text-sm text-[#0C2340] font-medium">Creating {n * 4} Salesforce records...</span>
          </div>
        )}
        {done && (
          <div className="px-6 pt-4 pb-2 flex items-center gap-2">
            <span className="text-[#00A576]">✓</span>
            <span className="text-sm text-[#00A576] font-medium">Automated records created — manual steps required (see below)</span>
          </div>
        )}

        <div className="px-6 pb-5 space-y-5 max-h-[65vh] overflow-y-auto">
          {sections.map((sec, si) => {
            const secItems = flatItems.filter(b => b.section === sec.heading)
            if (!secItems.some(b => b.global < visibleCount)) return null
            const isManual = !!(sec as any).isManual
            return (
              <div key={si}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 border-b pb-1 ${isManual ? 'text-[#DC2626] border-[#FCA5A5]' : 'text-[#0071B9] border-[#E8E9EB]'}`}>
                  {isManual ? '🔴 ' : ''}{sec.heading}
                </p>
                <div className="space-y-2">
                  {secItems.map((b, bi) => {
                    if (b.global >= visibleCount) return null
                    return (
                      <div key={bi}>
                        <div className="flex items-start gap-2">
                          <span className={`shrink-0 mt-0.5 text-xs ${b.isManual ? 'text-[#DC2626]' : 'text-[#0071B9]'}`}>
                            {b.isManual ? '→' : '✦'}
                          </span>
                          <span className="text-sm text-[#0E0E0F]">{b.text}</span>
                        </div>
                        {b.note && (
                          <p className="text-xs text-[#55575C] ml-5 mt-0.5 italic">{b.note}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {done && (
          <div className="px-6 pb-6 flex gap-3 justify-end border-t border-[#E8E9EB] pt-4">
            <button
              onClick={() => setView('dg-success')}
              className="bg-[#0C2340] text-white rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#1a3556] transition-colors"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
