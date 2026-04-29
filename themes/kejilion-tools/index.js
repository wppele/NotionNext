import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import CONFIG from './config'
import { Style } from './style'

const cx = (...classes) => classes.filter(Boolean).join(' ')

const asArray = value => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const trimSlash = value => String(value || '').replace(/^\/+|\/+$/g, '')

const getHref = post => {
  if (!post) return '#'
  if (post.href) return post.href
  if (post.slug) return `/${post.slug}`
  return '#'
}

const getTags = post => {
  if (Array.isArray(post?.tagItems) && post.tagItems.length) {
    return post.tagItems.map(tag => tag.name).filter(Boolean)
  }
  return asArray(post?.tags).filter(Boolean)
}

const getExt = (post, key, fallback = '') => {
  return post?.ext?.[key] ?? post?.[key] ?? fallback
}

const isVisiblePost = post => {
  return post?.type === 'Post' && post?.status === 'Published'
}

const groupByCategory = posts => {
  const groups = {}
  posts.forEach(post => {
    const category = post.category || 'Projects'
    if (!groups[category]) groups[category] = []
    groups[category].push(post)
  })
  return groups
}

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

  return (
    <header className='border-b border-black/10 dark:border-white/10'>
      <div className='kt-shell flex flex-wrap items-center justify-between gap-3 py-5'>
        <SmartLink href='/' className='kt-focus kt-link text-lg font-semibold'>
          {brand}
        </SmartLink>

        <nav className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-300'>
          {menu.map(item => {
            const href = item.href || item.slug || '#'
            const active =
              href !== '#' && trimSlash(router.asPath.split('?')[0]) === trimSlash(href)
            return (
              <SmartLink
                key={`${item.name || item.title}-${href}`}
                href={href}
                className={cx('kt-focus kt-link', active && 'font-semibold text-gray-950 dark:text-white')}>
                {item.name || item.title}
              </SmartLink>
            )
          })}
          {github && (
            <SmartLink href={github} className='kt-focus kt-link'>
              GitHub
            </SmartLink>
          )}
          <button
            type='button'
            onClick={toggleDarkMode}
            className='kt-focus rounded border border-black/10 px-2 py-1 text-xs text-gray-600 transition hover:border-gray-400 dark:border-white/10 dark:text-gray-300 dark:hover:border-white/40'
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

const Footer = () => {
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const link = siteConfig('LINK')
  const since = siteConfig('SINCE')
  const year = new Date().getFullYear()

  return (
    <footer className='mt-16 border-t border-black/10 py-8 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400'>
      <div className='kt-shell flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <span>
          {brand} {since ? `${since}-${year}` : year}
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

const HomeIntro = () => {
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const subtitle = siteConfig('KEJILION_SUBTITLE', CONFIG.KEJILION_SUBTITLE, CONFIG)

  return (
    <section className='mb-10'>
      <h1 className='text-4xl font-semibold tracking-normal text-gray-950 dark:text-white sm:text-5xl'>
        {brand}
      </h1>
      {subtitle && (
        <p className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
          {subtitle}
        </p>
      )}
    </section>
  )
}

const PostLine = ({ post }) => {
  const href = getHref(post)
  const summary = post.summary || getExt(post, 'description', '')
  const tags = getTags(post)

  return (
    <article className='border-t border-black/10 py-5 dark:border-white/10'>
      <SmartLink href={href} className='kt-focus kt-link group block'>
        <div className='flex items-baseline justify-between gap-4'>
          <h3 className='text-lg font-medium text-gray-950 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300'>
            {post.title}
          </h3>
          <span className='shrink-0 text-xs text-gray-400'>Open</span>
        </div>
        {summary && (
          <p className='mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300'>
            {summary}
          </p>
        )}
      </SmartLink>
      {tags.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400'>
          {tags.slice(0, 6).map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      )}
    </article>
  )
}

const PostGroups = ({ posts }) => {
  const emptyText = siteConfig('KEJILION_EMPTY_TEXT', CONFIG.KEJILION_EMPTY_TEXT, CONFIG)

  if (!posts.length) {
    return (
      <div className='border-t border-black/10 py-6 text-sm leading-7 text-gray-500 dark:border-white/10 dark:text-gray-400'>
        {emptyText}
      </div>
    )
  }

  const groups = groupByCategory(posts)

  return (
    <div className='space-y-10'>
      {Object.keys(groups).map(category => (
        <section key={category}>
          <h2 className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
            {category}
          </h2>
          <div>
            {groups[category].map(post => (
              <PostLine key={post.slug || post.id || post.title} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const LayoutIndex = props => {
  const posts = (props.allNavPages || props.latestPosts || []).filter(isVisiblePost)

  return (
    <div className='kt-shell py-12'>
      <HomeIntro />
      <PostGroups posts={posts} />
    </div>
  )
}

const LayoutPostList = props => {
  const posts = props.posts || []
  const title = props.category || props.tag || props.keyword || 'Index'

  return (
    <div className='kt-shell py-12'>
      <h1 className='mb-8 text-3xl font-semibold text-gray-950 dark:text-white'>{title}</h1>
      <PostGroups posts={posts} />
    </div>
  )
}

const LayoutSearch = props => <LayoutPostList {...props} />

const LayoutArchive = props => {
  const archivePosts = props.archivePosts || {}

  return (
    <div className='kt-shell py-12'>
      <h1 className='mb-8 text-3xl font-semibold text-gray-950 dark:text-white'>Archive</h1>
      <div className='space-y-10'>
        {Object.keys(archivePosts).map(group => (
          <section key={group}>
            <h2 className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              {group}
            </h2>
            {archivePosts[group].map(post => (
              <PostLine key={post.slug || post.id || post.title} post={post} />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

const PageActions = ({ post }) => {
  const links = [
    ['Website', getExt(post, 'website')],
    ['Download', getExt(post, 'download')],
    ['Docs', getExt(post, 'docs')],
    ['GitHub', getExt(post, 'github')]
  ].filter(([, href]) => href)

  if (!links.length) return null

  return (
    <div className='mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm'>
      {links.map(([label, href]) => (
        <SmartLink key={label} href={href} className='kt-focus kt-link text-blue-600 dark:text-blue-300'>
          {label}
        </SmartLink>
      ))}
    </div>
  )
}

const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  if (!post) return <Layout404 />

  return (
    <article className='kt-shell py-12'>
      <header className='mb-8 border-b border-black/10 pb-8 dark:border-white/10'>
        {post.category && (
          <div className='mb-3 text-sm font-medium text-gray-500 dark:text-gray-400'>
            {post.category}
          </div>
        )}
        <h1 className='text-4xl font-semibold leading-tight text-gray-950 dark:text-white'>
          {post.title}
        </h1>
        {post.summary && (
          <p className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
            {post.summary}
          </p>
        )}
        <PageActions post={post} />
      </header>

      {lock ? (
        <PasswordPanel validPassword={validPassword} />
      ) : (
        <div id='article-wrapper'>
          <NotionPage post={post} />
        </div>
      )}
    </article>
  )
}

const PasswordPanel = ({ validPassword }) => {
  const submitPassword = () => {
    const input = document.getElementById('kejilion-password')
    const error = document.getElementById('kejilion-password-error')
    if (!validPassword(input?.value) && error) {
      error.innerText = 'Invalid password.'
    }
  }

  return (
    <div className='max-w-sm'>
      <div className='mb-3 text-sm text-gray-600 dark:text-gray-300'>This page is locked.</div>
      <div className='flex border border-black/10 dark:border-white/10'>
        <input
          id='kejilion-password'
          type='password'
          className='min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none'
          onKeyDown={event => {
            if (event.key === 'Enter') submitPassword()
          }}
        />
        <button type='button' onClick={submitPassword} className='border-l border-black/10 px-4 text-sm dark:border-white/10'>
          Unlock
        </button>
      </div>
      <div id='kejilion-password-error' className='mt-3 text-sm text-red-600' />
    </div>
  )
}

const LayoutCategoryIndex = props => {
  const categories = props.categoryOptions || []

  return (
    <div className='kt-shell py-12'>
      <h1 className='mb-8 text-3xl font-semibold text-gray-950 dark:text-white'>Categories</h1>
      <div className='border-t border-black/10 dark:border-white/10'>
        {categories.map(category => (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            className='kt-focus kt-link flex justify-between border-b border-black/10 py-4 text-sm dark:border-white/10'>
            <span>{category.name}</span>
            <span className='text-gray-500'>{category.count}</span>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

const LayoutTagIndex = props => {
  const tags = props.tagOptions || []

  return (
    <div className='kt-shell py-12'>
      <h1 className='mb-8 text-3xl font-semibold text-gray-950 dark:text-white'>Tags</h1>
      <div className='flex flex-wrap gap-3 text-sm'>
        {tags.map(tag => (
          <SmartLink key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`} className='kt-focus kt-link'>
            #{tag.name}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

const Layout404 = () => (
  <div className='kt-shell py-20'>
    <h1 className='text-4xl font-semibold text-gray-950 dark:text-white'>404</h1>
    <p className='mt-4 text-sm text-gray-600 dark:text-gray-300'>Page not found.</p>
    <div className='mt-6'>
      <SmartLink href='/' className='kt-focus kt-link text-blue-600 dark:text-blue-300'>
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
