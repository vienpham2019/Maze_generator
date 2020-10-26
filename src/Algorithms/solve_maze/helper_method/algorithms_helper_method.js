const get_top_right_bottom_left = (node , array , size) => {
    if(!node) return null
    let {x , y} = node
    let top = array.find(n => n.x === x && n.y === y - size)
    let right = array.find(n => n.x === x + size && n.y === y)
    let bottom = array.find(n => n.x === x && n.y === y + size)
    let left = array.find(n => n.x === x - size && n.y === y)

    return {top , right , bottom , left }
}

const add_to_heap = (node, array, method) => {
    array.push(node)
    let i = array.length 
    while(array[Math.floor(i / 2) - 1] && method(array[i - 1] , array[Math.floor(i / 2) - 1])){
      let current_node = array[i - 1]
      array[i - 1] = array[Math.floor(i / 2) - 1]
      array[Math.floor(i / 2) - 1] = current_node
      i = Math.floor(i / 2)
    }
    return array 
  }
  
  const remove_from_heap = (array , method) => {
    let i = 1
    array[0] = array[array.length - 1]
    array.pop()
    let current_node = array[0]
    let stop = false
    while(!stop) {
      let left_child = array[(2 * i) - 1]
      let right_child = array[(2 * i)]
      let max_child_index 
      if(left_child && right_child){
        max_child_index = method(left_child,right_child) ? 2 * i : 2 * i + 1
      }else if(left_child || right_child){
        max_child_index = left_child ? 2 * i : 2 * i + 1
      }
  
      if(max_child_index && method(array[max_child_index - 1] ,current_node)){
        array[i - 1] = array[max_child_index - 1]
        array[max_child_index - 1] = current_node 
        current_node = array[max_child_index - 1]
        i = max_child_index
      }else{
        stop = true
      }
    }
    return array 
  }

export {get_top_right_bottom_left , add_to_heap , remove_from_heap}