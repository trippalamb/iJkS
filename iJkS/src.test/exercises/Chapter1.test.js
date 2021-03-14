const { Complex, ComplexPolar, Real, Imaginary, Vector } = require("../../src/app/Types.js");

test("Programming Drill 1.1.1 | Addition", () => {

    const c1 = new Complex(3, -4);
    const c2 = new Complex(-1, 2);

    const correct = new Complex(2, -2);

    expect(c1.add(c2)).toEqual(correct);

});

test("Programming Drill 1.1.1 | Multiply", () => {

    const c1 = new Complex(-3, -1);
    const c2 = new Complex(1, -2);

    const correct = new Complex(-5, 5);

    expect(c1.multiply(c2)).toEqual(correct);

});

test("Programming Drill 1.2.1 | Subtract", () => {

    const c1 = new Complex(3, -4);
    const c2 = new Complex(-1, 2);

    const correct = new Complex(4, -6);

    expect(c1.subtract(c2)).toEqual(correct);

});

test("Programming Drill 1.2.1 | Division", () => {

    const c1 = new Complex(0, 3);
    const c2 = new Complex(-1, -1);

    const correct = new Complex(-1.5, -1.5);

    expect(c1.divide(c2)).toEqual(correct);

});

test("Programming Drill 1.2.1 | Modulus", () => {

    const c = new Complex(4, -3);

    const correct = new Real(5);

    expect(c.modulus()).toEqual(correct);

});

test("Programming Drill 1.2.1 | Conjugate", () => {

    const c = new Complex(4, -3);

    const correct = new Complex(4, 3);

    expect(c.conjugate()).toEqual(correct);

});

test("Programming Drill 1.3.1 | Cartesian to Polar", () => {

    const c = new Complex(4, -3);
    const cp = c.toPolar();

    const correct = new ComplexPolar(5, -0.6435011087932844);

    expect(cp.ρ).toBeCloseTo(correct.ρ, 12);
    expect(cp.θ).toBeCloseTo(correct.θ, 12);

});

test("Programming Drill 1.3.1 | Polar to Cartesian", () => {

    const cp = new ComplexPolar(5, -0.6435011087932844);
    const c = cp.toCartesian();

    const correct = new Complex(4, -3);

    expect(c.r).toBeCloseTo(correct.r, 12);
    expect(c.i).toBeCloseTo(correct.i, 12);

});

test("Programming Drill 1.3.1 | Polar Multiplication", () => {

    const cp1 = (new Complex(-3,-1)).toPolar();
    const cp2 = (new Complex(1, -2)).toPolar();
    const cp = cp1.multiply(cp2);

    const correct = (new Complex(-5, 5)).toPolar();

    expect(cp.ρ).toBeCloseTo(correct.ρ, 12);
    expect(cp.θ).toBeCloseTo(correct.θ, 12);

});

test("Programming Drill 1.3.1 | Polar Division", () => {

    const cp1 = (new Complex(0, 3)).toPolar();
    const cp2 = (new Complex(-1, -1)).toPolar();
    const cp = cp1.divide(cp2);

    const correct = (new Complex(-1.5, -1.5)).toPolar();

    expect(cp.ρ).toBeCloseTo(correct.ρ, 12);
    expect(cp.θ).toBeCloseTo(correct.θ, 12);

});

//#TODO: add bonus tests for power and root even though book doesn't ask for it
