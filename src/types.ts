export type View =
  | 'lobby'
  | 'aa-validation'
  | 'create-credentials'
  | 'check-email-mfa'
  | 'mfa-code-entry'
  | 'existing-user-login'
  | 'existing-select-dealership'
  | 'aa-validation-fail'
  | 'join-flow'
  | 'join-flow-existing'
  | 'select-dealership'
  | 'multi-or-single'
  | 'multi-select-dealerships'
  | 'sf-interstitial-multi'
  | 'multi-confirm-details'
  | 'multi-success'
  | 'dg-intro'
  | 'dg-aa-validation'
  | 'dg-create-credentials'
  | 'dg-check-email'
  | 'dg-gmail-mfa'
  | 'dg-situation'
  | 'dg-select-rooftops'
  | 'dg-sf-interstitial'
  | 'dg-success'
  | 'sf-interstitial-1'
  | 'dealership-info'
  | 'sf-interstitial-dealership'
  | 'terms-of-service'
  | 'sf-interstitial-2'
  | 'docusign-prompt'
  | 'banking'
  | 'ach-form'
  | 'ach-processing'
  | 'ach-result'
  | 's11-all-rejected'
  | 'resume-5m-select'
  | 'resume-all-complete'
  | 'in-progress-other-user'
  | 'cancel-in-progress'
  | 'sf-interstitial-cancel-restart'
  | 'mock-sf-cancel'
  | 'sf-interstitial-3'
  | 'docusign-notification'
  | 'docusign-prompt-post-banking'
  | 'gmail-mfa'
  | 'gmail-docusign'
  | 'qualifying-questions'
  | 'schedule-demo'
  | 'sf-interstitial-4'
  | 'salesforce-view'
  | 'success'
  | 'v2-create-credentials'
  | 'v2-select-dealership'
  | 'v2-sf-interstitial-1'
  | 'v2-dealership-info'
  | 'v2-sf-interstitial-dealership'
  | 'v2-terms-of-service'
  | 'v2-banking'
  | 'v2-ach-form'
  | 'v2-docusign'
  | 'v2-docusign-lpoa'
  | 'v2-tax-resale-manual'
  | 'v2-thank-you'

export interface Dealership5M {
  id: string
  name: string
  location: string
  address: string
  phone: string
  email: string
  contactName: string
}

export type DealerState = 'idaho' | 'alabama' | 'oregon'
export type ActiveScenario = 's1' | 's1b' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's8b' | 's9' | 's10' | 's11' | 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'r6' | 'r6n' | 'v2-base' | 'v2-15pct' | 'v2-5pct' | 'v2-banking-no-accounts' | 'v2-banking-many' | 'v2-banking-mixed' | 'v2-banking-single-closed'

export interface DocSignStatus {
  lpoa: 'pending' | 'received'
  taxResale: 'pending' | 'received' | 'not-required' | 'manual'
}

export type ActiveTab = 'acv' | 'gmail'
export type GmailContext = 'mfa' | 'docusign'
export type DocusignStep = 'consent' | 'lpoa' | 'done'

export interface AppState {
  view: View
  setView: (v: View) => void
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
  gmailContext: GmailContext
  setGmailContext: (c: GmailContext) => void
  sfReturnView: View
  setSfReturnView: (v: View) => void
  docusignStep: DocusignStep
  setDocusignStep: (s: DocusignStep) => void
  primaryBankSelected: boolean
  setPrimaryBankSelected: (b: boolean) => void
  tosScrolled: boolean
  setTosScrolled: (b: boolean) => void
  mobileNumber: string
  setMobileNumber: (s: string) => void
  primaryContact: 'yes' | 'no' | null
  setPrimaryContact: (v: 'yes' | 'no' | null) => void
  dealerGroup: 'yes' | 'no' | null
  setDealerGroup: (v: 'yes' | 'no' | null) => void
  selectedDemoSlot: string | null
  setSelectedDemoSlot: (s: string | null) => void
}
