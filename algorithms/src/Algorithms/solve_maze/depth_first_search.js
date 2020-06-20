import {Block} from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let c , canvas , size ,  nodes , start_node , end_node 
    
let visited_nodes , stack , current_node ,  finish_path , myReq

const depth_first_search = (props) => {
    c = props.c
    canvas = props.canvas 
    size = props.size 
    nodes = props.nodes 

    finish_path = false  
    start_node = props.start_node
    end_node = props.end_node

    end_node.prev_node = null

    stack = [start_node]
    visited_nodes = [start_node]
    current_node = start_node 

    stack.push(start_node)
    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_depth_first_search = () => {
    cancelAnimationFrame(myReq)
}

const run_solve_maze = () => {
    myReq = requestAnimationFrame(run_solve_maze)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0; i < nodes.length; i ++){
        nodes[i].draw()
    }

    for(let i = 0 ; i < visited_nodes.length; i ++){
        if(!end_node.prev_node){
            visited_nodes[i].color = 'MediumBlue' 
        }
        visited_nodes[i].draw()
    }

    if(!end_node.prev_node){
        for(let i = 0 ; i < stack.length ; i ++){
            stack[i].color = 'LightSkyBlue' 
            stack[i].draw()
        }
    }

    if(stack.length > 0 && !end_node.prev_node){
        current_node = stack[0]
        if(!check_neighbor_node()){
            stack.shift()
        }
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

const find_path = () => {
    current_node.color = "LimeGreen"
    if(current_node.x === start_node.x && current_node.y === start_node.y){
        finish_path = true
        return
    }
    current_node = current_node.prev_node
}

const check_neighbor_node = () => {
    let {x , y} = current_node // block 
    // let color = "MidnightBlue"
    let current_find_node = nodes.find(c_n => c_n.x === x && c_n.y === y )
    let {top , right , bottom , left } = get_top_right_bottom_left(current_node , nodes , size)

    // bottom
    if(add_node(bottom , current_find_node , 2)) return true 

    // right
    if(add_node(right , current_find_node , 1)) return true 

    // top 
    if(add_node(top , current_find_node , 0)) return true 

    // left 
    if(add_node(left , current_find_node , 3)) return true 

    return false 
}

const add_node = (neighbor_node , current_find_node , wall_num) => {
    let color = 'MediumBlue'
    if(
        neighbor_node 
        && !current_find_node.walls[wall_num] 
        && !visited_nodes.find(n => n.x === neighbor_node.x  && n.y === neighbor_node.y)
    ){
        let {x , y} = neighbor_node
        if(x === end_node.x && y === end_node.y){
            end_node.prev_node = current_node
        }else{
            let new_block = new Block(x, y, c , size ,color , current_node)
            stack = [new_block,...stack]
            visited_nodes.push(new_block)
        }
        return true 
    }
    return false 
}

export { depth_first_search ,  stop_depth_first_search}