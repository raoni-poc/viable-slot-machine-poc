class slotMachine {
    constructor() {
        this.pool = 100;
        this.taxes = 0;
        this.numbers = [];
        this.result = '';
        this.award = 0;
        this.totalAward = 0;
        this.countSmallWins = 0;
        this.countMediumWins = 0;
        this.countBigWins = 0;
        this.countBestWins = 0;
        this.countLoses = 0;
        this.countPlayed = 0;
        this.cards = [];
        this.totalMoney = this.pool;
        this.bestAwardPayed = 0;
        this.minorPool = this.pool;
        this.bestAwardPossible = 0;
    }

    bestAwardCard() {
        return "&#127765;"
    }

    bigAwardCard() {
        return "&#129409;"
    }

    mediumAwardCard() {
        return "&#128176;"
    }

    smallAwardCard() {
        return "&#127822;"
    }

    bestAwardPossibilities() {
        return [1]
    }

    bigAwardPossibilities() {
        return [2, 3, 4, 5]
    }

    mediumAwardPossibilities() {
        return [6, 7, 8, 9, 10, 11, 12, 13]
    }

    smallAwardPossibilities() {
        return [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    }

    rollMath() {
        return Math.floor(Math.random() * 30) + 1;
    }

    roll() {
        this.taxes += this.getPriceDefault() * 0.25;
        this.pool += this.getPriceDefault() * 0.75;
        let numbers = this.rollNumber()
        let cards = [];
        let item;
        for (let i = 0; i < 3; i++) {
            if (this.smallAwardPossibilities().includes(numbers[i])) {
                item = this.smallAwardCard()
            }
            if (this.mediumAwardPossibilities().includes(numbers[i])) {
                item = this.mediumAwardCard()
            }
            if (this.bigAwardPossibilities().includes(numbers[i])) {
                item = this.bigAwardCard()
            }
            if (this.bestAwardPossibilities().includes(numbers[i])) {
                item = this.bestAwardCard()
            }
            cards.push(item);
        }
        this.cards = cards;
        this.setResult();
        return cards;
    }

    rollNumber() {
        return this.numbers = [this.rollMath(), this.rollMath(), this.rollMath()]
    }

    checkIfLose(myArray) {
        return !((this.cards[0] == this.cards[1]) && (this.cards[1] == this.cards[2]));
    }

    setResult() {
        this.award = 0;
        this.countPlayed++
        this.totalMoney += this.getPriceDefault()
        if (this.checkIfLose()) {
            this.result = "Lose !";
            this.countLoses++
            return;
        }
        if (this.smallAwardPossibilities().includes(this.numbers[0]) &&
            this.smallAwardPossibilities().includes(this.numbers[1]) &&
            this.smallAwardPossibilities().includes(this.numbers[2])) {
            this.result = "Small Award " + this.smallAwardCard();
            let award = this.getPriceDefault();
            this.award = award;
            this.pool -= award;
            this.totalAward += award;
            this.countSmallWins++
        }
        if (this.mediumAwardPossibilities().includes(this.numbers[0]) &&
            this.mediumAwardPossibilities().includes(this.numbers[1]) &&
            this.mediumAwardPossibilities().includes(this.numbers[2])) {
            this.result = "Medium Award " + this.mediumAwardCard();
            let award = this.getPriceDefault()*10;
            this.award = award;
            this.pool -= award
            this.totalAward += award;
            this.countMediumWins++
        }
        if (this.bigAwardPossibilities().includes(this.numbers[0]) &&
            this.bigAwardPossibilities().includes(this.numbers[1]) &&
            this.bigAwardPossibilities().includes(this.numbers[2])) {
            this.result = "Big Award " + this.bigAwardCard();
            let award = Math.floor(this.pool / 100);
            this.award = award;
            this.pool -= award;
            this.totalAward += award;
            this.countBigWins++
        }
        if (this.bestAwardPossibilities().includes(this.numbers[0]) &&
            this.bestAwardPossibilities().includes(this.numbers[1]) &&
            this.bestAwardPossibilities().includes(this.numbers[2])) {
            this.result = "Best Award " + this.bestAwardCard();
            let award = this.getBestAward();
            this.award = award;
            this.pool -= award;
            this.totalAward += award;
            this.countBestWins++
        }
        if(this.bestAwardPayed < this.award ) {
            this.bestAwardPayed = this.award
        }
        if(this.minorPool > this.pool ) {
            this.minorPool = this.pool
        }

        if(this.bestAwardPossible < this.getBestAward() ) {
            this.bestAwardPossible = this.getBestAward()
        }

    }

    getPriceDefault() {
        return 1;
    }

    getBestAward() {
        return (Math.floor(this.pool / 5));
    }
}

$(document).ready(function () {
    let dataSet = [];
    let obj = new slotMachine();
    let line;
    let roll;

    for (let i = 0; i < 1000001; i++) {
        let roll = obj.roll();
        if(i == 1000000) {
            line = [
                i + 1,//#
                roll,//Result
                obj.numbers,//Result Numbers
                obj.result,//Status
                obj.award.toFixed(2),//Award
                obj.totalAward.toFixed(2),//Award
                obj.pool.toFixed(2),//Pool
                obj.taxes.toFixed(2),//Taxes
                obj.totalMoney.toFixed(2),//Taxes
                obj.bestAwardPayed.toFixed(2),//Taxes
                obj.minorPool.toFixed(2),//Taxes
                obj.bestAwardPossible.toFixed(2),//Taxes
                obj.countSmallWins,//SmallWins
                obj.countMediumWins,//MediumWins
                obj.countBigWins,//BigWins
                obj.countBestWins,//BestWins
                obj.countLoses,//BestWins
                obj.countPlayed,//BestWins
            ]
            dataSet.push(line)
        }
    }

    $('#myTable').DataTable({
        data: dataSet,
    });
});



