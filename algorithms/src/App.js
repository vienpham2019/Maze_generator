import React , {Component} from 'react'
import {setUp , run_depth_first_search} from './Algorithms/depth_first_search_maze'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react'


class App extends Component{
  constructor(){
    super()
    this.state = {
      width: (window.innerWidth * .95),
      height: (window.innerHeight * .92),
      select_draw_algorithim: "Depth first search", 
      select_solve_algorithims: "A star",
      rows: 15
    }
  }

  updateCanvas = () => {
    // rows == min 15 and max 50
    let rows = this.state.rows 

    let cols = Math.floor(rows * ((window.innerWidth * .95) / (window.innerHeight * .9))) 
    let width = (window.innerWidth * .95)
    let height = (window.innerHeight * .92)

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

    setUp({c , canvas , cols , rows, width , height , draw_maze: true })
  }
  render(){
    let {width , height} = this.state
    let {draw_maze_algorithims , solve_maze_algorithims} = this.props
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
                style={{maxWidth: 100}}
              >
                <option value="fast">Fast</option>
                <option value="slow">Slow</option>
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
              <button 
                class="btn btn-outline-light" 
                type="submit"
                onClick={() => this.updateCanvas()}
              >
                Generate Maze
              </button>
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
              >
                {solve_maze_algorithims.map(algorithm => 
                  <option value={algorithm}>{algorithm}</option>
                )}
              </select>
              <div class="input-group-append">
                <button 
                  class="btn btn-outline-light" 
                  type="button"
                  onClick={() => run_depth_first_search()}
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
    solve_maze_algorithims: state.solve_maze_algorithims
  }
}

export default connect(mapStateToProps)(App)
