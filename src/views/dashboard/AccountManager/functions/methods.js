exports.getYear = (report) => {
  let date = report['date']
  return Number(date.split('-')[0])
}

const strToDate = (date) => {
  return Number(date.split('-').join(''))
};

exports.strToDate = strToDate

exports.getCurrentReport = (reports) => {
  let sorted = reports.sort(function (a, b) {
    return strToDate(b.date) - strToDate(a.date);
  })
  return sorted[0]
}

exports.getReportAttr = (reports, attr) => {
  if(reports.ly === undefined){
    return [{ly: [], y: []}]
  } else {
    let ly = reports.ly.map(report => {
      return report[attr]
    })
    let y = reports.y.map(report => {
      return report[attr]
    })
    return {y: y, ly: ly}
  }
}

exports.accuYtd = (yearArr, current=false) => {
  if(yearArr === undefined){
    if(current){
      return {office_volume: 0, supreme_volume: 0, office_units: 0, supreme_units: 0}
    } else {
      return []
    }
  } else {
    yearArr = yearArr.sort(function (a, b) {
      return strToDate(a.date) - strToDate(b.date);
    })

    let ytd = []
    let acc = {office_volume: 0, supreme_volume: 0, office_units: 0, supreme_units: 0}

    for (let i = 0; i < yearArr.length; i++) {
      let month = yearArr[i]

      acc.office_volume += month.office_volume
      acc.supreme_volume += month.supreme_volume
      acc.office_units += month.office_units
      acc.supreme_units += month.supreme_units

      let month_ytd = {
        date: month.date,
        account: month.account,
        office_volume: acc.office_volume,
        supreme_volume: acc.supreme_volume,
        office_units: acc.office_units,
        supreme_units: acc.supreme_units,
        market_share_volume: acc.supreme_volume / acc.office_volume,
        market_share_units: acc.supreme_units / acc.office_volume
      }
      ytd.push(month_ytd)
    }

    if(current){
      return ytd.reverse()[0]
    } else {
      return ytd.reverse()
    }
  }
}
