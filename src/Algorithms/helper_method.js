

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
    this.distance = distance
  
    this.draw = () => {
        c.beginPath()
        c.rect(this.x - (size / 3), this.y - (size / 3), size * 2/3, size * 2/3)
        c.fillStyle = this.color
        c.fill()
    }
}

export {Node , Block}