import { useState } from 'react'
import type { View, ActiveTab, GmailContext, DealerState, DocSignStatus, ActiveScenario } from './types'
import { SFInterstitial } from './components/shared/SFInterstitial'
import { CommentPanel } from './components/shared/CommentPanel'

import { Lobby } from './components/screens/Lobby'
import { AAValidation } from './components/screens/AAValidation'
import { ExistingUserLogin } from './components/screens/ExistingUserLogin'
import { ExistingSelectDealership } from './components/screens/ExistingSelectDealership'
import { AAValidationFail } from './components/screens/AAValidationFail'
import { JoinFlow } from './components/screens/JoinFlow'
import { JoinFlowExisting } from './components/screens/JoinFlowExisting'
import { CreateCredentials } from './components/screens/CreateCredentials'
import { CheckEmailMFA } from './components/screens/CheckEmailMFA'
import { MFACodeEntry } from './components/screens/MFACodeEntry'
import { SelectDealership } from './components/screens/SelectDealership'
import { MultiOrSingle } from './components/screens/MultiOrSingle'
import { DGIntro } from './components/screens/DealerGroup/DGIntro'
import { DGAAValidation } from './components/screens/DealerGroup/DGAAValidation'
import { DGCreateCredentials } from './components/screens/DealerGroup/DGCreateCredentials'
import { DGCheckEmail } from './components/screens/DealerGroup/DGCheckEmail'
import { DGGmailMFA } from './components/screens/DealerGroup/DGGmailMFA'
import { DGSituation } from './components/screens/DealerGroup/DGSituation'
import { DGSelectRooftops } from './components/screens/DealerGroup/DGSelectRooftops'
import { DGSFInterstitial } from './components/screens/DealerGroup/DGSFInterstitial'
import { DGSuccess } from './components/screens/DealerGroup/DGSuccess'
import { MultiSelectDealerships } from './components/screens/MultiSelectDealerships'
import { SFInterstitialMulti } from './components/screens/SFInterstitialMulti'
import { MultiConfirmDetails } from './components/screens/MultiConfirmDetails'
import { MultiSuccess } from './components/screens/MultiSuccess'
import { DealershipInfo } from './components/screens/DealershipInfo'
import { SFInterstitialDealership } from './components/screens/SFInterstitialDealership'
import { TermsOfService } from './components/screens/TermsOfService'
import { DocusignPrompt } from './components/screens/DocusignPrompt'
import { Banking } from './components/screens/Banking'
import { ACHForm } from './components/screens/ACHForm'
import { ACHProcessing } from './components/screens/ACHProcessing'
import { ACHResult } from './components/screens/ACHResult'
import { S11AllRejected } from './components/screens/S11AllRejected'
import { Resume5MSelect } from './components/screens/Resume5MSelect'
import { ResumeAllComplete } from './components/screens/ResumeAllComplete'
import { InProgressOtherUser } from './components/screens/InProgressOtherUser'
import { CancelInProgress } from './components/screens/CancelInProgress'
import { DocusignNotification } from './components/screens/DocusignNotification'
import { GmailMFA } from './components/screens/GmailMFA'
import { GmailDocusign } from './components/screens/GmailDocusign'
import { QualifyingQuestions } from './components/screens/QualifyingQuestions'
import { ScheduleDemo } from './components/screens/ScheduleDemo'
import { SalesforceView } from './components/screens/SalesforceView'
import { Success } from './components/screens/Success'

