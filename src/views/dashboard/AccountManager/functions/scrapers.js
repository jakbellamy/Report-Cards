const fetchSupremeVault = () => {
  let vaultHTML = ''
  fetch('https://supremebest.com/supreme-best/the-vault/')
    .then(res => res.text())
    .then(res => vaultHTML = res)
    .then(() => console.log('Supreme Vault Scraped Successfully.'))
    .catch(err => console.log(err))

  let vaultHTML_chunks = vaultHTML.split('<h3 class="titleSmall">').slice(1)

  let events = []
  for(let chunk of vaultHTML_chunks){
    let event = {
      'Title': chunk.split('</h3>')[0],
      'Date': chunk.split('<h4 class="subtitle color-dividerGray">')[1]?.split('</h4>')[0]
    }
    events.push(event)
  }

  return events.slice(0, 8)
}

export {fetchSupremeVault}
