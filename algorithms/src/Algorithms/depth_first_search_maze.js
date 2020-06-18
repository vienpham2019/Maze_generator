import { Node , Block } from './helper_method'
import { breadth_first_search , stop_breadth_first_search }from './solve_maze/breadth_first_search'
import { depth_first_search , stop_depth_first_search }from './solve_maze/depth_first_search'
import { a_star , stop_a_star }from './solve_maze/a_star'
import { greedy_best_first_search , stop_greedy_best_first_search }from './solve_maze/greedy_best_first_search'
import { dijkstra , stop_dijkstra }from './solve_maze/dijkstra'
import { bidirectional_dijkstra , stop_bidirectional_dijkstra }from './solve_maze/bidirectional_dijkstra'

import { recursive_dividion_maze } from './draw_maze/recursive_division_maze_generation'
import { prims_maze } from './draw_maze/prims_maze_generation'
import { depth_first_search_maze } from './draw_maze/depth_first_search_maze_generation'

let size , width , height , cols , rows 

let delay , speed , canvas , c , start_node, end_node , nodes , stack , frame_per_second , maze_speed , myTimeOut , draw_maze

const setUp = (props) => {
  stop_breadth_first_search()
  stop_depth_first_search()
  stop_a_star()
  stop_dijkstra()
  stop_bidirectional_dijkstra()
  stop_greedy_best_first_search()

  c = props.c
  canvas = props.canvas 
  stack = []

  cols = props.cols 
  rows = props.rows 
  size = props.size 
  draw_maze = props.draw_maze
  width = size * cols 
  height = size * rows

  delay = 0 
  speed = 40
  maze_speed = 700

  frame_per_second = 1000

  canvas.width = width
  canvas.height = height

  clearTimeout(myTimeOut)
  if(draw_maze){
    nodes = []
    setTimeout(() => {
      draw_divide_maze()
    }, 300);
  }

}

const draw_divide_maze = () => {
  for(let i = 0; i < rows ; i ++){
    for(let j = 0; j < cols ; j ++){
        let x = j * size + (size / 2)
        let y = i * size + (size / 2)
        let node = new Node(x, y , c , size )
        if(i === 0 && j !== 0) {
            node.walls[0] = true
        }else if(i === rows - 1){
            node.walls[2] = true
        }

        if(j === 0){
            node.walls[3] = true 
        }else if(j === cols - 1 && i !== rows - 1){
            node.walls[1] = true
        }

        if(i === 0 && j === 0){
            stack.push(node)
        }
        nodes.push(node)
    }
  }

  start_node = new Block((size / 2) ,(size / 2) , c , size , "blue")
  end_node = new Block((cols - 1) * size + (size / 2),( rows - 1 ) * size + (size / 2) , c , size , "green" )
  // depth_first_search_maze({nodes , canvas , c , start_node , end_node , stack , size 
  // , cols , rows , frame_per_second , speed })
  // prims_maze({size , nodes , cols , rows , canvas , c , frame_per_second , speed})
  let draw_delay = recursive_dividion_maze({delay , speed , size , cols , rows , nodes})
  // if(draw_delay){
  //   myTimeOut = setTimeout(() => {
  //     // depth_first_search({nodes , start_node , end_node , c , canvas , size})
  //     a_star({start_node , end_node , nodes , c , canvas , size})
  //   }, draw_delay * speed);
  // }
}

const run_depth_first_search = () => {
  stop_greedy_best_first_search()
  stop_a_star()
  stop_dijkstra()
  stop_breadth_first_search()
  stop_depth_first_search()
  stop_bidirectional_dijkstra()

  // depth_first_search({nodes , start_node , end_node , c , canvas , size})
  // a_star({start_node , end_node , nodes , c , canvas , size})
  // dijkstra({start_node , end_node , nodes , c , canvas , size})
  bidirectional_dijkstra({start_node , end_node , nodes , c , canvas , size})
  // greedy_best_first_search({start_node , end_node , nodes , c , canvas , size})
  // breadth_first_search({c , canvas , size , nodes , start_node , end_node })
}

export {setUp , run_depth_first_search}
