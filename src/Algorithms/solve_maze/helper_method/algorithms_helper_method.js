const get_top_right_bottom_left = (node , array , size) => {
    if(!node) return null
    let {x , y} = node
    let top = array.get(`${x} , ${y - size}`)
    let right = array.get(`${x + size} , ${y}`)
    let bottom = array.get(`${x} , ${y + size}`)
    let left = array.get(`${x - size} , ${y}`)

    return {top , right , bottom , left }
}


export {get_top_right_bottom_left}