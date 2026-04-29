const Style = () => {
  return <style jsx global>{`
    #theme-kejilion-tools {
      background:
        linear-gradient(180deg, rgba(243, 247, 245, 0.96), rgba(255, 255, 255, 0.98) 36rem),
        #ffffff;
      color: #17211c;
    }

    .dark #theme-kejilion-tools {
      background:
        linear-gradient(180deg, rgba(16, 24, 22, 0.98), rgba(7, 10, 9, 1) 34rem),
        #070a09;
      color: #ecf5ef;
    }

    #theme-kejilion-tools ::selection {
      background: rgba(48, 146, 118, 0.2);
    }

    #theme-kejilion-tools .kejilion-shell {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto;
    }

    #theme-kejilion-tools .notion {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    #theme-kejilion-tools #article-wrapper .notion {
      font-size: 1rem;
      line-height: 1.8;
    }

    #theme-kejilion-tools #article-wrapper .notion-page {
      padding: 0 !important;
    }

    #theme-kejilion-tools #article-wrapper .notion-title {
      display: none;
    }

    #theme-kejilion-tools .kejilion-card {
      border: 1px solid rgba(23, 33, 28, 0.1);
      background: rgba(255, 255, 255, 0.86);
      box-shadow: 0 18px 50px rgba(23, 33, 28, 0.08);
    }

    .dark #theme-kejilion-tools .kejilion-card {
      border-color: rgba(236, 245, 239, 0.1);
      background: rgba(14, 19, 17, 0.86);
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
    }

    #theme-kejilion-tools .kejilion-link {
      text-decoration: none;
      transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }

    #theme-kejilion-tools .kejilion-link:hover {
      color: #1f7f64;
    }

    .dark #theme-kejilion-tools .kejilion-link:hover {
      color: #72d4b1;
    }

    #theme-kejilion-tools .kejilion-focus:focus-visible {
      outline: 2px solid #2c9a79;
      outline-offset: 3px;
    }

    #theme-kejilion-tools .kejilion-tool-visual {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(239, 244, 241, 0.92)),
        repeating-linear-gradient(90deg, rgba(31, 127, 100, 0.08) 0 1px, transparent 1px 32px);
    }

    .dark #theme-kejilion-tools .kejilion-tool-visual {
      background:
        linear-gradient(180deg, rgba(20, 28, 25, 0.92), rgba(10, 15, 13, 0.92)),
        repeating-linear-gradient(90deg, rgba(114, 212, 177, 0.08) 0 1px, transparent 1px 32px);
    }
  `}</style>
}

export { Style }
