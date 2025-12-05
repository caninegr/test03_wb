module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@solid-ui-components': '@elegantstack/solid-ui-components/src'
        },
        extensions: ['js', 'jsx']
      }
    }
  ]
}
