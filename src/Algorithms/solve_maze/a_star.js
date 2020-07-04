import { Block } from '../helper_method'
import {get_top_right_bottom_left , add_to_heap , remove_from_heap} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , c , canvas , size 

let open_list , close_list , current_node , myReq

const a_star = props => {
    start_node = props.start_node
    end_node = props.end_node 
    nodes = props.nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 

    end_node.prev_node = null

    open_list = add_to_heap(start_node , [] , (a,b) => a.f < b.f)
    close_list = []
    current_node = null 

    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_a_star = () => {
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
            close_list[i].color = 'MediumBlue'
        }
        close_list[i].draw()
    }

    for(let i = 0 ; i < open_list.length ; i ++){
        open_list[i].color = 'LightSkyBlue'
        open_list[i].draw()
    }

    if(current_node && end_node.x === current_node.x && end_node.y === current_node.y){
        end_node.prev_node = current_node.prev_node
    }

    if(open_list.length > 0 && !end_node.prev_node){
        current_node = open_list[0]
        close_list.push(current_node)
        find_child_node()
    }

    if(end_node.prev_node && current_node){
        current_node.color = "SpringGreen"
        current_node.draw()
        current_node = current_node.prev_node
    }

    if(!current_node){
        cancelAnimationFrame(myReq)
    }
}

const find_child_node = () => {

    open_list = remove_from_heap(open_list , (a,b) => a.f < b.f)
    let {top , right , bottom , left} = get_top_right_bottom_left(current_node , nodes , size)

    // right (x + size , y)
    add_node(right , 3)

    // top (x , y - size)
    add_node(top , 2)

    // left (x - size , y )
    add_node(left , 1)

    // bottom (x , y + size)
    add_node(bottom , 0)
}

const add_node = (neighbor_node , wall_num) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        &&  !close_list.find(node => node.x === neighbor_node.x && node.y === neighbor_node.y)
    ){
        let {x , y} = neighbor_node
        let node_in_open = open_list.find(n => n.x === x  && n.y === y)
        let n_g = current_node.g + size 

        if(node_in_open && n_g < node_in_open.g){
            update_node(node_in_open, n_g , current_node )
        }else{
            let new_node = set_node(neighbor_node, n_g)
            open_list = add_to_heap(new_node, open_list , (a,b) => a.f < b.f)
        }
    }
}

const set_node = (node, g) => {
    let color = 'MediumBlue'
    let x_1 = node.x 
    let y_1 = node.y 
    let x_2 = end_node.x 
    let y_2 = end_node.y    
    let h = (Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2)) * size 
    let f = h + g 
    let new_node = new Block(x_1 , y_1 , c , size , color , current_node , g , h , f)
    return new_node 
}

const update_node = (node , g , parent) => {
    node.g = g 
    node.f = g + node.h 
    node.parent = parent 
}

export {a_star , stop_a_star}