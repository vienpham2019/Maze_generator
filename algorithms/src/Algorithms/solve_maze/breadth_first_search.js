import {Block} from '../helper_method'
import {get_top_right_bottom_left} from './helper_method/algorithms_helper_method'

let c , canvas , size , nodes , start_node , end_node 
    
let visited_nodes ,  quere , current_node , finish_path , myReq

const breadth_first_search = (props) => {
    c = props.c
    canvas = props.canvas 
    size = props.size 
    visited_nodes = []
    nodes = props.nodes 

    quere = []
    finish_path = false 
    current_node = null  
    start_node = props.start_node
    end_node = props.end_node

    end_node.prev_node = null

    quere.push(start_node)
    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_breadth_first_search = () => {
    cancelAnimationFrame(myReq)
}

const run_solve_maze = () => {
    myReq = requestAnimationFrame(run_solve_maze)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0; i < nodes.length; i ++){
        nodes[i].draw()
    }

    for(let i = 0; i < visited_nodes.length; i ++){
        visited_nodes[i].draw()
    }

    start_node.draw()
    end_node.draw()
    if(end_node.prev_node){
        find_path()
    }
    if(finish_path || !quere.length){
        cancelAnimationFrame(myReq)
    }
    if(!end_node.prev_node && !finish_path){
        solve_maze()
    }
}
  
const solve_maze = () => {
    let quere_nodes = [...quere]
    quere.shift()
    // visited_nodes_for_path.push(current_node)
    if(end_node.prev_node){
        return
    }
    for(let i = 0; i < quere_nodes.length ; i ++){
        check_neighbor_node(quere_nodes[i])
    }
}
  
const check_neighbor_node = (node) => {
    let current_find_node = nodes.find(c_n => c_n.x === node.x && c_n.y === node.y )
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
    if(neighbor_node && !current_find_node.walls[wall_num] && !visited_nodes.find(n => n.x === neighbor_node.x && n.y === neighbor_node.y)){
        let {x , y} = neighbor_node
        if(x === end_node.x && y === end_node.y){
            end_node.prev_node = node 
            current_node = node 
        }else{
            let new_block = new Block(x, y , c , size , color, node)
            quere.push(new_block)
            visited_nodes.push(new_block)
        }
    }
    return 
}
  
const find_path = () => {
    current_node.color = "LimeGreen"
    if(current_node.x === start_node.x && current_node.y === start_node.y){
        finish_path = true
        return
    }
    current_node = current_node.prev_node
}

export { breadth_first_search ,  stop_breadth_first_search}

