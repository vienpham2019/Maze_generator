let delay , maze_speed , size , cols , rows , nodes

const recursive_dividion_maze = (props) => {
    delay = props.delay
    maze_speed = props.maze_speed 
    size = props.size 
    cols = props.cols 
    rows = props.rows
    nodes = props.nodes

    return draw_maze(nodes , cols , rows , 0, 0 , delay , maze_speed , size)
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
                      let neightbor_node = nodes_array.find(node => node.x === (x + size) && node.y === y) 
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
                      let neightbor_node = nodes_array.find(node => node.x === x && node.y === (y + size)) 
                      if(neightbor_node){
                        neightbor_node.walls[0] = true
                      } 
                  }
              }
          }
            nodes_array[i].draw()
        }
    }, delay * maze_speed)
  
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

export {recursive_dividion_maze}