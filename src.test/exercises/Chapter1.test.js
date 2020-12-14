//const Types = require("../../src/app/Types.js");
const { Complex, Real, Imaginary, Vector } = require("../../src/app/Types.js");

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