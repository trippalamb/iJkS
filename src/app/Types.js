class _Number{
    add(x) {
        try{
            return this["add_" + x.constructor.name](x);
        }
        catch (e){
            throw new Error("add operation is not supported for these two types");
        }
    }

    subtract(x) {
        try{
            return this["subtract_" + x.constructor.name](x);
        }
        catch (e){
            throw new Error("subtract operation is not supported for these two types");
        }
    }

    multiply(x) {
        try{
            return this["multiply_" + x.constructor.name](x);
        }
        catch (e){
            throw new Error("multiply operation is not supported for these two types");
        }
    }

    divide(x) {
        try{
            return this["divide_" + x.constructor.name](x);
        }
        catch (e){
            throw new Error("divide operation is not supported for these two types");
        }
    }
}

class Real extends _Number{
    constructor(r) {
        super();
        this.r = parseFloat(r);
    }

    compileToJS() {
        return this.r;
    }

    /////////MATH/////////

    ///ADD///
    add_Real(x) {
        return new Real(this.r + x.r);
    }

    add_Imaginary(x) {
        return new Complex(this.r, x.i);
    }

    add_Complex(x) {
        return new Complex(this.r + x.r, x.i);
    }

    ///SUBTRACT///
    subtract_Real(x) {
        return new Real(this.r - x.r);
    }

    subtract_Imaginary(x) {
        return new Complex(this.r, -x.i);
    }

    subtract_Complex(x) {
        return new Complex(this.r - x.r, x.i);
    }

    ///MULTIPLY///
    multiply_Real(x) {
        return new Real(this.r * x.r);
    }

    multiply_Imaginary(x) {
        return new Imaginary(this.r * x.i);
    }

    multiply_Complex(x) {
        return new Complex(this.r * x.r, this.r * x.i);
    }

    ///DIVIDE///
    divide_Real(x) {
        return new Real(this.r / x.r);
    }

    divide_Imaginary(x) {
        return new Imaginary(-this.r / x.i);
    }

    divide_Complex(x) {
        var d = x.r * x.r + x.i * x.i;
        var r = (this.r * x.r) / d;
        var i = -(this.r * x.i) / d;
        return new Complex(r, i);
    }

    /////////COMPARISON/////////
    gt(x) {
        switch (x.constructor.name) {
            case ("Boolean"):
                return (this.b && x);
                break;
            default:
                throw new Error("And operation requires a boolean variable")
        }
    }

}

class Imaginary extends _Number {
    constructor(i) {
        super();
        if (typeof (i.length) !== "undefined") {
            this.i = parseFloat(i.slice(0, i.length - 1));
        }
        else {
            this.i = i;
        }
    }

    compileToJS() {
        throw new Error("not implemented yet");
    }

    ///ADD///
    add_Real(x) {
        return new Complex(x.r, this.i);
    }

    add_Imaginary(x) {
        return new Imaginary(this.i + x.i);
    }

    add_Complex(x) {
        return new Complex(x.r, this.i + x.i);
    }

    ///SUBTRACT///
    subtract_Real(x) {
        return new Complex(-x.r, this.i);
    }

    subtract_Imaginary(x) {
        return new Imaginary(this.i - x.i);
    }

    subtract_Complex(x) {
        return new Complex(-x.r, this.i - x.i);
    }

    ///MULTIPLY///
    multiply_Real(x) {
        return new Imaginary(this.i * x.r);
    }

    multiply_Imaginary(x) {
        return new Real(-this.i * x.i);
    }

    multiply_Complex(x) {
        return new Complex(-this.i * x.i, this.i * x.r);
    }

    ///DIVIDE///
    divide_Real(x) {
        return new Imaginary(this.i / x.r);
    }

    divide_Imaginary(x) {
        return new Real(this.i / x.i);
    }

    divide_Complex(x) {
        var d = x.r * x.r + x.i * x.i;
        var r = (this.i * x.r) / d;
        var i = -(this.i * x.i) / d;
        return new Complex(r, i);
    }


}

class Complex extends _Number{

    constructor(r, i) {
        super();
        this.r = r;
        this.i = i;
    }

    compileToJS() {
        throw new Error("not implemented yet");
    }


    ///ADD///
    add_Real(x) {
        return new Complex(this.r + x.r, this.i);
    }

    add_Imaginary(x) {
        return new Complex(this.r, this.i + x.i);
    }

    add_Complex(x) {
        return new Complex(this.r + x.r, this.i + x.i);
    }

    ///SUBTRACT///
    subtract_Real(x) {
        return new Complex(this.r - x.r, this.i);
    }

    subtract_Imaginary(x) {
        return new Complex(this.r, this.i - x.i);
    }

    subtract_Complex(x) {
        return new Complex(this.r - x.r, this.i - x.i);
    }

    ///MULTIPLY///
    multiply_Real(x) {
        return new Complex(this.r * x.r, this.i * x.r);
    }

    multiply_Imaginary(x) {
        return new Complex(-this.i * x.i, this.r * x.i);
    }

    multiply_Complex(x) {
        return new Complex(this.r * x.r - this.i * x.i, this.r * x.i + x.r * this.i);
    }

    ///DIVIDE///
    divide_Real(x) {
        return new Complex(this.r / x.r, this.i / x.r);
    }

    divide_Imaginary(x) {
        return new Real(this.i / x.i);
    }

    divide_Complex(x) {
        var d = x.r * x.r + x.i * x.i;
        var r = (this.r*x.r + this.i*x.i)/d;
        var i = (this.i*x.r - this.r*x.i)/d;
        return new Complex(r, i);
    }

