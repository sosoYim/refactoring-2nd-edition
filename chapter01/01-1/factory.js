import { PerformanceCalculator } from "./PerformanceCalculator";

export function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type){
        case 'tragedy': return new TragedyCalculator(aPerformance, aPlay);
        case 'comedy': return new ComedyCalculator(aPerformance, aPlay);
        default: throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
}

class TragedyCalculator extends PerformanceCalculator{
    // get amount() {
    // }
}

class ComedyCalculator extends PerformanceCalculator{
    // get amount() {
    // }
}