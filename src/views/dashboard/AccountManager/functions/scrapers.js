const fetchSupremeVault = () => {
  let json = null
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  fetch(proxyUrl + 'https://eyxiglvod6.execute-api.us-east-2.amazonaws.com/scrape_vault')
    .then(res => res.json())
    .then(res => json = res)
    .then(() => console.log('Supreme Vault Scraped Successfully.'))
    .catch(err => console.log(err))

  return json
}

export {fetchSupremeVault}
