const { Complex, ComplexPolar, Real, Imaginary, Vector } = require("../../src/app/Types.js");

test("Imaginary | add() : tests '2i + 4.5'", () => {

    var a = new Imaginary(2.0);
    var b = new Real(4.5);
    var c = a.add(b);

    var correct = {
        classification: "scalar",
        r: 4.5,
        i: 2.0
    };

    expect(c).toEqual(correct);

});

test("Imaginary | add() : tests '2i + 4.5i'", () => {

    var a = new Imaginary(2.0);
    var b = new Imaginary(4.5);
    var c = a.add(b);

    var correct = {
        classification: "scalar",
        i: 6.5
    };

    expect(c).toEqual(correct);

});

test("Imaginary | add() : tests '2i + [3.0, 4.5i]'", () => {

    var a = new Imaginary(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.add(b);

    var correct = {
        classification: "scalar",
        r: 3.0,
        i: 6.5
    };

    expect(c).toEqual(correct);

});
