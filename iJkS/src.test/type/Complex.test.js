const { Complex, ComplexPolar, Real, Imaginary, Vector } = require("../../src/app/Types.js");

test("Complex | add() : tests '{3.0, 2i} + 4.5'", () => {

    var a = new Complex(3.0, 2.0);
    var b = new Real(4.5);
    var c = a.add(b);

    var correct = {
        classification: "scalar",
        r: 7.5,
        i: 2.0
    };

    expect(c).toEqual(correct);

});

test("Complex | add() : tests '{3.0, 2i} + 4.5i'", () => {

    var a = new Complex(3.0, 2.0);
    var b = new Imaginary(4.5);
    var c = a.add(b);

    var correct = {
        classification: "scalar",
        r: 3.0,
        i: 6.5
    };

    expect(c).toEqual(correct);

});

test("Complex | add() : tests '{5.0, 2.5i} + {3.0, 4.5i}'", () => {

    var a = new Complex(5.0, 2.5);
    var b = new Complex(3.0, 4.5);
    var c = a.add(b);

    var correct = {
        classification: "scalar",
        r: 8.0,
        i: 7.0
    };

    expect(c).toEqual(correct);

});

test("Complex | divide() : tests '{5.0, 2.5i} / {3.0, 4.5i}'", () => {

    var a = new Complex(5.0, 2.5);
    var b = new Complex(3.0, 4.5);
    var c = a.divide(b);

    var correct = {
        classification: "scalar",
        r: 0.8974358974358975,
        i: -0.5128205128205128
    };

    expect(c).toEqual(correct);

});
