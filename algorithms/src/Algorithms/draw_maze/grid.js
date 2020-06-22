
let size , nodes , cols , rows , canvas , c , myReqDraw 

const grid = props => {
    size = props.size
    nodes = props.nodes 
    cols = props.cols 
    rows = props.rows 
    canvas = props.canvas 
    c = props.c 
    
    cancelAnimationFrame(myReqDraw)
    draw_prims_maze()
}

const stop_grid = () => {
    cancelAnimationFrame(myReqDraw)
}

const draw_prims_maze = () => {
    // myReqDraw = requestAnimationFrame(draw_prims_maze)
    // c.clearRect(0,0,canvas.width, canvas.height)

    for(let i = 0; i < nodes.length; i ++){
        nodes[i].draw()
    }
}

export {grid , stop_grid}

