export class PerformanceCalculator{
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
    }
    
    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ('comedy' === this.play.type) {
            result += Math.floor(this.performance.audience / 5);
        }
        return result;
    }
}