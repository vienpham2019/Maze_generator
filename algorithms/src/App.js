import React , {Component} from 'react'
import merge_sort from './Algorithms/mergeSort'

class App extends Component{
  constructor(){
    super()
    this.state = {
      array: []
    }
  }

  randomNumber = (min,max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  generateArray = () => {
    let array = []
    for(let i = 0; i < 100 ; i ++) {
      array.push({height: this.randomNumber(5, 500), index: i})
    }
    
    this.setState({array})
  }

  mergeSort = () => {
    let array = merge_sort(this.state.array)
    console.log(array)
    let bars = document.getElementsByClassName('bar_container')[0].childNodes
    for(let i = 0; i <= bars.length ; i ++ ){
      setTimeout(() => {
        if(bars[i]){
          bars[i].style.backgroundColor = 'red'
        }
        if(i > 0){
          bars[i - 1].style.backgroundColor = 'blue'
        } 
      },i * 20);
    }
  }

  render(){
    return(
      <div>
        <div className="container mt-5 bar_container" style={{width: '100vw' , height: '70vh'}}>
          {this.state.array.map((element , index) => 
            <div className="bar" key={index} style={{height: `${element.height}px`, backgroundColor: 'blue'}}>
            </div>
          )}
        </div> 
        <button onClick={() => this.generateArray()}>Generate Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
      </div>
    )
  }
}

export default App 
