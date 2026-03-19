export type Profile = {
  id: string
  first_name: string | null
  avatar_url: string | null
  email: string
  created_at: string
  updated_at: string
}

export type ProfileInsert = {
  id: string
  first_name?: string | null
  avatar_url?: string | null
  email: string
  created_at?: string
  updated_at?: string
}

export type ProfileUpdate = {
  first_name?: string | null
  avatar_url?: string | null
  email?: string
  updated_at?: string
}
