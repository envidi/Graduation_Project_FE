/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    screens: {
      xs: '350px',
      // => @media (min-width: 400px) { ... }
      sm: '600px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1400px'
      // => @media (min-width: 1400px) { ... }
    },
    container: {
      center: true,
      padding: '2rem',
      width: '132rem',
      screens: {
        '2xl': '132rem'
        // => @media (min-width: 1400px) { ... }
      }
    },
    extend: {
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border))',
          calendarBorder: 'var(--calendar-border)',
          borderSocialLink: 'hsl(var(--border-social-link))',
          borderPayment: 'hsl(var(--border-payment))',
          borderProfileContain: 'hsl(var(--border-profile-container))',
        },
        input: 'hsl(var(--input))',
        shadow: {
          card: 'var(--shadow-card)'
        },
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'hsl(var(--background))',
          main: 'hsl(var(--bg-main))',
          innerSection: 'hsl(var(--bg-section-inner))',
          card: 'hsl(var(--bg-collection-card))',
          secondary: 'hsl(var(--bg-secondary))',
          four: 'hsl(var(--bg-third))',
          third: 'hsl(var(--bg-showtime))',
          headerShow: 'hsl(var(--bg-headerShowTime))',
          btnControllerCarousel: 'hsl(var(--button-control-carousel))',
          skeleton: 'var(--bg-skeleton)',
          bgAfter: 'var(--gradient)'
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          movieColor: 'hsl(var(--primary-color-movie))',
          movieColorSecond: 'hsl(var(--secondary-color-movie))',
          nameMovie: 'hsl(var(--text-name-movie-color))',
          infoMovie: 'hsl(var(--text-info-movie-color))',
          cardMovie: 'hsl(var(--text-card-movie-color))',
          locationMovie: 'hsl(var(--text-location-movie-color))',
          white: 'var(--primary-title)',
          textUnderTitle: 'var(--text-under-title)',
          copyright: 'hsl(var(--copy-right-color))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
