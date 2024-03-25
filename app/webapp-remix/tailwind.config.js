/** @type {import('tailwindcss').Config} */

const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const tailwindConfig = {
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xlg: '3rem',
      },
    },
    screens: {
      sm: '378px',
      md: '640px',
      lg: '1280px',
      xlg: '1920px',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: '#FFFFFF',
        grey: {
          25: '#F6F6F6',
          50: '#ECECEC',
          100: '#DADADA',
          200: '#B4B4B4',
          300: '#8F8F8F',
          400: '#696969',
          500: '#444444',
          600: '#3A3A3A',
          700: '#303030',
          800: '#262626',
          900: '#1C1C1C',
          950: '#121212',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          bone: '#F7F3E8',
          'cool-grey': '#6B7280',
          orange: '#FE7B32',
          'orange-hover': '#FF6E1E',
          'dark-green': '#24363E',
          brown: '#A99C97',
          navy: '#182328',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: '#141B1F',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        mobilexl: '80px',
        xl: '440px',
        mobilel: '64px',
        l: '330px',
        mobilem: '40px',
        m: '220px',
        mobiles: '24px',
        s: '110px',
        xs: '55px',
      },
      backgroundImage: {
        'homepage-collab-bg':
          "url('../public/images/homepage/HowItWorks/image-collab-bg.jpg')",
        'homepage-landing-bg': "url('../public/images/homepage/homepage.png')",
        orangearrow: 'url("../public/images/icons/icon-rightarrow-orange.svg")',
        'fpass-login-desktop':
          'url("../public/images/login/login-bg-desktop.jpg")',
        'fpass-login-tablet':
          'url("../public/images/login/login-bg-tablet.jpg")',
        'fpass-login-mobile':
          'url("../public/images/login/login-bg-mobile.jpg")',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        'neue-plak': ['Neue Plak', 'sans-serif'],
        'neue-plak-extra-condense': ['Neue Plak Extra Condense', 'sans-serif'],
        'neue-plak-bold-condense': ['Neue Plak Bold Condense', 'sans-serif'],
        'neue-plak-bold': ['Neue Plak Bold', 'sans-serif'],
        parabole: ['Parabole', 'sans-serif'],
        'helvetica-neue': ['Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        '10xl': '160px',
        '11xl': '190px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'left-to-right': {
          '0%': { transform: 'translateX(-8px)' },
          '50%': { transform: 'translateX(8px)' },
          '100%': { transform: 'translateX(-8px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.5s ease-in-out',
        'accordion-up': 'accordion-up 0.5s ease-in-out',
        spin: 'spin 30s linear infinite',
        'left-to-right': 'left-to-right 2.5s ease-in-out infinite',
      },
      content: {
        orangearrow: 'url("../public/images/icons/icon-rightarrow-orange.svg")',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default tailwindConfig;
