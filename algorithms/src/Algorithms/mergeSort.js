let steps = []

const merge_sort = array => {
    if(array.length === 1) return array 
  
    const midd = Math.floor(array.length / 2)
    const left_arr = array.slice(0,midd)
    const right_arr = array.slice(midd, array.length)
  
    let merge_array = merge(merge_sort(left_arr), merge_sort(right_arr))
    if(merge_array.length === 100){
        // console.log(steps)
    }
    return merge_array
  }
  
  const merge = (left_array, right_array) => {
    let sort_array = []
  
    while(left_array.length && right_array.length){
      if(left_array[0].height < right_array[0].height){
        let left_node = left_array.shift()
        sort_array.push(left_node)
        steps.push(left_node)
      }else{
        let right_node = right_array.shift()
        sort_array.push(right_node)
        steps.push(right_node)
      }
    }
  
    while(left_array.length) {
        let node = left_array.shift()
        sort_array.push(node)
        steps.push(node)
    }
    while(right_array.length) {
        let node = right_array.shift()
        sort_array.push(node)
        steps.push(node)
    } 
    return sort_array
  }

export default merge_sort