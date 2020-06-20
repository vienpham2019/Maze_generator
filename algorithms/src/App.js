import React , {Component} from 'react'
import {setUp , run_solve_maze} from './Algorithms/mazeController'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react'


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
      speed: "Normal"
    }
  }

  check_recursive_delay = (value) => {
    this.setState({dispay_draw_button: value})
  }

  updateCanvas = () => {
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

    setUp({c , canvas , cols , rows, width , height , draw_maze: true , select_draw_algorithims , check_recursive_delay: this.check_recursive_delay , speed})
  }
  render(){
    let {width , height , select_solve_algorithims , dispay_draw_button} = this.state
    let {draw_maze_algorithims , solve_maze_algorithims} = this.props
    let speed = ["Slow", "Normal", "Fast" , "Supper fast"]
    return(
      <div className="mt-1">
        <nav className="navbar">
          <div className="d-flex flex-wrap">
            <div class="input-group p-2" style={{minWidth: 600}}>
              <div class="input-group-prepend">
                <span class="input-group-text">Algorithms</span>
              </div>
              <select 
                class="custom-select" 
                id="inputGroupSelect04" 
                aria-label="Example select with button addon"
                style={{minWidth: 250}}
                onChange={(e) => this.setState({select_draw_algorithims: e.target.value})}
              >
                {draw_maze_algorithims.map(algorithm => 
                  <option value={algorithm}>{algorithm}</option>
                )}
              </select>
              <div class="input-group-prepend">
                <span class="input-group-text">Speed</span>
              </div>
              <select 
                class="custom-select" 
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
              <div class="input-group-prepend">
                <span class="input-group-text">Size(rows)</span>
              </div>
              <input 
                type="number" 
                class="form-control" 
                min='15'
                max='50'
                placeholder="Minimum 15 and Maximum 50"
                style={{minWidth: 100}}
                onChange={(e) => {
                  let rows = Math.floor(e.target.value)
                  this.setState({rows})
                }}
              ></input>
            <div class="input-group-append">
              {dispay_draw_button ? 
                <button 
                  class="btn btn-outline-light" 
                  type="submit"
                  onClick={() => this.updateCanvas()}
                >
                  Generate Maze
                </button>
              : null }
            </div>
          </div>
            <div class="input-group p-2" style={{maxWidth: 500}}>
              <div class="input-group-prepend">
                <span class="input-group-text">Algorithms</span>
              </div>
              <select 
                class="custom-select" 
                id="inputGroupSelect04" 
                aria-label="Example select with button addon"
                onChange={(e) => this.setState({select_solve_algorithims: e.target.value})}
              >
                {solve_maze_algorithims.map(algorithm => 
                  <option value={algorithm}>{algorithm}</option>
                )}
              </select>
              <div class="input-group-append">
                <button 
                  class="btn btn-outline-light" 
                  type="button"
                  onClick={() => run_solve_maze(select_solve_algorithims)}
                >
                  Solve Maze
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="m-5">
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
