import { Block , Stack} from '../helper_method'

import {get_top_right_bottom_left } from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , default_nodes, c , canvas , size , speed 

let open_list , close_list , current_node , myReq , finish_path

const dijkstra = props => {
    start_node = props.start_node
    start_node.distance = 0
    end_node = props.end_node 
    nodes = props.nodes
    default_nodes = props.default_nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 
    speed = props.speed 

    end_node.prev_node = null
    
    open_list = new Map([
        [`${start_node.x} , ${start_node.y}` , start_node]
    ])
    close_list = new Map()
    current_node = null 
    finish_path = false 

    clearTimeout(myReq)
    run_solve_maze()
}

const stop_dijkstra = () => {
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

    for(let node of close_list.values()){
        if(!end_node.prev_node){
            node.color = 'MediumBlue'
        }
        node.draw()
    }

    for(let node of open_list.values()){
        if(!end_node.prev_node){
            node.color = 'LightSkyBlue' 
        }
        node.draw()
    }

    if(current_node && end_node.x === current_node.x && end_node.y === current_node.y){
        end_node.prev_node = current_node.prev_node
    }

    if(open_list.size > 0 && !end_node.prev_node){
        let remove_key = null 
        for(let [key , node] of open_list){
            if(remove_key === null || node.distance < current_node.distance) {
                remove_key = key 
                current_node = node
            }
        }
        open_list.delete(remove_key)

        close_list.set(`${current_node.x} , ${current_node.y}` , current_node)
        find_child_node()
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

}

const add_node = (neighbor_node , wall_num) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        &&!close_list.has(`${neighbor_node.x} , ${neighbor_node.y}`)
    ){
        let {x , y} = neighbor_node
        let node_in_open = open_list.get(`${x} , ${y}`)
        
        if(node_in_open){
            update_node(node_in_open)
        }else{
            let new_node = create_new_node(neighbor_node)
            open_list.set(`${new_node.x} , ${new_node.y}` , new_node)
        }
            
    }
}

const find_path = () => {
    current_node.color = "SpringGreen"
    if(!current_node.prev_node){
        start_node.color = "SpringGreen"
        start_node.draw()
        finish_path = true
        return
    }
    current_node = current_node.prev_node
    return 
}

const create_new_node = (node) => {
    let distance = find_distance(node)
    return new Block(node.x , node.y , c , size , 'MediumBlue' , current_node , null , null , null , distance)
}

const find_distance = (node) => {
    // find distance from current node to next node 
    let [x_1 , y_1] = [current_node.x , current_node.y ]

    let [x_2 , y_2] = [node.x , node.y]

   return Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2) + current_node.distance
}

const update_node = node => {
    if(current_node.distance + size < node.distance){
        node.distance = find_distance(node)
    }
}

export {dijkstra , stop_dijkstra}