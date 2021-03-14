const { Complex, ComplexPolar, Real, Imaginary, Vector } = require("../../src/app/Types.js");


///REAL///
test("Real | add() : tests '2 + 4.5'", () => {

    var a = new Real(2.0);
    var b = new Real(4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 6.5
    };

    expect(c).toEqual(correct);

});

test("Real | add() : tests '2 + 4.5i'", () => {

    var a = new Real(2.0);
    var b = new Imaginary(4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 2.0,
        i: 4.5
    };

    expect(c).toEqual(correct);

});

test("Real | add() : tests '2 + [3.0, 4.5i]'", () => {

    var a = new Real(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 5.0,
        i: 4.5
    };

    expect(c).toEqual(correct);

});

///Imaginary///
test("Imaginary | add() : tests '2i + 4.5'", () => {

    var a = new Imaginary(2.0);
    var b = new Real(4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
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
        classification:"scalar",
        i: 6.5
    };

    expect(c).toEqual(correct);

});

test("Imaginary | add() : tests '2i + [3.0, 4.5i]'", () => {

    var a = new Imaginary(2.0);
    var b = new Complex(3.0, 4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 3.0,
        i: 6.5
    };

    expect(c).toEqual(correct);

});

///COMPLEX///
test("Complex | add() : tests '[3.0, 2i] + 4.5'", () => {

    var a = new Complex(3.0, 2.0);
    var b = new Real(4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 7.5,
        i: 2.0
    };

    expect(c).toEqual(correct);

});

test("Complex | add() : tests '[3.0, 2i] + 4.5i'", () => {

    var a = new Complex(3.0, 2.0);
    var b = new Imaginary(4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 3.0,
        i: 6.5
    };

    expect(c).toEqual(correct);

});

test("Complex | add() : tests '[5.0, 2.5i] + [3.0, 4.5i]'", () => {

    var a = new Complex(5.0, 2.5);
    var b = new Complex(3.0, 4.5);
    var c = a.add(b);

    var correct = {
        classification:"scalar",
        r: 8.0,
        i: 7.0
    };

    expect(c).toEqual(correct);

});

test("Complex | divide() : tests '[5.0, 2.5i] / [3.0, 4.5i]'", () => {

    var a = new Complex(5.0, 2.5);
    var b = new Complex(3.0, 4.5);
    var c = a.divide(b);

    var correct = {
        classification:"scalar",
        r: 0.8974358974358975,
        i: -0.5128205128205128
    };

    expect(c).toEqual(correct);

});

///VECTOR///
//test("Vector | add() : tests '<1.0, 2.0, 3.0> + 4.5'", () => {

//    var a = new Vector([1.0, 2.0, 3.0].map((x)=>new Real(x)));
//    var b = new Real(4.5);
//    var c = a.add(b);

//    var correct = {
//        classification: "vector",
//        isColumn: true,
//        v: [
//            { r: 5.5},
//            { r: 6.5},
//            { r: 7.5}
//        ]
//    };

//    expect(c).toEqual(correct);

//});

//test("Vector | add() : tests '<1.0i, 2.0i, 3.0i> + 4.5'", () => {

//    var a = new Vector([1.0, 2.0, 3.0].map((x)=>new Imaginary(x)));
//    var b = new Real(4.5);
//    var c = a.add(b);

//    var correct = {
//        classification: "vector",
//        isColumn: true,
//        v: [
//            { r: 4.5, i:1.0},
//            { r: 4.5, i:2.0},
//            { r: 4.5, i:3.0}
//        ]
//    };

//    expect(c).toEqual(correct);

//});

//test("Vector | add() : tests '<1.0, 2.0i, [3.0, 3.0i]> + 4.5'", () => {

//    var a = new Vector([
//        new Real(1.0),
//        new Imaginary(2.0),
//        new Complex(3.0, 3.0)
//    ]);

//    var b = new Real(4.5);
//    var c = a.add(b);

//    var correct = {
//        classification: "vector",
//        isColumn: true,
//        v: [
//            { r: 5.5},
//            { r: 4.5, i:2.0},
//            { r: 7.5, i:3.0}
//        ]
//    };

//    expect(c).toEqual(correct);

//});
