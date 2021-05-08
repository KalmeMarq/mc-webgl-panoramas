import { GL_ARRAY_BUFFER, GL_COLOR_BUFFER_BIT, GL_FRAGMENT_SHADER, GL_STATIC_DRAW, GL_TRIANGLES, GL_VERTEX_SHADER, GL_UNSIGNED_BYTE, GL_LEQUAL, GL_DEPTH_TEST, GL_CULL_FACE, GL_DEPTH_BUFFER_BIT, GL_TEXTURE_CUBE_MAP, GL_NEAREST, GL_RGBA, GL_TEXTURE_MAG_FILTER, GL_TEXTURE_MIN_FILTER, GL_TEXTURE_CUBE_MAP_NEGATIVE_X, GL_TEXTURE_CUBE_MAP_NEGATIVE_Y, GL_TEXTURE_CUBE_MAP_NEGATIVE_Z, GL_TEXTURE_CUBE_MAP_POSITIVE_X, GL_TEXTURE_CUBE_MAP_POSITIVE_Y, GL_TEXTURE_CUBE_MAP_POSITIVE_Z, useGL, glClear, glClearColor, glUseProgram } from "./gl.js";
import Matrix4f from "./Matrix4f.js";
import Vertex3f from "./Vertex3f.js";
// WebGLFundamentals website helped me a lot. I also complicate it :)
class MCPanoramaSkyBox {
    constructor(urls) {
        this.locations = new Map();
        this.buffer = null;
        this.resources = urls;
    }
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        const gl = canvas.getContext('webgl');
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        return { canvas, gl };
    }
    createShader(gl, source, shaderType) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }
    createShaderProgram(gl, vssource, fssource) {
        const vsShader = this.createShader(gl, vssource, GL_VERTEX_SHADER);
        const fsShader = this.createShader(gl, fssource, GL_FRAGMENT_SHADER);
        const program = gl.createProgram();
        gl.attachShader(program, vsShader);
        gl.attachShader(program, fsShader);
        gl.linkProgram(program);
        return program;
    }
    async init() {
        let { gl } = this.createCanvas();
        this.gl = gl;
        useGL(gl);
        let vssource = await (await fetch('./shader/vertex.vsh')).text();
        let fssource = await (await fetch('./shader/fragment.fsh')).text();
        let program = this.createShaderProgram(gl, vssource, fssource);
        let promises = [];
        let panoramas = [];
        for (let i = 0; i < this.resources.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                const image = new Image();
                image.src = this.resources[i];
                image.addEventListener('load', function () {
                    panoramas.push(image);
                    resolve(null);
                });
            }));
        }
        await Promise.all(promises);
        glClearColor(0, 0, 0, 1.0);
        glUseProgram(program);
        this.locations.set('positionLocation', gl.getAttribLocation(program, "a_position"));
        this.locations.set('skyboxLocation', gl.getUniformLocation(program, "u_skybox"));
        this.locations.set('viewDirectionProjectionInverseLocation', gl.getUniformLocation(program, "u_viewDirectionProjectionInverse"));
        this.buffer = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, this.buffer);
        const vertices = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, GL_STATIC_DRAW);
        let texture = gl.createTexture();
        gl.bindTexture(GL_TEXTURE_CUBE_MAP, texture);
        for (let i = 0; i < panoramas.length; i++) {
            let target = 0;
            if (i === 0)
                target = GL_TEXTURE_CUBE_MAP_NEGATIVE_Z;
            else if (i === 1)
                target = GL_TEXTURE_CUBE_MAP_NEGATIVE_X;
            else if (i === 2)
                target = GL_TEXTURE_CUBE_MAP_POSITIVE_Z;
            else if (i === 3)
                target = GL_TEXTURE_CUBE_MAP_POSITIVE_X;
            else if (i === 4)
                target = GL_TEXTURE_CUBE_MAP_POSITIVE_Y;
            else if (i === 5)
                target = GL_TEXTURE_CUBE_MAP_NEGATIVE_Y;
            gl.bindTexture(GL_TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, 0, GL_RGBA, GL_RGBA, GL_UNSIGNED_BYTE, panoramas[i]);
            gl.generateMipmap(GL_TEXTURE_CUBE_MAP);
        }
        gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
        gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
        const loop = (time) => {
            this.render(time);
            requestAnimationFrame(loop);
        };
        loop(0);
    }
    render(time) {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.enable(GL_CULL_FACE);
        this.gl.enable(GL_DEPTH_TEST);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        this.gl.enableVertexAttribArray(this.locations.get('positionLocation'));
        this.gl.bindBuffer(GL_ARRAY_BUFFER, this.buffer);
        this.gl.vertexAttribPointer(this.locations.get('positionLocation'), 2, this.gl.FLOAT, false, 0, 0);
        let cameraVer = new Vertex3f(Math.cos(time * 0.001 * .065), 0, Math.sin(time * 0.001 * .065));
        let viewM = new Matrix4f();
        viewM.lookAt(cameraVer, new Vertex3f(0, 0, 0), new Vertex3f(0, 1, 0));
        viewM.invert();
        viewM.m30 = 0;
        viewM.m31 = 0;
        viewM.m32 = 0;
        viewM.multiply(Matrix4f.perspective(165, this.gl.canvas.width / this.gl.canvas.height, 0.05, 10));
        viewM.invert();
        this.gl.uniformMatrix4fv(this.locations.get('viewDirectionProjectionInverseLocation'), false, viewM.store());
        this.gl.uniform1i(this.locations.get('skyboxLocation'), 0);
        this.gl.depthFunc(GL_LEQUAL);
        this.gl.drawArrays(GL_TRIANGLES, 0, 1 * 6);
    }
}
let skybox = new MCPanoramaSkyBox(['./textures/panorama_0.png', './textures/panorama_1.png', './textures/panorama_2.png', './textures/panorama_3.png', './textures/panorama_4.png', './textures/panorama_5.png']);
skybox.init();
