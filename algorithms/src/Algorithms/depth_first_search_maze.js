import { Node , Block } from './helper_method'
import { breadth_first_search }from './solve_maze/breadth_first_search'

let size , width , height , cols , rows 

let delay , speed , canvas , c , start_node, end_node , nodes , stack 

const setUp = (props) => {
  c = props.c
  canvas = props.canvas 
  nodes = []
  stack = []

  cols = props.cols 
  rows = props.rows 
  size = props.size 
  width = size * cols 
  height = size * rows

  delay = 0 
  speed = 10

  canvas.width = width
  canvas.height = height

  draw_divide_maze()
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

  start_node = new Block(size / 2,size / 2 , c , size , "blue")
  end_node = new Block((cols - 1) * size + (size / 2),( rows - 1 ) * size + (size / 2) , c , size , "green" )
  let draw_delay = draw_maze(nodes , cols, rows, 0, 0)
  if(draw_delay){
    setTimeout(() => {
      breadth_first_search({nodes , start_node , end_node , c , canvas , size })
    }, draw_delay * speed);
  }
}


const draw_maze = (nodes_array , x_max, y_max, x_min , y_min) => {

  if(x_max - x_min < 1 || y_max - y_min < 1) return

  let random_x = getRandom(x_min,x_max)
  let random_y = getRandom(y_min,y_max)
  let x_or_y = getRandom(-20, 20) 

  delay ++

  setTimeout(() => {
    for(let i = 0; i < nodes_array.length; i ++){
        if(x_or_y > 0) { // x
            if (
                nodes_array[i].x === random_x * size + (size / 2) 
                && nodes_array[i].y <= y_max * size + (size / 2)
                && nodes_array[i].y >= y_min * size + (size / 2)
                && nodes_array[i].x !== (cols - 1) * size + (size / 2)
                ){
                if (nodes_array[i].y !== random_y * size + (size / 2)){
                    nodes_array[i].walls[1] = true
                    let {x , y} = nodes_array[i]
                    let neightbor_node = nodes_array.find(node => node.x === x + size && node.y === y) 
                    if(neightbor_node){
                        neightbor_node.walls[3] = true
                    } 
                }
            }
        }else{
            if(
                nodes_array[i].y === random_y * size + (size / 2)
                && nodes_array[i].x <= x_max * size + (size / 2)
                && nodes_array[i].x >= x_min * size + (size / 2)
                ){
                if(nodes_array[i].x !== random_x * size + (size / 2)){
                    nodes_array[i].walls[2] = true
                    let {x , y} = nodes_array[i]
                    let neightbor_node = nodes_array.find(node => node.x === x && node.y === y + size) 
                    if(neightbor_node){
                        neightbor_node.walls[0] = true
                    } 
                }
            }
        }
          nodes_array[i].draw()
      }
  }, delay * speed)

  if(x_or_y > 0){ 
    draw_maze(nodes_array, random_x, y_max, x_min, y_min) // right 
    draw_maze(nodes_array, x_max, y_max, random_x + 1, y_min) // left 
  }else{
    draw_maze(nodes_array, x_max, random_y, x_min, y_min) // top 
    draw_maze(nodes_array, x_max, y_max, x_min , random_y + 1) // bottom
  }

  return delay 
}

const getRandom = (min,max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export {setUp}
