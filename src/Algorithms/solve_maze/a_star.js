import { Block , Stack } from '../helper_method'
import {get_top_right_bottom_left , add_to_heap , remove_from_heap} from './helper_method/algorithms_helper_method'

let start_node , end_node , nodes , default_nodes , c , canvas , size , speed 

let open_list , close_list , current_node , myReq

const a_star = props => {
    start_node   = props.start_node 
    end_node = props.end_node 
    nodes = props.nodes
    default_nodes = props.default_nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 
    speed = props.speed

    end_node.prev_node = null

    // open_list = add_to_heap(start_node , [] , (a,b) => a.f < b.f)
    open_list = [start_node]
    close_list = new Stack()
    current_node = null 

    // cancelAnimationFrame(myReq)
    clearTimeout(myReq)
    run_solve_maze()
}

const stop_a_star = () => {
    // cancelAnimationFrame(myReq)
    clearTimeout(myReq)
}

const run_solve_maze = () => {
    // myReq = requestAnimationFrame(run_solve_maze)
    myReq = setTimeout(() => {
        run_solve_maze()
    }, speed);
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let node of default_nodes) {
        node.draw('silver')
    }

    for(let node of nodes){
        node.draw()
    }

    for(let node of close_list.values()){
        if(!end_node.prev_node){
            node.color = 'MediumBlue'
        }
        node.draw()
    }

    for(let node of open_list){
        node.color = 'LightSkyBlue'
        node.draw()
    }

    if(current_node && end_node.x === current_node.x && end_node.y === current_node.y){
        end_node.prev_node = current_node.prev_node
    }

    if(open_list.length > 0 && !end_node.prev_node){
        current_node = open_list.sort((a,b) => a.f - b.f).shift()
        // current_node = open_list[0]
        close_list.push(`${current_node.x} , ${current_node.y}` , current_node)
        find_child_node()
    }

    if(end_node.prev_node && current_node){
        current_node.color = "SpringGreen"
        current_node.draw()
        current_node = current_node.prev_node
    }

    if(!current_node){
        // cancelAnimationFrame(myReq)
        clearTimeout(myReq)
    }
}

const find_child_node = () => {

    // remove_from_heap(open_list , (a,b) => a.f < b.f)

    let {top , right , bottom , left} = get_top_right_bottom_left(current_node , nodes , size)

    // top (x , y - size)
    add_node(top , 2)

    // right (x + size , y)
    add_node(right , 3)

    // bottom (x , y + size)
    add_node(bottom , 0)

    // left (x - size , y )
    add_node(left , 1)
}

const add_node = (neighbor_node , wall_num) => {
    if(
        neighbor_node 
        && !neighbor_node.walls[wall_num] 
        &&  !close_list.has(`${neighbor_node.x} , ${neighbor_node.y}`)
    ){
        let {x , y} = neighbor_node
        let node_in_open = open_list.find(n => n.x === x  && n.y === y)
        let n_g = current_node.g + size

        if(node_in_open){
            if(node_in_open.g > n_g) update_node(node_in_open, n_g , current_node ) 
            // add_to_heap(current_node, open_list , (a,b) => a.f < b.f)
        }else{
            let new_node = set_node(neighbor_node, n_g)
            // add_to_heap(new_node, open_list , (a,b) => a.f < b.f)
            open_list.push(new_node)
        }
        // let new_node = set_node(neighbor_node, n_g)
        // add_to_heap(new_node, open_list , (a,b) => a.f < b.f)
    }
}

const set_node = (node, g) => {
    let color = 'MediumBlue'
    let [x_1 , y_1] = [node.x , node.y] 
    let [x_2 , y_2] = [end_node.x , end_node.y] 
    // let h = Math.floor(Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2))
    let h = Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2)
    let f = h + g 
    let new_node = new Block(x_1 , y_1 , c , size , color , current_node , g , h , f)
    return new_node 
}

const update_node = (node , g , parent) => {
    // console.log('new')
    // open_list = open_list.filter(n => n.x !== node.x && n.y !== node.y)
    node.g = g 
    node.f = g + node.h 
    node.parent = parent 
    // open_list.push(node)
}

export {a_star , stop_a_star}