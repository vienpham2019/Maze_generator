import React , {Component} from 'react'
import {setUp , run_solve_maze , update_info} from './Algorithms/mazeController'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react'

let select_start = false
let select_end = false 
let display_points = false 

let myReg 

class App extends Component{
  constructor(){
    super()
    this.state = {
      width: (window.innerWidth * .95),
      height: (window.innerHeight * .92),
      select_draw_algorithims: "Depth first search", 
      select_solve_algorithims: "A star",
      rows: 15, 
      dispay_draw_button: true , 
      speed: "Normal", 
      start_location: {x: 40 , y: 170}, 
      end_location: {x: 40 , y: 170}, 

      time: "00 min : 00 sec"
    }
  }

  componentDidMount(){
    this.updateCanvas("")
  }

  run_set_point = () => {
    let canvas = this.refs.maze
    let {width , rows } = this.state 
    let cols = Math.floor(rows * ((window.innerWidth * .95) / (window.innerHeight * .9))) 
    let size = Math.floor(width / cols)
    let {offsetLeft , offsetTop} = canvas
    let start_location = {x: offsetLeft + (size / 2) , y: offsetTop + (size / 2)}
    let end_location = {x: offsetLeft + ((cols - 1) * size + (size / 2)) , y: offsetTop + ((rows - 1) * size + (size / 2))}
    this.setState({start_location , end_location})
    canvas.addEventListener('mousedown' , (e) => {
      let {pageX , pageY} = e
      let x = Math.floor(((pageX - offsetLeft) / size)) * (size) + (size / 2) + offsetLeft
      let y = Math.floor(((pageY - offsetTop) / size)) * (size) + (size / 2) + offsetTop
      if(x < (cols * size) + offsetLeft && y < (rows * size) + offsetTop){
        if(select_end){
          end_location = {x , y}
          this.setState({end_location})
          update_info({end_location: {x: x - offsetLeft ,y: y - offsetTop}})
        }

        if(select_start){
          start_location = {x , y}
          this.setState({start_location})
          update_info({start_location: {x: x - offsetLeft ,y: y - offsetTop}})
        }
      }
    })
  }

  check_recursive_delay = (value) => {
    this.setState({dispay_draw_button: value})
  }

  updateCanvas = (select_draw_algorithims = this.state.select_draw_algorithims) => {
    // rows == min 15 and max 50
    display_points = true
    let {rows , height , width } = this.state

    let speed = this.props.speed[select_draw_algorithims][this.state.speed]

    if(select_draw_algorithims === "Recursive Division"){
      this.check_recursive_delay(false)
    }

    let cols = Math.floor(rows * ((window.innerWidth * .95) / (window.innerHeight * .9))) 

    const canvas = this.refs.maze
    const c = canvas.getContext('2d');

    if(rows < 15 || rows > 50){
      swal({
        button: false, 
        content: (
          <div className="p-2 bg-white">
            <h3 className="bg-white">Rows should be minimum 15 and maximum 50.</h3>
          </div>
        )
      })
      return
    }
    setUp({c , canvas , cols , rows, width , height , select_draw_algorithims , 
    check_recursive_delay: this.check_recursive_delay , speed })
  }

  star_time = () => {
    let min = 0 
    let sec = 0 
    clearInterval(myReg)
    myReg = setInterval(() => {
      sec = (sec + 1) % 60 
      min += Math.floor(sec / 59)

      let sec_s = sec < 10 ? '0' + sec : sec 
      let min_s = min < 10 ? '0' + min : min 
      let time =  " " + min_s + " min " + " : " + sec_s + " sec"
      this.setState({time})
    }, 1000);
  }

