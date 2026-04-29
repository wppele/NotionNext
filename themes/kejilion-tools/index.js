import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
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

const categoryEquals = (post, category) => {
  return String(post?.category || '').toLowerCase() === String(category || '').toLowerCase()
}

const getProjectPosts = posts => {
  const category = siteConfig(
    'KEJILION_PROJECT_CATEGORY',
    CONFIG.KEJILION_PROJECT_CATEGORY,
    CONFIG
  )
  const projects = posts.filter(post => {
    const href = trimSlash(getHref(post))
    return (
      categoryEquals(post, category) ||
      href.startsWith('projects/') ||
      getTags(post).some(tag => /project|tool|windows|automation/i.test(tag))
    )
  })

  if (projects.length) return projects

  return [
    {
      title: 'AutoFlow',
      summary: '自动化操作 Windows 的桌面工具，帮助你录制、编辑并执行重复性的操作流程。',
      category,
      tags: ['Windows', 'Automation', 'Desktop App'],
      slug: 'projects/autoflow',
      href: '/projects/autoflow',
      ext: {
        status: '开发中',
        platform: 'Windows'
      }
    }
  ]
}

const getCategoryPosts = (posts, category) => {
  return posts.filter(post => categoryEquals(post, category))
}

const getFeaturedProject = projects => {
  const featuredSlug = trimSlash(
    siteConfig('KEJILION_FEATURED_SLUG', CONFIG.KEJILION_FEATURED_SLUG, CONFIG)
  )
  return (
    projects.find(post => {
      const slug = trimSlash(post.slug)
      const href = trimSlash(getHref(post))
      return slug === featuredSlug || href === featuredSlug
    }) ||
    projects.find(post => /autoflow/i.test(post.title)) ||
    projects[0]
  )
}

const ActionLink = ({ href, icon, label, primary = false }) => {
  if (!href || href === '#') return null
  return (
    <SmartLink
      href={href}
      className={cx(
        'kejilion-focus kejilion-link inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium',
        primary
          ? 'border-[#1f7f64] bg-[#1f7f64] text-white hover:border-[#186750] hover:bg-[#186750] hover:text-white'
          : 'border-black/10 bg-white/80 text-[#17211c] hover:border-[#1f7f64] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#ecf5ef]'
      )}>
      {icon && <i className={icon} aria-hidden='true' />}
      <span>{label}</span>
    </SmartLink>
  )
}

const TagPill = ({ children }) => {
  if (!children) return null
  return (
    <span className='rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-xs text-[#50635a] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#b5c8be]'>
      {children}
    </span>
  )
}

const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className='mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
    <div>
      {eyebrow && (
        <div className='mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f7f64] dark:text-[#72d4b1]'>
          {eyebrow}
        </div>
      )}
      <h2 className='text-2xl font-semibold text-[#17211c] dark:text-[#ecf5ef] md:text-3xl'>
        {title}
      </h2>
      {description && (
        <p className='mt-2 max-w-2xl text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>
          {description}
        </p>
      )}
    </div>
    {action}
  </div>
)

const ToolVisual = ({ post, compact = false }) => {
  const cover = post?.pageCoverThumbnail || post?.pageCover
  if (cover) {
    return (
      <div className='overflow-hidden rounded-md border border-black/10 bg-white dark:border-white/10 dark:bg-black'>
        <img
          src={cover}
          alt={post?.title || 'Project preview'}
          className={cx('h-full w-full object-cover', compact ? 'aspect-[4/3]' : 'aspect-[16/9]')}
        />
      </div>
    )
  }

  return (
    <div
      className={cx(
        'kejilion-tool-visual overflow-hidden rounded-md border border-black/10 dark:border-white/10',
        compact ? 'p-4' : 'p-5'
      )}>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex gap-1.5'>
          <span className='h-2.5 w-2.5 rounded-full bg-[#d95d39]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#e1a846]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#2b9b7a]' />
        </div>
        <span className='text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5d6f65] dark:text-[#a8bbb0]'>
          AutoFlow
        </span>
      </div>
      <div className='space-y-3'>
        <div className='h-3 w-2/3 rounded bg-[#1f7f64]/25 dark:bg-[#72d4b1]/25' />
        <div className='grid grid-cols-[1fr_72px] gap-3'>
          <div className='space-y-2'>
            <div className='h-2.5 rounded bg-black/10 dark:bg-white/10' />
            <div className='h-2.5 w-5/6 rounded bg-black/10 dark:bg-white/10' />
            <div className='h-2.5 w-4/6 rounded bg-black/10 dark:bg-white/10' />
          </div>
          <div className='rounded border border-[#1f7f64]/25 bg-[#1f7f64]/10 p-2 dark:border-[#72d4b1]/25 dark:bg-[#72d4b1]/10'>
            <div className='mb-2 h-2 rounded bg-[#1f7f64]/35 dark:bg-[#72d4b1]/35' />
            <div className='h-8 rounded bg-white/80 dark:bg-black/30' />
          </div>
        </div>
        {!compact && (
          <div className='grid grid-cols-3 gap-2 pt-2'>
            <div className='h-14 rounded border border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/20' />
            <div className='h-14 rounded border border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/20' />
            <div className='h-14 rounded border border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/20' />
          </div>
        )}
      </div>
    </div>
  )
}

