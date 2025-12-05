module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@widgets': '@elegantstack/flow-ui-widgets/src'
        },
        extensions: ['js', 'jsx']
      }
    }
  ]
}
