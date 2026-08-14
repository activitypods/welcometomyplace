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
    // Deliberately not overridden: the only "info"-typed elements in this app are plain
    // Alert banners (draft-mode/join-right/share-right notices, location notes), which are meant
    // to look like the old app's light-blue MUI info alerts, not brand orange.
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
