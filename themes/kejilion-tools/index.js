import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from './config'
import { Style } from './style'

/* ── helpers ── */
const cx = (...classes) => classes.filter(Boolean).join(' ')
const asArray = v => (!v ? [] : Array.isArray(v) ? v : [v])
const trimSlash = v => String(v || '').replace(/^\/+|\/+$/g, '')
const getHref = post => {
  if (!post) return '#'
  if (post.href) return post.href
  if (post.slug) return `/${post.slug}`
  return '#'
}
const getTags = post => {
  if (Array.isArray(post?.tagItems) && post.tagItems.length)
    return post.tagItems.map(t => t.name).filter(Boolean)
  return asArray(post?.tags).filter(Boolean)
}
const getExt = (post, key, fallback = '') => post?.ext?.[key] ?? post?.[key] ?? fallback
const isVisiblePost = post => post?.type === 'Post' && post?.status === 'Published'
const groupByCategory = posts => {
  const groups = {}
  posts.forEach(post => {
    const cat = post.category || 'Projects'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(post)
  })
  return groups
}

/* ── icons ── */
const IconGithub = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
  </svg>
)
const IconTwitter = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)
const IconEmail = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='2' y='4' width='20' height='16' rx='2' />
    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
  </svg>
)
const IconArrow = () => (
  <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M7 17 17 7M7 7h10v10' />
  </svg>
)
const IconMoon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z' />
  </svg>
)
const IconSun = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
  </svg>
)

