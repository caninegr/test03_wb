const fontFile = require('./src/@elegantstack/solid-ui-theme/typography-fonts.json')

module.exports = {
  plugins: [
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
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Geologica', 'sans-serif']
        }
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    //General Site Metadata
    title: 'Cane Sentio - Dog Boarding Training Behavior',
    name: 'CaneSentio',
    description: 'Cane Sentio Dev Site',
    siteUrl: 'https://thetruthaboutdogs.gr',
    address: 'New York, NY',
    email: 'email@example.com',
    phone: '+1 (888) 888-8888',

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
        title: 'Quick Links',
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
