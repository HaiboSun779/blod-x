export type Blog = {
  id: string
  title: string
  slug: string
  subtitle: string | null
  image: string | null
  content: string | null
  author_id: string
  author: string
  created_at: string
  updated_at: string
}

export type BlogInsert = {
  id?: string
  title: string
  slug: string
  subtitle?: string | null
  image?: string | null
  content?: string | null
  author_id: string
  author: string
  created_at?: string
  updated_at?: string
}

export type BlogUpdate = {
  title?: string
  slug?: string
  subtitle?: string | null
  image?: string | null
  content?: string | null
  author?: string
  updated_at?: string
}
