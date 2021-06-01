
  const blue = document.getElementById('blue')
      const violet = document.getElementById('violet')
      const orange = document.getElementById('orange')
      const green = document.getElementById('green')
      const buttonStart = document.getElementById('buttonStart')
      const LAST_LEVEL = 4


      class Game {
        constructor() {
            this.initialize = this.initialize.bind(this)
            this.initialize()
            this.generateSequence()  
            setTimeout(this.nextLevel, 800)
        }

        initialize() {
          this.nextLevel = this.nextLevel.bind(this)
          this.chooseColor = this.chooseColor.bind(this)
          this.toggleButtonStart()
          this.level = 1
          this.colors = {
            blue,
            violet,
            orange,
            green
        }
        }
        toggleButtonStart(){
          if(buttonStart.classList.contains('hide')){
            buttonStart.classList.remove('hide')
          } else {
            buttonStart.classList.add('hide')
          }
        }
        generateSequence(){
          this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
          console.log(this.sequence)
        }
        nextLevel(){
          this.sublevel = 0
          this.iluminateSequence()
          this.addClickEvents()
        }
        iluminateSequence(){
          for (let i = 0; i < this.level; i++) {
            const color = this.transforNumberToColor(this.sequence[i])
            setTimeout(() => {this.iluminateColor(color)}, 1000 * i)

          }
        }
        transforNumberToColor(num){
          switch(num){
            case 0: 
             return 'blue'
            case 1:
             return 'violet'
            case 2:
              return 'orange'
            case 3:
              return 'green'
          }
        }
        transformColorToNumber(color){
          switch(color){
            case 'blue': 
             return 0
            case 'violet':
             return 1
            case 'orange':
              return 2
            case 'green':
              return 3
          }
        }
        iluminateColor(color){
          this.colors[color].classList.add('light')
          setTimeout(() => this.turnColorOff(color), 500)
        }
        turnColorOff(color){
          this.colors[color].classList.remove('light')
        }
        addClickEvents(){
          this.colors.blue.addEventListener('click', this.chooseColor)
          this.colors.green.addEventListener('click', this.chooseColor)
          this.colors.violet.addEventListener('click', this.chooseColor)
          this.colors.orange.addEventListener('click', this.chooseColor)
        }
        eliminateClickEvents(){
          this.colors.blue.removeEventListener('click', this.chooseColor)
          this.colors.green.removeEventListener('click', this.chooseColor)
          this.colors.violet.removeEventListener('click', this.chooseColor)
          this.colors.orange.removeEventListener('click', this.chooseColor)
        }
        chooseColor(ev){
          const colorName = ev.target.dataset.color
          const colorNumber = this.transformColorToNumber(colorName)
          this.iluminateColor(colorName)
          if (colorNumber === this.sequence[this.sublevel]){
            this.sublevel++
            if (this.sublevel === this.level) {
              this.level++
              this.eliminateClickEvents()
              if (this.level === LAST_LEVEL + 1) {
                //You win!
                this.youWin()
              } else {
                setTimeout(this.nextLevel, 700)
              }
            }
          }else{
            //You lose
            this.youLose()
          }
        }
        youWin() {
          swal("You Win!" ,  "Congratulations, Your memory is just awesome!" ,  "success" )
          .then(this.initialize)
        }
        youLose() {
          swal("You Lose..." ,  "We´re sorry, you need to get more practice..." ,  "error" )
          .then(() => {
            this.eliminateClickEvents()
            this.initialize()
          })
        }
      }

      function startGame() {
        window.game = new Game()
      }



