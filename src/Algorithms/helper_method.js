

const Node = function(x , y , c , size , walls , neighbor_node = [], prev_node = null){
    this.x = x
    this.y = y
    this.neighbor_node = neighbor_node
    this.prev_node = prev_node 
    this.walls = walls// [top, right , bottom , left ]
    this.grid = false 

    this.draw = (color = "black") => {
        let x = this.x - (size / 2)
        let y = this.y - (size / 2)
        // Top 
        if(this.walls[0]){
            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(x + size , y)
            c.lineWidth = 4
            c.lineCap = "round"
            c.strokeStyle = color
            c.stroke()
        }

        // right
        if(this.walls[1]){
            c.beginPath()
            c.moveTo(x + size, y)
            c.lineTo(x + size , y +size)
            c.lineWidth = 4
            c.lineCap = "round"
            c.strokeStyle = color
            c.stroke()
        }

        // bottom
        if(this.walls[2]){
            c.beginPath()
            c.moveTo(x + size, y + size)
            c.lineTo(x, y +size)
            c.lineWidth = 4
            c.lineCap = "round"
            c.strokeStyle = color
            c.stroke()
        }

        // left 
        if(this.walls[3]){
            c.beginPath()
            c.moveTo(x, y + size)
            c.lineTo(x, y)
            c.lineWidth = 4
            c.lineCap = "round"
            c.strokeStyle = color
            c.stroke()
        }

        if(this.walls.every( e => e === true) && this.grid){
            c.beginPath()
            c.rect(x, y, size, size)
            c.fillStyle = 'black'
            c.fill()
        }
    }
}

const Block = function(x , y , c , size, color = "red", prev_node = null , g = null , h = null , f = null , distance = Infinity){
    this.x = x 
    this.y = y 
    this.prev_node = prev_node
    this.color = color
    this.g = g 
    this.h = h 
    this.f = f
    this.c = c 
    this.distance = distance
    this.size = size 
  
    this.draw = () => {
        let x = this.x - (this.size / 3) 
        let y = this.y - (this.size / 3)
        let rect_size = this.size * 2/3
        let r = rect_size * 1/4
        this.c.beginPath()
        this.c.moveTo(x+r, y)
        this.c.arcTo(x+rect_size, y,   x+rect_size, y+rect_size, r)
        this.c.arcTo(x+rect_size, y+rect_size, x,   y+rect_size, r)
        this.c.arcTo(x,   y+rect_size, x,   y,   r)
        this.c.arcTo(x,   y,   x+rect_size, y,   r)
        this.c.fillStyle = this.color
        this.c.fill()
        // this.c.fillStyle = 'black'
        // this.c.fillText(this.f , x , y)
        // this.c.fillText(this.h , x + 10 , y + 10)
        // this.c.fillText(this.g , x + 20 , y + 20)
        this.c.closePath()
    }
}

class Stack {
    constructor() {
      this.items = {};
      this.count = 0;
      this.keys = []
    }
    
    getLength() {
      return this.count;
    }
    
    push(key , val) {
        this.items[key] = val; 
        this.count += 1;
        this.keys.push(key) 
    }
    
    pop() {
      if(this.count > 0) {
        delete this.items[this.keys[--this.count]]
        this.keys.pop()
      }
    }
    
    peek() {
      return this.items[this.keys[this.count - 1]];
    }

    has(key){
        return this.items[key]
    }

    values(){
        return Object.values(this.items)
    }

    delete(key){
        delete this.items[key]
        this.count-- 
        this.keys = this.keys.filter(k => k !== key )
    }

    get_index(index){
        return this.items[this.keys[index]]
    }

    size(){
        return this.count
    }
}

export {Node , Block , Stack}