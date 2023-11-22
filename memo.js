const memoryGame = {
    tileCount : 30, //liczba klocków
    tileOnRow : 5, //liczba klocków na rząd
    divBoard : null, //div z planszą gry
    tiles : [], //tutaj trafi wymieszana tablica klocków
    tilesChecked : [], //zaznaczone klocki
    moveCount : 0, //liczba ruchów
    tilesImg : [ //grafiki dla klocków
        "memo/1.png",
        "memo/2.png",
        "memo/3.png",
        "memo/4.png",
        "memo/5.png",
        "memo/6.png",
        "memo/7.png",
        "memo/8.png",
        "memo/9.png",
        "memo/10.png",
        "memo/11.png",
        "memo/12.png",
        "memo/13.png",
        "memo/14.png",
        "memo/15.png"
    ],
    canGet : true, //czy można klikać na kafelki
    tilePairs : 0, //liczba dopasowanych kafelków

    tileClick(e) {
        if (this.canGet) {
            //jeżeli jeszcze nie pobraliśmy 1 elementu
            //lub jeżeli index tego elementu nie istnieje w pobranych...
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = `url(${this.tilesImg[e.target.dataset.cardType]})`;
            }

            if (this.tilesChecked.length === 2) {
                this.canGet = false;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(() => this.deleteTiles(), 300);
                } else {
                    setTimeout(() => this.resetTiles(), 300);
                }

                this.moveCount++;
            }
        }
    },

    deleteTiles() {
        this.tilesChecked.forEach(el => {
            const emptyDiv = document.createElement("div");
            el.after(emptyDiv);
            el.remove();
        });

        this.canGet = true;
        this.tilesChecked = [];

        this.tilePairs++;

        if (this.tilePairs >= this.tileCount / 2) {
            changeScreen(5);
        }
    },

    resetTiles() {
        this.tilesChecked.forEach(el => el.style.backgroundImage = "");
        this.tilesChecked = [];
        this.canGet = true;
    },

    startGame() {
        //czyścimy planszę
        this.divBoard = document.querySelector(".game-board");
        this.divBoard.innerHTML = "";

        //czyścimy zmienne (bo gra może się zacząć ponownie)
        this.tiles = [];
        this.tilesChecked = [];
        this.moveCount = 0;
        this.canGet = true;
        this.tilePairs = 0;

        //generujemy tablicę numerów klocków (parami)
        for (let i=0; i<this.tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        //i ją mieszamy
        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement("div");
            tile.classList.add("game-tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.addEventListener("click", e => this.tileClick(e));
        }
    }
}

function startCountdown(duration, onTimeOut) {
    var timer = duration;
    var intervalId = setInterval(function () {
        document.getElementById('timer').textContent = timer;

        if (--timer < 0) {
            clearInterval(intervalId);
            if (typeof onTimeOut === 'function') {
                onTimeOut(); // Call the callback function when the timer ends
            }
        }
    }, 1000);
}

document.getElementById('start-memo').addEventListener('click', function() {
    memoryGame.startGame();

    document.getElementById('time-h4').style.display = 'block';
    document.getElementById('game-id').style.display = 'block';

    document.getElementById('start-memo').style.display = 'none';

    document.getElementById('timer').innerHTML = '69';

    startCountdown(69, function() {
        document.getElementById('time-h4').style.display = 'none';
        document.getElementById('start-memo').style.display = 'block';

        this.divBoard = document.querySelector(".game-board");
        this.divBoard.innerHTML = "";

        document.getElementById('game-id').style.display = 'none';
    });

    document.getElementById('time-h4').scrollIntoView({ behavior: 'smooth', block: 'start' });

});
