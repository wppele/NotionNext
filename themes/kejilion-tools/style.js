const Style = () => {
  return (
    <style jsx global>{`
      #theme-kejilion-tools {
        min-height: 100vh;
        background: #f5f5f5;
        color: #1a1a1a;
        font-size: 16px;
        line-height: 1.6;
      }

      .dark #theme-kejilion-tools {
        background: #0f0f0f;
        color: #e8e8e8;
      }

      /* ── layout ── */
      #theme-kejilion-tools .kt-shell {
        width: min(1180px, calc(100% - 40px));
        margin: 0 auto;
      }
      @media (max-width: 640px) {
        #theme-kejilion-tools {
          font-size: 15px;
        }
        #theme-kejilion-tools .kt-shell {
          width: min(100% - 28px, 1180px);
        }
      }

      /* ── links ── */
      #theme-kejilion-tools .kt-link {
        color: inherit;
        text-decoration: none;
        transition: color 150ms ease, opacity 150ms ease;
      }
      #theme-kejilion-tools .kt-link:hover {
        color: #6366f1;
      }
      .dark #theme-kejilion-tools .kt-link:hover {
        color: #a5b4fc;
      }

      /* ── focus ── */
      #theme-kejilion-tools .kt-focus:focus-visible {
        outline: 2px solid #6366f1;
        outline-offset: 3px;
        border-radius: 3px;
      }

      /* ── header ── */
      #theme-kejilion-tools .kt-header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(245, 245, 245, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      }
      .dark #theme-kejilion-tools .kt-header {
        background: rgba(15, 15, 15, 0.85);
        border-bottom-color: rgba(255, 255, 255, 0.07);
      }
      #theme-kejilion-tools .kt-brand {
        min-width: 0;
        max-width: min(58vw, 360px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      #theme-kejilion-tools .kt-icon-btn {
        flex: 0 0 auto;
      }

      /* ── nav pill ── */
      #theme-kejilion-tools .kt-nav-pill {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        padding: 3px;
      }
      @media (max-width: 640px) {
        #theme-kejilion-tools .kt-nav-pill {
          display: none !important;
        }
      }
      .dark #theme-kejilion-tools .kt-nav-pill {
        background: rgba(255, 255, 255, 0.06);
      }
      #theme-kejilion-tools .kt-nav-pill a,
      #theme-kejilion-tools .kt-nav-pill button {
        padding: 4px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 500;
        color: #555;
        transition: background 150ms ease, color 150ms ease;
        white-space: nowrap;
      }
      .dark #theme-kejilion-tools .kt-nav-pill a,
      .dark #theme-kejilion-tools .kt-nav-pill button {
        color: #aaa;
      }
      #theme-kejilion-tools .kt-nav-pill a:hover,
      #theme-kejilion-tools .kt-nav-pill button:hover {
        color: #1a1a1a;
        background: rgba(0, 0, 0, 0.06);
      }
      .dark #theme-kejilion-tools .kt-nav-pill a:hover,
      .dark #theme-kejilion-tools .kt-nav-pill button:hover {
        color: #e8e8e8;
        background: rgba(255, 255, 255, 0.08);
      }
      #theme-kejilion-tools .kt-nav-pill .kt-nav-active {
        background: #fff;
        color: #1a1a1a;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }
      .dark #theme-kejilion-tools .kt-nav-pill .kt-nav-active {
        background: rgba(255, 255, 255, 0.12);
        color: #e8e8e8;
      }

      /* ── mobile nav ── */
      #theme-kejilion-tools .kt-mobile-menu {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        padding: 0 0 12px;
      }
      #theme-kejilion-tools .kt-mobile-link {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.05);
        color: #555;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        transition: background 150ms ease, color 150ms ease;
      }
      .dark #theme-kejilion-tools .kt-mobile-link {
        background: rgba(255, 255, 255, 0.06);
        color: #bbb;
      }
      #theme-kejilion-tools .kt-mobile-link:hover,
      #theme-kejilion-tools .kt-mobile-link.kt-mobile-active {
        background: #fff;
        color: #1a1a1a;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .dark #theme-kejilion-tools .kt-mobile-link:hover,
      .dark #theme-kejilion-tools .kt-mobile-link.kt-mobile-active {
        background: rgba(255, 255, 255, 0.12);
        color: #e8e8e8;
      }

      /* ── hero ── */
      #theme-kejilion-tools .kt-hero-name {
        background: linear-gradient(135deg, #1a1a1a 0%, #555 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .dark #theme-kejilion-tools .kt-hero-name {
        background: linear-gradient(135deg, #fff 0%, #aaa 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* ── avatar ── */
      #theme-kejilion-tools .kt-avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(0, 0, 0, 0.08);
      }
      .dark #theme-kejilion-tools .kt-avatar {
        border-color: rgba(255, 255, 255, 0.1);
      }
      @media (max-width: 640px) {
        #theme-kejilion-tools .kt-avatar {
          width: 60px;
          height: 60px;
        }
      }

      /* ── social icon buttons ── */
      #theme-kejilion-tools .kt-social-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        background: rgba(0, 0, 0, 0.05);
        color: #444;
        transition: background 150ms ease, color 150ms ease;
      }
      .dark #theme-kejilion-tools .kt-social-btn {
        background: rgba(255, 255, 255, 0.07);
        color: #bbb;
      }
      #theme-kejilion-tools .kt-social-btn:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #1a1a1a;
      }
      .dark #theme-kejilion-tools .kt-social-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        color: #e8e8e8;
      }
      @media (max-width: 640px) {
        #theme-kejilion-tools .kt-social-btn {
          min-height: 38px;
          padding: 8px 12px;
        }
      }

      /* ── section heading ── */
      #theme-kejilion-tools .kt-section-title {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #999;
        margin-bottom: 12px;
      }
      .dark #theme-kejilion-tools .kt-section-title {
        color: #666;
      }

      /* ── post card ── */
      #theme-kejilion-tools .kt-card {
        display: block;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.07);
        border-radius: 12px;
        padding: 18px 20px;
        transition: box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease;
      }
      .dark #theme-kejilion-tools .kt-card {
        background: #1a1a1a;
        border-color: rgba(255, 255, 255, 0.07);
      }
      #theme-kejilion-tools .kt-card:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-color: rgba(0, 0, 0, 0.14);
        transform: translateY(-1px);
      }
      .dark #theme-kejilion-tools .kt-card:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        border-color: rgba(255, 255, 255, 0.14);
      }
      @media (max-width: 640px) {
        #theme-kejilion-tools .kt-card {
          border-radius: 14px;
          padding: 16px;
        }
        #theme-kejilion-tools .kt-card:hover {
          transform: none;
        }
      }

      /* ── tag chip ── */
      #theme-kejilion-tools .kt-tag {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 500;
        background: rgba(99, 102, 241, 0.1);
        color: #6366f1;
      }
      .dark #theme-kejilion-tools .kt-tag {
        background: rgba(165, 180, 252, 0.12);
        color: #a5b4fc;
      }

      /* ── action buttons on slug ── */
      #theme-kejilion-tools .kt-action-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        background: #6366f1;
        color: #fff;
        transition: background 150ms ease, opacity 150ms ease;
      }
      #theme-kejilion-tools .kt-action-btn:hover {
        background: #4f46e5;
        color: #fff;
      }
      #theme-kejilion-tools .kt-action-btn.kt-action-ghost {
        background: rgba(0, 0, 0, 0.05);
        color: #444;
      }
      .dark #theme-kejilion-tools .kt-action-btn.kt-action-ghost {
        background: rgba(255, 255, 255, 0.07);
        color: #bbb;
      }
      #theme-kejilion-tools .kt-action-btn.kt-action-ghost:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #1a1a1a;
      }
      .dark #theme-kejilion-tools .kt-action-btn.kt-action-ghost:hover {
        background: rgba(255, 255, 255, 0.12);
        color: #e8e8e8;
      }

      /* ── article layout with TOC ── */
      #theme-kejilion-tools .kt-article-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 40px;
        align-items: start;
      }
      @media (min-width: 900px) {
        #theme-kejilion-tools .kt-article-layout {
          grid-template-columns: minmax(0, 1fr) 220px;
        }
      }

      /* ── TOC ── */
      #theme-kejilion-tools .kt-toc {
        position: sticky;
        top: 72px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        font-size: 12px;
        line-height: 1.7;
        scrollbar-width: none;
      }
      #theme-kejilion-tools .kt-toc::-webkit-scrollbar {
        display: none;
      }
      #theme-kejilion-tools .kt-toc a {
        display: block;
        padding: 2px 0 2px 10px;
        border-left: 2px solid transparent;
        color: #999;
        transition: color 150ms ease, border-color 150ms ease;
        text-decoration: none;
      }
      .dark #theme-kejilion-tools .kt-toc a {
        color: #666;
      }
      #theme-kejilion-tools .kt-toc a:hover,
      #theme-kejilion-tools .kt-toc a.kt-toc-active {
        color: #6366f1;
        border-left-color: #6366f1;
      }
      .dark #theme-kejilion-tools .kt-toc a:hover,
      .dark #theme-kejilion-tools .kt-toc a.kt-toc-active {
        color: #a5b4fc;
        border-left-color: #a5b4fc;
      }
      #theme-kejilion-tools .kt-toc .kt-toc-h3 {
        padding-left: 20px;
      }
      #theme-kejilion-tools .kt-toc .kt-toc-h2 {
        padding-left: 16px;
      }

      /* ── notion content overrides ── */
      #theme-kejilion-tools .notion {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      #theme-kejilion-tools #article-wrapper .notion-page {
        padding: 0 !important;
      }
      #theme-kejilion-tools #article-wrapper .notion-title {
        display: none;
      }
      @media (max-width: 640px) {
        #theme-kejilion-tools #article-wrapper {
          overflow-x: hidden;
        }
        #theme-kejilion-tools #article-wrapper .notion,
        #theme-kejilion-tools #article-wrapper .notion-page,
        #theme-kejilion-tools #article-wrapper .notion-viewport,
        #theme-kejilion-tools #article-wrapper .notion-page-content {
          max-width: 100% !important;
        }
        #theme-kejilion-tools #article-wrapper img,
        #theme-kejilion-tools #article-wrapper video,
        #theme-kejilion-tools #article-wrapper iframe {
          max-width: 100%;
          height: auto;
        }
        #theme-kejilion-tools #article-wrapper pre,
        #theme-kejilion-tools #article-wrapper table {
          max-width: 100%;
          overflow-x: auto;
        }
      }

      /* ── divider ── */
      #theme-kejilion-tools .kt-divider {
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.07);
      }
      .dark #theme-kejilion-tools .kt-divider {
        border-top-color: rgba(255, 255, 255, 0.07);
      }

      /* ── footer ── */
      #theme-kejilion-tools .kt-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.07);
      }
      .dark #theme-kejilion-tools .kt-footer {
        border-top-color: rgba(255, 255, 255, 0.07);
      }
    `}</style>
  )
}

export { Style }
