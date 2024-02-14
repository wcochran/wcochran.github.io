var cylindricalScreen = {

    numberOfQuads : 16,
    horizontalFieldOfView : 180, // degrees
    imageWidth : 2400,  // pixels
    imageHeight : 800,

    radius : -1,   // radius = focal length

    verts : null,
    normals : null,
    texCoords : null,
    
    focalLength : function(W, hfov) {
	// W = arc length = 2*pi*R*hfov/360
	return W * 360 / (2 * Math.PI * hfov); // solve for R
    },

    createGeometry : function() {
	if (this.radius < 0)
	    this.radius = this.focalLength(this.imageWidth, this.horizontalFieldOfView);

	var numVerts = 2*this.numberOfQuads + 2;
	if (!this.verts || this.verts.length != 3*numVerts) {
	    this.verts = new Float32Array(3*numVerts);
	    this.normals = new Float32Array(3*numVerts);
	    this.texCoords = new Float32Array(2*numVerts);
	}

	var verts = this.verts;
	var normals = this.normals;
	var texCoords = this.texCoords;
	var radius = this.radius;

	var theta_H = this.horizontalFieldOfView * Math.PI / 180;
	var dtheta = theta_H / this.numberOfQuads;
	var theta0 = (Math.PI + theta_H)/2;
	
	for ( var i = 0; i <= this.numberOfQuads; i++) {
	    var theta = theta0 - i*dtheta;
	    var c = Math.cos(theta);
	    var s = Math.sin(theta);
	    var x = radius*c;
	    var y = radius*s;

	    var index = 3*2*i;
	    
	    verts[index]     = x;
	    verts[index + 1] = y;
	    verts[index + 2] = this.imageHeight/2;
	    
	    verts[index + 3] = x;
	    verts[index + 4] = y;
	    verts[index + 5] = -this.imageHeight/2;
	    
	    normals[index]     = -c;  // flip around
	    normals[index + 1] = -s;
	    normals[index + 2] = 0;
	    
	    normals[index + 3] = -c;
	    normals[index + 4] = -s;
	    normals[index + 5] = 0;

	    var tindex = 2*2*i;
	    
            texCoords[tindex]     = i/this.numberOfQuads;
	    texCoords[tindex + 1] = 1;
	   
            texCoords[tindex + 2] = i/this.numberOfQuads;
	    texCoords[tindex + 3] = 0;
	}
    },

    wireframe : null, // Uint16Array

    createWireFrame : function() {
	var lines = [];
	for ( var i = 0; i < this.numberOfQuads; i++) {
	    lines.push(2*i, 2*i + 1);
	    lines.push(2*i, 2*i + 2);
	    lines.push(2*i + 1, 2*i + 3);
	}
	lines.push(2*this.numberOfQuads, 2*this.numberOfQuads + 1);
	this.wireframe = new Uint16Array(lines);
    }
    
}
