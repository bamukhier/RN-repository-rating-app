import {Platform} from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    mainBg: '#e1e4e8',
    repoItemBg: 'white',
    navBarBg: '#24292e',
    langTagBg: '#0366d6'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;