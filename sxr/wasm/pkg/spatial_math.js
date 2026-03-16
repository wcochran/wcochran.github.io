/* @ts-self-types="./spatial_math.d.ts" */

export class SpatialMath {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpatialMathFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_spatialmath_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.spatialmath_new();
        this.__wbg_ptr = ret >>> 0;
        SpatialMathFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Called once when the AR screen is placed at the viewer's head pose.
     *
     * * `(sx,sy,sz)`         – screen world position
     * * `(qx,qy,qz,qw)`     – screen orientation quaternion (x,y,z,w)
     * * `(cam_x,cam_y,cam_z)` – head/camera position at placement
     * * `pitch`              – fixed registration pitch angle in radians
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @param {number} qx
     * @param {number} qy
     * @param {number} qz
     * @param {number} qw
     * @param {number} cam_x
     * @param {number} cam_y
     * @param {number} cam_z
     * @param {number} pitch
     */
    place_screen(sx, sy, sz, qx, qy, qz, qw, cam_x, cam_y, cam_z, pitch) {
        wasm.spatialmath_place_screen(this.__wbg_ptr, sx, sy, sz, qx, qy, qz, qw, cam_x, cam_y, cam_z, pitch);
    }
    /**
     * Reset placement state (call on AR session exit).
     */
    reset() {
        wasm.spatialmath_reset(this.__wbg_ptr);
    }
    /**
     * @param {boolean} on
     */
    set_billboard(on) {
        wasm.spatialmath_set_billboard(this.__wbg_ptr, on);
    }
    /**
     * @param {boolean} on
     */
    set_height_follow(on) {
        wasm.spatialmath_set_height_follow(this.__wbg_ptr, on);
    }
    /**
     * Store registration data.  Must be called before `place_screen`.
     *
     * * `scale`      – fop_to_room_scale
     * * `inv_pfop_l` – column-major Float32Array[16] for inv(P_fopl)
     * * `inv_pfop_r` – column-major Float32Array[16] for inv(P_fopr)
     * * `d`          – screen distance in metres
     * @param {number} scale
     * @param {Float32Array} inv_pfop_l
     * @param {Float32Array} inv_pfop_r
     * @param {number} d
     */
    set_registration(scale, inv_pfop_l, inv_pfop_r, d) {
        const ptr0 = passArrayF32ToWasm0(inv_pfop_l, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(inv_pfop_r, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.spatialmath_set_registration(this.__wbg_ptr, scale, ptr0, len0, ptr1, len1, d);
    }
    /**
     * Per-frame update — call once per XR frame.
     *
     * Each matrix argument is a column-major `Float32Array[16]` sourced from
     * `xrCamera.cameras[0/1].matrixWorld.elements` (Three.js/WebXR).
     *
     * Returns `Float32Array[39]`:
     *   `[ 0..16]`  left-eye  M4 (column-major)
     *   `[16..32]`  right-eye M4 (column-major)
     *   `[32..35]`  screen position  (x, y, z)
     *   `[35..39]`  screen quaternion (x, y, z, w)
     * @param {Float32Array} left_eye
     * @param {Float32Array} right_eye
     * @param {Float32Array} xr_cam
     * @returns {Float32Array}
     */
    update(left_eye, right_eye, xr_cam) {
        const ptr0 = passArrayF32ToWasm0(left_eye, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(right_eye, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(xr_cam, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.spatialmath_update(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret;
    }
}
if (Symbol.dispose) SpatialMath.prototype[Symbol.dispose] = SpatialMath.prototype.free;

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_new_from_slice_ff2c15e8e05ffdfc: function(arg0, arg1) {
            const ret = new Float32Array(getArrayF32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./spatial_math_bg.js": import0,
    };
}

const SpatialMathFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_spatialmath_free(ptr >>> 0, 1));

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('spatial_math_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
