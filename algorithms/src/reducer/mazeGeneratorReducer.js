let init_state = {
    draw_maze_algorithims: ["Depth first search" , "Prim's" , "Recursive Division"], 
    solve_maze_algorithims: ["A star" , "Depth first search" , "Breadth first search" , "Dijkstra's" , "Greedy best first search" , "Bidirectional a star" , "Bidirectional dijkstra's"], 
    rows: 15,
}

const mazeGenerationReducer = (state = init_state , action) => {
    return state 
}

export default mazeGenerationReducer