const ProjectCard = ({ post }) => {
  const href = getHref(post)
  const tags = getTags(post).slice(0, 4)
  const status = getExt(post, 'status', '维护中')
  const platform = getExt(post, 'platform', '')
  const github = getExt(post, 'github', '')
  const download = getExt(post, 'download', '')
  const docs = getExt(post, 'docs', '')

  return (
    <article className='kejilion-card flex h-full flex-col rounded-md p-4'>
      <ToolVisual post={post} compact />
      <div className='mt-5 flex flex-1 flex-col'>
        <div className='mb-3 flex flex-wrap gap-2'>
          <TagPill>{status}</TagPill>
          {platform && <TagPill>{platform}</TagPill>}
        </div>
        <SmartLink href={href} className='kejilion-focus kejilion-link group'>
          <h3 className='text-xl font-semibold text-[#17211c] group-hover:text-[#1f7f64] dark:text-[#ecf5ef] dark:group-hover:text-[#72d4b1]'>
            {post.title}
          </h3>
        </SmartLink>
        <p className='mt-2 line-clamp-3 text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>
          {post.summary}
        </p>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map(tag => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <div className='mt-5 flex flex-wrap gap-2 pt-1'>
          <ActionLink href={href} icon='fa-solid fa-arrow-right' label='详情' primary />
          <ActionLink href={docs} icon='fa-regular fa-file-lines' label='文档' />
          <ActionLink href={download} icon='fa-solid fa-download' label='下载' />
          <ActionLink href={github} icon='fa-brands fa-github' label='源码' />
        </div>
      </div>
    </article>
  )
}

const Header = props => {
  const { customMenu } = props
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const projectCategory = siteConfig(
    'KEJILION_PROJECT_CATEGORY',
    CONFIG.KEJILION_PROJECT_CATEGORY,
    CONFIG
  )
  const docsCategory = siteConfig(
    'KEJILION_DOCS_CATEGORY',
    CONFIG.KEJILION_DOCS_CATEGORY,
    CONFIG
  )
  const changelogCategory = siteConfig(
    'KEJILION_CHANGELOG_CATEGORY',
    CONFIG.KEJILION_CHANGELOG_CATEGORY,
    CONFIG
  )
  const fallbackMenu = [
    { name: 'Projects', href: `/category/${projectCategory}` },
    { name: 'Docs', href: `/category/${docsCategory}` },
    { name: 'Changelog', href: `/category/${changelogCategory}` },
    { name: 'About', href: '/about' }
  ]
  const menu = customMenu?.length ? customMenu : fallbackMenu

  return (
    <header className='sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#070a09]/90'>
      <div className='kejilion-shell flex min-h-16 flex-wrap items-center justify-between gap-3 py-3'>
        <SmartLink
          href='/'
          className='kejilion-focus kejilion-link flex items-center gap-3 text-[#17211c] dark:text-[#ecf5ef]'>
          <span className='flex h-9 w-9 items-center justify-center rounded-md bg-[#17211c] text-sm font-semibold text-white dark:bg-[#ecf5ef] dark:text-[#07100c]'>
            K
          </span>
          <span className='text-base font-semibold'>{brand}</span>
        </SmartLink>

        <nav className='flex flex-wrap items-center justify-end gap-1'>
          {menu.map(item => {
            const href = item.href || item.slug || '#'
            const active =
              href !== '#' && trimSlash(router.asPath.split('?')[0]).startsWith(trimSlash(href))
            return (
              <SmartLink
                key={`${item.name}-${href}`}
                href={href}
                className={cx(
                  'kejilion-focus kejilion-link rounded-md px-3 py-2 text-sm text-[#50635a] dark:text-[#b5c8be]',
                  active && 'bg-black/[0.04] text-[#17211c] dark:bg-white/[0.06] dark:text-[#ecf5ef]'
                )}>
                {item.name || item.title}
              </SmartLink>
            )
          })}
          <button
            type='button'
            aria-label={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            onClick={toggleDarkMode}
            className='kejilion-focus ml-1 flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white/80 text-[#17211c] transition hover:border-[#1f7f64] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#ecf5ef]'>
            <i className={isDarkMode ? 'fa-regular fa-sun' : 'fa-regular fa-moon'} aria-hidden='true' />
          </button>
        </nav>
      </div>
    </header>
  )
}

const Footer = props => {
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const github = siteConfig('KEJILION_GITHUB', CONFIG.KEJILION_GITHUB, CONFIG)
  const link = siteConfig('LINK')
  const since = siteConfig('SINCE')

  return (
    <footer className='mt-16 border-t border-black/10 py-8 text-sm text-[#5d6f65] dark:border-white/10 dark:text-[#a8bbb0]'>
      <div className='kejilion-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <div className='font-medium text-[#17211c] dark:text-[#ecf5ef]'>{brand}</div>
          <div className='mt-1'>持续整理和维护个人工具项目。</div>
        </div>
        <div className='flex flex-wrap gap-3'>
          {github && (
            <SmartLink href={github} className='kejilion-link'>
              GitHub
            </SmartLink>
          )}
          {link && (
            <SmartLink href={link} className='kejilion-link'>
              {String(link).replace(/^https?:\/\//, '')}
            </SmartLink>
          )}
          <span>{since ? `${since} - ${new Date().getFullYear()}` : new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

const LayoutBase = props => {
  const { children } = props
  return (
    <div id='theme-kejilion-tools' className={`${siteConfig('FONT_STYLE')} min-h-screen`}>
      <Style />
      <Header {...props} />
      <main>{children}</main>
      <Footer {...props} />
    </div>
  )
}

const IntroSection = ({ featured }) => {
  const brand = siteConfig('KEJILION_BRAND', CONFIG.KEJILION_BRAND, CONFIG)
  const tagline = siteConfig('KEJILION_TAGLINE', CONFIG.KEJILION_TAGLINE, CONFIG)
  const description = siteConfig(
    'KEJILION_DESCRIPTION',
    CONFIG.KEJILION_DESCRIPTION,
    CONFIG
  )
  const featuredHref = getHref(featured)
  const download = getExt(featured, 'download', '')
  const docs = getExt(featured, 'docs', '')

  return (
    <section className='kejilion-shell py-12 md:py-16'>
      <div className='max-w-4xl'>
        <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-[#1f7f64]/20 bg-[#1f7f64]/10 px-3 py-1 text-xs font-medium text-[#1f7f64] dark:border-[#72d4b1]/20 dark:bg-[#72d4b1]/10 dark:text-[#72d4b1]'>
          <i className='fa-solid fa-wrench' aria-hidden='true' />
          <span>Personal tool lab</span>
        </div>
        <h1 className='text-4xl font-semibold leading-tight text-[#17211c] dark:text-[#ecf5ef] md:text-6xl'>
          {brand}
        </h1>
        <p className='mt-5 max-w-2xl text-lg leading-8 text-[#50635a] dark:text-[#b5c8be]'>
          {tagline}
        </p>
        <p className='mt-3 max-w-2xl text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>
          {description}
        </p>
        <div className='mt-7 flex flex-wrap gap-3'>
          <ActionLink href={featuredHref} icon='fa-solid fa-arrow-right' label='查看 AutoFlow' primary />
          <ActionLink href={docs} icon='fa-regular fa-file-lines' label='使用文档' />
          <ActionLink href={download} icon='fa-solid fa-download' label='下载' />
        </div>
      </div>

      {featured && (
        <article className='kejilion-card mt-10 grid gap-6 rounded-md p-4 md:grid-cols-[1.1fr_0.9fr] md:p-6'>
          <div className='flex flex-col justify-between'>
            <div>
              <div className='mb-3 flex flex-wrap gap-2'>
                <TagPill>{getExt(featured, 'status', '开发中')}</TagPill>
                <TagPill>{getExt(featured, 'platform', 'Windows')}</TagPill>
              </div>
              <h2 className='text-2xl font-semibold text-[#17211c] dark:text-[#ecf5ef] md:text-3xl'>
                {featured.title}
              </h2>
              <p className='mt-3 max-w-2xl text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>
                {featured.summary}
              </p>
            </div>
            <div className='mt-5 flex flex-wrap gap-2'>
              {getTags(featured)
                .slice(0, 5)
                .map(tag => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
            </div>
          </div>
          <ToolVisual post={featured} />
        </article>
      )}
    </section>
  )
}

const ProjectsSection = ({ projects }) => (
  <section className='kejilion-shell py-8'>
    <SectionHeading
      eyebrow='Project index'
      title='项目'
      description='每个项目都按产品页、文档和更新记录的方式维护，后续新增工具时会自然补进这个列表。'
      action={
        <SmartLink
          href={`/category/${siteConfig('KEJILION_PROJECT_CATEGORY', CONFIG.KEJILION_PROJECT_CATEGORY, CONFIG)}`}
          className='kejilion-focus kejilion-link hidden rounded-md border border-black/10 px-4 py-2 text-sm dark:border-white/10 md:inline-flex'>
          全部项目
        </SmartLink>
      }
    />
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {projects.map(post => (
        <ProjectCard key={post.slug || post.title} post={post} />
      ))}
    </div>
  </section>
)

const ResourceList = ({ title, posts, emptyText }) => (
  <div className='kejilion-card rounded-md p-5'>
    <h3 className='mb-4 text-base font-semibold text-[#17211c] dark:text-[#ecf5ef]'>{title}</h3>
    {posts.length ? (
      <div className='space-y-3'>
        {posts.slice(0, 5).map(post => (
          <SmartLink
            key={post.slug || post.title}
            href={getHref(post)}
            className='kejilion-focus kejilion-link block rounded-md border border-black/10 p-3 dark:border-white/10'>
            <div className='text-sm font-medium text-[#17211c] dark:text-[#ecf5ef]'>{post.title}</div>
            {post.summary && (
              <div className='mt-1 line-clamp-2 text-xs leading-6 text-[#5d6f65] dark:text-[#a8bbb0]'>
                {post.summary}
              </div>
            )}
          </SmartLink>
        ))}
      </div>
    ) : (
      <p className='text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>{emptyText}</p>
    )}
  </div>
)

const ResourcesSection = ({ docs, changelog }) => (
  <section className='kejilion-shell py-8'>
    <div className='grid gap-4 md:grid-cols-2'>
      <ResourceList title='文档' posts={docs} emptyText='文档内容准备好后会显示在这里。' />
      <ResourceList title='更新记录' posts={changelog} emptyText='发布记录准备好后会显示在这里。' />
    </div>
  </section>
)

const LayoutIndex = props => {
  const posts = props.allNavPages || props.latestPosts || []
  const projects = useMemo(() => getProjectPosts(posts), [posts])
  const featured = getFeaturedProject(projects)
  const docs = getCategoryPosts(
    posts,
    siteConfig('KEJILION_DOCS_CATEGORY', CONFIG.KEJILION_DOCS_CATEGORY, CONFIG)
  )
  const changelog = getCategoryPosts(
    posts,
    siteConfig('KEJILION_CHANGELOG_CATEGORY', CONFIG.KEJILION_CHANGELOG_CATEGORY, CONFIG)
  )

  return (
    <>
      <IntroSection featured={featured} />
      <ProjectsSection projects={projects} />
      <ResourcesSection docs={docs} changelog={changelog} />
    </>
  )
}

const ListItem = ({ post }) => (
  <article className='kejilion-card rounded-md p-5'>
    <div className='mb-3 flex flex-wrap gap-2'>
      {post.category && <TagPill>{post.category}</TagPill>}
      {getTags(post)
        .slice(0, 3)
        .map(tag => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
    </div>
    <SmartLink href={getHref(post)} className='kejilion-focus kejilion-link'>
      <h2 className='text-xl font-semibold text-[#17211c] dark:text-[#ecf5ef]'>{post.title}</h2>
    </SmartLink>
    {post.summary && (
      <p className='mt-2 text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>{post.summary}</p>
    )}
  </article>
)

const LayoutPostList = props => {
  const posts = props.posts || []
  const category = props.category
  const isProjectList = categoryEquals(
    { category },
    siteConfig('KEJILION_PROJECT_CATEGORY', CONFIG.KEJILION_PROJECT_CATEGORY, CONFIG)
  )
  const title = category || props.tag || props.keyword || '内容'

  return (
    <section className='kejilion-shell py-10'>
      <SectionHeading
        eyebrow='Index'
        title={title}
        description={`${posts.length} 个条目`}
      />
      {isProjectList ? (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {posts.map(post => (
            <ProjectCard key={post.slug || post.title} post={post} />
          ))}
        </div>
      ) : (
        <div className='grid gap-4'>
          {posts.map(post => (
            <ListItem key={post.slug || post.title} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

const LayoutSearch = props => <LayoutPostList {...props} />

const LayoutArchive = props => {
  const archivePosts = props.archivePosts || {}
  return (
    <section className='kejilion-shell py-10'>
      <SectionHeading eyebrow='Archive' title='归档' description='按时间整理的内容索引。' />
      <div className='space-y-5'>
        {Object.keys(archivePosts).map(group => (
          <div key={group} className='kejilion-card rounded-md p-5'>
            <h2 className='mb-4 text-lg font-semibold text-[#17211c] dark:text-[#ecf5ef]'>{group}</h2>
            <div className='space-y-3'>
              {archivePosts[group].map(post => (
                <SmartLink
                  key={post.slug || post.title}
                  href={getHref(post)}
                  className='kejilion-focus kejilion-link flex items-center justify-between gap-4 rounded-md border border-black/10 p-3 text-sm dark:border-white/10'>
                  <span>{post.title}</span>
                  <span className='text-xs text-[#5d6f65] dark:text-[#a8bbb0]'>{post.publishDay}</span>
                </SmartLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const tags = getTags(post)
  const download = getExt(post, 'download', '')
  const github = getExt(post, 'github', '')
  const docs = getExt(post, 'docs', '')

  if (!post) return <Layout404 />

  return (
    <section className='kejilion-shell py-10'>
      <div className='mb-7'>
        <div className='mb-4 flex flex-wrap gap-2'>
          {post.category && <TagPill>{post.category}</TagPill>}
          {getExt(post, 'status') && <TagPill>{getExt(post, 'status')}</TagPill>}
          {getExt(post, 'version') && <TagPill>{`v${getExt(post, 'version')}`}</TagPill>}
        </div>
        <h1 className='max-w-4xl text-3xl font-semibold leading-tight text-[#17211c] dark:text-[#ecf5ef] md:text-5xl'>
          {post.title}
        </h1>
        {post.summary && (
          <p className='mt-4 max-w-3xl text-base leading-8 text-[#5d6f65] dark:text-[#a8bbb0]'>
            {post.summary}
          </p>
        )}
        <div className='mt-6 flex flex-wrap gap-2'>
          <ActionLink href={download} icon='fa-solid fa-download' label='下载' primary />
          <ActionLink href={docs} icon='fa-regular fa-file-lines' label='文档' />
          <ActionLink href={github} icon='fa-brands fa-github' label='GitHub' />
        </div>
      </div>

      {lock ? (
        <PasswordPanel validPassword={validPassword} />
      ) : (
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]'>
          <article className='kejilion-card rounded-md p-5 md:p-7'>
            <div id='article-wrapper'>
              <NotionPage post={post} />
            </div>
          </article>
          <aside className='space-y-4'>
            <div className='kejilion-card rounded-md p-5'>
              <h2 className='text-sm font-semibold uppercase tracking-[0.16em] text-[#1f7f64] dark:text-[#72d4b1]'>
                Meta
              </h2>
              <div className='mt-4 space-y-3 text-sm text-[#5d6f65] dark:text-[#a8bbb0]'>
                {post.publishDay && (
                  <div className='flex justify-between gap-3'>
                    <span>发布</span>
                    <span>{post.publishDay}</span>
                  </div>
                )}
                {post.lastEditedDay && (
                  <div className='flex justify-between gap-3'>
                    <span>更新</span>
                    <span>{post.lastEditedDay}</span>
                  </div>
                )}
                {getExt(post, 'platform') && (
                  <div className='flex justify-between gap-3'>
                    <span>平台</span>
                    <span>{getExt(post, 'platform')}</span>
                  </div>
                )}
              </div>
            </div>
            {tags.length > 0 && (
              <div className='kejilion-card rounded-md p-5'>
                <h2 className='mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1f7f64] dark:text-[#72d4b1]'>
                  Tags
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {tags.map(tag => (
                    <TagPill key={tag}>{tag}</TagPill>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </section>
  )
}

const PasswordPanel = ({ validPassword }) => {
  const submitPassword = () => {
    const input = document.getElementById('kejilion-password')
    const error = document.getElementById('kejilion-password-error')
    if (!validPassword(input?.value) && error) {
      error.innerText = '密码不正确'
    }
  }

  return (
    <div className='kejilion-card mx-auto max-w-md rounded-md p-6'>
      <h2 className='text-lg font-semibold text-[#17211c] dark:text-[#ecf5ef]'>页面已加密</h2>
      <div className='mt-4 flex overflow-hidden rounded-md border border-black/10 dark:border-white/10'>
        <input
          id='kejilion-password'
          type='password'
          className='min-w-0 flex-1 bg-white px-3 py-2 text-sm text-[#17211c] outline-none dark:bg-black dark:text-[#ecf5ef]'
          onKeyDown={event => {
            if (event.key === 'Enter') submitPassword()
          }}
        />
        <button
          type='button'
          onClick={submitPassword}
          className='bg-[#1f7f64] px-4 text-sm font-medium text-white'>
          解锁
        </button>
      </div>
      <div id='kejilion-password-error' className='mt-3 text-sm text-[#c5442f]' />
    </div>
  )
}

const LayoutCategoryIndex = props => {
  const categories = props.categoryOptions || []
  return (
    <section className='kejilion-shell py-10'>
      <SectionHeading eyebrow='Categories' title='分类' description='按内容类型浏览项目、文档和更新记录。' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {categories.map(category => (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            className='kejilion-card kejilion-focus kejilion-link rounded-md p-5'>
            <div className='text-lg font-semibold text-[#17211c] dark:text-[#ecf5ef]'>{category.name}</div>
            <div className='mt-2 text-sm text-[#5d6f65] dark:text-[#a8bbb0]'>{category.count} 个条目</div>
          </SmartLink>
        ))}
      </div>
    </section>
  )
}

const LayoutTagIndex = props => {
  const tags = props.tagOptions || []
  return (
    <section className='kejilion-shell py-10'>
      <SectionHeading eyebrow='Tags' title='标签' description='按技术栈和主题浏览内容。' />
      <div className='flex flex-wrap gap-3'>
        {tags.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className='kejilion-focus kejilion-link rounded-full border border-black/10 px-4 py-2 text-sm dark:border-white/10'>
            {tag.name}
            {tag.count ? ` (${tag.count})` : ''}
          </SmartLink>
        ))}
      </div>
    </section>
  )
}

const Layout404 = () => (
  <section className='kejilion-shell py-20'>
    <div className='max-w-xl'>
      <div className='text-sm font-semibold uppercase tracking-[0.16em] text-[#1f7f64] dark:text-[#72d4b1]'>
        404
      </div>
      <h1 className='mt-3 text-4xl font-semibold text-[#17211c] dark:text-[#ecf5ef]'>页面不存在</h1>
      <p className='mt-4 text-sm leading-7 text-[#5d6f65] dark:text-[#a8bbb0]'>
        这个地址暂时没有对应内容。
      </p>
      <div className='mt-6'>
        <ActionLink href='/' icon='fa-solid fa-arrow-left' label='回到首页' primary />
      </div>
    </div>
  </section>
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
