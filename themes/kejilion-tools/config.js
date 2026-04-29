const CONFIG = {
  KEJILION_BRAND: process.env.NEXT_PUBLIC_KEJILION_BRAND || 'Kejilion Tools',
  KEJILION_SUBTITLE:
    process.env.NEXT_PUBLIC_KEJILION_SUBTITLE ||
    'A small collection of tools, experiments, and notes.',
  KEJILION_AVATAR: process.env.NEXT_PUBLIC_KEJILION_AVATAR || '',
  KEJILION_EMPTY_TEXT:
    process.env.NEXT_PUBLIC_KEJILION_EMPTY_TEXT ||
    'No published content found. Add Post pages in Notion to show them here.',
  KEJILION_GITHUB:
    process.env.NEXT_PUBLIC_CONTACT_GITHUB || process.env.NEXT_PUBLIC_GITHUB || '',
  KEJILION_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '',
  KEJILION_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
}

export default CONFIG
