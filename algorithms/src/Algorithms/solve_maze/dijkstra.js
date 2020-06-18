import { Block } from '../helper_method'

import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , c , canvas , size 

let open_list , close_list , current_node , myReq , finish_path

const dijkstra = props => {
    start_node = props.start_node
    start_node.distance = 0
    end_node = props.end_node 
    nodes = props.nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 

    end_node.prev_node = null
    
    open_list = [start_node]
    close_list = []
    current_node = null 
    finish_path = false 

    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_dijkstra = () => {
    cancelAnimationFrame(myReq)
}

const run_solve_maze = () => {
    myReq = requestAnimationFrame(run_solve_maze)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0 ; i < nodes.length ; i ++){
        nodes[i].draw()
    }

    for(let i = 0 ; i < close_list.length ; i ++){
        if(!end_node.prev_node){
            close_list[i].color = 'MidnightBlue'
        }
        close_list[i].draw()
    }

    for(let i = 0 ; i < open_list.length ; i ++){
        open_list[i].color = 'DeepSkyBlue'
        open_list[i].draw()
    }

    if(current_node && end_node.x === current_node.x && end_node.y === current_node.y){
        end_node.prev_node = current_node.prev_node
    }

    if(open_list.length > 0 && !end_node.prev_node){
        current_node = open_list.sort((a,b) => a.distance - b.distance)[0] 
        close_list.push(current_node)
        find_child_node()
    }

    if(end_node.prev_node){
        start_node.draw()
        end_node.draw()
        find_path() 
    }
    if(finish_path){
        cancelAnimationFrame(myReq)
    }
}

const find_child_node = () => {

    let {top , right , bottom , left} = get_top_right_bottom_left(current_node , nodes , size)

    // right (x + size , y)
    add_node(right , 3)

    // top (x , y - size)
    add_node(top , 2)

    // left (x - size , y )
    add_node(left , 1)

    // bottom (x , y + size)
    add_node(bottom , 0)

    open_list = open_list.filter(node => node.x === current_node.x && node.y === current_node.y ? false : true )
}

const add_node = (neighbor_node , wall_num) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        &&!close_list.find(node => node.x === neighbor_node.x && node.y === neighbor_node.y)
    ){
        let {x , y} = neighbor_node
        let node_in_open = open_list.find(n => n.x === x  && n.y === y)
        
        node_in_open ? update_node(node_in_open) : open_list.push(create_new_node(neighbor_node))
    }
}

const find_path = () => {
    current_node.color = "LimeGreen"
    if(current_node.x === start_node.x && current_node.y === start_node.y){
        finish_path = true
        return
    }
    current_node = current_node.prev_node
    return 
}

const create_new_node = (node) => {
    let distance = find_distance(node)
    return new Block(node.x , node.y , c , size , 'MidnightBlue' , current_node , null , null , null , distance)
}

const find_distance = (node) => {
    // find distance from current node to next node 
    let x_1 = current_node.x 
    let y_1 = current_node.y 

    let x_2 = node.x 
    let y_2 = node.y

   return ((Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2)) * size ) + current_node.distance
}

const update_node = node => {
    if(current_node.distance + size < node.distance){
        node.distance = find_distance(node)
    }
}

export {dijkstra , stop_dijkstra}