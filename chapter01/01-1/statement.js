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
import {createStatement} from './createStatementData.js';

export function statement(invoice, plays) {
  return renderPlainText(createStatement(invoice, plays));
}


function renderPlainText(data){  
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
