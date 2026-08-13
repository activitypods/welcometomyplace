import type { ThemeConfig } from 'antd';

/**
 * Antd theme tokens replicating the current brand identity (see the old
 * `frontend/src/config/theme.js` MUI theme): warm orange primary, `Open Sans` body copy
 * (headings get `Chewy` via a scoped CSS rule in `index.css`, since Antd has no separate
 * "heading font" token), and generously-rounded, pill-leaning buttons.
 */
const theme: ThemeConfig = {
  token: {
    colorPrimary: '#FFA500',
    colorInfo: '#FFA500',
    colorLink: '#FFA500',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: 8
  },
  components: {
    Button: {
      controlHeightLG: 48,
      paddingInlineLG: 28,
      fontWeight: 600
    },
    Layout: {
      headerBg: 'transparent',
      bodyBg: '#eaeaea'
    }
  }
};

export default theme;
