
  const blue = document.getElementById('blue')
      const violet = document.getElementById('violet')
      const orange = document.getElementById('orange')
      const green = document.getElementById('green')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ULTIMO_NIVEL = 10


      class Juego {
        constructor() {
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()
            this.generarSecuencia()
            setTimeout(this.sigienteNivel, 800)
        }

        inicializar() {
          this.sigienteNivel = this.sigienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel = 1
          this.colores = {
            blue,
            violet,
            orange,
            green
        }
        }
        toggleBtnEmpezar(){
          if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
          } else {
            btnEmpezar.classList.add('hide')
          }
        }
        generarSecuencia(){
          this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
          console.log(this.secuencia)
        }
        sigienteNivel(){
          this.subnivel = 0
          this.iluminarSecuencia()
          this.agregarEventosClick()
        }
        iluminarSecuencia(){
          for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => {this.iluminarColor(color)}, 1000 * i)

          }
        }
        transformarNumeroAColor(num){
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
        transformarColorANumero(color){
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
        iluminarColor(color){
          this.colores[color].classList.add('light')
          setTimeout(() => this.tunColorOff(color), 500)
        }
        tunColorOff(color){
          this.colores[color].classList.remove('light')
        }
        agregarEventosClick(){
          this.colores.blue.addEventListener('click', this.elegirColor)
          this.colores.green.addEventListener('click', this.elegirColor)
          this.colores.violet.addEventListener('click', this.elegirColor)
          this.colores.orange.addEventListener('click', this.elegirColor)
        }
        eliminarEventosClick(){
          this.colores.blue.removeEventListener('click', this.elegirColor)
          this.colores.green.removeEventListener('click', this.elegirColor)
          this.colores.violet.removeEventListener('click', this.elegirColor)
          this.colores.orange.removeEventListener('click', this.elegirColor)
        }
        elegirColor(ev){
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transformarColorANumero(nombreColor)
          this.iluminarColor(nombreColor)
          if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel) {
              this.nivel++
              this.eliminarEventosClick()
              if (this.nivel === ULTIMO_NIVEL + 1) {
                //You win!
                this.youWin()
              } else {
                setTimeout(this.sigienteNivel, 700)
              }
            }
          }else{
            //You lose
            this.youLose()
          }
        }
        youWin() {
          swal("You Win!" ,  "Congratulations, Your memory is just awesome" ,  "success" )
          .then(this.inicializar)
        }
        youLose() {
          swal("You Lost..." ,  "We´re sorry, you need to get more practice..." ,  "error" )
          .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
          })
        }
      }

      function empezarJuego() {
        window.juego = new Juego()
      }



