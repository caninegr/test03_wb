const fontFile = require('./src/@elegantstack/solid-ui-theme/typography-fonts.json')

module.exports = {
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
        siteUrl: process.env.URL || process.env.VERCEL_URL,
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
        host: 'https://thetruthaboutdogs.gr',
        sitemap: 'https://thetruthaboutdogs.gr/sitemap-0.xml',
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://thetruthaboutdogs.gr`,
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
        name: 'Github',
        url: 'https://github.com/gatsbyjs'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/gatsbyjs'
      },
      {
        name: 'Instagram',
        url: 'https://github.com/gatsbyjs'
      }
    ],

    //Header Menu Items
    headerMenu: [
      {
        name: 'Home',
        slug: '/'
      },
      {
        name: 'Our Team',
        slug: '/authors'
      },
      {
        name: 'Contact',
        slug: '/contact'
      }
    ],

    //Footer Menu Items (2 Sets)
    footerMenu: [
      {
        title: 'Σύνδεσμοι',
        items: [
          {
            name: 'Advertise with us',
            slug: '/contact'
          },
          {
            name: 'About Us',
            slug: '/about'
          },
          {
            name: 'Contact Us',
            slug: '/contact'
          }
        ]
      },
      {
        title: 'Legal Stuff',
        items: [
          {
            name: 'Privacy Notice',
            slug: '/'
          },
          {
            name: 'Cookie Policy',
            slug: '/'
          },
          {
            name: 'Terms Of Use',
            slug: '/'
          }
        ]
      }
    ]
  }
}
