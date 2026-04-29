const CONFIG = {
  KEJILION_BRAND: process.env.NEXT_PUBLIC_KEJILION_BRAND || 'Kejilion Tools',
  KEJILION_SUBTITLE:
    process.env.NEXT_PUBLIC_KEJILION_SUBTITLE ||
    'A small collection of tools, experiments, and notes.',
  KEJILION_EMPTY_TEXT:
    process.env.NEXT_PUBLIC_KEJILION_EMPTY_TEXT ||
    'No tools have been published yet. Add pages in Notion to show them here.',
  KEJILION_GITHUB:
    process.env.NEXT_PUBLIC_CONTACT_GITHUB || process.env.NEXT_PUBLIC_GITHUB || ''
}

export default CONFIG
