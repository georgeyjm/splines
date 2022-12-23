const points = [];
let activePoint;


function setup() {
    createCanvas(windowWidth, windowHeight);
    // frameRate(1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    background(50);
    cursor('default');

    // Draw control points
    stroke(150);
    strokeWeight(2);
    noFill();
    for (let i = 1; i < points.length; i++) {
        line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
    }
    noStroke();
    fill(255);
    activePoint = null;
    let activeDist = 15;
    let mouseVec = createVector(mouseX, mouseY);
    for (let vec of points) {
        let vecDist = mouseVec.dist(vec);
        if (vecDist < activeDist) {
            cursor('pointer');
            activePoint = vec;
            activeDist = vecDist;
        }
    }
    for (let vec of points) {
        if (vec == activePoint) {
            circle(vec.x, vec.y, 20);
        } else {
            circle(vec.x, vec.y, 15);
        }
    }

    // Draw curve
    noFill();
    strokeWeight(3);
    stroke(255, 204, 0);
    let start = Date.now();
    decasteljauBezier(points);
    console.log(`DeCasteljau's: ${Date.now() - start} ms`);
    stroke(255, 0, 204);
    start = Date.now();
    bernsteinBezier(points);
    console.log(`Bernstein's: ${Date.now() - start} ms`);
    stroke(0, 255, 204);
    start = Date.now();
    polyCoeffsBezier(points);
    console.log(`Polynomial Coeff: ${Date.now() - start} ms`);
}


function lerp_(v, u, t) {
    return u.copy().sub(v).mult(t).add(v);
}


function mousePressed() {
    if (activePoint) { return }
    let vec = createVector(mouseX, mouseY);
    points.push(vec);
}


function mouseDragged() {
    if (activePoint) {
        activePoint.set(mouseX, mouseY);
    }
}
