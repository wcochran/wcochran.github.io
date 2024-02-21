// https://github.com/quintar-dev/contour-vision/blob/main/ContourVision/ExtrudedTubeMesh.swift

class ExtrudedTubeMesh {
    
    constructor(spine, radius, turns) {
        let N = spine.length / 3;  // number of vertices

        function vec(A, i) {
            return A.slice(3*i, 3*i + 3);
        }

        function setVec(A, V, i) {
            A.set(V,3*i);
        }
        
        let spineVectors = Float32Array(3*N).fill(0);
        for (let i = 0; i < N-1; i++) {
            let V = norm3(sub3(vec(spine,i+1),vec(spine, i)));
            setVec(spineVectors,V,i);
        }

        const capEnds = !identical(vec(spine,1),vec(spine,1));
        if (!capEnds) {
            let V = norm3(sub3(vec(spine,1),vec(spine,1)));
            setVec(spineVectors,V,N-1);
        }
        
        let tangents = Float32Array(3*N).fill(0);
        for (let i = 1; i < N-1; i++) {
            let V0 = vec(spineVectors,i-1);
            let V1 = vec(spineVectors,i);
            let T = norm3(add3(V0,V1));
            setVec(tangents,T,i);
        }
        if (capEnds) {
            setVec(tangents,vec(spineVectors,0),0);
            setVec(tangents,vec(spineVectors,N-2),N-1);
        } else {
            let V0 = vec(spineVectors,N-2);
            let V1 = vec(spineVectors,0);
            let T = norm3(add3(V0,V1));
            setVec(tangents,T,0);
            setVec(tangents,T,N-1);
        }

        let numCylinderVertices = N * (turns + 1);
        let numCapVertices = capEnds ? 2*turns : 0;
        let numVertices = numCylinderVertices + numCapVertices;
        let vertices = Float32Array(3*numVertices).fill(0);
        let normals = Float32Array(3*numVertices).fill(0);
        let texCoords = Float32Array(3*numVertices).fill(0);

        let turnAngle = 2 * Math.PI / Float(turns)

        // XXX
        
    }

}
