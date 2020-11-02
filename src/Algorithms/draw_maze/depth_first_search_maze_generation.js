import {Block} from '../helper_method'

let nodes , default_nodes , canvas , c , stack , size , cols , rows , frame_per_second , speed 

let block , myReq , visited_nodes , width , height 

const depth_first_search_maze = props => {
    nodes = props.nodes 
    default_nodes = props.default_nodes
    canvas = props.canvas 
    c = props.c 
    stack = props.stack
    size = props.size
    cols = props.cols 
    rows = props.rows
    frame_per_second = props.frame_per_second
    speed = props.speed

    block = new Block(size / 2,size / 2 , c , size)

    width = cols * size 
    height = rows * size  

    let start_node = nodes.get(`${size / 2} , ${size / 2}`)

    visited_nodes = new Map([
        [`${start_node.x} , ${start_node.y}`, start_node]
    ])

    clearInterval(myReq)
    draw_maze()
}

const stop_depth_first_search_draw_maze = () => {
    clearInterval(myReq)
}

const draw_maze = () => {
    myReq = setTimeout(() => {
        draw_maze()
    }, frame_per_second / speed);
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let node of default_nodes.values()){
        node.draw('silver')
    }
    
    for(let node of nodes.values()){
        node.draw()
    }

    if(stack.length === 0){
        clearInterval(myReq)
    }else{ 
        move_block()  
    }
}

const move_block = () => {
    let current_node = stack[0]
    let neighbor_nodes = []
    let x = current_node.x
    let y = current_node.y

    // top
    if(y - size > 0 && !visited_nodes.has(`${x} , ${y - size}`)){
        let top = nodes.get(`${x} , ${y - size}`)
        neighbor_nodes.push(top)
    }

    // right 
    if(x + size < width && !visited_nodes.has(`${x + size} , ${y}`)){
        let right = nodes.get(`${x + size} , ${y}`)
        neighbor_nodes.push(right)
    }

    // bottom
    if(y + size < height && !visited_nodes.has(`${x} , ${y + size}`)){
        let bottom = nodes.get(`${x} , ${y + size}`)
        neighbor_nodes.push(bottom)
    }

    // left
    if(x - size > 0 && !visited_nodes.has(`${x - size} , ${y}`)){
        let left = nodes.get(`${x - size} , ${y}`)
        neighbor_nodes.push(left)
    }

    if(neighbor_nodes.length > 0){
        let next_node = neighbor_nodes[Math.floor(Math.random() * neighbor_nodes.length)]
        stack.unshift(next_node)
        visited_nodes.set(`${next_node.x} , ${next_node.y}` , next_node)
        let left_right = next_node.x - current_node.x
        let up_down = next_node.y - current_node.y

        if(left_right > 0) { // right 
            current_node.walls[1] = false 
            next_node.walls[3] = false 
        }else if(left_right < 0){ // left
            current_node.walls[3] = false 
            next_node.walls[1] = false 
        } 

        if(up_down > 0) { // down
            current_node.walls[2] = false 
            next_node.walls[0] = false 
        }else if(up_down < 0){ // up
            current_node.walls[0] = false 
            next_node.walls[2] = false 
        }
        block.x = next_node.x 
        block.y = next_node.y
    }else{
        block.x = current_node.x 
        block.y = current_node.y
        stack.shift()
    }
    block.draw()
}

export {depth_first_search_maze , stop_depth_first_search_draw_maze}