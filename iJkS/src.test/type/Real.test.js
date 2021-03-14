const { Complex, ComplexPolar, Real, Imaginary, Vector } = require("../../src/app/Types.js");

test("Real | constructor", () =>{
    var a = new Real(2.5);

    var correct = {
        classification: "scalar",
        r: 2.5
    }

    expect(a).toEqual(correct);
});


test("Real | add() : tests '2 + 4.5'", () => {

    var a = new Real(2.0);
    var b = new Real(4.5);
    var c = a.add(b);

    var correct = new Real(6.5);

    expect(c).toEqual(correct);

});

test("Real | add() : tests '2 + 4.5i'", () => {

    var a = new Real(2.0);
    var b = new Imaginary(4.5);
    var c = a.add(b);

    var correct = new Complex(2.0, 4.5);

    expect(c).toEqual(correct);

});

test("Real | add() : tests '2 + {3.0, 4.5i}'", () => {

    var a = new Real(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.add(b);

    var correct = new Complex(5.0, 4.5);

    expect(c).toEqual(correct);

});

test("Real | add() : tests '2 + |3.0, 4.5i, {-3.0, -4.5i}>'", () => {

    var a = new Real(2.0);
    var v = new Vector([
        new Real(3.0),
        new Imaginary(4.5),
        new Complex(-3.0, -4.5)
    ], true);

    var c = a.add(v);

    var correct = new Vector([
        new Real(5.0),
        new Complex(2.0, 4.5),
        new Complex(-1.0, -4.5)
    ], true);

    expect(c).toEqual(correct);

});

test("Real | subtract() : tests '2 - 4.5'", () => {

    var a = new Real(2.0);
    var b = new Real(4.5);
    var c = a.subtract(b);

    var correct = new Real(-2.5);

    expect(c).toEqual(correct);

});

test("Real | subtract() : tests '2 - 4.5i'", () => {

    var a = new Real(2.0);
    var b = new Imaginary(4.5);
    var c = a.subtract(b);

    var correct = new Complex(2.0, -4.5);

    expect(c).toEqual(correct);

});

test("Real | subtract() : tests '2 - {3.0, 4.5i}'", () => {

    var a = new Real(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.subtract(b);

    var correct = new Complex(-1.0, -4.5);

    expect(c).toEqual(correct);

});

test("Real | subtract() : tests '2 - |3.0, 4.5i, {-3.0, -4.5i}>'", () => {

    var a = new Real(2.0);
    var v = new Vector([
        new Real(3.0),
        new Imaginary(4.5),
        new Complex(-3.0, -4.5)
    ], false);

    var c = a.subtract(v);

    var correct = new Vector([
        new Real(-1.0),
        new Complex(2.0, -4.5),
        new Complex(5.0, 4.5)
    ], false);

    expect(c).toEqual(correct);

});

test("Real | multiply() : tests '2 * 4.5'", () => {

    var a = new Real(2.0);
    var b = new Real(4.5);
    var c = a.multiply(b);

    var correct = new Real(9.0);

    expect(c).toEqual(correct);

});

test("Real | multiply() : tests '2 * 4.5i'", () => {

    var a = new Real(2.0);
    var b = new Imaginary(4.5);
    var c = a.multiply(b);

    var correct = new Imaginary(9.0);

    expect(c).toEqual(correct);

});

test("Real | multiply() : tests '2 * {3.0, 4.5i}'", () => {

    var a = new Real(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.multiply(b);

    var correct = new Complex(6.0, 9.0);

    expect(c).toEqual(correct);

});

test("Real | multiply() : tests '2 * |3.0, 4.5i, {-3.0, -4.5i}>'", () => {

    var a = new Real(2.0);
    var v = new Vector([
        new Real(3.0),
        new Imaginary(4.5),
        new Complex(-3.0, -4.5)
    ]);

    var c = a.multiply(v);

    var correct = new Vector([
        new Real(6.0),
        new Imaginary(9.0),
        new Complex(-6.0, -9.0)
    ]);

    expect(c).toEqual(correct);

});

test("Real | divide() : tests '2 / 4.5'", () => {

    var a = new Real(2.0);
    var b = new Real(4.5);
    var c = a.divide(b);

    var correct = new Real(4.0/9.0);

    expect(c).toEqual(correct);

});

test("Real | divide() : tests '2 / 4.5i'", () => {

    var a = new Real(2.0);
    var b = new Imaginary(4.5);
    var c = a.divide(b);

    var correct = new Imaginary(4.0/9.0);

    expect(c).toEqual(correct);

});

test("Real | divide() : tests '2 / {3.0, 4.5i}'", () => {

    var a = new Real(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.divide(b);

    var correct = new Complex(0.205128205128205, -0.307692307692307);

    expect(c.r).toBeCloseTo(correct.r, 12);
    expect(c.i).toBeCloseTo(correct.i, 12);

});

test("Real | divide() : tests '2 / |3.0, 4.5i, {-3.0, -4.5i}>'", () => {

    var a = new Real(2.0);
    var v = new Vector([
        new Real(3.0),
        new Imaginary(4.5),
        new Complex(-3.0, -4.5)
    ]);

    var c = a.divide(v);

    var correct = new Vector([
        new Real(2.0/3.0),
        new Imaginary(4.0/9.0),
        new Complex(-0.205128205128205, 0.307692307692307)
    ]);

    expect(c.get(1).get()).toBeCloseTo(correct.get(1).get(), 12);
    expect(c.get(2).get()).toBeCloseTo(correct.get(2).get(), 12);
    expect(c.get(3).get("r")).toBeCloseTo(correct.get(3).get("r"), 12);
    expect(c.get(3).get("i")).toBeCloseTo(correct.get(3).get("i"), 12);

});

test("Real | copy()", () => {
    var a = new Real(2.0);
    var b = a.copy(a);

    b.set(5.0);

    var correct = new Real(2.0);

    expect(a).toEqual(correct);
});