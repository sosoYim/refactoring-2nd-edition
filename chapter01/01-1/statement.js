/**
 * 
 * @param invoice [
  {
    "customer": "BigCo",
    "performances": [
      { "playID": "hamlet", "audience": 55 },
      { "playID": "as-like", "audience": 35 },
      { "playID": "othello", "audience": 40 }
    ]
  }
]
 * @param plays {
  "hamlet": { "name": "Hamlet", "type": "tragedy" },
  "as-like": { "name": "As YOu Like it", "type": "comedy" },
  "othello": { "name": "Othello", "type": "tragedy" }
}
 * @wannabe {
  playID: 'hamlet',
  audience: 55,
  play: { name: 'Hamlet', type: 'tragedy' }
}
{
  playID: 'as-like',
  audience: 35,
  play: { name: 'As YOu Like it', type: 'comedy' }
}
{
  playID: 'othello',
  audience: 40,
  play: { name: 'Othello', type: 'tragedy' }
}
 */

export function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return renderPlainText(statementData, plays)

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }
  
  function playFor(aPerformance){
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case 'tragedy':
        result = 40_000;
  
        if (aPerformance.audience > 30) {
          result += 1_000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30_000;
  
        if (aPerformance.audience > 20) {
          result += 10_000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
  
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ('comedy' === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount,0)
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits,0)
  }
  
}


function renderPlainText(data, plays){  

  
  const usd = (aNumber) => {
   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
    .format(aNumber / 100);
  }
  


  let result = `청구내역 (고객명: ${data.customer})\n`;
  
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name}: ${usd(perf.amount)} ${perf.audience}석\n`;
  }
  
  result += `총액 ${usd(data.totalAmount)}\n`;
  result += `적립 포인트 ${data.totalVolumeCredits}점\n`;

  return result;
}
