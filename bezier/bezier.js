function decasteljauBezier(points) {
    // Draws a Bezier curve using the DeCasteljau's algorithm
    if (points.length <= 1) { return }
    const sections = max(100, 6 * points.length);
    beginShape();
    for (s = 0; s <= sections; s++) {
        let t = s / sections;
        let currPoints = points;
        while (currPoints.length > 1) {
            let tmp = [];
            for (let i = 1; i < currPoints.length; i++) {
                let pt = lerp_(currPoints[i - 1], currPoints[i], t);
                tmp.push(pt);
            }
            currPoints = tmp;
        }
        vertex(currPoints[0].x, currPoints[0].y);
    }
    endShape();
}


function bernsteinBezier(points) {
    if (points.length <= 1) { return }
    const n = points.length - 1;
    const sections = max(100, 6 * points.length);
    beginShape();
    for (s = 0; s <= sections; s++) {
        let t = s / sections;
        let vec = createVector(0, 0);
        for (let i = 0; i <= n; i++) {
            let coeff = math.factorial(n) / math.factorial(i) / math.factorial(n - i) * t ** i * (1 - t) ** (n - i);
            vec.add(points[i].copy().mult(coeff));
        }
        vertex(vec.x, vec.y);
    }
    endShape();
}


function polyCoeffsBezier(points) {
    // Caution: will overflow for too many control points
    if (points.length <= 1) { return }
    const n = points.length - 1;
    const sections = max(100, 6 * points.length);
    const cached = [];
    for (let i = 0; i <= n; i++) {
        let vec = createVector(0, 0);
        for (let j = i; j <= n; j++) {
            let coeff = (-1) ** (j - i) * math.factorial(n) / math.factorial(i) / math.factorial(j - i) / math.factorial(n - j);
            vec.add(points[n - j].copy().mult(coeff));
        }
        cached.push(vec);
    }
    beginShape();
    for (s = 0; s <= sections; s++) {
        let t = s / sections;
        let vec = createVector(0, 0);
        for (let k = 0; k <= n; k++) {
            vec.add(cached[k].copy().mult(t ** (n - k)));
        }
        vertex(vec.x, vec.y);
    }
    endShape();
}
