import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rxzgxwpajpsihzetsica.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_PKGAX9RUcscqMo-4L1s1ng_tEpp9yLt'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export interface Comment {
  id: string
  screen_id: string
  screen_name: string
  author: string
  message: string
  parent_id: string | null
  created_at: string
}
