import { Block} from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , default_nodes , c , canvas , size , speed 

let open_list , close_list , current_node , myReq , finish_path

const greedy_best_first_search = props => {
    start_node = props.start_node
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

    // cancelAnimationFrame(myReq)
    clearTimeout(myReq)
    run_solve_maze()
}

const stop_greedy_best_first_search = () => {
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

    for(let node of close_list.values()){
        if(!end_node.prev_node){
            node.color = 'MediumBlue'
        }
        node.draw()
    }

    for(let node of open_list.values()){
        node.color = 'LightSkyBlue' 
        node.draw()
    }

    if(current_node && end_node.x === current_node.x && end_node.y === current_node.y){
        end_node.prev_node = current_node.prev_node
    }

    if(open_list.size > 0 && !end_node.prev_node){
        current_node = null
        for(let node of open_list.values()){
            if(current_node === null || node.h < current_node.h) current_node = node
        }
        close_list.set(`${current_node.x} , ${current_node.y}` , current_node)
        find_child_node()
    }

    if(end_node.prev_node){
        end_node.color = "SpringGreen"
        end_node.draw()
        find_path() 
    }
    if(finish_path){
        // cancelAnimationFrame(myReq)
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

    // open_list = open_list.filter(node => node.x === current_node.x && node.y === current_node.y ? false : true )
    open_list.delete(`${current_node.x} , ${current_node.y}`)
}

const add_node = (neighbor_node , wall_num) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        &&!close_list.has(`${neighbor_node.x} , ${neighbor_node.y}`)
    ){
        let {x , y} = neighbor_node
        if(!open_list.has(`${x} , ${y}`)) open_list.set(`${x} , ${y}` , set_node(neighbor_node))
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

const set_node = (node) => {
    let color = 'MediumBlue'
    let [x_1 , y_1] = [node.x , node.y]
    let [x_2 , y_2] = [end_node.x , end_node.y]   
    let h = Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2)
    let new_node = new Block(x_1 , y_1 , c , size , color , current_node , null , h )
    return new_node 
}

export {greedy_best_first_search , stop_greedy_best_first_search}

