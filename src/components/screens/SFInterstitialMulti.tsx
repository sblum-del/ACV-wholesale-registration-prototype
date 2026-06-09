import { useState, useEffect } from 'react'
import type { View } from '../../types'
import { ALL_5MS } from './MultiSelectDealerships'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  selectedDealerships: string[]
}

export function SFInterstitialMulti({ setView, selectedDealerships }: Props) {
  const dealers = ALL_5MS.filter(d => selectedDealerships.includes(d.id))
  const count = dealers.length

  // Animate bullets appearing one by one to simulate processing
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= 20) {
        clearInterval(interval)
        setTimeout(() => setDone(true), 500)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    {
      heading: 'In Salesforce',
      bullets: [
        `Contact record created — James Harlow (shared across all ${count} registrations)`,
        ...dealers.flatMap(d => [
          `Account record created — ${d.name}`,
          `Affiliation record created (James Harlow ↔ ${d.name})`,
          `Application record created — ${d.name} · Multi-Dealer = ✓ · Assigned to Rob Smyton (round-robin)`,
        ]),
        `IST Account Rep assigned to all ${count} accounts — Mike Ziewicki (territory logic)`,
        `Account Owner (TM) assigned to all ${count} accounts — Patty Vadella (territory logic)`,
        `Inactive Reason set to: Never Activated on all ${count} account records`,
      ],
    },
    {
      heading: 'AuctionAccess API Calls',
      bullets: dealers.map(d => `AA Registration call sent — ${d.name} now an official ACV account (read-only access)`),
    },
    {
      heading: 'DocuSign — TBD',
      bullets: [
        'TBD — DocuSign triggering logic for multi-dealer registration is under review',
        'Expected: combined envelopes (LPOA + state-applicable Tax Resale Cert) per dealership',
        'State routing will apply per dealership address — Group A / B / C assignment per location',
      ],
    },
    {
      heading: 'NetSuite & JPMorgan (Banking) — TBD',
      bullets: [
        `NetSuite account records created for all ${count} dealerships`,
        `NetSuite calls AuctionAccess — pulls all open bank accounts on file per dealership`,
        `Bank account records created in NetSuite per dealership`,
        `JPMorgan validation initiated for each bank account record`,
      ],
    },
  ]

  // Flatten for animation indexing
  let globalIdx = 0
  const flatBullets: { section: string; text: string; global: number }[] = []
  sections.forEach(sec => {
    sec.bullets.forEach(b => {
      flatBullets.push({ section: sec.heading, text: b, global: globalIdx++ })
    })
  })

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <ScreenLabel id="SF-3" name="Meanwhile — Multi-Dealer" />
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-4">

        {/* Header */}
        <div className="bg-[#0071B9] px-6 py-4">
          <p className="text-white font-semibold text-base">⚡ Meanwhile in the Backend...</p>
          <p className="text-blue-100 text-sm mt-1">
            Triggered: User clicked "Register {count} Dealerships" — processing simultaneously
          </p>
        </div>

        {/* Processing indicator */}
        {!done && (
          <div className="px-6 pt-4 pb-2 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-[#0071B9] border-t-transparent rounded-full animate-spin shrink-0" />
            <span className="text-sm text-[#0071B9] font-medium">Creating {count * 4} Salesforce records...</span>
          </div>
        )}
        {done && (
          <div className="px-6 pt-4 pb-2 flex items-center gap-2">
            <span className="text-[#00A576]">✓</span>
            <span className="text-sm text-[#00A576] font-medium">All records created successfully</span>
          </div>
        )}

        {/* Sections */}
        <div className="px-6 pb-5 space-y-5 max-h-[65vh] overflow-y-auto">
          {sections.map((sec, si) => {
            const sectionBullets = flatBullets.filter(b => b.section === sec.heading)
            const anyVisible = sectionBullets.some(b => b.global < visibleCount)
            if (!anyVisible) return null
            return (
              <div key={si}>
                <p className="text-xs font-semibold text-[#0071B9] uppercase tracking-wide mb-2 border-b border-[#E8E9EB] pb-1">
                  {sec.heading}
                </p>
                <div className="space-y-1.5">
                  {sectionBullets.map((b, bi) => {
                    if (b.global >= visibleCount) return null
                    return (
                      <div key={bi} className="flex items-start gap-2">
                        <span className="text-[#0071B9] shrink-0 mt-0.5 text-xs">✦</span>
                        <span className="text-sm text-[#0E0E0F]">{b.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        {done && (
          <div className="px-6 pb-6 flex gap-3 justify-end border-t border-[#E8E9EB] pt-4">
            <button
              onClick={() => setView('multi-confirm-details')}
              className="bg-[#0071B9] text-white rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005A96] transition-colors"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