/* ── Header ── */
const Header = props => {
  const { customMenu } = props
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const github = siteConfig('KEJILION_GITHUB', CONFIG.KEJILION_GITHUB, CONFIG)

  const fallbackMenu = [
    { name: 'Home', href: '/' },
    { name: 'Archive', href: '/archive' },
    { name: 'Categories', href: '/category' },
    { name: 'Tags', href: '/tag' }
  ]
  const menu = customMenu?.length ? customMenu : fallbackMenu
  const currentPath = trimSlash(router.asPath.split('?')[0])

  return (
    <header className='kt-header'>
      <div className='kt-shell flex items-center justify-between py-3'>
        <SmartLink href='/' className='kt-focus kt-link text-sm font-semibold tracking-tight'>
          {brand}
        </SmartLink>

        <div className='flex items-center gap-3'>
          <nav className='kt-nav-pill hidden sm:flex'>
            {menu.map(item => {
              const href = item.href || item.slug || '#'
              const active = href !== '#' && currentPath === trimSlash(href)
              return (
                <SmartLink
                  key={`${item.name || item.title}-${href}`}
                  href={href}
                  className={cx('kt-focus kt-link', active && 'kt-nav-active')}>
                  {item.name || item.title}
                </SmartLink>
              )
            })}
            {github && (
              <SmartLink href={github} className='kt-focus kt-link'>
                GitHub
              </SmartLink>
            )}
          </nav>

          <button
            type='button'
            onClick={toggleDarkMode}
            className='kt-focus flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-gray-500 transition hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10'
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDarkMode ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ── Footer ── */
const Footer = () => {
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const link = siteConfig('LINK')
  const since = siteConfig('SINCE')
  const year = new Date().getFullYear()

  return (
    <footer className='kt-footer mt-20 py-8 text-xs text-gray-400 dark:text-gray-600'>
      <div className='kt-shell flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
        <span>
          © {since ? `${since}–${year}` : year} {brand}
        </span>
        {link && (
          <SmartLink href={link} className='kt-focus kt-link'>
            {String(link).replace(/^https?:\/\//, '')}
          </SmartLink>
        )}
      </div>
    </footer>
  )
}

/* ── LayoutBase ── */
const LayoutBase = props => {
  const { children } = props
  return (
    <div id='theme-kejilion-tools' className={siteConfig('FONT_STYLE')}>
      <Style />
      <Header {...props} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

/* ── Hero (homepage) ── */
const HomeIntro = () => {
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const subtitle = siteConfig('KEJILION_SUBTITLE', CONFIG.KEJILION_SUBTITLE, CONFIG)
  const avatar = siteConfig('KEJILION_AVATAR', CONFIG.KEJILION_AVATAR, CONFIG)
  const github = siteConfig('KEJILION_GITHUB', CONFIG.KEJILION_GITHUB, CONFIG)
  const twitter = siteConfig('KEJILION_TWITTER', CONFIG.KEJILION_TWITTER, CONFIG)
  const email = siteConfig('KEJILION_EMAIL', CONFIG.KEJILION_EMAIL, CONFIG)

  return (
    <section className='mb-12 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
      <div className='flex-1'>
        <h1 className='kt-hero-name text-4xl font-bold tracking-tight sm:text-5xl'>{brand}</h1>
        {subtitle && (
          <p className='mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400'>
            {subtitle}
          </p>
        )}
        <div className='mt-5 flex flex-wrap gap-2'>
          {github && (
            <SmartLink href={github} className='kt-focus kt-social-btn'>
              <IconGithub /> GitHub
            </SmartLink>
          )}
          {twitter && (
            <SmartLink href={twitter} className='kt-focus kt-social-btn'>
              <IconTwitter /> Twitter
            </SmartLink>
          )}
          {email && (
            <SmartLink href={`mailto:${email}`} className='kt-focus kt-social-btn'>
              <IconEmail /> Email
            </SmartLink>
          )}
        </div>
      </div>
      {avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar} alt={brand} className='kt-avatar order-first sm:order-last' />
      )}
    </section>
  )
}

/* ── PostCard ── */
const PostCard = ({ post }) => {
  const href = getHref(post)
  const summary = post.summary || getExt(post, 'description', '')
  const tags = getTags(post)

  return (
    <SmartLink href={href} className='kt-focus kt-card kt-link group'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-sm font-semibold text-gray-900 transition group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400'>
          {post.title}
        </h3>
        <span className='mt-0.5 shrink-0 text-gray-300 transition group-hover:text-indigo-400 dark:text-gray-600 dark:group-hover:text-indigo-500'>
          <IconArrow />
        </span>
      </div>
      {summary && (
        <p className='mt-2 text-xs leading-6 text-gray-500 dark:text-gray-400 line-clamp-2'>
          {summary}
        </p>
      )}
      {tags.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {tags.slice(0, 5).map(tag => (
            <span key={tag} className='kt-tag'>
              {tag}
            </span>
          ))}
        </div>
      )}
    </SmartLink>
  )
}

/* ── PostGroups ── */
const PostGroups = ({ posts }) => {
  const emptyText = siteConfig('KEJILION_EMPTY_TEXT', CONFIG.KEJILION_EMPTY_TEXT, CONFIG)

  if (!posts.length) {
    return (
      <p className='py-6 text-sm text-gray-400 dark:text-gray-600'>{emptyText}</p>
    )
  }

  const groups = groupByCategory(posts)

  return (
    <div className='space-y-10'>
      {Object.keys(groups).map(category => (
        <section key={category}>
          <p className='kt-section-title'>{category}</p>
          <div className='grid gap-3 sm:grid-cols-2'>
            {groups[category].map(post => (
              <PostCard key={post.slug || post.id || post.title} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

/* ── LayoutIndex ── */
const LayoutIndex = props => {
  const posts = (props.allNavPages || props.latestPosts || []).filter(isVisiblePost)

  return (
    <div className='kt-shell py-14'>
      <HomeIntro />
      <PostGroups posts={posts} />
    </div>
  )
}

/* ── LayoutPostList ── */
const LayoutPostList = props => {
  const posts = props.posts || []
  const title = props.category || props.tag || props.keyword || 'Index'

  return (
    <div className='kt-shell py-14'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {title}
      </h1>
      <PostGroups posts={posts} />
    </div>
  )
}

const LayoutSearch = props => <LayoutPostList {...props} />

/* ── LayoutArchive ── */
const LayoutArchive = props => {
  const archivePosts = props.archivePosts || {}

  return (
    <div className='kt-shell py-14'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        Archive
      </h1>
      <div className='space-y-10'>
        {Object.keys(archivePosts).map(group => (
          <section key={group}>
            <p className='kt-section-title'>{group}</p>
            <div className='grid gap-3 sm:grid-cols-2'>
              {archivePosts[group].map(post => (
                <PostCard key={post.slug || post.id || post.title} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

/* ── TOC ── */
const TableOfContents = ({ post }) => {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef(null)

  const toc = post?.toc || []

  useEffect(() => {
    if (!toc.length) return

    const headings = document.querySelectorAll(
      '#article-wrapper h1, #article-wrapper h2, #article-wrapper h3'
    )
    if (!headings.length) return

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach(h => observerRef.current.observe(h))
    return () => observerRef.current?.disconnect()
  }, [toc])

  if (!toc.length) return null

  return (
    <aside>
      <p className='kt-section-title mb-3'>On this page</p>
      <nav className='kt-toc'>
        {toc.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cx(
              item.level === 3 && 'kt-toc-h3',
              activeId === item.id && 'kt-toc-active'
            )}>
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}

/* ── PageActions ── */
const PageActions = ({ post }) => {
  const links = [
    ['Website', getExt(post, 'website'), false],
    ['Download', getExt(post, 'download'), false],
    ['Docs', getExt(post, 'docs'), true],
    ['GitHub', getExt(post, 'github'), true]
  ].filter(([, href]) => href)

  if (!links.length) return null

  return (
    <div className='mt-6 flex flex-wrap gap-2'>
      {links.map(([label, href, ghost]) => (
        <SmartLink
          key={label}
          href={href}
          className={cx('kt-focus kt-action-btn', ghost && 'kt-action-ghost')}>
          {label}
          {!ghost && <IconArrow />}
        </SmartLink>
      ))}
    </div>
  )
}

/* ── PasswordPanel ── */
const PasswordPanel = ({ validPassword }) => {
  const submitPassword = () => {
    const input = document.getElementById('kt-password')
    const error = document.getElementById('kt-password-error')
    if (!validPassword(input?.value) && error) {
      error.innerText = 'Invalid password.'
    }
  }

  return (
    <div className='max-w-xs'>
      <p className='mb-3 text-sm text-gray-500 dark:text-gray-400'>This page is locked.</p>
      <div className='flex overflow-hidden rounded-lg border border-black/10 dark:border-white/10'>
        <input
          id='kt-password'
          type='password'
          className='min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none'
          onKeyDown={e => e.key === 'Enter' && submitPassword()}
        />
        <button
          type='button'
          onClick={submitPassword}
          className='border-l border-black/10 bg-black/5 px-4 text-sm transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'>
          Unlock
        </button>
      </div>
      <p id='kt-password-error' className='mt-2 text-xs text-red-500' />
    </div>
  )
}

/* ── LayoutSlug ── */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  if (!post) return <Layout404 />

  const tags = getTags(post)

  return (
    <div className='kt-shell py-14'>
      {/* hero header */}
      <header className='mb-10 border-b border-black/7 pb-10 dark:border-white/7'>
        {post.category && (
          <SmartLink
            href={`/category/${post.category}`}
            className='kt-focus kt-tag mb-4 inline-block'>
            {post.category}
          </SmartLink>
        )}
        <h1 className='text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
          {post.title}
        </h1>
        {post.summary && (
          <p className='mt-4 text-base leading-7 text-gray-500 dark:text-gray-400'>
            {post.summary}
          </p>
        )}
        <PageActions post={post} />
        {tags.length > 0 && (
          <div className='mt-5 flex flex-wrap gap-1.5'>
            {tags.map(tag => (
              <SmartLink key={tag} href={`/tag/${encodeURIComponent(tag)}`} className='kt-focus kt-tag'>
                {tag}
              </SmartLink>
            ))}
          </div>
        )}
      </header>

      {lock ? (
        <PasswordPanel validPassword={validPassword} />
      ) : (
        <div className='kt-article-layout'>
          <div id='article-wrapper'>
            <NotionPage post={post} />
          </div>
          <TableOfContents post={post} />
        </div>
      )}
    </div>
  )
}

/* ── LayoutCategoryIndex ── */
const LayoutCategoryIndex = props => {
  const categories = props.categoryOptions || []

  return (
    <div className='kt-shell py-14'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        Categories
      </h1>
      <div className='divide-y divide-black/7 dark:divide-white/7'>
        {categories.map(cat => (
          <SmartLink
            key={cat.name}
            href={`/category/${cat.name}`}
            className='kt-focus kt-link flex items-center justify-between py-4 text-sm'>
            <span className='font-medium'>{cat.name}</span>
            <span className='text-gray-400'>{cat.count}</span>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

/* ── LayoutTagIndex ── */
const LayoutTagIndex = props => {
  const tags = props.tagOptions || []

  return (
    <div className='kt-shell py-14'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        Tags
      </h1>
      <div className='flex flex-wrap gap-2'>
        {tags.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className='kt-focus kt-tag'>
            {tag.name}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

/* ── Layout404 ── */
const Layout404 = () => (
  <div className='kt-shell py-24 text-center'>
    <p className='text-6xl font-bold text-gray-200 dark:text-gray-800'>404</p>
    <p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>Page not found.</p>
    <div className='mt-6'>
      <SmartLink href='/' className='kt-focus kt-action-btn inline-flex'>
        Back home
      </SmartLink>
    </div>
  </div>
)

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