    ///POWER///

    power_Real(r) {
        return this.toPolar()
            .power_Real(r)
            .toCartesian();
    }

    ///ROOT///

    root_Real(r) {
        return this.toPolar()
            .root_Real(r)
            .toCartesian();
    }

    ///MODULUS///

    modulus() {
        return new Real(Math.abs(Math.sqrt(this.r * this.r + this.i * this.i)));
    }

    ///CONJUGATE///

    conjugate() {
        return new Complex(this.r, -this.i);
    }

    ///TO POLAR///
    toPolar() {
        return new ComplexPolar(
            Math.pow(this.r * this.r + this.i * this.i, 0.5),
            Math.atan2(this.i, this.r)
        );

    }

}

class ComplexPolar extends _Number{
    constructor(ρ, θ) {
        super();
        this.ρ = ρ;
        this.θ = θ % (2 * Math.PI);
        if (this.θ < 0) { this.θ += 2 * Math.PI;}
    }

    ///MULTIPLY///
    mulitply_Complex(c) {
        return this.multiply(c.toPolar());
    }

    multiply_ComplexPolar(cp) {
        return new ComplexPolar(this.ρ * cp.ρ, this.θ + cp.θ);
    }

    ///DIVIDE///
    divide_Complex(c) {
        return this.divide(c.toPolar());
    }

    divide_ComplexPolar(cp) {
        return new ComplexPolar(this.ρ / cp.ρ, this.θ - cp.θ);
    }


    ///POWER///
    power_Real(r) {
        
        if (r >= 1) {
            return [new ComplexPolar(
                Math.pow(this.ρ, r),
                r * this.θ
            )];
        }
        else {
            let n = 1.0 / r;
            if (Number.isInteger(n)) {
                return findMultipleRoots(this.ρ, this.θ, n);
            }
            else {
                throw Error("Support for non-integer roots is not yet supported.");
            }
        }

        function findMultipleRoots(ρ_in, θ, n) {
            let results = [];
            let ρ = Math.pow(ρ_in);
            let twoPi = Math.PI * 2.0;
            for (let k = 0; k < n; k++) {
                results.push(new ComplexPolar(
                    ρ,
                    1.0 / n * (θ + k * twoPi)
                ));
            }
            return results;
        }
    }

    ///ROOT///
    root_Real(r) {
        return this.power_Real(1.0 / r);
    }

    ///TO CARTERSIAN///
    toCartesian() {
        return new Complex(
            this.ρ * Math.cos(this.θ),
            this.ρ * Math.sin(this.θ)
        );
    }
}

class Vector{
    constructor(v){

        this.v = [];

        v.forEach((a)=>{
            switch (a.constructor.name) {
                case ("Real"):
                case ("Imaginary"):
                case ("Complex"):
                    return this.v.push(a);
                    break;
                default:
                    throw new Error("Vector must be composed of numbers. [" + a + "]");
            }
        });
    }

    compileToJS(){
        throw new Error("not implemented yet");
    }

    add(x) {
        switch (x.constructor.name) {
            case ("Real"):
            case ("Imaginary"):
            case ("Complex"):
                return new Vector(this.v.map((v)=> v.add(x)));
                break;
            case ("Vector"):
                return new Vector(this.v.map((v, i)=> v.add(x[i])));
                break;
            default:
                throw new Error("add operation is not supported for these two types");
        }
    }

    subtract(x) {
        switch (x.constructor.name) {
            case ("Real"):
            case ("Imaginary"):
            case ("Complex"):
                return new Vector(this.v.map((v)=> v.subtract(x)));
                break;
            case ("Vector"):
                return new Vector(this.v.map((v, i)=> v.subtract(x[i])));
                break;
            default:
                throw new Error("add operation is not supported for these two types");
        }
    }

    multiply(x) {
        switch (x.constructor.name) {
            case ("Real"):
            case ("Imaginary"):
            case ("Complex"):
                return new Vector(this.v.map((v)=> v.multiply(x)));
                break;
            case ("Vector"):
                return new Vector(this.v.map((v, i)=> v.multiply(x[i])));
                break;
            default:
                throw new Error("add operation is not supported for these two types");
        }
    }

    divide(x) {
        switch (x.constructor.name) {
            case ("Real"):
            case ("Imaginary"):
            case ("Complex"):
                return new Vector(this.v.map((v)=> v.divide(x)));
                break;
            case ("Vector"):
                return new Vector(this.v.map((v, i)=> v.divide(x[i])));
                break;
            default:
                throw new Error("add operation is not supported for these two types");
        }
    }
    

}


class Boolean {
    constructor(b) {
        this.b = b;
    }

    not() {
        return !this.b;
    }

    and(x) {
        switch (x.constructor.name) {
            case ("Boolean"):
                return (this.b && x);
                break;
            default:
                throw new Error("And operation requires a boolean variable")
        }
    }

    or(x) {
        switch (x.constructor.name) {
            case ("Boolean"):
                return (this.b || x);
                break;
            default:
                throw new Error("And operation requires a boolean variable")
        }
    }

    xor(x) {
        switch (x.constructor.name) {
            case ("Boolean"):
                return (this.b ? !x : x);
                break;
            default:
                throw new Error("And operation requires a boolean variable")
        }
    }
}

module.exports = {
    Real: Real,
    Imaginary: Imaginary,
    Complex: Complex,
    ComplexPolar: ComplexPolar,
    Vector: Vector
};

