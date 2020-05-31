const merge_sort = array => {
    if(array.length === 1) return array 
  
    const midd = Math.floor(array.length / 2)
    const left_arr = array.slice(0,midd)
    const right_arr = array.slice(midd, array.length)
  
    return merge(merge_sort(left_arr), merge_sort(right_arr))
  }
  
  const merge = (left_array, right_array) => {
    let sort_array = []
  
    while(left_array.length && right_array.length){
      if(left_array[0].height < right_array[0].height){
        sort_array.push(left_array.shift())
      }else{
        sort_array.push(right_array.shift())
      }
    }
  
    while(left_array.length) sort_array.push(left_array.shift())
    while(right_array.length) sort_array.push(right_array.shift())
    return sort_array
  }

export default merge_sort