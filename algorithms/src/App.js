import React , {Component} from 'react'
import {setUp , run_solve_maze} from './Algorithms/mazeController'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react'

let select_start = false
let select_end = false 
let select_wall = false 

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
    }
  }

  componentDidMount(){
    this.updateCanvas(false)
    let canvas = this.refs.maze
    let rows = 25
    let {width} = this.state 
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
        }

        if(select_start){
          start_location = {x , y}
          this.setState({start_location})
        }
      }
    })
  }

  check_recursive_delay = (value) => {
    this.setState({dispay_draw_button: value})
  }

  updateCanvas = (draw_maze = true) => {
    // rows == min 15 and max 50
    let {rows , height , width , select_draw_algorithims} = this.state

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
          <div style={{color: 'black'}}>
            <h3>Rows should be minimum 15 and maximum 50.</h3>
          </div>
        )
      })
      return
    }

    if(draw_maze){
      setUp({c , canvas , cols , rows, width , height , draw_maze , select_draw_algorithims , check_recursive_delay: this.check_recursive_delay , speed})
    }else{
      let grid_rows = 25
      let grid_cols = Math.floor(grid_rows * ((window.innerWidth * .95) / (window.innerHeight * .9)))
      setUp({c , canvas , cols: grid_cols, rows: grid_rows, width , height , draw_maze , select_draw_algorithims: "" , check_recursive_delay: this.check_recursive_delay , speed})
    }
  }
  render(){
    let {width , height , select_solve_algorithims , dispay_draw_button} = this.state
    let {draw_maze_algorithims , solve_maze_algorithims} = this.props
    let speed = ["Slow", "Normal", "Fast" , "Supper fast"]
    let start_x = this.state.start_location.x
    let start_y = this.state.start_location.y

    let end_x = this.state.end_location.x
    let end_y = this.state.end_location.y
    return(
      <div className="mt-1">
        <nav className="navbar">
          <div className="d-flex flex-wrap">
            <div className="input-group p-2" style={{minWidth: 600}}>
              <div className="input-group-prepend">
                <span className="input-group-text">Algorithms</span>
              </div>
              <select 
                className="custom-select" 
                id="inputGroupSelect04" 
                aria-label="Example select with button addon"
                style={{minWidth: 250}}
                onChange={(e) => this.setState({select_draw_algorithims: e.target.value})}
              >
                {draw_maze_algorithims.map(algorithm => 
                  <option value={algorithm}>{algorithm}</option>
                )}
              </select>
              <div className="input-group-prepend">
                <span className="input-group-text">Speed</span>
              </div>
              <select 
                className="custom-select" 
                id="inputGroupSelect04" 
                aria-label="Example select with button addon"
                style={{maxWidth: 150}}
                onChange={(e) => this.setState({speed: e.target.value})}
              >
                {speed.map(s => 
                  s === "Normal"
                    ? <option value={s} selected>{s}</option>
                    : <option value={s} >{s}</option>
                )}
              </select>
              <div className="input-group-prepend">
                <span className="input-group-text">Size(rows)</span>
              </div>
              <input 
                type="number" 
                className="form-control" 
                min='15'
                max='50'
                placeholder="Minimum 15 and Maximum 50"
                style={{minWidth: 100}}
                onChange={(e) => {
                  let rows = Math.floor(e.target.value)
                  this.setState({rows})
                }}
              ></input>
            <div className="input-group-append">
              {dispay_draw_button ? 
                <button 
                  className="btn btn-outline-light" 
                  type="submit"
                  onClick={() => this.updateCanvas()}
                >
                  Generate Maze
                </button>
              : null }
            </div>
          </div>
          <div className="input-group p-2" style={{maxWidth: 500}}>
            <div className="input-group-prepend">
              <span className="input-group-text">Algorithms</span>
            </div>
            <select 
              className="custom-select" 
              id="inputGroupSelect04" 
              aria-label="Example select with button addon"
              onChange={(e) => this.setState({select_solve_algorithims: e.target.value})}
            >
              {solve_maze_algorithims.map(algorithm => 
                <option value={algorithm}>{algorithm}</option>
              )}
            </select>
            <div className="input-group-append">
              <button 
                className="btn btn-outline-light" 
                type="button"
                onClick={() => run_solve_maze(select_solve_algorithims)}
              >
                Solve Maze
              </button>
            </div>
          </div>
          <button 
            className="btn btn-outline-light m-2" 
            type="button"
            onClick={() => this.updateCanvas(false)}
            style={{width: 100}}
          >
            Grid
          </button>
          <button 
            className="btn m-2" 
            style={{color: select_start ? 'black' :'white'}}
            onClick={() => {
              select_end = select_start
              select_wall = select_start
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
              select_start = select_end
              select_wall = select_end
              select_end = !select_end 
              this.setState({})
            }}
          >
            <i class="fas fa-bullseye" style={{color: select_end ? 'black' :'white'}}></i> End Point
          </button>
          <button 
            className="btn m-2" 
            style={{color: select_wall ? 'black' :'white'}}
            onClick={() => {
              select_start = select_wall
              select_end = select_wall
              select_wall = !select_wall
              this.setState({})
            }}
          >
            <i class="fas fa-square" style={{color: select_wall ? 'black' :'white'}}></i> Walls
          </button>
          </div>
        </nav>
        <div className="m-5">
          <i class="fas fa-star" style={{position: "absolute", width: 10 , height: 10, top: start_y - 10, left: start_x - 10}}></i>

          <i class="fas fa-bullseye" style={{position: "absolute", width: 6, height: 6, top: end_y - 6, left: end_x - 6}}></i>
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
