function identity4x4() {
    let M = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
    return M;
}

function clone4x4(A) {
    return A.slice();
}

function transpose4x4(A) {
    let T = new Float32Array(16);
    for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++)
            T[r + 4*c] = A[c + 4*r];
    return T;
}

function multiply4x4(A, B) {
    let AB = new Float32Array(16);
    for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++) {
            let v = 0;
            for (let i = 0; i < 4; i++)
                v += A[r + 4*i] * B[i + 4*c];
            AB[r + 4*c] = v;
        }
    return AB;
}

function translate4x4(x, y, z) {
    let M = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ]);
    return M;
}

function scale4x4(sx, sy, sz) {
    let M = new Float32Array([
       sx,  0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1
    ]);
    return M;
}

function rotation4x4(angle_degrees, x, y, z) {
    var p = 1/Math.sqrt(x*x + y*y + z*z);
    x *= p; y *= p; z *= p;
    var angle = angle_degrees * (Math.PI/180);
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var c_ = 1 - c;
    var zc_ = z*c_;
    var yc_ = y*c_;
    var xzc_ = x*zc_;
    var xyc_ = x*y*c_;
    var yzc_ = y*zc_;
    var xs = x*s;
    var ys = y*s;
    var zs = z*s;
    let R = new Float32Array([
        x*x*c_ + c, xyc_ + zs, xzc_ - ys, 0,
        xyc_ - zs,  y*yc_ + c, yzc_ + xs, 0,
        xzc_ + ys,  yzc_ - xs, z*zc_ + c, 0,
        0, 0, 0, 1
    ]);
    return R;
}

function perspective4x4(fovy_degrees, aspect, zNear, zFar) {
    const fovy = fovy_degrees * Math.PI/180;
    const f = 1/Math.tan(fovy/2);
    const s = 1/(zNear - zFar);
    let M = new Float32Array([
        f/aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (zFar + zNear)*s, -1,
        0, 0, 2*zFar*zNear*s, 0
    ]);
    return M;
}

var Matrix4x4Stack = function() {
    this.stack = [];
}

Matrix4x4Stack.prototype.push = function(M) {
    var C = clone4x4(M);
    this.stack.push(C);
}

Matrix4x4Stack.prototype.pop = function() {
    var C = this.stack.pop();
    return C;
}

function scale3(s, V) {
    let U = Float32Array(3);
    U[0] = s*V[0];
    U[1] = s*V[1];
    U[2] = s*V[2];
    return U;
}

function identical3(U, V) {
    return U[0] == V[0] && U[1] == V[1] && U[2] == V[2];
}

function sub3(U, V) {
    let D = Float32Array(3);
    D[0] = U[0] - V[0];
    D[1] = U[1] - V[1];
    D[2] = U[2] - V[2];
    return D;
}

function add3(U, V) {
    let S = Float32Array(3);
    S[0] = U[0] + V[0];
    S[1] = U[1] + V[1];
    S[2] = U[2] + V[2];
    return S;
}

function dot3(U, V) {
    return U[0]*V[0] + U[1]*V[1] + U[2]*V[2];
}

function magSquared3(U) {
    return dot3(U,U);
}

function mag3(U) {
    return Math.sqrt(magSquared3(U));
}

function normalize3(U) {
    let m = ma3(U);
    let s = m > 0 ? 1/m : 1;
    return scale3(s, U);
}
