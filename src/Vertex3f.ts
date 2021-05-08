export default class Vertex3f {
  private xcoord: number = 0;
  private ycoord: number = 0;
  private zcoord: number = 0;

  public constructor(x: number, y: number, z: number) {
    this.xcoord = x;
    this.ycoord = y;
    this.zcoord = z;
  }

  public x(): number {
    return this.xcoord;
  }

  public y(): number {
    return this.ycoord;
  }

  public z(): number {
    return this.zcoord;
  }
}