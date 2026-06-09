import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function MultiOrSingle({ setView, isLoggedIn, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="MULTI-1" name="Single or Multi-Dealer Choice" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center mb-10">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">We found multiple dealerships</h2>
          <p className="text-[#55575C] text-base mt-3 max-w-xl mx-auto">
            Your AuctionAccess ID is affiliated with <strong>4 dealerships</strong> that are not yet registered with ACV.
            How would you like to proceed?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Single */}
          <button
            onClick={() => setView('sf-interstitial-1')}
            className="bg-white border-2 border-[#E8E9EB] rounded-2xl p-8 text-left hover:border-[#0077D8] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-2xl mb-5 group-hover:bg-[#DBEAFE] transition-colors">
              🏢
            </div>
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-2">Single Dealer Registration</h3>
            <p className="text-sm text-[#55575C] leading-relaxed">
              Register one dealership at a time. Walk through the full registration flow — dealership info, Terms of Service, banking, and demo scheduling.
            </p>
            <div className="mt-5 text-sm font-semibold text-[#0077D8] group-hover:underline">
              Select a single dealership →
            </div>
          </button>

          {/* Multi */}
          <button
            onClick={() => setView('multi-select-dealerships')}
            className="bg-white border-2 border-[#E8E9EB] rounded-2xl p-8 text-left hover:border-[#F26522] hover:shadow-md transition-all cursor-pointer group relative"
          >
            <div className="absolute top-4 right-4">
              <span className="bg-[#FFF3ED] text-[#F26522] text-[10px] font-semibold tracking-wide uppercase rounded-full px-3 py-1">
                White Glove
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FFF3ED] flex items-center justify-center text-2xl mb-5 group-hover:bg-[#FDE8D8] transition-colors">
              🏪
            </div>
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-2">Multi-Dealer Registration</h3>
            <p className="text-sm text-[#55575C] leading-relaxed">
              Select multiple dealerships to register at once. Our team will handle the process with dedicated white glove support for each location.
            </p>
            <div className="mt-5 text-sm font-semibold text-[#F26522] group-hover:underline">
              Select multiple dealerships →
            </div>
          </button>
        </div>

        <p className="text-xs text-[#8D9199] mt-8 max-w-lg text-center">
          Multi-dealer registration creates all Salesforce records simultaneously and assigns dedicated support. You will be contacted by your ACV representative to coordinate next steps.
        </p>
      </div>
    </div>
  )
}
