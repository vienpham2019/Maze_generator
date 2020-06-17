import {Block} from '../helper_method'
let 
    c , 
    canvas , 
    size , 
    visited_nodes , 
    nodes , 
    stack , 
    current_node , 
    start_node , 
    end_node , 
    finish_path , 
    myReq

const depth_first_search = (props) => {
    c = props.c
    canvas = props.canvas 
    size = props.size 
    nodes = props.nodes 

    finish_path = false  
    start_node = props.start_node
    end_node = props.end_node

    stack = [start_node]
    visited_nodes = [start_node]
    current_node = start_node 

    stack.push(start_node)
    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_depth_first_search = () => {
    cancelAnimationFrame(myReq)
}

const run_solve_maze = () => {
    myReq = requestAnimationFrame(run_solve_maze)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0; i < nodes.length; i ++){
        nodes[i].draw()
    }

    for(let i = 0 ; i < visited_nodes.length; i ++){
        if(!end_node.prev_node){
            visited_nodes[i].color = "MidnightBlue"
        }
        visited_nodes[i].draw()
    }

    if(!end_node.prev_node){
        for(let i = 0 ; i < stack.length ; i ++){
            stack[i].color = 'DeepSkyBlue' 
            stack[i].draw()
        }
    }

    if(stack.length > 0 && !end_node.prev_node){
        current_node = stack[0]
        let is_neighbor = check_neighbor_node()
        if(!is_neighbor){
            stack.shift()
        }
    }

    if(end_node.prev_node){
        start_node.draw()
        end_node.draw()
        find_path() 
    }

    if(finish_path){
        cancelAnimationFrame(myReq)
    }
}

const find_path = () => {
    current_node.color = "LimeGreen"
    if(current_node.x === start_node.x && current_node.y === start_node.y){
        finish_path = true
        return
    }
    current_node = current_node.prev_node
}

const check_neighbor_node = () => {
    let {x , y} = current_node // block 
    let color = "MidnightBlue"
    let current_find_node = nodes.find(c_n => c_n.x === x && c_n.y === y )

    // bottom
    let bottom = nodes.find(n => n.x === x && n.y === y + size ) 
    if(bottom && !current_find_node.walls[2] && !visited_nodes.find(n => n.x === bottom.x  && n.y === bottom.y )){
        let bottom_x = bottom.x 
        let bottom_y = bottom.y 
        if(bottom_x === end_node.x && bottom_y === end_node.y){
            end_node.prev_node = current_node
        }else{
            let bottom_block = new Block(bottom_x, bottom_y, c , size ,color , current_node)
            stack = [bottom_block,...stack]
            visited_nodes.push(bottom_block)
            // current_node = bottom_block
        }
        return true 
    }

    // right
    let right = nodes.find(n => n.x === x + size && n.y === y )
    if(right && !current_find_node.walls[1] && !visited_nodes.find(n => n.x === right.x  && n.y === right.y)){
        let right_x = right.x 
        let right_y = right.y 
        if(right_x === end_node.x && right_y === end_node.y){
            end_node.prev_node = current_node 
        }else{
            let right_block = new Block(right_x, right_y, c , size , color ,current_node)
            stack = [right_block,...stack]
            visited_nodes.push(right_block)
            // current_node = right_block
        }
        return true 
    }

    // top 
    let top = nodes.find(n => n.x === x && n.y === y - size)
    if(top && !current_find_node.walls[0] && !visited_nodes.find(n => n.x === top.x && n.y === top.y)){
        let top_x = top.x
        let top_y = top.y
        if(top_x === end_node.x && top_y === end_node.y){
            end_node.prev_node = current_node
        }else{
            let top_block = new Block(top_x, top_y , c , size , color, current_node)
            stack = [top_block,...stack]
            visited_nodes.push(top_block)
            // current_node = top_block
        }
        return true
    }

    // left 
    let left = nodes.find(n => n.x === x - size && n.y === y)
    if(left && !current_find_node.walls[3] && !visited_nodes.find(n => n.x === left.x && n.y === left.y)){
        let left_x = left.x 
        let left_y = left.y 
        if(left_x === end_node.x && left_y === end_node.y){
            end_node.prev_node = current_node 
        }else{
            let left_block = new Block(left_x,left_y, c, size , color , current_node)
            stack = [left_block,...stack]
            visited_nodes.push(left_block)
            // current_node = left_block
        }
        return true 
    }

    return false 
}

export { depth_first_search ,  stop_depth_first_search}