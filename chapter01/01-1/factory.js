import { PerformanceCalculator } from "./PerformanceCalculator.js";

export function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type){
        case 'tragedy': return new TragedyCalculator(aPerformance, aPlay);
        case 'comedy': return new ComedyCalculator(aPerformance, aPlay);
        default: throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
}

class TragedyCalculator extends PerformanceCalculator{
    get amount() {
        let result = 0;
        switch(this.play.type) {
            case 'tragedy': {
                result = 40_000;
                if (this.performance.audience > 30) {
                  result += 1_000 * (this.performance.audience - 30);
                }
                return result
            }
            case 'comedy': {
                throw '오류 발생';
            }
            default: throw new Error(`알 수 없는 장르: ${this.play.type}`);
        }
        
    }
}

class ComedyCalculator extends PerformanceCalculator{
    get amount() {
        let result = 0;
        switch(this.play.type){
            case 'tragedy': throw '오류 발생';
            case 'comedy': {
                result = 30_000;
      
                if (this.performance.audience > 20) {
                  result += 10_000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                return result
            }
            default: throw new Error(`알 수 없는 장르: ${this.play.type}`);
        }
    }

    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}