import { Block } from '../helper_method'

let start_node , end_node , nodes , c , canvas , size 

let open_list_1 , close_list_1 , current_node_1 , open_list_2 , close_list_2 , current_node_2 , myReq , finish_path , finish_search 

const bidirectional_a_star = props => {
    start_node = props.start_node
    end_node = props.end_node 
    nodes = props.nodes
    c = props.c 
    canvas = props.canvas 
    size = props.size 

    open_list_1 = [start_node]
    close_list_1 = []

    open_list_2 = [end_node]
    close_list_2 = []

    current_node_1 = null 
    current_node_2 = null 

    finish_path = false 
    finish_search = false 

    cancelAnimationFrame(myReq)
    run_solve_maze()
}

const stop_bidirectional_a_star = () => {
    cancelAnimationFrame(myReq)
}

const run_solve_maze = () => {
    myReq = requestAnimationFrame(run_solve_maze)
    c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0 ; i < nodes.length ; i ++){
        nodes[i].draw()
    }

    print_close_and_open_list(close_list_1 , open_list_1 , 'MidnightBlue' , 'DeepSkyBlue' )
    print_close_and_open_list(close_list_2 , open_list_2 , 'DarkCyan' , 'Cyan')

    if(open_list_1.length > 0 && !finish_search){
        current_node_1= open_list_1.sort((a,b) => a.f - b.f)[0]
        close_list_1.push(current_node_1)
        open_list_1 = find_child_node(current_node_1 , end_node, open_list_1 , close_list_1 , close_list_2)
    }

    if(open_list_2.length > 0 && !finish_search){
        current_node_2= open_list_2.sort((a,b) => a.f - b.f)[0]
        close_list_2.push(current_node_2)
        open_list_2 = find_child_node(current_node_2 , start_node, open_list_2 , close_list_2 , close_list_1)
    }

    if(finish_search){
        start_node.draw()
        end_node.draw()

        if(!current_node_1 && !current_node_2){
            finish_path = true
        }
        find_path() 
    }

    if(finish_path){
        cancelAnimationFrame(myReq)
    }
}

const print_close_and_open_list = (close_list , open_list , close_color , open_color) => {
    if(!finish_search){
        for(let i = 0 ; i < open_list.length ; i ++){
            open_list[i].color = open_color
            open_list[i].draw()
        }
    }

    for(let i = 0 ; i < close_list.length ; i ++){
        if(!finish_search){
            close_list[i].color = close_color 
        }
        close_list[i].draw()
    }
}

const check_for_mix_node = (target_close_list , x , y) => {
    let node = target_close_list.find(node => node.x === x && node.y === y)
    if(node){
        finish_search = true 
        if(close_list_1.find(node => node.x === x  && node.y === y)){
            current_node_1 = node
        }else{
            current_node_2 = node
        }
        return true 
    }
    return false 
}

const find_child_node = (c_node , target_node , open_list , close_list , target_close_list) => {

    let {top , right , bottom , left} = get_top_right_bottom_left(c_node , nodes )

    // Right (x + size , y)
    if(right && !right.walls[3] && !close_list.find(node => node.x === right.x  && node.y === right.y)){
        let right_in_open = open_list.find(n => n.x === right.x  && n.y === right.y)
        let r_g = c_node.g + size

        if(!check_for_mix_node(target_close_list , right.x , right.y)){
            right_in_open && r_g < right_in_open.g 
                ? update_node(right_in_open, r_g , c_node )
                : open_list.push(set_node(right , r_g , c_node , target_node))
        }
    }

    // top (x , y - size)
    if(top && !top.walls[2] && !close_list.find(node => node.x === top.x && node.y === top.y)){
        let top_in_open = open_list.find(n => n.x === top.x  && n.y === top.y)
        let t_g = c_node.g + size 

        if(!check_for_mix_node(target_close_list , top.x , top.y)){
            top_in_open && t_g < top_in_open.g 
                ? update_node(top_in_open , c_node)
                : open_list.push(set_node(top , t_g , c_node , target_node))
        }
    }

    // left (x - size , y )
    if(left && !left.walls[1] && !close_list.find(node => node.x === left.x && node.y === left.y)){
        let left_in_open = open_list.find(n => n.x === left.x  && n.y === left.y)
        let l_g = c_node.g + size
        if(!check_for_mix_node(target_close_list , left.x , left.y)){
            left_in_open && l_g < left_in_open.g 
                ? update_node(left_in_open , c_node)
                : open_list.push(set_node(left , l_g , c_node , target_node))
        }
    }

    // bottom (x , y + size)
    if(bottom && !bottom.walls[0] &&!close_list.find(node => node.x === bottom.x && node.y === bottom.y)){
        let bottom_in_open = open_list.find(n => n.x === bottom.x  && n.y === bottom.y)
        let b_g = c_node.g + size 
        if(!check_for_mix_node(target_close_list , bottom.x , bottom.y)){
            bottom_in_open && b_g < bottom_in_open.g 
                ? update_node(bottom_in_open , c_node)
                : open_list.push(set_node(bottom , b_g , c_node , target_node))
        }
    }

    return open_list.filter(node => node.x === c_node.x && node.y === c_node.y ? false : true ) 
}

const find_path = () => {
    let color = "LimeGreen"
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
    let color = "MidnightBlue"
    let x_1 = node.x 
    let y_1 = node.y 
    let x_2 = target_node.x 
    let y_2 = target_node.y    
    let h = (Math.abs(x_1 - x_2) + Math.abs(y_1 - y_2)) * size 
    let f = h + g 
    let new_node = new Block(x_1 , y_1 , c , size , color , c_node , g , h , f)
    return new_node 
}

const update_node = (node , g , parent) => {
    node.g = g 
    node.f = g + node.h 
    node.parent = parent 
}

const get_top_right_bottom_left = (node , array ) => {
    let {x , y} = node
    let top = array.find(n => n.x === x && n.y === y - size)
    let right = array.find(n => n.x === x + size && n.y === y)
    let bottom = array.find(n => n.x === x && n.y === y + size)
    let left = array.find(n => n.x === x - size && n.y === y)

    return {top , right , bottom , left }
}

export {bidirectional_a_star , stop_bidirectional_a_star}