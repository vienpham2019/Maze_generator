import { Block , Stack} from './helper_method'
import {get_top_right_bottom_left} from './solve_maze/helper_method/algorithms_helper_method'

let start_node , end_node , nodes , c , canvas , size 

let current_node , current_path , myReq , find_path 

const self_solve = props => {
    start_node = props.start_node
    current_node = start_node 
    end_node = props.end_node 
    nodes = props.nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 
    find_path = false 

    current_path = new Stack()
    current_path.push(`${current_node.x} , ${current_node.y}` , set_node(current_node))
    set_up()
}

const set_up = () => {
    c.clearRect(0,0,canvas.width, canvas.height)
    for(let node of nodes){
        node.draw()
    }
    window.removeEventListener("keydown" , run_solve_maze)
    window.addEventListener("keydown" , run_solve_maze)
}

const run_solve_maze = e => {
        c.clearRect(0,0,canvas.width, canvas.height)
        current_node = current_path.peek()
        let {top , right , bottom , left} = get_top_right_bottom_left(current_node , nodes , size)
        switch (e.key) {
            case "a":
                find_next_step(left , 1)
                break 
            case "w":
                find_next_step(top , 2)
                break 
            case "d":
                find_next_step(right , 3)
                break 
            case "s":
                find_next_step(bottom , 0)
                break 
        }
        for(let node of nodes){
            node.draw()
        }
        for(let path of current_path.values()){
            path.star_size = size 
            path.color = "LightSkyBlue"
            current_path.peek().color = "MediumBlue"
            path.draw()
        }
        if(find_path) {
            window.removeEventListener("keydown" , run_solve_maze)
            current_node = current_path.peek()
            draw_finish_path()
        }
}

const draw_finish_path = () => {
    myReq = requestAnimationFrame(draw_finish_path)
    current_node.color = "SpringGreen"
    current_node.draw()
    current_node = current_node.prev_node

    if(!current_node) cancelAnimationFrame(myReq)
}

const find_next_step = (node , wall_number) => {
    if(node && !node.walls[wall_number]){
        let {x , y} = node 
        let key = '' + x + y 
        if(end_node.x === x && end_node.y === y) find_path = true 
        if(!current_path.has(key)){
            current_path.push(key , set_node(node))
        }else{
            current_path.pop()
        }
    }

}

const set_node = (node) => {
    let color = "LightSkyBlue"
    let {x , y} = node 
    let new_node = new Block(x, y , c , size , color , current_path.peek())
    return new_node 
}

export {self_solve}