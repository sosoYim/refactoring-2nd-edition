export class PerformanceCalculator{
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        let result = 0;
        switch (this.play.type) {
          case 'tragedy':
            result = 40_000;
      
            if (this.performance.audience > 30) {
              result += 1_000 * (this.performance.audience - 30);
            }
            break;
          case 'comedy':
            result = 30_000;
      
            if (this.performance.audience > 20) {
              result += 10_000 + 500 * (this.performance.audience - 20);
            }
            result += 300 * this.performance.audience;
            break;
      
          default:
            throw new Error(`알 수 없는 장르: ${this.play.type}`);
        }
        return result
      }
}