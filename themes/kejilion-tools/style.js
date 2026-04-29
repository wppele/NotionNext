const Style = () => {
  return <style jsx global>{`
    #theme-kejilion-tools {
      min-height: 100vh;
      background: #ffffff;
      color: #1f2933;
      font-size: 16px;
    }

    .dark #theme-kejilion-tools {
      background: #111111;
      color: #eeeeee;
    }

    #theme-kejilion-tools .kt-shell {
      width: min(720px, calc(100% - 32px));
      margin: 0 auto;
    }

    #theme-kejilion-tools .kt-link {
      color: inherit;
      text-decoration: none;
      transition: color 140ms ease, border-color 140ms ease;
    }

    #theme-kejilion-tools .kt-link:hover {
      color: #2563eb;
    }

    .dark #theme-kejilion-tools .kt-link:hover {
      color: #8ab4ff;
    }

    #theme-kejilion-tools .kt-focus:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 3px;
    }

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
  `}</style>
}

export { Style }
