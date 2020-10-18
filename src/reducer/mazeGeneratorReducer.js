let init_state = {
    draw_maze_algorithims: ["Depth first search" , "Prim's" , "Recursive Division" , "Default Grid"], 
    solve_maze_algorithims: ["A star" , "Depth first search" , "Breadth first search" , "Dijkstra's" , "Greedy best first search" , "Bidirectional a star" , "Bidirectional dijkstra's", "★ Self-Solve ★"], 
    rows: 15,
    speed: {
        "Depth first search": {
            "Slow": 10, 
            "Normal": 50, 
            "Fast": 150, 
            "Very Fast": 300
        },
        "Prim's": {
            "Slow": 10, 
            "Normal": 50, 
            "Fast": 150, 
            "Very Fast": 300
        },
        "Recursive Division": {
            "Very Fast": 10, 
            "Fast": 50, 
            "Normal": 150, 
            "Slow": 300
        },
        "Default Grid": {
            "Very Fast": 0, 
            "Fast": 0, 
            "Normal": 0, 
            "Slow": 0
        }
    }
}

const mazeGenerationReducer = (state = init_state , action) => {
    return state 
}

export default mazeGenerationReducer