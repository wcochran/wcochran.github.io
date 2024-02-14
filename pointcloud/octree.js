class HuffmanTreeNode {
    constructor(byte = 0, left = null, right = null) {
        this.byte = 0;
        this.left = left;
        this.right = right;
    }

    insert(byte, numbits, bits) {
        var bit = bits >> (numbits - 1);
        if (bit == 0) {
            if (this.left == null)
                this.left = new HuffmanTreeNode();
            if (numbits == 1)
                this.left.byte = byte;
            else
                this.left.insert(byte, numbits - 1, bits & ((1 << (numbits - 1)) - 1));
        } else {
            if (this.right == null)
                this.right = new HuffmanTreeNode();
            if (numbits == 1)
                this.right.byte = byte;
            else
                this.right.insert(byte, numbits - 1, bits & ((1 << (numbits - 1)) - 1));
        }
    }
}

class HuffmanTree {
    constructor() {
        this.root = new HuffmanTreeNode();
    }

    insert(byte, numbits, bits) {
        this.root.insert(byte, numbits, bits);
    }
}

class BitStream {
    constructor(bytes) {
        this.bytes = bytes;
        this.bitsRead = 0;
    }

    nextBit() {
        var byteIndex = Math.floor(this.bitsRead / 8);
        if (byteIndex >= this.bytes.length)
            return -1;
        var bitIndex = this.bitsRead % 8;
        var byte = this.bytes[byteIndex];
        var bit = (byte >> (7 - bitIndex)) & 1;
        this.bitsRead++;
        return bit;
    }
}

function huffmanDecode(codeBook, inputBytes) {
    var huffmanTree = new HuffmanTree();
    for (var i = 0; i < 256; i++) {
        huffmanTree.insert(i, codeBook[i].numbits, codeBook[i].bits);
    }
    var outputBytes = [];
    var bitstream = new BitStream(inputBytes);
    var bit = bitstream.nextBit();
    while (bit != -1) {
        var tree = huffmanTree.root;
        while (tree.left != null && bit != -1) {
            tree = (bit == 0) ? tree.left : tree.right;
            bit = bitstream.nextBit();
        }
        outputBytes.push(tree.byte);
    } 
    return outputBytes;
}

// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
function base64Decode(str) {
    const byteCharacters = atob(str);
    var bytes = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        bytes[i] = byteCharacters.charCodeAt(i);
    }
    return bytes;
}

function rleDecode(bytesIn) {
    var bytesOut = [];
    for (let i = 0; i < bytesIn.length; ) {
        var byte = bytesIn[i++];
        bytesOut.push(byte);
        if (byte == 0) {
            var count = bytesIn[i++] - 1;
            while (--count >= 0) {
                bytesOut.push(0);
            }
        }
    }
    return bytesOut;
}

function getPointCloudFromEncodedOctree(encodedOctree) {
    var points = [];
    var colorIndices = [];
    var N = 0;
    var getPointCloud = function(xmin, xmax, ymin, ymax, zmin, zmax) {
        var occupancyMap = encodedOctree[N++];
        if (occupancyMap == 0) {
            var colorIndex = encodedOctree[N++];
            if (colorIndex != 0) {
                colorIndices.push(colorIndex);
                points.push((xmin + xmax)/2);
                points.push((ymin + ymax)/2);
                points.push((zmin + zmax)/2);
            }
        } else {
            var X = [xmin, (xmin + xmax)/2, xmax];
            var Y = [ymin, (ymin + ymax)/2, ymax];
            var Z = [zmin, (zmin + zmax)/2, zmax];
            var n = 0;
            for (let k = 0; k < 2; k++)
                for (let j = 0; j < 2; j++)
                    for (let i = 0; i < 2; i++) {
                        if ((occupancyMap & (1 << n++)) != 0) {
                            getPointCloud(X[i], X[i+1], Y[j], Y[j+1], Z[k], Z[k+1]);
                        }
                    }
        }
    };
    getPointCloud(0,1, 0,1, 0,1);
    return {
        "points" : points,
        "colorIndices" : colorIndices
    };
}

