import { Block } from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , c , canvas , size 

let close_list_1 , close_list_2 , open_list_1 , current_node_1 , open_list_2, current_node_2 , myReq , finish_path , finish_search 

const bidirectional_dijkstra = props => {
    start_node = props.start_node
    start_node.distance = 0
    end_node = props.end_node 
    nodes = props.nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 

    // end_node.prev_node = null
    
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

    print_close_and_open_list(close_list_1 , open_list_1 , 'MidnightBlue' , 'DeepSkyBlue')
    print_close_and_open_list(close_list_2 , open_list_2 , 'DarkCyan' , 'Cyan')

    if(open_list_2.length > 0 && !finish_search){
        current_node_2 = open_list_2.sort((a,b) => a.distance - b.distance)[0] 
        close_list_2.push(current_node_2)
        open_list_2 = find_child_node(current_node_2 , open_list_2 , close_list_2 , close_list_1)
    }

    if(open_list_1.length > 0 && !finish_search){
        current_node_1 = open_list_1.sort((a,b) => a.distance - b.distance)[0] 
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

    if(finish_path){
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
    let {top , right , bottom , left} = get_top_right_bottom_left(c_node , nodes , size)

    // Right (x + size , y)
    if(right && !right.walls[3] && !close_list.find(node => node.x === right.x  && node.y === right.y)){
        let right_in_open = open_list.find(n => n.x === right.x  && n.y === right.y)

        if(!check_for_mix_node(next_close_list , right.x , right.y)){
            right_in_open 
                ? update_node(right_in_open , c_node) 
                :  open_list.push(create_new_node(right , c_node))
        }
    }

    // top (x , y - size)
    if(top && !top.walls[2] && !close_list.find(node => node.x === top.x && node.y === top.y)){
        let top_in_open = open_list.find(n => n.x === top.x  && n.y === top.y)
        
        if(!check_for_mix_node(next_close_list , top.x , top.y)){
            top_in_open 
                ? update_node(top_in_open , c_node) 
                : open_list.push(create_new_node(top , c_node))
        }
    }

    // left (x - size , y )
    if(left && !left.walls[1] && !close_list.find(node => node.x === left.x && node.y === left.y)){
        let left_in_open = open_list.find(n => n.x === left.x  && n.y === left.y)
        
        if(!check_for_mix_node(next_close_list , left.x , left.y)){
            left_in_open 
                ? update_node(left_in_open , c_node) 
                : open_list.push(create_new_node(left , c_node))
        }
    }

    // bottom (x , y + size)
    if(bottom && !bottom.walls[0] &&!close_list.find(node => node.x === bottom.x && node.y === bottom.y)){
        let bottom_in_open = open_list.find(n => n.x === bottom.x  && n.y === bottom.y)
        
        if(!check_for_mix_node(next_close_list , bottom.x , bottom.y)){
            bottom_in_open 
                ? update_node(bottom_in_open , c_node) 
                :  open_list.push(create_new_node(bottom , c_node))
        }
    }

    return open_list.filter(node => node.x === c_node.x && node.y === c_node.y ? false : true )
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