import React , {Component} from 'react'
import {setUp , run_depth_first_search} from './Algorithms/depth_first_search_maze'


class App extends Component{
  constructor(){
    super()
    this.state = {
      size: 30, 
      cols: 60, 
      rows: 30
    }
  }

  updateCanvas = () => {
    let {cols , rows , size } = this.state
    const canvas = this.refs.maze
    const c = canvas.getContext('2d');

    setUp({c , canvas , cols , rows , size , draw_maze: true })
  }

  render(){
    let {cols , rows , size } = this.state
    return(
      <div className="container">
        <canvas ref="maze" style={{width: size * cols , height: size * rows}}></canvas>
        <button onClick={() => this.updateCanvas()}>Generate Array</button>
        <button onClick={() => {
          run_depth_first_search()
          }}>solve maze</button>
      </div>
    )
  }
}

export default App 