export default function App() {
  const [view, setView] = useState<View>('lobby')
  const [activeTab, setActiveTab] = useState<ActiveTab>('acv')
  const [gmailContext] = useState<GmailContext>('mfa')
  const [sfReturnView, setSfReturnView] = useState<View>('dealership-info')
  const [, setPrimaryBankSelected] = useState(false)
  const [achVerified, setAchVerified] = useState(true)
  const [preferredFlagCarried, setPreferredFlagCarried] = useState(false)
  const [activeScenario, setActiveScenario] = useState<ActiveScenario>('s1')
  const [tosScrolled, setTosScrolled] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [dealerGroup, setDealerGroup] = useState<'yes' | 'no' | null>(null)
  const [selectedDemoSlot, setSelectedDemoSlot] = useState<string | null>('Tue Jun 10 — 10:00 AM')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedDealerships, setSelectedDealerships] = useState<string[]>([])
  const [dealerType, setDealerType] = useState('')
  const [dealerGroupName, setDealerGroupName] = useState('')
  const [dgSituation, setDGSituation] = useState<'net-new' | 'existing' | null>(null)
  const [selectedRooftops, setSelectedRooftops] = useState<string[]>([])

  // Derive dealer state from active scenario
  const dealerState: DealerState =
    activeScenario === 's4' ? 'alabama'
    : activeScenario === 's5' ? 'oregon'
    : 'idaho' // s1, s2, s3 all use Idaho

  const [docSignStatus, setDocSignStatus] = useState<DocSignStatus>({
    lpoa: 'pending',
    taxResale: 'pending',
  })

  // Reset docSignStatus whenever scenario (and thus state) changes
  const getInitialDocSign = (state: DealerState): DocSignStatus => ({
    lpoa: 'pending',
    taxResale: state === 'oregon' ? 'not-required' : state === 'alabama' ? 'manual' : 'pending',
  })

  const handleLogout = () => {
    setIsLoggedIn(false)
    setView('lobby')
  }

  const startScenario = (scenario: ActiveScenario) => {
    setActiveScenario(scenario)
    const state: DealerState =
      scenario === 's4' ? 'alabama'
      : scenario === 's5' ? 'oregon'
      : 'idaho'
    setDocSignStatus(getInitialDocSign(state))
    // Resume scenarios: existing user logs in → resume-5m-select
    const isResume = ['r1','r2','r3','r4','r5','r6','r6n'].includes(scenario)
    if (isResume) {
      setIsLoggedIn(false)
      setView('aa-validation')
      return
    }
    // S7 skips AA validation and shows the failure state directly
    if (scenario === 's7') {
      setView('aa-validation-fail')
    } else {
      setView('aa-validation')
    }
    // S8B: existing user who can join — routes through existing-user-login then join-flow-existing
  }

  const goToSF = (returnTo: View) => {
    setSfReturnView(returnTo)
    setView('salesforce-view')
  }

  const sharedProps = { isLoggedIn, onLogout: handleLogout }
  // Scenario-aware screen label lookup
  // Each scenario has its own sequential screen numbers: S1-1, S1-2... S9-5, etc.
  type ScreenEntry = [string, string, string] // [view, label, name]
  const SCENARIO_SCREENS: Record<string, ScreenEntry[]> = {
    'S1':  [['aa-validation','S1-1','AA Validation'],['mfa-code-entry','S1-2','Enter Verification Code'],['create-credentials','S1-3','Create ACV Login'],['select-dealership','S1-4','Select Dealership'],['sf-interstitial-1','S1-5','Meanwhile — Registration Created'],['dealership-info','S1-6','Dealership Information'],['sf-interstitial-dealership','S1-7','Meanwhile — Dealership Info Saved'],['terms-of-service','S1-8','Terms of Service'],['sf-interstitial-2','S1-9','Meanwhile — ToS Accepted'],['banking','S1-10','Bank Account Verification'],['sf-interstitial-3','S1-11','Meanwhile — Banking Complete'],['docusign-prompt','S1-12','DocuSign — Documents Notification'],['gmail-docusign','S1-13','Gmail — DocuSign Email'],['docusign-prompt-post-banking','S1-14','DocuSign — Sign Documents'],['qualifying-questions','S1-15','Qualifying Questions'],['schedule-demo','S1-16','Schedule Demo'],['sf-interstitial-4','S1-17','Meanwhile — Demo Scheduled'],['salesforce-view','S1-18','Salesforce — Application Record'],['success','S1-19','Registration Complete']],
    'S2':  [['aa-validation','S2-1','AA Validation'],['mfa-code-entry','S2-2','Enter Verification Code'],['create-credentials','S2-3','Create ACV Login'],['select-dealership','S2-4','Select Dealership — Multiple Available'],['sf-interstitial-1','S2-5','Meanwhile — Registration Created'],['dealership-info','S2-6','Dealership Information'],['sf-interstitial-dealership','S2-7','Meanwhile — Dealership Info Saved'],['terms-of-service','S2-8','Terms of Service'],['banking','S2-9','Bank Account Verification'],['docusign-prompt-post-banking','S2-10','DocuSign — Documents Notification'],['qualifying-questions','S2-11','Qualifying Questions'],['schedule-demo','S2-12','Schedule Demo'],['success','S2-13','Registration Complete']],
    'S3':  [['aa-validation','S3-1','AA Validation'],['mfa-code-entry','S3-2','Enter Verification Code'],['create-credentials','S3-3','Create ACV Login'],['select-dealership','S3-4','Select Dealership'],['sf-interstitial-1','S3-5','Meanwhile — Registration Created'],['dealership-info','S3-6','Dealership Information'],['terms-of-service','S3-7','Terms of Service'],['banking','S3-8','Bank Account — Multiple Verified'],['docusign-prompt-post-banking','S3-9','DocuSign — Documents Notification'],['qualifying-questions','S3-10','Qualifying Questions'],['schedule-demo','S3-11','Schedule Demo'],['success','S3-12','Registration Complete']],
    'S4':  [['aa-validation','S4-1','AA Validation'],['mfa-code-entry','S4-2','Enter Verification Code'],['create-credentials','S4-3','Create ACV Login'],['select-dealership','S4-4','Select Dealership'],['sf-interstitial-1','S4-5','Meanwhile — Registration Created'],['dealership-info','S4-6','Dealership Information'],['terms-of-service','S4-7','Terms of Service'],['banking','S4-8','Bank Account Verification'],['docusign-prompt-post-banking','S4-9','DocuSign — LPOA Only (Alabama)'],['gmail-docusign','S4-10','Gmail — DocuSign Email'],['qualifying-questions','S4-11','Qualifying Questions'],['schedule-demo','S4-12','Schedule Demo'],['success','S4-13','Registration Complete']],
    'S5':  [['aa-validation','S5-1','AA Validation'],['mfa-code-entry','S5-2','Enter Verification Code'],['create-credentials','S5-3','Create ACV Login'],['select-dealership','S5-4','Select Dealership'],['sf-interstitial-1','S5-5','Meanwhile — Registration Created'],['dealership-info','S5-6','Dealership Information'],['terms-of-service','S5-7','Terms of Service'],['banking','S5-8','Bank Account Verification'],['docusign-prompt-post-banking','S5-9','DocuSign — LPOA Only (Oregon)'],['qualifying-questions','S5-10','Qualifying Questions'],['schedule-demo','S5-11','Schedule Demo'],['success','S5-12','Registration Complete']],
    'S6':  [['aa-validation','S6-1','AA Validation'],['mfa-code-entry','S6-2','Enter Verification Code'],['create-credentials','S6-3','Create ACV Login'],['select-dealership','S6-4','Select Dealership'],['sf-interstitial-1','S6-5','Meanwhile — Registration Created'],['dealership-info','S6-6','Dealership Information'],['terms-of-service','S6-7','Terms of Service'],['banking','S6-8','Bank Account — Mixed JPMorgan Results'],['docusign-prompt-post-banking','S6-9','DocuSign — Documents Notification'],['qualifying-questions','S6-10','Qualifying Questions'],['schedule-demo','S6-11','Schedule Demo'],['success','S6-12','Registration Complete']],
    'S7':  [['aa-validation-fail','S7-1','AA Validation — Identity Not Found']],
    'S8':  [['aa-validation','S8-1','AA Validation'],['mfa-code-entry','S8-2','Enter Verification Code'],['create-credentials','S8-3','Create ACV Login'],['join-flow','S8-4','All Dealerships Registered — Join Flow']],
    'S8B': [['aa-validation','S8B-1','AA Validation'],['mfa-code-entry','S8B-2','Enter Verification Code'],['existing-user-login','S8B-3','Sign In'],['join-flow-existing','S8B-4','All Dealerships Registered — Join Flow']],
    'S9':  [['aa-validation','S9-1','AA Validation'],['mfa-code-entry','S9-2','Enter Verification Code'],['existing-user-login','S9-3','Sign In'],['existing-select-dealership','S9-4','Select Dealership'],['sf-interstitial-1','S9-5','Meanwhile — Registration Created'],['dealership-info','S9-6','Dealership Information'],['terms-of-service','S9-7','Terms of Service'],['banking','S9-8','Bank Account Verification'],['docusign-prompt-post-banking','S9-9','DocuSign — Documents Notification'],['qualifying-questions','S9-10','Qualifying Questions'],['schedule-demo','S9-11','Schedule Demo'],['success','S9-12','Registration Complete']],
    'S10': [['aa-validation','S10-1','AA Validation'],['mfa-code-entry','S10-2','Enter Verification Code'],['create-credentials','S10-3','Create ACV Login'],['select-dealership','S10-4','Select Dealership'],['sf-interstitial-1','S10-5','Meanwhile — Registration Created'],['dealership-info','S10-6','Dealership Information'],['terms-of-service','S10-7','Terms of Service'],['banking','S10-8','Bank Account — No Accounts on File'],['ach-form','S10-9','ACH Form'],['ach-processing','S10-10','ACH Processing — Validation in Progress'],['ach-result','S10-11','ACH Validation Result'],['docusign-prompt-post-banking','S10-12','DocuSign — Documents Notification'],['qualifying-questions','S10-13','Qualifying Questions'],['schedule-demo','S10-14','Schedule Demo'],['success','S10-15','Registration Complete']],
    'S11': [['aa-validation','S11-1','AA Validation'],['mfa-code-entry','S11-2','Enter Verification Code'],['create-credentials','S11-3','Create ACV Login'],['select-dealership','S11-4','Select Dealership'],['sf-interstitial-1','S11-5','Meanwhile — Registration Created'],['dealership-info','S11-6','Dealership Information'],['terms-of-service','S11-7','Terms of Service'],['banking','S11-8','Bank Account — All Accounts Shown'],['s11-all-rejected','S11-9','All Accounts JPMorgan Rejected'],['ach-form','S11-10','ACH Form — Alternative Account'],['ach-processing','S11-11','ACH Processing — Validation in Progress'],['ach-result','S11-12','ACH Validation Result'],['docusign-prompt-post-banking','S11-13','DocuSign — Documents Notification'],['qualifying-questions','S11-14','Qualifying Questions'],['schedule-demo','S11-15','Schedule Demo'],['success','S11-16','Registration Complete']],
    'R1':  [['aa-validation','R1-1','AA Validation'],['mfa-code-entry','R1-2','Enter Verification Code'],['existing-user-login','R1-3','Sign In'],['resume-5m-select','R1-4','Resume — Select Dealership'],['dealership-info','R1-5','Resumes at Dealership Information']],
    'R2':  [['aa-validation','R2-1','AA Validation'],['mfa-code-entry','R2-2','Enter Verification Code'],['existing-user-login','R2-3','Sign In'],['resume-5m-select','R2-4','Resume — Select Dealership'],['terms-of-service','R2-5','Resumes at Terms of Service']],
    'R3':  [['aa-validation','R3-1','AA Validation'],['mfa-code-entry','R3-2','Enter Verification Code'],['existing-user-login','R3-3','Sign In'],['resume-5m-select','R3-4','Resume — Select Dealership'],['banking','R3-5','Resumes at Bank Account']],
    'R4':  [['aa-validation','R4-1','AA Validation'],['mfa-code-entry','R4-2','Enter Verification Code'],['existing-user-login','R4-3','Sign In'],['resume-5m-select','R4-4','Resume — Select Dealership'],['docusign-prompt-post-banking','R4-5','Resumes at DocuSign']],
    'R5':  [['aa-validation','R5-1','AA Validation'],['mfa-code-entry','R5-2','Enter Verification Code'],['existing-user-login','R5-3','Sign In'],['resume-5m-select','R5-4','Resume — Select Dealership'],['resume-all-complete','R5-5','All Steps Complete — Awaiting Review']],
    'R6':  [['aa-validation','R6-1','AA Validation'],['mfa-code-entry','R6-2','Enter Verification Code'],['existing-user-login','R6-3','Sign In'],['resume-5m-select','R6-4','Resume — Select Dealership'],['resume-all-complete','R6-5','In Progress by Another User']],
    'CANCEL': [['aa-validation','CANCEL-1','AA Validation'],['mfa-code-entry','CANCEL-2','Enter Verification Code'],['create-credentials','CANCEL-3','Create ACV Login'],['in-progress-other-user','CANCEL-4','In Progress — Started by Another User'],['cancel-in-progress','CANCEL-5','Cancel Existing Application'],['sf-interstitial-cancel-restart','CANCEL-6','Meanwhile — New Registration Created'],['dealership-info','CANCEL-7','Dealership Information']],
    'LOBBY': [['lobby','LOBBY-1','Lobby — Interactive Prototype']],
    'EXEC':  [['exec-summary','EXEC-1','Executive Summary']],
  }

  // Find current screen label based on active scenario
  const scenarioKey = activeScenario ? activeScenario.toUpperCase() : 'LOBBY'
  const scenarioScreens = SCENARIO_SCREENS[scenarioKey] ?? SCENARIO_SCREENS['LOBBY']
  const currentScreenEntry = scenarioScreens?.find(([v]) => v === view)
  const currentLabel = currentScreenEntry ? [currentScreenEntry[1], currentScreenEntry[2]] as [string, string] : null

  // Lobby and SF interstitial screens always get a label even if scenario mapping misses them
  const fallbackLabels: Partial<Record<View, [string, string]>> = {
    'lobby':                   ['LOBBY-1', 'Lobby — Interactive Prototype'],
    'sf-interstitial-multi':   ['MULTI-SF', 'Meanwhile — Multi-Dealer'],
    'multi-or-single':         ['MULTI-1',  'Single or Multi-Dealer Choice'],
    'multi-select-dealerships':['MULTI-2',  'Select Multiple Dealerships'],
    'multi-confirm-details':   ['MULTI-3',  'Confirm Multi-Dealer Details'],
    'multi-success':           ['MULTI-4',  'Multi-Dealer Registration Submitted'],
    'dg-intro':                ['DG-1',     'Dealer Group — Intro'],
    'dg-aa-validation':        ['DG-2',     'Dealer Group — AA Validation'],
    'dg-create-credentials':   ['DG-3',     'Dealer Group — Create Credentials'],
    'dg-check-email':          ['DG-4',     'Dealer Group — Verify Email'],
    'dg-situation':            ['DG-6',     'Dealer Group — Select Situation'],
    'dg-select-rooftops':      ['DG-7',     'Dealer Group — Select Rooftops'],
    'dg-sf-interstitial':      ['DG-8',     'Dealer Group — Meanwhile in the Backend'],
    'dg-success':              ['DG-9',     'Dealer Group — Registration Submitted'],
  }
  const resolvedLabel = currentLabel ?? fallbackLabels[view] ?? null

  return (
    <div className="w-full min-h-screen">
      {resolvedLabel && view !== 'lobby' && (
        <CommentPanel screenId={resolvedLabel[0]} screenName={resolvedLabel[1]} />
      )}
      {view === 'lobby' && <Lobby setView={setView} setActiveScenario={setActiveScenario} startScenario={startScenario} />}

      {view === 'aa-validation' && (
        <AAValidation setView={setView} onLobby={() => setView('lobby')} activeScenario={activeScenario} />
      )}

      {view === 'existing-user-login' && (
        <ExistingUserLogin setView={setView} setLoggedIn={setIsLoggedIn} onLobby={() => setView('lobby')} activeScenario={activeScenario} />
      )}

      {view === 'existing-select-dealership' && (
        <ExistingSelectDealership setView={setView} {...sharedProps} />
      )}

      {view === 'aa-validation-fail' && (
        <AAValidationFail setView={setView} onLobby={() => setView('lobby')} />
      )}

      {view === 'join-flow' && (
        <JoinFlow setView={setView} {...sharedProps} />
      )}

      {view === 'join-flow-existing' && (
        <JoinFlowExisting setView={setView} {...sharedProps} />
      )}

      {view === 'resume-5m-select' && (
        <Resume5MSelect
          setView={setView}
          activeScenario={activeScenario}
          setDocSignStatus={setDocSignStatus}
          {...sharedProps}
        />
      )}

      {view === 'resume-all-complete' && (
        <ResumeAllComplete
          setView={setView}
          activeScenario={activeScenario}
          {...sharedProps}
        />
      )}

      {view === 'in-progress-other-user' && (
        <InProgressOtherUser setView={setView} {...sharedProps} />
      )}

      {view === 'cancel-in-progress' && (
        <CancelInProgress setView={setView} {...sharedProps} />
      )}

      {view === 'sf-interstitial-cancel-restart' && (
        <SFInterstitial
          trigger="Triggered: Previous application cancelled — new registration initiated for James Harlow"
          sections={[
            {
              heading: 'In Salesforce — New Records Only',
              bullets: [
                'New Contact record created — James Harlow',
                'New Affiliation record created (James Harlow ↔ Metro Ford of Albany)',
                'New Application record created',
                'NOTE: Account record for Metro Ford of Albany already exists — not recreated',
              ],
              subBullets: {
                2: [
                  'Application Owner: Rob Smyton (round-robin assignment)',
                ],
              },
            },
            {
              heading: 'DocuSign — Triggered on New Application Creation',
              bullets: [
                'New LPOA DocuSign envelope triggered — sent to jharlow@metrofordalbany.com',
                dealerState === 'idaho'
                  ? 'Idaho Form ST-101 Tax Resale Cert included in new DocuSign envelope'
                  : dealerState === 'alabama'
                  ? 'Alabama Tax Resale: new manual DDCR record created — Rob Smyton will collect offline'
                  : 'Oregon: Tax Resale Cert not required — status set to Not Required',
              ],
            },
            {
              heading: 'AuctionAccess — No New API Call Required',
              bullets: [
                'AA Registration call already occurred — Metro Ford of Albany remains an active ACV account',
                'No new AA registration call needed — account status unchanged',
              ],
            },
            {
              heading: 'NetSuite & JPMorgan — Refreshed During Cancellation',
              bullets: [
                'NetSuite dealership record already exists — maintained',
                'Bank account records refreshed: new accounts pulled from AA, closed accounts removed',
                'JPMorgan validation re-run on updated bank account records',
                'Results already available — banking step will reflect current validation status',
              ],
            },
          ]}
          onViewSF={() => goToSF('dealership-info')}
          onContinue={() => setView('dealership-info')}
        />
      )}

      {view === 'create-credentials' && (
        <CreateCredentials setView={setView} onLobby={() => setView('lobby')} />
      )}

      {view === 'check-email-mfa' && (
        <CheckEmailMFA setView={setView} onLobby={() => setView('lobby')} />
      )}

      {view === 'mfa-code-entry' && (
        <MFACodeEntry
          setView={setView}
          setLoggedIn={setIsLoggedIn}
          onLobby={() => setView('lobby')}
          activeScenario={activeScenario}
        />
      )}

      {view === 'select-dealership' && (
        <SelectDealership setView={setView} activeScenario={activeScenario} {...sharedProps} />
      )}

      {view === 'multi-or-single' && (
        <MultiOrSingle setView={setView} {...sharedProps} />
      )}

      {view === 'multi-select-dealerships' && (
        <MultiSelectDealerships
          setView={setView}
          selectedDealerships={selectedDealerships}
          setSelectedDealerships={setSelectedDealerships}
          {...sharedProps}
        />
      )}

      {view === 'sf-interstitial-multi' && (
        <SFInterstitialMulti
          setView={setView}
          selectedDealerships={selectedDealerships}
        />
      )}

      {view === 'multi-confirm-details' && (
        <MultiConfirmDetails
          setView={setView}
          selectedDealerships={selectedDealerships}
          {...sharedProps}
        />
      )}

      {view === 'multi-success' && (
        <MultiSuccess
          setView={setView}
          selectedDealerships={selectedDealerships}
          {...sharedProps}
        />
      )}

      {view === 'sf-interstitial-1' && (
        <SFInterstitial
          trigger="Triggered: User clicked 'Start Registration' — Application record created"
          sections={[
            {
              heading: 'In Salesforce',
              bullets: [
                'Contact record created — James Harlow',
                'Account record created — Metro Ford of Albany',
                'Associated Location Billing Address created at the same time as the Account record',
                'Affiliation record created (Contact ↔ Account)',
                'Application record created',
              ],
              subBullets: {
                1: [
                  'Account Owner (TM): Patty Vadella — pre-defined territory/region logic',
                  'IST Account Rep: Mike Ziewicki — pre-defined territory/region logic',
                  'Inactive Reason set to: Never Activated',
                ],
                3: [
                  'Application Owner: Rob Smyton (round-robin assignment)',
                ],
              },
            },
            {
              heading: 'DocuSign — Triggered on Application Creation',
              bullets: [
                'LPOA DocuSign envelope triggered automatically by Salesforce<>DocuSign integration',
                dealerState === 'idaho'
                  ? 'Idaho Form ST-101 Tax Resale Cert also included in DocuSign envelope'
                  : dealerState === 'alabama'
                  ? 'Alabama Tax Resale: manual DDCR record created — Rob Smyton will collect offline'
                  : 'Oregon: Tax Resale Cert not required — status set to Not Required',
                'DocuSign emails sent to jharlow@metrofordalbany.com',
              ],
            },
            {
              heading: 'AuctionAccess API Call',
              bullets: [
                'Registration call sent to AuctionAccess — Metro Ford of Albany now an official ACV account',
                'Account granted read-only marketplace access (no buy/sell permissions yet)',
                'ACV begins consuming AA data and events for this dealership',
              ],
            },
            {
              heading: 'NetSuite & JPMorgan (Banking)',
              bullets: [
                'NetSuite account record created for Metro Ford of Albany',
                'NetSuite calls AuctionAccess — pulls all open bank accounts on file → creates bank account records in NetSuite',
                'Bank account records run through JPMorgan validation',
                'JPMorgan results attached to NetSuite bank account records',
                'Results returned to customer-facing UX — no banking data passes through Salesforce',
              ],
            },
          ]}
          onViewSF={() => goToSF('dealership-info')}
          onContinue={() => setView('dealership-info')}
        />
      )}

      {view === 'dealership-info' && (
        <DealershipInfo
          setView={setView}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          dealerGroup={dealerGroup}
          setDealerGroup={setDealerGroup}
          dealerType={dealerType}
          setDealerType={setDealerType}
          dealerGroupName={dealerGroupName}
          setDealerGroupName={setDealerGroupName}
          {...sharedProps}
        />
      )}

      {view === 'sf-interstitial-dealership' && (
        <SFInterstitialDealership
          setView={setView}
          mobileNumber={mobileNumber}
          dealerGroup={dealerGroup}
          dealerGroupName={dealerGroupName}
          dealerType={dealerType}
          onViewSF={() => { setSfReturnView('terms-of-service'); setView('salesforce-view') }}
        />
      )}

      {view === 'terms-of-service' && (
        <TermsOfService
          setView={setView}
          tosScrolled={tosScrolled}
          setTosScrolled={setTosScrolled}
          {...sharedProps}
        />
      )}

      {view === 'sf-interstitial-2' && (
        <SFInterstitial
          trigger="Triggered: User accepted Terms of Service"
          bullets={[
            'ToS Accepted = TRUE recorded on Application record',
            'Accepted By: James Harlow | Timestamp: Jun 1, 2026 2:14 PM EST',
            'ToS Status on Application → Verified',
            'NOTE: DocuSign was already sent at application creation — this does not re-trigger DocuSign',
          ]}
          onViewSF={() => goToSF('banking')}
          onContinue={() => setView('banking')}
        />
      )}

      {view === 'banking' && (
        <Banking
          setView={setView}
          setPrimaryBankSelected={setPrimaryBankSelected}
          docSignStatus={docSignStatus}
          activeScenario={activeScenario}
          {...sharedProps}
        />
      )}

      {view === 'ach-form' && (
        <ACHForm
          setView={setView}
          setPrimaryBankSelected={setPrimaryBankSelected}
          docSignStatus={docSignStatus}
          {...sharedProps}
        />
      )}

      {view === 'ach-processing' && (
        <ACHProcessing
          setView={setView}
          setAchVerified={setAchVerified}
          docSignStatus={docSignStatus}
          {...sharedProps}
        />
      )}

      {view === 'ach-result' && (
        <ACHResult
          setView={setView}
          achVerified={achVerified}
          preferredFlagCarried={preferredFlagCarried}
          docSignStatus={docSignStatus}
          {...sharedProps}
        />
      )}

      {view === 's11-all-rejected' && (
        <S11AllRejected
          setView={setView}
          setPreferredFlagCarried={setPreferredFlagCarried}
          docSignStatus={docSignStatus}
          {...sharedProps}
        />
      )}

      {view === 'sf-interstitial-3' && (
        <SFInterstitial
          trigger={activeScenario === 's11'
            ? "Triggered: User acknowledged bank account validation failure"
            : "Triggered: User selected primary bank account"}
          bullets={activeScenario === 's11' ? [
            'Banking Collection Status on Application → Pending Resolution',
            'NOTE: No validated bank account was selected — no primary bank data in Salesforce or NetSuite',
            'Application flagged for specialist follow-up — banking must be resolved before account activation',
            'Application resume checkpoint updated — dealer can continue remaining registration steps',
          ] : [
            'Banking Collection Status on Application → TRUE',
            'Primary bank account selection recorded on Application record',
            'NOTE: No banking data stored in Salesforce — all banking data lives in NetSuite only',
            'NetSuite: Chase Bank ••••4821 marked as primary for Metro Ford of Albany',
            'Application resume checkpoint updated — banking step complete',
          ]}
          onViewSF={() => goToSF('docusign-prompt-post-banking')}
          onContinue={() => setView('docusign-prompt-post-banking')}
        />
      )}

      {/* Post-banking DocuSign prompt if docs still pending */}
      {view === 'docusign-prompt-post-banking' && (
        <DocusignPrompt
          setView={setView}
          dealerState={dealerState}
          mobileNumber={mobileNumber}
          docSignStatus={docSignStatus}
          postBanking
          {...sharedProps}
        />
      )}

      {view === 'docusign-notification' && (
        <DocusignNotification
          setView={setView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gmailContext={gmailContext}
          {...sharedProps}
        />
      )}

      {view === 'gmail-mfa' && (
        <GmailMFA
          setView={setView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gmailContext={gmailContext}
          onLobby={() => setView('lobby')}
          setLoggedIn={setIsLoggedIn}
        />
      )}

      {view === 'gmail-docusign' && (
        <GmailDocusign
          setView={setView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gmailContext={gmailContext}
          dealerState={dealerState}
          docSignStatus={docSignStatus}
          setDocSignStatus={setDocSignStatus}
          onLobby={() => setView('lobby')}
          returnView="qualifying-questions"
        />
      )}

      {view === 'qualifying-questions' && (
        <QualifyingQuestions setView={setView} {...sharedProps} />
      )}

      {view === 'schedule-demo' && (
        <ScheduleDemo
          setView={setView}
          selectedDemoSlot={selectedDemoSlot}
          setSelectedDemoSlot={setSelectedDemoSlot}
          {...sharedProps}
        />
      )}

      {view === 'sf-interstitial-4' && (
        <SFInterstitial
          trigger="Triggered: Demo scheduled by James Harlow"
          bullets={[
            'Demo record created — assigned to Mike Ziewicki (IST/BDR)',
            'Calendar event created: Jun 10, 2026 10:00 AM',
            'Activity record created on Metro Ford of Albany account',
            'Demo record linked to FTB Opportunity record',
            'Mike Ziewicki notified via real-time alert',
            'Marketing fields recorded on Application: Dealer Type, Source, Products',
          ]}
          onViewSF={() => goToSF('success')}
          onContinue={() => setView('success')}
        />
      )}

      {view === 'salesforce-view' && (
        <SalesforceView
          setView={setView}
          sfReturnView={sfReturnView}
          dealerGroup={dealerGroup}
          docSignStatus={docSignStatus}
        />
      )}

      {view === 'success' && <Success setView={setView} {...sharedProps} />}

      {/* ── DEALER GROUP FLOW ── */}
      {view === 'dg-intro' && <DGIntro setView={setView} />}
      {view === 'dg-aa-validation' && <DGAAValidation setView={setView} />}
      {view === 'dg-create-credentials' && <DGCreateCredentials setView={setView} />}
      {view === 'dg-check-email' && (
        <DGCheckEmail setView={setView} />
      )}
      {view === 'dg-gmail-mfa' && (
        <DGGmailMFA setView={setView} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      {view === 'dg-situation' && (
        <DGSituation setView={setView} dgSituation={dgSituation} setDGSituation={setDGSituation} />
      )}
      {view === 'dg-select-rooftops' && (
        <DGSelectRooftops
          setView={setView}
          dgSituation={dgSituation}
          selectedRooftops={selectedRooftops}
          setSelectedRooftops={setSelectedRooftops}
        />
      )}
      {view === 'dg-sf-interstitial' && (
        <DGSFInterstitial setView={setView} selectedRooftops={selectedRooftops} dgSituation={dgSituation} />
      )}
      {view === 'dg-success' && (
        <DGSuccess setView={setView} selectedRooftops={selectedRooftops} dgSituation={dgSituation} />
      )}
    </div>
  )
}
