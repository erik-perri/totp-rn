import {UnistylesRegistry} from 'react-native-unistyles';

const colors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  red: {
    100: '#fee2e2',
    200: '#fecaca',
    800: '#991b1b',
  },
} as const;

const fontSize = {
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
} as const;

const lightTheme = {
  colors: {
    text: colors.slate[800],
    textAlt: colors.slate[500],
    background: colors.slate[50],
    alertBox: {
      error: {
        background: colors.red[200],
        text: colors.red[800],
        textAlt: colors.slate[500],
      },
      info: {
        background: colors.slate[200],
        text: colors.slate[800],
        textAlt: colors.slate[500],
      },
    },
    authenticatorRow: {
      base: {
        background: colors.slate[100],
      },
      pressed: {
        background: colors.slate[200],
      },
    },
    backdrop: {
      background: colors.slate[950],
    },
    button: {
      solid: {
        enabled: {
          background: colors.slate[600],
          text: colors.slate[50],
        },
        disabled: {
          background: colors.slate[200],
          text: colors.slate[400],
        },
        pressed: {
          background: colors.slate[800],
          text: colors.slate[50],
        },
      },
      ghost: {
        enabled: {
          background: 'transparent',
          text: colors.slate[800],
        },
        disabled: {
          background: 'transparent',
          text: colors.slate[400],
        },
        pressed: {
          background: colors.slate[200],
          text: colors.slate[800],
        },
      },
    },
    cameraOverlay: {
      button: {
        base: {
          background: `${colors.slate[500]}44`,
          text: colors.slate[800],
        },
        pressed: {
          background: `${colors.slate[500]}66`,
          text: colors.slate[800],
        },
      },
    },
    countdownBar: {
      background: colors.slate[500],
    },
    header: {
      background: colors.slate[50],
      border: colors.slate[300],
    },
    input: {
      border: colors.slate[300],
      text: colors.slate[800],
    },
    radio: {
      base: {
        border: colors.slate[200],
        background: colors.slate[100],
        text: colors.slate[800],
      },
      selected: {
        border: colors.slate[400],
        background: colors.slate[200],
        text: colors.slate[800],
      },
      pressed: {
        border: colors.slate[500],
        background: colors.slate[200],
        text: colors.slate[800],
      },
    },
    selectBox: {
      base: {
        border: colors.slate[300],
        background: colors.slate[50],
      },
      pressed: {
        border: colors.slate[500],
        background: colors.slate[100],
      },
    },
    well: {
      border: colors.slate[200],
      background: colors.slate[50],
    },
  },
  fontSize,
} as const;

const darkTheme = {
  colors: {
    text: colors.slate[50],
    textAlt: colors.slate[400],
    background: colors.slate[900],
    alertBox: {
      error: {
        background: colors.red[800],
        text: colors.red[100],
        textAlt: colors.slate[300],
      },
      info: {
        background: colors.slate[800],
        text: colors.slate[200],
        textAlt: colors.slate[400],
      },
    },
    authenticatorRow: {
      base: {
        background: colors.slate[700],
      },
      pressed: {
        background: colors.slate[600],
      },
    },
    backdrop: {
      background: colors.slate[950],
    },
    button: {
      solid: {
        enabled: {
          background: colors.slate[600],
          text: colors.slate[50],
        },
        disabled: {
          background: colors.slate[200],
          text: colors.slate[400],
        },
        pressed: {
          background: colors.slate[400],
          text: colors.slate[50],
        },
      },
      ghost: {
        enabled: {
          background: 'transparent',
          text: colors.slate[50],
        },
        disabled: {
          background: 'transparent',
          text: colors.slate[400],
        },
        pressed: {
          background: colors.slate[600],
          text: colors.slate[50],
        },
      },
    },
    cameraOverlay: {
      button: {
        base: {
          background: `${colors.slate[800]}66`,
          text: colors.slate[50],
        },
        pressed: {
          background: `${colors.slate[800]}88`,
          text: colors.slate[50],
        },
      },
    },
    countdownBar: {
      background: colors.slate[500],
    },
    header: {
      background: colors.slate[900],
      border: colors.slate[700],
    },
    input: {
      border: colors.slate[300],
      text: colors.slate[50],
    },
    radio: {
      base: {
        border: colors.slate[700],
        background: colors.slate[800],
        text: colors.slate[50],
      },
      selected: {
        border: colors.slate[500],
        background: colors.slate[600],
        text: colors.slate[50],
      },
      pressed: {
        border: colors.slate[400],
        background: colors.slate[600],
        text: colors.slate[50],
      },
    },
    selectBox: {
      base: {
        border: colors.slate[300],
        background: colors.slate[900],
      },
      pressed: {
        border: colors.slate[300],
        background: colors.slate[800],
      },
    },
    well: {
      border: colors.slate[600],
      background: colors.slate[900],
    },
  },
  fontSize,
} as const;

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
}).addConfig({
  adaptiveThemes: true,
});
