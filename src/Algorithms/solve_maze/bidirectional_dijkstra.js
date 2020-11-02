import { Block , Stack } from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , default_nodes , c , canvas , size , speed  

let close_list_1 , close_list_2 , open_list_1 , current_node_1 , open_list_2, current_node_2 , myReq , finish_path , finish_search 

const bidirectional_dijkstra = props => {
    start_node = props.start_node
    start_node.distance = 0
    
    end_node = props.end_node 
    end_node.distance = 0

    nodes = props.nodes
    default_nodes = props.default_nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 
    speed = props.speed 
    
    open_list_1 = new Map([
        [`${start_node.x} , ${start_node.y}` , start_node]
    ])
    close_list_1 = new Map()

    open_list_2 = new Map([
        [`${end_node.x} , ${end_node.y}` , end_node]
    ])
    close_list_2 = new Map()

    current_node_1 = start_node
    current_node_2 = end_node 

    finish_path = false 
    finish_search = false 

    clearTimeout(myReq)
    run_solve_maze()
}

const stop_bidirectional_dijkstra = () => {
    clearTimeout(myReq)
}

const run_solve_maze = () => {
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

    print_close_and_open_list(close_list_1 , open_list_1 , 'MediumBlue' , 'LightSkyBlue' )
    print_close_and_open_list(close_list_2 , open_list_2 , 'CadetBlue' , 'LightCyan')

    if(open_list_2.size > 0 && !finish_search){
        find_current_node(open_list_2 , 2)
        close_list_2.set(`${current_node_2.x} , ${current_node_2.y}` , current_node_2)
        open_list_2 = find_child_node(current_node_2 , open_list_2 , close_list_2 , close_list_1)
    }

    if(open_list_1.size > 0 && !finish_search){
        find_current_node(open_list_1 , 1)
        close_list_1.set(`${current_node_1.x} , ${current_node_1.y}` , current_node_1)
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
        // cancelAnimationFrame(myReq)
        clearTimeout(myReq)
    }
}

const find_current_node = (list , list_num) => {
    let c_node = null 
    let remove_key = null 
    for(let [key , node] of list){
        if(c_node === null || node.distance < c_node.distance) {
            c_node = node 
            remove_key = key 
        } 
    }
    list.delete(remove_key)
    if(list_num === 1){
        open_list_1 = list 
        current_node_1 = c_node 
    }else{
        open_list_2 = list 
        current_node_2 = c_node 
    }
}

const print_close_and_open_list = (close_list , open_list , close_color , open_color ) => {
    if(!finish_search){
        for(let open_node of open_list.values()){
            open_node.color = open_color
            open_node.draw()
        }
    }

    for(let close_node of close_list.values()){
        if(!finish_search){
            close_node.color = close_color 
        }
        close_node.draw()
    }
}

const check_for_mix_node = (next_close_list , x , y) => {
    let node = next_close_list.get(`${x} , ${y}`)
    if(node){
        finish_search = true 
        if(close_list_1.has(`${x} , ${y}`)){
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
    add_node(right , c_node , 3 , close_list , open_list , next_close_list) // 3

    // top (x , y - size)
    add_node(top , c_node , 2 , close_list , open_list , next_close_list) // 2

    // left (x - size , y )
    add_node(left , c_node , 1 , close_list , open_list , next_close_list) // 1

    // bottom (x , y + size)
    add_node(bottom , c_node , 0 , close_list , open_list , next_close_list) // 0

    return open_list
}

const add_node = (neighbor_node , c_node , wall_num , close_list , open_list , neighbor_close_list) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        &&!close_list.has(`${neighbor_node.x} , ${neighbor_node.y}`)
        ){
        let {x , y} = neighbor_node
        let node_in_open = open_list.get(`${x} , ${y}`)
        
        if(!check_for_mix_node(neighbor_close_list , x , y)){
            if(node_in_open){
                update_node(node_in_open , c_node) 
            } else{
                let new_node = create_new_node(neighbor_node , c_node)
                open_list.set(`${new_node.x} , ${new_node.y}` , new_node)
            }
        }
    }
    return open_list
}

const find_path = () => {
    let color = "SpringGreen"
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
    let [ x_1 , y_1 ]= [ c_node.x , c_node.y ] 

    let [ x_2 , y_2 ] = [ node.x , node.y ] 

   return Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2) + c_node.distance
}

const update_node = (node , c_node) => {
    if(c_node.distance + size < node.distance){
        node.distance = find_distance(node , c_node)
    }
    return node
}

export {bidirectional_dijkstra , stop_bidirectional_dijkstra}