import {Block} from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let c , canvas , size , nodes, default_nodes , start_node , end_node , speed 
    
let visited_nodes ,  quere , current_node , finish_path , myReq

const breadth_first_search = (props) => {
    c = props.c
    canvas = props.canvas 
    size = props.size 
    visited_nodes = new Map()
    nodes = props.nodes 
    default_nodes = props.default_nodes

    quere = []
    finish_path = false 
    current_node = null  
    start_node = props.start_node
    end_node = props.end_node

    end_node.prev_node = null

    speed = props.speed 

    quere.push(start_node)
    // cancelAnimationFrame(myReq)
    clearTimeout(myReq)
    run_solve_maze()
}

const stop_breadth_first_search = () => {
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
        v_node.draw()
    }

    if(end_node.prev_node && !finish_path){
        end_node.color = "SpringGreen"
        end_node.draw()
        find_path()
    }
    
    if(finish_path){
        // cancelAnimationFrame(myReq)
        clearTimeout(myReq)
    }
    if(!end_node.prev_node && !finish_path){
        solve_maze()
    }
}
  
const solve_maze = () => {
    let quere_nodes = quere.slice()
    quere.shift()
    // visited_nodes_for_path.push(current_node)
    if(end_node.prev_node){
        return
    }
    for(let node of quere_nodes){
        check_neighbor_node(node)
    }
}
  
const check_neighbor_node = (node) => {
    let current_find_node = nodes.get(`${node.x} , ${node.y}`)
    let { top , right , bottom , left } = get_top_right_bottom_left(node , nodes , size)
    // top 
    add_node(top , node , 0 , current_find_node)

    // right
    add_node(right , node , 1 , current_find_node)

    // bottom
    add_node(bottom , node , 2 , current_find_node)

    // left 
    add_node(left , node , 3 , current_find_node)
}

const add_node = (neighbor_node , node , wall_num , current_find_node) => {
    let color = 'MediumBlue' 
    if(
        neighbor_node 
        && !current_find_node.walls[wall_num] 
        && !visited_nodes.has(`${neighbor_node.x} , ${neighbor_node.y}`)
        ){
        let {x , y} = neighbor_node
        if(x === end_node.x && y === end_node.y){
            end_node.prev_node = node 
            current_node = node 
        }else{
            let new_block = new Block(x, y , c , size , color, node)
            quere.push(new_block)
            visited_nodes.set(`${new_block.x} , ${new_block.y}` , new_block)
        }
    }
    return 
}
  
const find_path = () => {
    current_node.color = "SpringGreen"
    if(!current_node.prev_node){
        start_node.color = "SpringGreen"
        start_node.draw()
        finish_path = true
    }
    current_node = current_node.prev_node
}

export { breadth_first_search ,  stop_breadth_first_search}

