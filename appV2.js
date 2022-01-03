class SlotMachine {

    constructor() {
        //Total Possibilities
        this.totalPossibbilities = 100000000;

        //Win Probability
        this.firstAwardProbability      = 0.00000001;
        this.secondAwardProbability     = 0.00000010;
        this.thirdAwardProbability      = 0.00000100;
        this.fourthAwardProbability     = 0.00001000;
        this.fifthAwardProbability      = 0.00010000;
        this.sixthAwardProbability      = 0.01000000;
        this.seventhAwardProbability    = 0.50000000;
        this.loseProbability            = 0.48988889;
        ;

        //Award Multiplier
        this.firstAwardMultiplier = 1000000;
        this.secondAwardMultiplier = 100000;
        this.thirdAwardMultiplier = 10000;
        this.fourthAwardMultiplier = 1000;
        this.fifthAwardMultiplier = 100;
        this.sixthAwardMultiplier = 10;
        this.seventhAwardMultiplier = 1;

        this.firstAwardCard = "&#127765;";
        this.secondAwardCard = "&#129409;";
        this.thirdAwardCard = "&#128176;";
        this.fourthAwardCard = "&#11093;";
        this.fifthAwardCard = "&#11088;";
        this.sixthAwardCard = "&#127770;";
        this.seventhAwardCard = "&#127183;";

        //loses
        this.loses = this.getLoses()

        //ManagerVariables
        this.pool = 100;
        this.numbers = [];
        this.award = 0;
        this.countWins = 0;
        this.countFirstWins = 0;
        this.countSecondWins = 0;
        this.countThirdWins = 0;
        this.countFourthdWins = 0;
        this.countFifthdWins = 0;
        this.countSixthdWins = 0;
        this.countSeventhdWins = 0;
        this.countLoses = 0;
        this.countPlayed = 0;
        this.cards = [];
        this.totalMoney = this.pool;
        this.bestAwardPayed = 0;
        this.minorPool = this.pool;
        this.randomized;
        this.isWinner = "Perdeu";
        this.bet = 0;
        this.totalAward = 0;
    }

    getLoses() {
        return this.getPossibleCombination();
    }
    
    getDefaultBet() {
        return (Math.floor(Math.random() * 1000000) + 1)/100000;
    }

    convertEmoji(arr) {
        let newArr = []
        arr.forEach(element => {
            if(element == 1) {
                newArr.push(this.firstAwardCard)
            }
            if(element == 2) {
                newArr.push(this.secondAwardCard)
            }
            if(element == 3) {
                newArr.push(this.thirdAwardCard)
            }
            if(element == 4) {
                newArr.push(this.fourthAwardCard)
            }
            if(element == 5) {
                newArr.push(this.fifthAwardCard)
            }
            if(element == 6) {
                newArr.push(this.sixthAwardCard)
            }
            if(element == 7) {
                newArr.push(this.seventhAwardCard)
            }
        })
        return newArr;
    }

    getPossibleCombination() {
        let m = []
        for (let i = 1; i <= 7; i++) {
            for (let j = 1; j <= 7; j++) {
                for (let k = 1; k <= 7; k++) {
                    if (i == j && j == k) {
                        continue;
                    }
                    m.push([i, j, k])
                }
            }
        }
        return m;
    }

    rageCalc() {
        return {
            '1loseAwardRage': [
                1,
                this.totalPossibbilities * this.loseProbability
            ],
            '2seventyAwardRage': [
                this.totalPossibbilities * this.loseProbability + 1,

                (this.totalPossibbilities * this.loseProbability) +
                this.totalPossibbilities * this.seventhAwardProbability
            ],
            '3sixthAwardCard': [
                (this.totalPossibbilities * this.loseProbability) +
                this.totalPossibbilities * this.seventhAwardProbability + 1,

                ((this.totalPossibbilities * this.loseProbability) +
                    this.totalPossibbilities * this.seventhAwardProbability)
                + this.totalPossibbilities * this.sixthAwardProbability,
            ],
            '4fifthAwardCard': [
                (((this.totalPossibbilities * this.loseProbability) +
                        this.totalPossibbilities * this.seventhAwardProbability)
                    + this.totalPossibbilities * this.sixthAwardProbability + 1),

                (((this.totalPossibbilities * this.loseProbability) +
                        this.totalPossibbilities * this.seventhAwardProbability)
                    + this.totalPossibbilities * this.sixthAwardProbability) +
                this.totalPossibbilities * this.fifthAwardProbability
            ],
            '5fourthAwardCard': [
                ((((this.totalPossibbilities * this.loseProbability) +
                            this.totalPossibbilities * this.seventhAwardProbability)
                        + this.totalPossibbilities * this.sixthAwardProbability) +
                    this.totalPossibbilities * this.fifthAwardProbability + 1),

                ((((this.totalPossibbilities * this.loseProbability) +
                            this.totalPossibbilities * this.seventhAwardProbability)
                        + this.totalPossibbilities * this.sixthAwardProbability) +
                    this.totalPossibbilities * this.fifthAwardProbability) +
                this.totalPossibbilities * this.fourthAwardProbability

            ],
            '6thirdAwardCard': [
                (((((this.totalPossibbilities * this.loseProbability) +
                                this.totalPossibbilities * this.seventhAwardProbability)
                            + this.totalPossibbilities * this.sixthAwardProbability) +
                        this.totalPossibbilities * this.fifthAwardProbability) +
                    this.totalPossibbilities * this.fourthAwardProbability + 1),

                (((((this.totalPossibbilities * this.loseProbability) +
                                this.totalPossibbilities * this.seventhAwardProbability)
                            + this.totalPossibbilities * this.sixthAwardProbability) +
                        this.totalPossibbilities * this.fifthAwardProbability) +
                    this.totalPossibbilities * this.fourthAwardProbability) +
                this.totalPossibbilities * this.thirdAwardProbability

            ],
            '7secondAwardCard': [
                (((((this.totalPossibbilities * this.loseProbability) +
                                this.totalPossibbilities * this.seventhAwardProbability)
                            + this.totalPossibbilities * this.sixthAwardProbability) +
                        this.totalPossibbilities * this.fifthAwardProbability) +
                    this.totalPossibbilities * this.fourthAwardProbability) +
                this.totalPossibbilities * this.thirdAwardProbability + 1,

                ((((((this.totalPossibbilities * this.loseProbability) +
                                    this.totalPossibbilities * this.seventhAwardProbability)
                                + this.totalPossibbilities * this.sixthAwardProbability) +
                            this.totalPossibbilities * this.fifthAwardProbability) +
                        this.totalPossibbilities * this.fourthAwardProbability) +
                    this.totalPossibbilities * this.thirdAwardProbability) +
                this.totalPossibbilities * this.secondAwardProbability

            ],
            '8firstAward': [
                (((((((this.totalPossibbilities * this.loseProbability) +
                                        this.totalPossibbilities * this.seventhAwardProbability)
                                    + this.totalPossibbilities * this.sixthAwardProbability) +
                                this.totalPossibbilities * this.fifthAwardProbability) +
                            this.totalPossibbilities * this.fourthAwardProbability) +
                        this.totalPossibbilities * this.thirdAwardProbability) +
                    this.totalPossibbilities * this.secondAwardProbability) + 1,

                (((((((this.totalPossibbilities * this.loseProbability) +
                                        this.totalPossibbilities * this.seventhAwardProbability)
                                    + this.totalPossibbilities * this.sixthAwardProbability) +
                                this.totalPossibbilities * this.fifthAwardProbability) +
                            this.totalPossibbilities * this.fourthAwardProbability) +
                        this.totalPossibbilities * this.thirdAwardProbability) +
                    this.totalPossibbilities * this.secondAwardProbability) +

                this.totalPossibbilities * this.firstAwardProbability
            ],
        }
    }

    rageDiff() {
        let rage = this.rageCalc()
        return {
            '1loseAwardRage': rage['1loseAwardRage'][1] - rage['1loseAwardRage'][0] + 1,
            '2seventyAwardRage': rage['2seventyAwardRage'][1] - rage['2seventyAwardRage'][0] + 1,
            '3sixthAwardCard': rage['3sixthAwardCard'][1] - rage['3sixthAwardCard'][0] + 1,
            '4fifthAwardCard': rage['4fifthAwardCard'][1] - rage['4fifthAwardCard'][0] + 1,
            '5fourthAwardCard': rage['5fourthAwardCard'][1] - rage['5fourthAwardCard'][0] + 1,
            '6thirdAwardCard': rage['6thirdAwardCard'][1] - rage['6thirdAwardCard'][0] + 1,
            '7secondAwardCard': rage['7secondAwardCard'][1] - rage['7secondAwardCard'][0] + 1,
            '8firstAward': rage['8firstAward'][1] - rage['8firstAward'][0] + 1
        }
    }

    randomize() {
        return Math.floor(Math.random() * this.totalPossibbilities) + 1;
    }

    roll() {
        let randomized = this.randomize();
        let rage = this.rageCalc();
        let numbers;
        let award;
        let index;
        let bet = this.getDefaultBet();
        // console.log(randomized)
        if (randomized >= rage["2seventyAwardRage"][0] && randomized <= rage["2seventyAwardRage"][1]) {
            this.countSeventhdWins++
            award = bet * this.seventhAwardMultiplier;
            numbers = [7, 7, 7];
        }
        if (randomized >= rage["1loseAwardRage"][0] && randomized <= rage["1loseAwardRage"][1]) {
            award = 0;
            index = (Math.floor(Math.random() * 336));
            numbers = this.getLoses()[index];
            // console.log(award, numbers, randomized, index, this.getLoses())
        }
        if (randomized >= rage["3sixthAwardCard"][0] && randomized <= rage["3sixthAwardCard"][1]) {
            this.countSixthdWins++
            award = bet * this.sixthAwardMultiplier;
            numbers = [6, 6, 6];
        }
        if (randomized >= rage["4fifthAwardCard"][0] && randomized <= rage["4fifthAwardCard"][1]) {
            this.countFifthdWins++
            award = bet * this.fifthAwardMultiplier;
            numbers = [5, 5, 5];
        }
        if (randomized >= rage["5fourthAwardCard"][0] && randomized <= rage["5fourthAwardCard"][1]) {
            this.countFourthdWins++
            award = bet * this.fourthAwardMultiplier;
            numbers = [4, 4, 4];
        }
        if (randomized >= rage["6thirdAwardCard"][0] && randomized <= rage["6thirdAwardCard"][1]) {
            this.countThirdWins++
            award = bet * this.thirdAwardMultiplier;
            numbers = [3, 3, 3];
        }
        if (randomized >= rage["7secondAwardCard"][0] && randomized <= rage["7secondAwardCard"][1]) {
            this.countSecondWins++
            award = bet * this.secondAwardMultiplier;
            numbers = [2, 2, 2];
        }
        if (randomized >= rage["8firstAward"][0] && randomized <= rage["8firstAward"][1]) {
            this.countFirstWins++
            award = bet * this.firstAwardMultiplier;
            numbers = [1, 1, 1];
        }

        this.numbers = numbers;
        this.randomized = randomized;
        if (award > 0) {
            this.countWins++;
            this.isWinner = "Ganhou";
        } else {
            this.countLoses++;
            this.isWinner = "Perdeu";
        }
        this.bet = bet
        this.pool = this.pool - award + bet;
        this.award = award;
        this.totalAward += award;
        this.countPlayed++
        this.totalMoney += bet;
        if(award > this.bestAwardPayed){
            this.bestAwardPayed = award;
        }
        if(this.pool < this.minorPool) {
            this.minorPool = this.pool
        }
        this.cards = this.convertEmoji(numbers)
    }
}