  render(){
    let {width , height , select_solve_algorithims , dispay_draw_button , time} = this.state
    let {draw_maze_algorithims , solve_maze_algorithims} = this.props
    let speed = ["Slow", "Normal", "Fast" , "Very Fast"]
    let start_x = this.state.start_location.x
    let start_y = this.state.start_location.y

    let end_x = this.state.end_location.x
    let end_y = this.state.end_location.y

    return(
      <div className="mt-3">
        <div className="container border-right border-bottom p-3 border-secondary shadow-sm p-3 mb-5">
          <h2 className="ml-2">The Maze Generatetor</h2>
          <div className="row">
            <div className="col border-right">
              <div class="form-group">
                <label>Algorithms</label>
                <select 
                  className="custom-select" 
                  style={{minWidth: 250}}
                  onChange={(e) => this.setState({select_draw_algorithims: e.target.value})}
                >
                  {draw_maze_algorithims.map(algorithm => 
                    <option value={algorithm}>{algorithm}</option>
                  )}
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Speed</label>
                <select 
                  className="custom-select" 
                  onChange={(e) => this.setState({speed: e.target.value})}
                >
                  {speed.map(s => 
                    s === "Normal"
                      ? <option value={s} selected>{s}</option>
                      : <option value={s} >{s}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Rows</label>
                <input 
                  type="number" 
                  className="form-control" 
                  min='15' max='50'
                  placeholder="Minimum 15 and Maximum 50"
                  style={{minWidth: 100}}
                  onChange={(e) => {
                    let rows = Math.floor(e.target.value)
                    this.setState({rows})
                  }}
                ></input>
              </div>
              <div className="input-group-append">
                <button 
                  className="btn btn-outline-dark w-100" 
                  onClick={() => {
                    if(dispay_draw_button){
                      clearInterval(myReg)
                      this.setState({time: "00 min : 00 sec"})
                      this.updateCanvas()
                      this.run_set_point()
                    }
                  }}
                >
                  Generate Maze
                </button>
            </div>
            </div>
            <div className="col">
              <div class="form-group">
                <label>Algorithms</label>
                <select 
                  className="custom-select" 
                  onChange={(e) => this.setState({select_solve_algorithims: e.target.value})}
                >
                  {solve_maze_algorithims.map(algorithm => 
                    <option value={algorithm}>{algorithm}</option>
                  )}
                </select>
              </div>
              <div className = "form-group">
                <label>Select start and end points</label><br/>
                <button 
                  className="btn m-2" 
                  style={{color: select_start ? 'black' :'white'}}
                  onClick={() => {
                    select_end = false
                    select_start = !select_start
                    this.setState({})
                  }}
                >
                  <i class="fas fa-star" style={{color: select_start ? 'black' :'white'}}></i> Start Point
                </button>
                <button 
                  className="btn m-2" 
                  style={{color: select_end ? 'black' :'white'}}
                  onClick={() => {
                    select_start = false
                    select_end = !select_end 
                    this.setState({})
                  }}
                >
                  <i class="fas fa-bullseye" style={{color: select_end ? 'black' :'white'}}></i> End Point
                </button>
              </div>
              <label className="mb-3 text-info">
                {select_solve_algorithims === "★ Self-Solve ★" ? "Use W | S to control forward and backward A | D for left and right." : ""}
              </label>
              <div className="input-group-append">
                <button 
                  className="btn btn-outline-dark w-100" 
                  type="button"
                  onClick={() => {
                    this.star_time()
                    run_solve_maze(select_solve_algorithims)
                  }}
                >
                  Solve Maze
                </button>
              </div>

              <p className="m-3 text-info text-right">Time: {time}</p>
            </div>
          </div>
        </div>
        <div className="m-5">
          {display_points ? 
            <i 
              class="fas fa-star" 
              style={{position: "absolute", width: 10 , height: 10, top: start_y - 10, left: start_x - 10 , backgroundColor: 'transparent'}}></i>
          : null } 
          {display_points ? 
            <i 
              class="fas fa-bullseye" 
              style={{position: "absolute", width: 6, height: 6, top: end_y - 6, left: end_x - 6 , backgroundColor: 'transparent'}}></i>
          : null }
          <canvas ref="maze" style={{width, height}}></canvas>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    draw_maze_algorithims: state.draw_maze_algorithims,
    solve_maze_algorithims: state.solve_maze_algorithims,
    speed: state.speed 
  }
}

export default connect(mapStateToProps)(App)
