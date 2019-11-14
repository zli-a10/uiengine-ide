export class Resize {
  private handler: any
  private target: any
  private callback: any
  private clickX = 0
  private clickY = 0
  size: { width: any; height: any } = { width: 0, height: 0 }

  // type could be  n,s,w,e, nw, ne, sw, se
  constructor(type: string, target: any, handler: any, callback: any) {
    this.target = target
    this.handler = handler
    this.callback = callback
    this.handler.onmousedown = this.onDragDown.bind(this, type)
    document.onmousemove = this.onDragMove.bind(this)
    document.onmouseup = this.onDragUp.bind(this)
  }

  getEvent(e: any) {
    return e || window.event
  }

  getLocation(e: any) {
    return {
      x: e.x || e.clientX,
      y: e.y || e.clientY
    }
  }

  // mouse click event
  onDragDown(type: any, e: any) {
    e = this.getEvent(e)
    const location = this.getLocation(e)
    this.clickY = location.y
    this.clickX = location.x
    this.handler = this
    this.handler.operateType = type
    return false
  }

  onDragUp() {
    // document.body.style.cursor = 'auto'
    this.handler = null
  }

  move(operateType: any, location: any) {
    document.body.style.cursor = location + '_resize'
    let length
    switch (operateType) {
      case 'e':
        var add_length = this.clickX - location.x
        this.clickX = location.x
        length = parseInt(this.target.offsetWidth) - add_length
        this.target.style.width = length + 'px'
        this.size.width = length
        break
      case 's':
        var add_length = this.clickY - location.y
        this.clickY = location.y
        length = parseInt(this.target.offsetHeight) - add_length
        // console.log(length, 's')
        this.target.style.height = length + 'px'
        this.size.height = length
        break
      case 'w':
        var add_length = this.clickX - location.x
        this.clickX = location.x
        length = parseInt(this.target.offsetWidth) + add_length
        this.size.width = length
        this.target.style.width = length + 'px'
        this.target.style.left = this.clickX + 'px'
        this.target.style.left = this.clickX + 'px'
        break
      case 'n':
        var add_length = this.clickY - location.y
        this.clickY = location.y
        length = parseInt(this.target.offsetHeight) + add_length
        this.size.height = length
        this.target.style.height = length + 'px'
        this.target.style.top = this.clickY + 'px'
        break
    }
    this.callback(this.size)
  }

  onDragMove(e: any) {
    if (this.handler) {
      e = this.getEvent(e)
      var location = this.getLocation(e)
      switch (this.handler.operateType) {
        case 'n':
          this.move('n', location)
          break
        case 's':
          this.move('s', location)
          break
        case 'w':
          this.move('w', location)
          break
        case 'e':
          this.move('e', location)
          break
        case 'nw':
          this.move('n', location)
          this.move('w', location)
          break
        case 'ne':
          this.move('n', location)
          this.move('e', location)
          break
        case 'sw':
          this.move('s', location)
          this.move('w', location)
          break
        case 'se':
          this.move('s', location)
          this.move('e', location)
          break
      }
    }
    return false
  }
}
