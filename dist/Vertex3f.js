export default class Vertex3f {
    constructor(x, y, z) {
        this.xcoord = 0;
        this.ycoord = 0;
        this.zcoord = 0;
        this.xcoord = x;
        this.ycoord = y;
        this.zcoord = z;
    }
    x() {
        return this.xcoord;
    }
    y() {
        return this.ycoord;
    }
    z() {
        return this.zcoord;
    }
}
