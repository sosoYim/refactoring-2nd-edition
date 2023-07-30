import { createPerformanceCalculator } from './factory.js'

export function createStatement(invoice, plays){
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }
  
  function playFor(aPerformance){
    return plays[aPerformance.playID];
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