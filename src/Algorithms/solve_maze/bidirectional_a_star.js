import { Block } from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , default_nodes , c , canvas , size , speed 

let open_list_1 , close_list_1 , current_node_1 , open_list_2 , close_list_2 , current_node_2 , myReq , finish_path , finish_search 

const bidirectional_a_star = props => {
    start_node = props.start_node
    end_node = props.end_node 
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

    current_node_1 = null 
    current_node_2 = null 

    finish_path = false 
    finish_search = false 

    clearTimeout(myReq)
    run_solve_maze()
}

const stop_bidirectional_a_star = () => {
    clearTimeout(myReq)
}

const run_solve_maze = () => {
    myReq = setTimeout(() => {
        run_solve_maze()
    }, speed);
    c.clearRect(0,0,canvas.width, canvas.height)
    
    for(let node of default_nodes.values()) {
        node.draw('silver')
    }

    for(let node of nodes.values()){
        node.draw()
    }

    print_close_and_open_list(close_list_1 , open_list_1 , 'MediumBlue' , 'LightSkyBlue' )
    print_close_and_open_list(close_list_2 , open_list_2 , 'CadetBlue' , 'LightCyan')

    if(open_list_1.size > 0 && !finish_search){
        find_current_node(open_list_1 , 1)

        close_list_1.set(`${current_node_1.x} , ${current_node_1.y}` , current_node_1)
        open_list_1 = find_child_node(current_node_1 , end_node, open_list_1 , close_list_1 , close_list_2)
    }

    if(open_list_2.size > 0 && !finish_search){
        find_current_node(open_list_2 , 2)

        close_list_2.set(`${current_node_2.x} , ${current_node_2.y}` , current_node_2)
        open_list_2 = find_child_node(current_node_2 , start_node, open_list_2 , close_list_2 , close_list_1)
    }

    if(finish_search){
        start_node.draw()
        end_node.draw()

        if(!current_node_1 && !current_node_2) finish_path = true
        find_path() 
    }

    if(finish_path){
        clearTimeout(myReq)
    }
}

const find_current_node = (list , list_num) => {
    let c_node = null 
    let remove_key = null
    for(let [key , node] of list){
        if(c_node === null || node.f < c_node.f){
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

const print_close_and_open_list = (close_list , open_list , close_color , open_color) => {
    if(!finish_search){
        for(let open_node of open_list.values()){
            open_node.color = open_color
            open_node.draw()
        }
    }

    for(let close_node of close_list.values()){
        if(!finish_search) close_node.color = close_color 
        close_node.draw()
    }
}

const check_for_mix_node = (target_close_list , x , y) => {
    let node = target_close_list.get(`${x} , ${y}`)
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

const find_child_node = (c_node , target_node , open_list , close_list , target_close_list) => {

    let {top , right , bottom , left} = get_top_right_bottom_left(c_node , nodes , size)

    // right (x + size , y)
    add_node(c_node , right , 3 , close_list , open_list , target_close_list , target_node)

    // top (x , y - size)
    add_node(c_node , top , 2 , close_list , open_list , target_close_list , target_node)

    // left (x - size , y )
    add_node(c_node , left , 1 , close_list , open_list , target_close_list , target_node)

    // bottom (x , y + size)
    add_node(c_node , bottom , 0 , close_list , open_list , target_close_list , target_node)

    return open_list
}

const add_node = (c_node , neighbor_node , wall_num , close_list , open_list , target_close_list , target_node) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        && !close_list.has(`${neighbor_node.x} , ${neighbor_node.y}`)
    ){
        let {x , y} = neighbor_node 
        let node_in_open = open_list.get(`${x} , ${y}`)
        let n_g = c_node.g + size

        if(!check_for_mix_node(target_close_list , x , y)){
            if(node_in_open){ 
                if(n_g < node_in_open.g) update_node(node_in_open, n_g , c_node )
            }else{
                let new_node = set_node(neighbor_node , n_g , c_node , target_node)
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

const set_node = (node, g , c_node , target_node) => {
    let color = "MediumBlue"
    let [x_1 , y_1] = [node.x , node.y] 
    let [x_2 , y_2] = [target_node.x , target_node.y]  
    let h = Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2) 
    let f = h + g 
    let new_node = new Block(x_1 , y_1 , c , size , color , c_node , g , h , f)
    return new_node 
}

const update_node = (node , g , parent) => {
    node.g = g 
    node.f = g + node.h 
    node.parent = parent 
}

export {bidirectional_a_star , stop_bidirectional_a_star}