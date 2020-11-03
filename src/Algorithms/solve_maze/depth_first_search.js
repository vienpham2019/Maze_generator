import {Block , Stack} from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let c , canvas , size ,  nodes, default_nodes , start_node , end_node , speed
    
let visited_nodes , stack , current_node ,  finish_path , myReq

const depth_first_search = (props) => {
    c = props.c
    canvas = props.canvas 
    size = props.size 
    nodes = props.nodes 
    default_nodes = props.default_nodes

    finish_path = false  
    start_node = props.start_node
    end_node = props.end_node
    speed = props.speed

    end_node.prev_node = null

    stack = new Stack()
    visited_nodes = new Map()
    visited_nodes.set(`${start_node.x} , ${start_node.y}` , start_node)
    current_node = start_node 

    stack.push(`${start_node.x} , ${start_node.y}` , start_node)
    // cancelAnimationFrame(myReq)
    clearTimeout(myReq)
    run_solve_maze()
}

const stop_depth_first_search = () => {
    // cancelAnimationFrame(myReq)
    clearTimeout(myReq)
}

const run_solve_maze = () => {
    // myReq = requestAnimationFrame(run_solve_maze)
    myReq = setTimeout(() => {
        run_solve_maze()
    }, speed);
    c.clearRect(0,0,canvas.width, canvas.height)
    for(let node of default_nodes.values()){
        node.draw('silver')
    }
    
    for(let node of nodes.values()){
        node.draw()
    }

    for(let v_node of visited_nodes.values()){
        if(!end_node.prev_node){
            v_node.color = 'MediumBlue' 
        }
        v_node.draw()
    }

    if(!end_node.prev_node){
        for(let node of stack.values()){
            node.color = 'LightSkyBlue' 
            node.draw()
        }
    }

    if(stack.count > 0 && !end_node.prev_node){
        current_node = stack.peek()
        if(!check_neighbor_node()){
            stack.pop()
        }
    }

    if(end_node.prev_node){
        end_node.color = "SpringGreen"
        end_node.draw()
        find_path() 
    }

    if(finish_path){
        clearTimeout(myReq)
    }
}

const find_path = () => {
    current_node.color = "SpringGreen"
    if(current_node.x === start_node.x && current_node.y === start_node.y){
        start_node.color = "SpringGreen"
        start_node.draw()
        finish_path = true
        return
    }
    current_node = current_node.prev_node
}

const check_neighbor_node = () => {
    let {top , right , bottom , left } = get_top_right_bottom_left(current_node , nodes , size)

    // bottom
    if(add_node(bottom , 0)) return true 

    // right
    if(add_node(right , 3)) return true 

    // top 
    if(add_node(top , 2)) return true 

    // left 
    if(add_node(left , 1)) return true 

    return false 
}

const add_node = (neighbor_node, wall_num) => {
    let color = 'MediumBlue'
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        && !visited_nodes.has(`${neighbor_node.x} , ${neighbor_node.y}`)
    ){
        let {x , y} = neighbor_node
        if(x === end_node.x && y === end_node.y){
            end_node.prev_node = current_node
        }else{
            let new_block = new Block(x, y, c , size ,color , current_node)
            stack.push(`${new_block.x} , ${new_block.y}` , new_block)
            visited_nodes.set(`${new_block.x} , ${new_block.y}` , new_block)
        }
        return true 
    }
    return false 
}

export { depth_first_search ,  stop_depth_first_search}