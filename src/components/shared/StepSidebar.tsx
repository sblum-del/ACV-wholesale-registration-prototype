import type { DocSignStatus } from '../../types'

interface Props {
  activeStep: number
  docSignStatus?: DocSignStatus
  showTaxResale?: boolean
  bankingPendingResolution?: boolean
  showTimeEstimate?: boolean
  lpoaFullName?: boolean
}

// Step order: Dealership Info → ToS → Bank Account → LPOA → Tax Resale
// activeStep: 0=DealerInfo, 1=ToS, 2=BankAccount, 3=LPOA, 4=TaxResale

export function StepSidebar({ activeStep, docSignStatus, bankingPendingResolution, showTimeEstimate = true, lpoaFullName = false }: Props) {
  const baseSteps = [
    { label: 'Dealership Information', key: 'dealership' },
    { label: 'Terms of Service', key: 'tos' },
    { label: 'Bank Account', key: 'bank' },
    { label: lpoaFullName ? 'Limited Power of Attorney' : 'LPOA', key: 'lpoa' },
  ]

  // Always show Tax Resale step — Oregon shows it with "Not Required" label
  const steps = [...baseSteps, { label: 'TAX Resale', key: 'tax' }]

  const getStepStatus = (index: number, key: string) => {
    // DocSign steps use SF status (received) not customer completion
    if (key === 'lpoa' && docSignStatus) {
      if (docSignStatus.lpoa === 'received') return 'done'
      if (index < activeStep) return 'done'
      if (index === activeStep) return 'active'
      return 'inactive'
    }
    if (key === 'tax' && docSignStatus) {
      if (docSignStatus.taxResale === 'not-required') return 'not-required'
      if (docSignStatus.taxResale === 'received') return 'done'
      if (index < activeStep) return 'done'
      if (index === activeStep) return 'active'
      return 'inactive'
    }
    if (key === 'bank' && bankingPendingResolution) return 'pending-resolution'
    if (index < activeStep) return 'done'
    if (index === activeStep) return 'active'
    return 'inactive'
  }

  return (
    <div className="w-64 shrink-0 pt-4">
      {showTimeEstimate && <p className="text-sm text-[#0077D8] mb-8 px-5">Approx. 10 min total</p>}
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const status = getStepStatus(i, step.key)
          return (
            <div key={step.key} className="flex flex-col">
              <div className="flex items-center gap-4 px-3">
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold transition-all
                  ${status === 'done' ? 'bg-[#00A576] text-white' : ''}
                  ${status === 'active' ? 'bg-[#0077D8] text-white ring-2 ring-[#0077D8] ring-offset-2' : ''}
                  ${status === 'not-required' ? 'bg-[#EFF6FF] border-2 border-[#0077D8] text-[#0077D8]' : ''}
                  ${status === 'pending-resolution' ? 'bg-[#FFFBEB] border-2 border-[#F59600] text-[#F59600]' : ''}
                  ${status === 'inactive' ? 'bg-white border-2 border-[#D1D3D6]' : ''}
                `}>
                  {status === 'done' ? '✓' : status === 'not-required' ? '—' : status === 'pending-resolution' ? '!' : ''}
                </div>
                <div>
                  <span className={`text-sm ${status === 'active' ? 'font-semibold text-[#0E0E0F]' : 'text-[#55575C]'}`}>
                    {step.label}
                  </span>
                  {step.key === 'bank' && status === 'pending-resolution' && (
                    <p className="text-[10px] mt-0.5 text-[#F59600]">Pending Resolution</p>
                  )}
                  {/* Show SF status for DocSign steps */}
                  {step.key === 'lpoa' && docSignStatus && (
                    <p className={`text-[10px] mt-0.5 ${docSignStatus.lpoa === 'received' ? 'text-[#00A576]' : 'text-[#8D9199]'}`}>
                      {docSignStatus.lpoa === 'received' ? 'Received in Salesforce' : 'Pending in Salesforce'}
                    </p>
                  )}
                  {step.key === 'tax' && docSignStatus && (
                    <p className={`text-[10px] mt-0.5 ${
                      docSignStatus.taxResale === 'received' ? 'text-[#00A576]'
                      : docSignStatus.taxResale === 'not-required' ? 'text-[#0077D8]'
                      : docSignStatus.taxResale === 'manual' ? 'text-[#F59600]'
                      : 'text-[#8D9199]'
                    }`}>
                      {docSignStatus.taxResale === 'received' ? 'Received in Salesforce'
                        : docSignStatus.taxResale === 'not-required' ? 'Not Required — Oregon'
                        : docSignStatus.taxResale === 'manual' ? 'Manual collection — specialist'
                        : 'Pending in Salesforce'}
                    </p>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-[#E8E9EB] ml-[22px]" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
