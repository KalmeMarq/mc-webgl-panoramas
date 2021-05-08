import Vertex3f from "./Vertex3f.js";
export default class Matrix4f {
    constructor(matrix4f) {
        this.m00 = 0;
        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m10 = 0;
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m20 = 0;
        this.m21 = 0;
        this.m22 = 0;
        this.m23 = 0;
        this.m30 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 0;
        if (matrix4f) {
            this.m00 = matrix4f.m00;
            this.m01 = matrix4f.m01;
            this.m02 = matrix4f.m02;
            this.m03 = matrix4f.m03;
            this.m10 = matrix4f.m10;
            this.m11 = matrix4f.m11;
            this.m12 = matrix4f.m12;
            this.m13 = matrix4f.m13;
            this.m20 = matrix4f.m20;
            this.m21 = matrix4f.m21;
            this.m22 = matrix4f.m22;
            this.m23 = matrix4f.m23;
            this.m30 = matrix4f.m30;
            this.m31 = matrix4f.m31;
            this.m32 = matrix4f.m32;
            this.m33 = matrix4f.m33;
        }
    }
    multiply(matrix) {
        let f = this.m00 * matrix.m00 + this.m01 * matrix.m10 + this.m02 * matrix.m20 + this.m03 * matrix.m30;
        let f1 = this.m00 * matrix.m01 + this.m01 * matrix.m11 + this.m02 * matrix.m21 + this.m03 * matrix.m31;
        let f2 = this.m00 * matrix.m02 + this.m01 * matrix.m12 + this.m02 * matrix.m22 + this.m03 * matrix.m32;
        let f3 = this.m00 * matrix.m03 + this.m01 * matrix.m13 + this.m02 * matrix.m23 + this.m03 * matrix.m33;
        let f4 = this.m10 * matrix.m00 + this.m11 * matrix.m10 + this.m12 * matrix.m20 + this.m13 * matrix.m30;
        let f5 = this.m10 * matrix.m01 + this.m11 * matrix.m11 + this.m12 * matrix.m21 + this.m13 * matrix.m31;
        let f6 = this.m10 * matrix.m02 + this.m11 * matrix.m12 + this.m12 * matrix.m22 + this.m13 * matrix.m32;
        let f7 = this.m10 * matrix.m03 + this.m11 * matrix.m13 + this.m12 * matrix.m23 + this.m13 * matrix.m33;
        let f8 = this.m20 * matrix.m00 + this.m21 * matrix.m10 + this.m22 * matrix.m20 + this.m23 * matrix.m30;
        let f9 = this.m20 * matrix.m01 + this.m21 * matrix.m11 + this.m22 * matrix.m21 + this.m23 * matrix.m31;
        let f10 = this.m20 * matrix.m02 + this.m21 * matrix.m12 + this.m22 * matrix.m22 + this.m23 * matrix.m32;
        let f11 = this.m20 * matrix.m03 + this.m21 * matrix.m13 + this.m22 * matrix.m23 + this.m23 * matrix.m33;
        let f12 = this.m30 * matrix.m00 + this.m31 * matrix.m10 + this.m32 * matrix.m20 + this.m33 * matrix.m30;
        let f13 = this.m30 * matrix.m01 + this.m31 * matrix.m11 + this.m32 * matrix.m21 + this.m33 * matrix.m31;
        let f14 = this.m30 * matrix.m02 + this.m31 * matrix.m12 + this.m32 * matrix.m22 + this.m33 * matrix.m32;
        let f15 = this.m30 * matrix.m03 + this.m31 * matrix.m13 + this.m32 * matrix.m23 + this.m33 * matrix.m33;
        this.m00 = f;
        this.m01 = f1;
        this.m02 = f2;
        this.m03 = f3;
        this.m10 = f4;
        this.m11 = f5;
        this.m12 = f6;
        this.m13 = f7;
        this.m20 = f8;
        this.m21 = f9;
        this.m22 = f10;
        this.m23 = f11;
        this.m30 = f12;
        this.m31 = f13;
        this.m32 = f14;
        this.m33 = f15;
    }
    multiplyBy(value) {
        this.m00 *= value;
        this.m01 *= value;
        this.m02 *= value;
        this.m03 *= value;
        this.m10 *= value;
        this.m11 *= value;
        this.m12 *= value;
        this.m13 *= value;
        this.m20 *= value;
        this.m21 *= value;
        this.m22 *= value;
        this.m23 *= value;
        this.m30 *= value;
        this.m31 *= value;
        this.m32 *= value;
        this.m33 *= value;
    }
    adjugateAndDet() {
        let f = this.m00 * this.m11 - this.m01 * this.m10;
        let f1 = this.m00 * this.m12 - this.m02 * this.m10;
        let f2 = this.m00 * this.m13 - this.m03 * this.m10;
        let f3 = this.m01 * this.m12 - this.m02 * this.m11;
        let f4 = this.m01 * this.m13 - this.m03 * this.m11;
        let f5 = this.m02 * this.m13 - this.m03 * this.m12;
        let f6 = this.m20 * this.m31 - this.m21 * this.m30;
        let f7 = this.m20 * this.m32 - this.m22 * this.m30;
        let f8 = this.m20 * this.m33 - this.m23 * this.m30;
        let f9 = this.m21 * this.m32 - this.m22 * this.m31;
        let f10 = this.m21 * this.m33 - this.m23 * this.m31;
        let f11 = this.m22 * this.m33 - this.m23 * this.m32;
        let f12 = this.m11 * f11 - this.m12 * f10 + this.m13 * f9;
        let f13 = -this.m10 * f11 + this.m12 * f8 - this.m13 * f7;
        let f14 = this.m10 * f10 - this.m11 * f8 + this.m13 * f6;
        let f15 = -this.m10 * f9 + this.m11 * f7 - this.m12 * f6;
        let f16 = -this.m01 * f11 + this.m02 * f10 - this.m03 * f9;
        let f17 = this.m00 * f11 - this.m02 * f8 + this.m03 * f7;
        let f18 = -this.m00 * f10 + this.m01 * f8 - this.m03 * f6;
        let f19 = this.m00 * f9 - this.m01 * f7 + this.m02 * f6;
        let f20 = this.m31 * f5 - this.m32 * f4 + this.m33 * f3;
        let f21 = -this.m30 * f5 + this.m32 * f2 - this.m33 * f1;
        let f22 = this.m30 * f4 - this.m31 * f2 + this.m33 * f;
        let f23 = -this.m30 * f3 + this.m31 * f1 - this.m32 * f;
        let f24 = -this.m21 * f5 + this.m22 * f4 - this.m23 * f3;
        let f25 = this.m20 * f5 - this.m22 * f2 + this.m23 * f1;
        let f26 = -this.m20 * f4 + this.m21 * f2 - this.m23 * f;
        let f27 = this.m20 * f3 - this.m21 * f1 + this.m22 * f;
        this.m00 = f12;
        this.m10 = f13;
        this.m20 = f14;
        this.m30 = f15;
        this.m01 = f16;
        this.m11 = f17;
        this.m21 = f18;
        this.m31 = f19;
        this.m02 = f20;
        this.m12 = f21;
        this.m22 = f22;
        this.m32 = f23;
        this.m03 = f24;
        this.m13 = f25;
        this.m23 = f26;
        this.m33 = f27;
        return f * f11 - f1 * f10 + f2 * f9 + f3 * f8 - f4 * f7 + f5 * f6;
    }
    invert() {
        let f = this.adjugateAndDet();
        if (Math.abs(f) > 1.0E-6) {
            this.multiplyBy(f);
            return true;
        }
        return false;
    }
    transpose() {
        let f = this.m10;
        this.m10 = this.m01;
        this.m01 = f;
        f = this.m20;
        this.m20 = this.m02;
        this.m02 = f;
        f = this.m21;
        this.m21 = this.m12;
        this.m12 = f;
        f = this.m30;
        this.m30 = this.m03;
        this.m03 = f;
        f = this.m31;
        this.m31 = this.m13;
        this.m13 = f;
        f = this.m32;
        this.m32 = this.m23;
        this.m23 = f;
    }
    static perspective(fov, aspect, near, far) {
        let f = (1.0 / Math.tan(fov * (Math.PI / 180) / 2.0));
        let matrix4f = new Matrix4f();
        matrix4f.m00 = f / aspect;
        matrix4f.m11 = f;
        matrix4f.m22 = (far + near) / (near - far);
        matrix4f.m32 = -1.0;
        matrix4f.m23 = 2.0 * far * near / (near - far);
        return matrix4f;
    }
    store() {
        return [
            this.m00, this.m01, this.m02, this.m03,
            this.m10, this.m11, this.m12, this.m13,
            this.m20, this.m21, this.m22, this.m23,
            this.m30, this.m31, this.m32, this.m33
        ];
    }
    static normalize(v) {
        let length = Math.sqrt(v.x() * v.x() + v.y() * v.y() + v.z() * v.z());
        if (length > 0.00001) {
            return new Vertex3f(v.x() / length, v.y() / length, v.z() / length);
        }
        return new Vertex3f(0, 0, 0);
    }
    static subtractVectors(a, b) {
        let f = a.x() - b.x();
        let f1 = a.y() - b.y();
        let f2 = a.z() - b.z();
        return new Vertex3f(f, f1, f2);
    }
    static cross(a, b) {
        let f = a.y() * b.z() - a.z() * b.y();
        let f1 = a.z() * b.x() - a.x() * b.z();
        let f2 = a.x() * b.y() - a.y() * b.x();
        return new Vertex3f(f, f1, f2);
    }
    lookAt(camera, target, up) {
        var zAxis = Matrix4f.normalize(Matrix4f.subtractVectors(camera, target));
        var xAxis = Matrix4f.normalize(Matrix4f.cross(up, zAxis));
        var yAxis = Matrix4f.normalize(Matrix4f.cross(zAxis, xAxis));
        this.m00 = xAxis.x();
        this.m01 = xAxis.y();
        this.m02 = xAxis.z();
        this.m03 = 0;
        this.m10 = yAxis.x();
        this.m11 = yAxis.y();
        this.m12 = yAxis.z();
        this.m13 = 0;
        this.m20 = zAxis.x();
        this.m21 = zAxis.y();
        this.m22 = zAxis.z();
        this.m23 = 0;
        this.m30 = camera.x();
        this.m31 = camera.y();
        this.m32 = camera.z();
        this.m33 = 1;
    }
}
