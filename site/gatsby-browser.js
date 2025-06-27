// gatsby-browser.js
exports.onClientEntry = () => {
  const style = document.createElement('style')
  style.innerHTML = `
    @media screen and (max-width: 768px) {
      .topnav-container {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
      }
      
      .topnav-container > div {
        margin-bottom: 0 !important;
      }
      
      .topnav-flex {
        margin-bottom: 0 !important;
      }
      
      .topnav-flex > div {
        margin-bottom: 0 !important;
      }
      
      .topnav-container {
        min-height: 36px;
      }
      
      .topnav-flex {
        flex-direction: row !important;
      }
      
      .topnav-flex > *:first-child {
        margin-bottom: 0 !important;
      }
    }
  `
  document.head.appendChild(style)
}