import { extendTheme } from '@chakra-ui/react';

// McKinsey Color Palette
const colors = {
  mckinsey: {
    // Primary McKinsey Navy Blue
    primary: {
      50: '#f0f4f8',
      100: '#d9e6f2', 
      200: '#b3ccde',
      300: '#8db3ca',
      400: '#6799b6',
      500: '#1B365D', // Main McKinsey Navy
      600: '#162d50',
      700: '#112443',
      800: '#0c1b36',
      900: '#071229'
    },
    // McKinsey Accent Colors
    teal: {
      50: '#e6f7f7',
      100: '#b3e6e6',
      200: '#80d4d4',
      300: '#4dc2c2',
      400: '#1ab0b0',
      500: '#009999', // McKinsey Teal
      600: '#007a7a',
      700: '#005c5c',
      800: '#003d3d',
      900: '#001f1f'
    },
    // McKinsey Gray Scale
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    // Accent Colors
    orange: '#FF6B35',
    green: '#2ECC71',
    blue: '#3498DB',
    yellow: '#F1C40F',
    red: '#E74C3C'
  }
};

// McKinsey Typography
const fonts = {
  heading: '"SourceSansPro", "Helvetica Neue", Helvetica, Arial, sans-serif',
  body: '"SourceSansPro", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"SFMono-Regular", "Consolas", "Liberation Mono", "Courier New", monospace'
};

const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px  
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
};

// McKinsey Spacing
const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem'
};

// McKinsey Component Styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: '4px',
      transition: 'all 0.2s',
      _focus: {
        boxShadow: 'none',
      },
    },
    variants: {
      mckinsey: {
        bg: 'mckinsey.primary.500',
        color: 'white',
        _hover: {
          bg: 'mckinsey.primary.600',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(27, 54, 93, 0.2)',
        },
        _active: {
          bg: 'mckinsey.primary.700',
          transform: 'translateY(0)',
        },
      },
      mckinseyOutline: {
        border: '1px solid',
        borderColor: 'mckinsey.primary.500',
        color: 'mckinsey.primary.500',
        bg: 'transparent',
        _hover: {
          bg: 'mckinsey.primary.50',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(27, 54, 93, 0.1)',
        },
      },
      mckinseyTeal: {
        bg: 'mckinsey.teal.500',
        color: 'white',
        _hover: {
          bg: 'mckinsey.teal.600',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0, 153, 153, 0.2)',
        },
      }
    },
    sizes: {
      sm: {
        h: '32px',
        minW: '32px',
        fontSize: 'sm',
        px: '12px',
      },
      md: {
        h: '40px',
        minW: '40px',
        fontSize: 'md',
        px: '16px',
      },
      lg: {
        h: '48px',
        minW: '48px',
        fontSize: 'lg',
        px: '24px',
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'mckinsey.gray.200',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s',
        _hover: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        },
      },
      header: {
        p: '20px',
        pb: '12px',
      },
      body: {
        p: '20px',
        pt: '8px',
      },
      footer: {
        p: '20px',
        pt: '12px',
      },
    },
    variants: {
      mckinsey: {
        container: {
          bg: 'white',
          borderColor: 'mckinsey.gray.200',
          borderLeftWidth: '4px',
          borderLeftColor: 'mckinsey.primary.500',
        },
      },
      mckinseyElevated: {
        container: {
          bg: 'white',
          borderColor: 'transparent',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          _hover: {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: '600',
      color: 'mckinsey.primary.500',
    },
    sizes: {
      xs: {
        fontSize: 'md',
        lineHeight: '1.4',
      },
      sm: {
        fontSize: 'lg',
        lineHeight: '1.4',
      },
      md: {
        fontSize: 'xl',
        lineHeight: '1.3',
      },
      lg: {
        fontSize: '2xl',
        lineHeight: '1.3',
      },
      xl: {
        fontSize: '3xl',
        lineHeight: '1.2',
      },
      '2xl': {
        fontSize: '4xl',
        lineHeight: '1.2',
      },
    },
  },
  Text: {
    baseStyle: {
      color: 'mckinsey.gray.700',
      lineHeight: '1.6',
    },
    variants: {
      mckinseySubtle: {
        color: 'mckinsey.gray.600',
        fontSize: 'sm',
      },
      mckinseyBold: {
        fontWeight: '600',
        color: 'mckinsey.primary.500',
      },
    },
  },
  Badge: {
    baseStyle: {
      textTransform: 'none',
      fontWeight: '600',
      borderRadius: '4px',
      px: '8px',
      py: '2px',
    },
    variants: {
      mckinsey: {
        bg: 'mckinsey.primary.100',
        color: 'mckinsey.primary.700',
      },
      mckinseyTeal: {
        bg: 'mckinsey.teal.100',
        color: 'mckinsey.teal.700',
      },
    },
  },
};

// Global styles
const styles = {
  global: {
    body: {
      bg: 'mckinsey.gray.50',
      color: 'mckinsey.gray.700',
      fontSize: 'md',
      lineHeight: '1.6',
    },
    '*::placeholder': {
      color: 'mckinsey.gray.400',
    },
    '*, *::before, &::after': {
      borderColor: 'mckinsey.gray.200',
    },
  },
};

// Theme configuration
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const mckinseyTheme = extendTheme({
  colors,
  fonts,
  fontSizes,
  space,
  components,
  styles,
  config,
});

export default mckinseyTheme;