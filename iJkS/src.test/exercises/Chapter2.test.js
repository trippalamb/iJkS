const { Complex, ComplexPolar, Real, Imaginary, Vector } = require("../../src/app/Types.js");

test("Programming Drill 2.1.1 | Vector Addition", () => {

    const V1 = new Vector([
        new Complex(6, -4),
        new Complex(7, 3),
        new Complex(4.2, -8.1),
        new Complex(0, -3)
    ]);

    const V2 = new Vector([
        new Complex(16, 2.3),
        new Complex(0, -7),
        new Complex(6, 0),
        new Complex(0, -4)
    ]);

    const correct = new Vector([
        new Complex(22, -1.7),
        new Complex(7, -4),
        new Complex(10.2, -8.1),
        new Complex(0, -7)
    ]);

    const V3 = V1.add(V2);
    for (let i = 1; i <= V1.getSize(); i++) {
        expect(V3.get(i).r).toBeCloseTo(correct.get(i).r, 12);
        expect(V3.get(i).i).toBeCloseTo(correct.get(i).i, 12);
    }

});


test("Programming Drill 2.1.1 | Vector Inversion", () => {

    const V = new Vector([
        new Complex(6, -4),
        new Complex(7, 3),
        new Complex(4.2, -8.1),
        new Complex(0, -3)
    ]);

    const correct = new Vector([
        new Complex(-6, 4),
        new Complex(-7, -3),
        new Complex(-4.2, 8.1),
        new Complex(0, 3)
    ]);

    let Vi = V.inverse();
    for (let i = 1; i <= Vi.getSize(); i++) {
        expect(Vi.get(i).r).toBeCloseTo(correct.get(i).r, 12);
        expect(Vi.get(i).i).toBeCloseTo(correct.get(i).i, 12);
    }

});

test("Programming Drill 2.1.1 | Scalar Multiply", () => {

    const V = new Vector([
        new Complex(16, 2.3),
        new Complex(0, -7),
        new Complex(6, 0),
        new Complex(5, -4)
    ]);

    const c = new Complex(8, -2)

    const correct = new Vector([
        new Complex(132.6, -13.6),
        new Complex(-14, -56),
        new Complex(48, -12),
        new Complex(32, -42)
    ]);

    let Vc = V.multiply(c);
    let cV = c.multiply(V);
    for (let i = 1; i <= cV.getSize(); i++) {
        expect(Vc.get(i).r).toBeCloseTo(correct.get(i).r, 12);
        expect(Vc.get(i).i).toBeCloseTo(correct.get(i).i, 12);
        expect(cV.get(i).r).toBeCloseTo(correct.get(i).r, 12);
        expect(cV.get(i).i).toBeCloseTo(correct.get(i).i, 12);
    }

});
