import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    colors: {
      primary: '#6200ee',
      accent: '#03dac4',
      background: '#f6f6f6',
      surface: '#FFFFFF',
      error: '#B00020',
      text: '#000000',
      onBackground: '#000000',
      onSurface: '#000000',
      placeholder: 'rgba(0,0,0,0.54)',
      disabled: 'rgba(0,0,0,0.26)',
    },
  },
  dark: true,
};
