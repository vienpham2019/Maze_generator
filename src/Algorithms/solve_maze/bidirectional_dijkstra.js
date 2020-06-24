import { Block } from '../helper_method'
import {get_top_right_bottom_left , add_to_heap , remove_from_heap} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , c , canvas , size 

let close_list_1 , close_list_2 , open_list_1 , current_node_1 , open_list_2, current_node_2 , myReq , finish_path , finish_search 

const bidirectional_dijkstra = props => {
    start_node = props.start_node
    start_node.distance = 0
    
    end_node = props.end_node 
    end_node.distance = 0

    nodes = props.nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 
    
    open_list_1 = [start_node]
    close_list_1 = []

    open_list_2 = [end_node]
    close_list_2 = []

    current_node_1 = start_node
    current_node_2 = end_node 

    finish_path = false 
    finish_search = false 

    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_bidirectional_dijkstra = () => {
    cancelAnimationFrame(myReq)
}

const run_solve_maze = () => {
    myReq = requestAnimationFrame(run_solve_maze)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0 ; i < nodes.length ; i ++){
        nodes[i].draw()
    }

    print_close_and_open_list(close_list_1 , open_list_1 , 'MediumBlue' , 'LightSkyBlue' )
    print_close_and_open_list(close_list_2 , open_list_2 , 'CadetBlue' , 'LightCyan')

    if(open_list_2.length > 0 && !finish_search){
        current_node_2 = open_list_2[0] 
        close_list_2.push(current_node_2)
        open_list_2 = find_child_node(current_node_2 , open_list_2 , close_list_2 , close_list_1)
    }

    if(open_list_1.length > 0 && !finish_search){
        current_node_1 = open_list_1[0] 
        close_list_1.push(current_node_1)
        open_list_1 = find_child_node(current_node_1 , open_list_1 , close_list_1 , close_list_2)
    }

    if(finish_search){
        start_node.draw()
        end_node.draw()

        if(!current_node_1 && !current_node_2){
            finish_path = true
        }

        find_path() 
    }

    if(finish_path || (!open_list_1.length && !open_list_2.length)){
        cancelAnimationFrame(myReq)
    }
}

const print_close_and_open_list = (close_list , open_list , close_color , open_color ) => {
    if(!finish_search){
        for(let i = 0 ; i < open_list.length ; i ++){
            open_list[i].color = open_color
            open_list[i].draw()
        }
    }

    for(let i = 0 ; i < close_list.length ; i ++){
        if(!finish_search){
            close_list[i].color = close_color 
        }
        close_list[i].draw()
    }
}

const check_for_mix_node = (next_close_list , x , y) => {
    let node = next_close_list.find(node => node.x === x && node.y === y)
    if(node){
        finish_search = true 
        if(close_list_1.find(node => node.x === x  && node.y === y)){
            current_node_1 = node
        }else{
            current_node_2 = node
        }
        return true 
    }
    return false 
}

const find_child_node = (c_node , open_list , close_list , next_close_list) => {
    open_list = remove_from_heap(open_list , (a,b) => a.distance < b.distance)
    let {top , right , bottom , left} = get_top_right_bottom_left(c_node , nodes , size)

    // Right (x + size , y)
    open_list = add_node(right , c_node , 3 , close_list , open_list , next_close_list) // 3

    // top (x , y - size)
    open_list = add_node(top , c_node , 2 , close_list , open_list , next_close_list) // 2

    // left (x - size , y )
    open_list = add_node(left , c_node , 1 , close_list , open_list , next_close_list) // 1

    // bottom (x , y + size)
    open_list = add_node(bottom , c_node , 0 , close_list , open_list , next_close_list) // 0

    return open_list
}

const add_node = (neighbor_node , c_node , wall_num , close_list , open_list , neighbor_close_list) => {
    if(neighbor_node && !neighbor_node.walls[wall_num] &&!close_list.find(node => node.x === neighbor_node.x && node.y === neighbor_node.y)){
        let {x , y} = neighbor_node
        let node_in_open = open_list.find(n => n.x === x  && n.y === y)
        
        if(!check_for_mix_node(neighbor_close_list , x , y)){
            if(node_in_open){
                update_node(node_in_open , c_node) 
            } else{
                let new_node = create_new_node(neighbor_node , c_node)
                open_list = add_to_heap(new_node , open_list , (a,b) => a.distance < b.distance)
            }
        }
    }
    return open_list
}

const find_path = () => {
    let color = "LimeGreen"
    if(current_node_1){
        current_node_1.color = color
        current_node_1 = current_node_1.prev_node
    }
    if(current_node_2){
        current_node_2.color = color
        current_node_2 = current_node_2.prev_node 
    }
}

const create_new_node = (node , c_node) => {
    let distance = find_distance(node , c_node)
    return new Block(node.x , node.y , c , size , 'MidnightBlue' , c_node , null , null , null , distance)
}

const find_distance = (node , c_node) => {
    // find distance from current node to next node 
    let x_1 = c_node.x 
    let y_1 = c_node.y

    let x_2 = node.x 
    let y_2 = node.y

   return ((Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2)) * size ) + c_node.distance
}

const update_node = (node , c_node) => {
    if(c_node.distance + size < node.distance){
        node.distance = find_distance(node , c_node)
    }
    return node
}

export {bidirectional_dijkstra , stop_bidirectional_dijkstra}