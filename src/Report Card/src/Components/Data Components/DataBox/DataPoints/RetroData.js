import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { DataBox } from '../DataBox';
import { valueKeyText, calculatePercentChange, printPercent, formatPercentAsString } from '../../DataFunctions';
import { TriDataBox } from '../TriDataBox';
import { asUSD } from '../../../../../functions/dataDisplayers';

export default function RetroDataGrid(props) {
  const [finalMonth, setFinalMonth] = useState([])
  const [comparableMonth, setComparableMonth] = useState([])

  // const [cardData, setCardData] = useState([])
  const {data} = props;

  useEffect(() => {
    setFinalMonth(data.filter(x => Number(x['Date'].split(' ')[1]) === 2020).reverse()[0])
    setComparableMonth(data.filter(x => Number(x['Date'].split(' ')[1]) === 2019).reverse()[0])
  })

  let cardData = []
  const targetMetrics = ['Market Share', 'Supreme Volume', 'Office Volume']
  for(let metric of targetMetrics){
    let captions = ['', ''];
    let percentChangeInt = 0;
    let valueKey = metric.includes('Share') ? 'YTD ' + metric + ' Volume' : 'YTD ' + metric


    if (comparableMonth) {
      captions = [finalMonth['Date'], comparableMonth['Date']];
      percentChangeInt = (((finalMonth[valueKey] - comparableMonth[valueKey]) / comparableMonth[valueKey]) * 100).toFixed(0)
    } else if(finalMonth) {
      captions = [finalMonth['Date'], '']
    } else {
      captions = []
    }

    let valueYTD, valueComp
    if(metric.includes('Share')){
      valueYTD = finalMonth && finalMonth[valueKey] ? printPercent(finalMonth[valueKey]) : '0%';
      valueComp = comparableMonth && comparableMonth[valueKey] ? printPercent(comparableMonth[valueKey]) : '';
    } else {
      // valueYTD = finalMonth && finalMonth[valueKey] ? asUSD(finalMonth[valueKey]/1000000).replace('$', "$ ") + 'M' : '$0.00';
      valueYTD = finalMonth && finalMonth[valueKey]
        ?
        finalMonth[valueKey] > 1000000000
          ?
          asUSD(finalMonth[valueKey]/1000000000, 2).replace('$', "$ ") + 'B'
          :
          asUSD(finalMonth[valueKey]/1000000).replace('$', "$ ") + 'M'
        : '$ 0.00'
      valueComp = comparableMonth && comparableMonth[valueKey]
        ?
        comparableMonth[valueKey] > 1000000000
          ?
          asUSD(comparableMonth[valueKey]/1000000000, 2).replace('$', "$ ") + 'B'
          :
        asUSD(comparableMonth[valueKey]/1000000).replace('$', "$ ") + 'M'
        : ''
    }

    if(percentChangeInt && percentChangeInt >=0){
      percentChangeInt = '+' + percentChangeInt
    }
    cardData.push([metric, valueYTD, valueComp, percentChangeInt + '%', captions])
  }


  return (
    <Grid container spacing={1}>
      {cardData.map(card => (
        <Grid item xs={4}>
          <TriDataBox
            title={card[0]}
            valueYTD={card[1]}
            valueComp={card[2]}
            differenceValue={card[3]}
            captions={card[4]}
            period={'2020 Year End'}
            />
        </Grid>
      ))}
    </Grid>

  );
}
