import {get_top_right_bottom_left} from '../solve_maze/helper_method/algorithms_helper_method'
import { Stack } from '../helper_method'

let size , nodes , cols , rows , canvas , c , frame_per_second , speed 
let neighbors_node , visited_neighbors_node , current_neighbor_node , myReqDraw 
const prims_maze = props => {
    size = props.size
    nodes = props.nodes 
    cols = props.cols 
    rows = props.rows 
    canvas = props.canvas 
    c = props.c 

    frame_per_second = props.frame_per_second
    speed = props.speed

    neighbors_node = new Stack()
    visited_neighbors_node = new Stack()
    current_neighbor_node = null 
    
    clearInterval(myReqDraw)
    setup_prims_maze(nodes , cols , rows)
}

const stop_prims_draw_maze = () => {
    clearInterval(myReqDraw)
}

const setup_prims_maze = (nodes_array , w , h) => {
    let midd_x =  Math.floor(w / 2) * size + (size / 2)
    let midd_y =  Math.floor(h / 2) * size + (size / 2)
    let center_node = nodes_array.find(node => node.x === midd_x && node.y === midd_y)
    neighbors_node.push(`${center_node.x} , ${center_node.y}` , center_node)
    visited_neighbors_node.push(`${center_node.x} , ${center_node.y}` , center_node)
    current_neighbor_node = center_node

    draw_prims_maze()
}

const draw_prims_maze = () => {
    myReqDraw = setTimeout(() => {
        draw_prims_maze()
    }, frame_per_second / speed)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let node of nodes){
        node.draw()
    }

    if(neighbors_node.count === 0){
        clearInterval(myReqDraw)
    }

    add_neighbor_node()
}

const add_neighbor_node = () => {
    let {x , y} = current_neighbor_node
    let {top , right , bottom , left} = get_top_right_bottom_left(current_neighbor_node , nodes , size) 

    // top 
    create_neighbor_node(top)

    // right 
    create_neighbor_node(right)

    //bottom 
    create_neighbor_node(bottom)

    //left 
    create_neighbor_node(left)

    neighbors_node.delete(`${x} , ${y}`)

    link_node_with_random_neighbor()
}

const create_neighbor_node = (neighbor_node) => {
    if(
        neighbor_node 
        && !visited_neighbors_node.has(`${neighbor_node.x} , ${neighbor_node.y}`)
        && !neighbors_node.has(`${neighbor_node.x} , ${neighbor_node.y}`)
    ){
        neighbors_node.push(`${neighbor_node.x} , ${neighbor_node.y}` , neighbor_node)
        neighbor_node.prev_node = current_neighbor_node
    }
}

const link_node_with_random_neighbor = () => {
    if(neighbors_node.count <= 0) return
    let random_num = getRandom(0 , neighbors_node.count)
    let random_neighbor = neighbors_node.get_index(random_num)
    
    let {top , right , bottom , left} = get_top_right_bottom_left(random_neighbor, visited_neighbors_node.values(), size)

    if(top && top.x === random_neighbor.prev_node.x && top.y === random_neighbor.prev_node.y){
        random_neighbor.walls[0] = false 
        top.walls[2] = false
    }

    if(right && right.x === random_neighbor.prev_node.x && right.y === random_neighbor.prev_node.y){
        random_neighbor.walls[1] = false 
        right.walls[3] = false
    }

    if(bottom && bottom.x === random_neighbor.prev_node.x && bottom.y === random_neighbor.prev_node.y){
        random_neighbor.walls[2] = false 
        bottom.walls[0] = false
    }

    if(left && left.x === random_neighbor.prev_node.x && left.y === random_neighbor.prev_node.y){
        random_neighbor.walls[3] = false 
        left.walls[1] = false
    }
    current_neighbor_node = random_neighbor
    visited_neighbors_node.push(`${random_neighbor.x} , ${random_neighbor.y}` , random_neighbor)
}

const getRandom = (min,max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export {prims_maze , stop_prims_draw_maze}

