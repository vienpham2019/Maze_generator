import React , {Component} from 'react'
import {setUp , run_depth_first_search} from './Algorithms/depth_first_search_maze'


class App extends Component{
  constructor(){
    super()
    this.state = {
      cols: Math.floor(25 * ((window.innerWidth * .9) / (window.innerHeight * .95))), // min 20 x 20 max 50 x 50
      rows: 25,
      width: Math.floor(window.innerWidth * .9),
      height: Math.floor(window.innerHeight * .95)
    }
  }

  updateCanvas = () => {
    let {cols , rows , width , height} = this.state
    const canvas = this.refs.maze
    const c = canvas.getContext('2d');

    setUp({c , canvas , cols , rows, width , height , draw_maze: true })
  }

  render(){
    let {width , height} = this.state
    return(
      <div className="row mt-1">
        <div className="col">
          <canvas ref="maze" style={{width, height}}></canvas>
        </div> 
        <div className="col-auto text-center">
          <button className="w-90" onClick={() => this.updateCanvas()}>Generate Array</button>
          <button className = "d-block" onClick={() => {
            run_depth_first_search()
            }}>solve maze</button>
        </div>
      </div>
    )
  }
}

export default App 
