  function getMousePos(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
  }

  var mouseDrag;

  function mouseDown(event) {
      mouseDrag = getMousePos(canvas, event);
  }

  var radiansPerPixel = 0.01;
  var phiMin = -Math.PI/2 + 0.001;
  var phiMax = +Math.PI/2 - 0.001;

  var frame; // current anim frame (undefined => no frame)

  function updateCameraAngle(dx, dy) {
        camera.theta -= dx*radiansPerPixel;
        camera.phi += dy*radiansPerPixel;
        if (camera.phi < phiMin)
            camera.phi = phiMin;
        else if (camera.phi > phiMax)
            camera.phi = phiMax;
  }

  function mouseMove(event) {
      if (mouseDrag) {
          var mousePos = getMousePos(canvas, event);
          var dx = mousePos.x - mouseDrag.x;
          var dy = mousePos.y - mouseDrag.y;
          updateCameraAngle(dx, dy);
          mouseDrag = mousePos;
          if (!frame)
             frame = requestAnimationFrame(display);
      }
  }

  function mouseUp(event) {
      var mousePos = getMousePos(canvas, event);
      mouseDrag = null;
  }
