import {Block} from '../helper_method'
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
    if(finish_path){
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
    let x = node.x
    let y = node.y
    let color = "MidnightBlue"
    let current_find_node = nodes.find(c_n => c_n.x === node.x && c_n.y === node.y )
    // top 
    let top = nodes.find(n => n.x === x && n.y === y - size)
    if(top && !current_find_node.walls[0] && !visited_nodes.find(n => n.x === top.x && n.y === top.y)){
        let top_x = top.x
        let top_y = top.y
        if(top_x === end_node.x && top_y === end_node.y){
            end_node.prev_node = node 
            current_node = node 
            return 
        }else{
            let top_block = new Block(top_x, top_y , c , size , color, node)
            quere.push(top_block)
            visited_nodes.push(top_block)
        }
    }

    // right
    let right = nodes.find(n => n.x === x + size && n.y === y )
    if(right && !current_find_node.walls[1] && !visited_nodes.find(n => n.x === right.x  && n.y === right.y)){
        let right_x = right.x 
        let right_y = right.y 
        if(right_x === end_node.x && right_y === end_node.y){
            end_node.prev_node = node 
            current_node = node 
            return 
        }else{
            let right_block = new Block(right_x, right_y, c , size , color ,node)
            quere.push(right_block)
            visited_nodes.push(right_block)
        }
    }

    // bottom
    let bottom = nodes.find(n => n.x === x && n.y === y + size ) 
    if(bottom && !current_find_node.walls[2] && !visited_nodes.find(n => n.x === bottom.x  && n.y === bottom.y )){
        let bottom_x = bottom.x 
        let bottom_y = bottom.y 
        if(bottom_x === end_node.x && bottom_y === end_node.y){
            end_node.prev_node = node 
            current_node = node 
            return 
        }else{
            let bottom_block = new Block(bottom_x, bottom_y, c , size ,color ,node)
            quere.push(bottom_block)
            visited_nodes.push(bottom_block)
        }
    }

    // left 
    let left = nodes.find(n => n.x === x - size && n.y === y)
    if(left && !current_find_node.walls[3] && !visited_nodes.find(n => n.x === left.x && n.y === left.y)){
        let left_x = left.x 
        let left_y = left.y 
        if(left_x === end_node.x && left_y === end_node.y){
            end_node.prev_node = node 
            current_node = node 
            return 
        }else{
            let left_block = new Block(left_x,left_y, c, size , color , node)
            quere.push(left_block)
            visited_nodes.push(left_block)
        }
    }
}
  
const find_path = () => {
    current_node.color = "green"
    if(current_node.x === start_node.x && current_node.y === start_node.y){
        finish_path = true
        return
    }
    current_node = current_node.prev_node
}

export { breadth_first_search ,  stop_breadth_first_search}

