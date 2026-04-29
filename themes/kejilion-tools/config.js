const CONFIG = {
  KEJILION_BRAND: process.env.NEXT_PUBLIC_KEJILION_BRAND || 'Kejilion',
  KEJILION_SUBTITLE:
    process.env.NEXT_PUBLIC_KEJILION_SUBTITLE ||
    '面向 Windows 和日常工作的自动化与效率工具集合。',
  KEJILION_AVATAR: process.env.NEXT_PUBLIC_KEJILION_AVATAR || '',
  KEJILION_EMPTY_TEXT:
    process.env.NEXT_PUBLIC_KEJILION_EMPTY_TEXT ||
    '暂无内容，请在 Notion 中添加页面。',
  KEJILION_GITHUB:
    process.env.NEXT_PUBLIC_CONTACT_GITHUB || process.env.NEXT_PUBLIC_GITHUB || '',
  KEJILION_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '',
  KEJILION_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
}

export default CONFIG