let line;
let obj = new SlotMachine();
for (let i = 1; i <= 1000000000; i++) {
    let roll = obj.roll();
    if (i%100000 == 0) {
        line = {
            '#': i,
            'pool': obj.pool,
            'numbers': obj.numbers,
            'award': obj.award,
            'countWins': obj.countWins,
            'countFirstWins': obj.countFirstWins,
            'countSecondWins': obj.countSecondWins,
            'countThirdWins': obj.countThirdWins,
            'countFourthdWins': obj.countFourthdWins,
            'countFifthdWins': obj.countFifthdWins,
            'countSixthdWins': obj.countSixthdWins,
            'countSeventhdWins': obj.countSeventhdWins,
            'countLoses': obj.countLoses,
            'countPlayed': obj.countPlayed,
            'cards': obj.cards,
            'totalMoney': obj.totalMoney,
            'bestAwardPayed': obj.bestAwardPayed,
            'minorPool': obj.minorPool,
            'randomized': obj.randomized,
            'isWinner': obj.isWinner,
            'totalAward': obj.totalAward,
            'bet': obj.bet,
        }
        console.log(line);
    }
}

// var obj = new SlotMachine();
//
//
// $(document).ready(function () {
//     let dataSet = [];
//
//     let line;
//     let roll;
//
//     for (let i = 1; i <= 1000000000; i++) {
//         let roll = obj.roll();
//         if (i%1000 == 0) {
//             line = [
//                 i,//#
//                 obj.numbers,
//                 obj.cards,
//                 obj.randomized,
//                 obj.isWinner,
//                 obj.award.toFixed(2),
//                 obj.totalAward.toFixed(2),
//                 obj.pool.toFixed(2),
//                 obj.totalMoney.toFixed(2),
//                 obj.bestAwardPayed.toFixed(2),
//                 obj.minorPool.toFixed(2),
//                 obj.countSeventhdWins,
//                 obj.countSixthdWins,
//                 obj.countFifthdWins,
//                 obj.countFourthdWins,
//                 obj.countThirdWins,
//                 obj.countSecondWins,
//                 obj.countFirstWins,
//                 obj.countLoses,
//                 obj.countPlayed,
//                 obj.countWins,
//             ]
//             dataSet.push(line)
//         }
//     }
//
//     $('#myTable').DataTable({
//         data: dataSet,
//     });
// });



