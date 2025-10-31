// gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// If the above doesn't work, try this instead:
require("dotenv").config({
  path: `.env.development`,
})

const fontFile = require('./src/@elegantstack/solid-ui-theme/typography-fonts.json')


module.exports = {
  pathPrefix: `/ttad`,
  plugins: [    
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Geologica', 'sans-serif']
        },
      display: 'auto'
      }
    },  
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'YOUR_GA_TRACKING_ID', // Replace with your GA ID
          cookieName: 'gatsby-gdpr-google-analytics',
          anonymize: true,
          allowAdFeatures: false
        },
        googleTagManager: {
          trackingId: 'YOUR_GTM_ID', // Optional: Replace with your GTM ID
          cookieName: 'gatsby-gdpr-google-tagmanager',
          dataLayerName: 'dataLayer',
        },
        facebookPixel: {
          pixelId: 'YOUR_FB_PIXEL_ID', // Optional: Replace with your FB Pixel ID
          cookieName: 'gatsby-gdpr-facebook-pixel',
        },
        // Define the development environment
        environments: ['production', 'development']
      },
    },    
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: false,
        colorMode: false,
        fonts: fontFile.fonts
      }
    },
    {
      // ATTENTION: Match the theme name with the theme you installed
      resolve: '@elegantstack/gatsby-theme-flexiblog-news',
      options: {
        // ATTENTION: Blog will be created on this path
        basePath: '/blog/',
        //siteUrl: process.env.URL || process.env.VERCEL_URL,
        siteUrl: 'https://cane.gr/ttad',
        darkMode: false,
        homePostsPerPage: 6,
        collectionPostsPerPage: 6
      }
    },
        {
      resolve: 'gatsby-plugin-sitemap'
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        //host: 'https://cane.gr/ttad',
        //sitemap: 'https://cane.gr/ttad/sitemap-0.xml',
        host: 'https://thetruthaboutdogs.gr',
        sitemap: 'https://thetruthaboutdogs.gr/sitemap-0.xml',        
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        //siteUrl: `https://cane.gr/ttad`,
        siteUrl: `https://thetruthaboutdogs.gr/ttad`,
      },
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    //General Site Metadata
    title: 'Cane Sentio - Dog Boarding Training Behavior',
    name: 'CaneSentio',
    description: 'Cane Sentio Dev Site',
    siteUrl: 'https://thetruthaboutdogs.gr',
    address: 'Δρυμός, Θεσσαλονίκη',
    email: 'info@cane.gr',
    phone: '+30 2311 115099',

    //Site Social Media Links
    social: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/canesentio'
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com/canesentio'
      },
      {
        name: 'TikTok',
        url: 'https://tiktok.com/@canesentio'
      }
    ],

    //Header Menu Items
    headerMenu: [
      {
        name: 'Αρχική',
        slug: '/'
      },
      {
        name: 'Η Ομάδα μας',
        slug: '/authors'
      },
      {
        name: 'Επικοινωνία',
        slug: '/contact'
      }
    ],

    //Footer Menu Items (2 Sets)
    footerMenu: [
      {
        title: 'Πληροφορίες',
        items: [
          {
            name: 'Δρυμός, Θεσσαλονίκη',
            slug: 'https://maps.app.goo.gl/zYsHP9Ksg2psrjoU7'
          },
          {
            name: '+30 2311115099',
            slug: 'tel:+306983912430'
          },
          {
            name: 'info@cane.gr',
            slug: 'mailto:info@cane.gr'
          }
        ]
      },       
      {
        title: 'Σύνδεσμοι',
        items: [
          {
            name: 'Αρχική',
            slug: '/'
          },
          {
            name: 'Άρθρα',
            slug: '/blog'
          },
          {
            name: 'Επικοινωνία',
            slug: '/contact'
          }
        ]
      },
      {
        title: 'Νομικό Περιεχόμενο',
        items: [
          {
            name: 'Πολιτική Απορρήτου',
            slug: '/privacy'
          },
          {
            name: 'Ρυθμίσεις Cookies',
            slug: '/#cookie-policy'
          },
          {
            name: 'Όροι Χρήσης',
            slug: '/termsofuse'
          }
        ]
      }    
    ]
  }
}
