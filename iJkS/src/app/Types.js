class Scalar{
    constructor() {
        this.classification = "scalar";
    }

    add(x) {
        try{
            return this["map_" + x.classification]("add", x);
        }
        catch (e){
            throw new Error("add operation is not supported for these two types");
        }
    }

    subtract(x) {
        try{
            return this["map_" + x.classification]("subtract", x);
        }
        catch (e){
            throw new Error("subtract operation is not supported for these two types");
        }
    }

    multiply(x) {
        try{
            return this["map_" + x.classification]("multiply", x);
        }
        catch (e){
            throw new Error("multiply operation is not supported for these two types");
        }
    }

    divide(x) {
        try{
            return this["map_" + x.classification]("divide", x);
        }
        catch (e){
            throw new Error("divide operation is not supported for these two types");
        }
    }

    map_scalar(op, x) {
        return this[op + "_" + x.constructor.name](x);
    }

    map_vector(op, x) {
        var results = [];
        var size = x.getSize();
        for (let i = 0; i < size; i++) {
            results[i] = this.map_scalar(op, x.getRef(i+1));
        }
        return new Vector(results, x.isColumn);
    }

    map_matrix(op, x) {
        var results = [];
        var size = x.getSize();
        for (let i = 0; i < size[0]; i++) {
            results[i] = [];
            for (let j = 0; j < size[1]; j++) {
                results[i][j] = this.map_scalar(op, x.getRef(i+1, j+1));
            }
        }
        return new Matrix(results, null, true);
    }

    copy() {
        throw new Error("child must implement an override of this method");
    }
}

class Real extends Scalar{
    constructor(r) {
        super();
        this.r = parseFloat(r);
    }

    compileToJS() {
        return this.r;
    }

    copy() {
        return new Real(this.r);
    }

    get() {
        return this.r;
    }

    set(r) {
        this.r = r;
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
        return new Complex(this.r - x.r, -x.i);
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
        return new Imaginary(this.r / x.i);
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

class Imaginary extends Scalar {
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

    copy() {
        return new Imaginary(this.i);
    }

    get() {
        return this.i;
    }

    set(i) {
        this.i = i;
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

    add_Vector(x) {
        return new Vector(x.v.map(v => this.add(v)));
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

    subtract_Vector(x) {
        return new Vector(x.v.map(v => this.subtract(v)));
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

    multiply_Vector(x) {
        return new Vector(x.v.map(v => this.multiply(v)));
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

    divide_Vector(x) {
        return new Vector(x.v.map(v => this.divide(v)));
    }


}

class Complex extends Scalar{

    constructor(r, i) {
        super();
        this.r = r;
        this.i = i;
    }

    compileToJS() {
        throw new Error("not implemented yet");
    }

    copy() {
        return new Complex(this.r, this.i);
    }

    get(x) {
        return this[x];
    }

    set(r, i) {
        this.r = r;
        this.i = i;
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

    add_Vector(x) {
        return new Vector(x.v.map(v => this.add(v)));
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

    subtract_Vector(x) {
        return new Vector(x.v.map(v => this.subtract(v)));
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

    multiply_Vector(x) {
        return new Vector(x.v.map(v => this.multiply(v)));
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

    divide_Vector(x) {
        return new Vector(x.v.map(v => this.divide(v)));
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

class ComplexPolar extends Scalar{
    constructor(ρ, θ) {
        super();
        this.ρ = ρ;
        this.θ = θ % (2 * Math.PI);
        if (this.θ < 0) { this.θ += 2 * Math.PI;}
    }

    copy() {
        return new ComplexPolar(this.ρ, this.θ);
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
    constructor(x, isColumn, n){

        if (x.constructor.name === "Number" || x.classfication === "scalar") { this.construct_fromScalar(x, isColumn, n); }
        else if (x.constructor.name === "Vector") { this.construct_fromVector(x); }
        else if (x.constructor.name === "Array") { this.construct_fromArray(x, isColumn); }
        else { throw new Error(`${x.constructor.name} is not a valid object type to construct a tensor.`); }
        
    }

    construct_fromScalar(s, isColumn, n) {
        this.classification = "vector";
        this.isColumn = (typeof (isColumn) === "undefined") ? true : isColumn;
        this.vals = [];

        for (let i = 0; i < n; i++) {
            if (s.constructor.name === "Number") {
                this.vals[i][j] = new Real(s);
            }
            else {
                this.vals[i][j] = s.copy();
            }
        }
    }

    construct_fromVector(v) {
        let nv = JSON.parse(JSON.stringify(v));
        for (const key in nv) {
            this[key] = nv[key];
        }
    }

    construct_fromArray(v, isColumn) {
        this.classification = "vector";
        this.vals = [];
        this.isColumn = (typeof (isColumn) === "undefined") ? true : isColumn;
        this.push(v);
    }

    ///PUSH///
    push(v) {
        v.forEach((a) => {
            try {
                this["push_" + a.constructor.name](a);
            }
            catch (e) {
                throw new Error("Number type is not yet supported in the Vector class. [" + a + "]");
            }

        });
    }

    push_Number(n) {
        this.vals.push(new Real(n));
    }

    push_Real(r) {
        this.vals.push(new Real(r.r));
    }

    push_Imaginary(i) {
        this.vals.push(new Imaginary(i.i));
    }
    
    push_Complex(c) {
        this.vals.push(new Complex(c.r, c.i));
    }


    map_scalar(op, x) {
        return new Vector(this.vals.map((v) => v[op](x)));
    }

    map_vector(op, x) {
        if (this.isColumn === x.isColumn) {
            var results = [];
            var size = x.getSize();
            for (let i = 1; i <= size; i++) {
                results[i] = this.get(i).map_scalar(op, x.getRef(i));
            }
            return new Vector(results, this.isColumn, true);
        }
        else {
            throw new Error("Cannot add a row vector and a column vector")
        }
    }

    map_matrix(op, x) {
        throw new Error("not implemented");
    }

    ///ADD///

    add(x) {
        
        try {
            return this["map_" + x.classification]("add", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for addition by the Vector class. [" + x + "]");
        }
    }

    ///SUBTRACT///
    subtract(x) {
        try {
            return this["map_" + x.classification]("subtract", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for subtraction by the Vector class. [" + x + "]");
        }
    }

    ///MULTIPLY

    multiply(x) {
        try {
            return this["map_" + x.classification]("multiply", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for multiplication by the Vector class. [" + x + "]");
        }
    }

    ///DIVIDE///

    divide(x) {
        try {
            return this["map_" + x.classification]("divide", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for division by the Vector class. [" + x + "]");
        }
    }
    
    inverse() {
        return this.multiply(new Real(-1));
    }

    get(i) {
        return this.vals[i - 1].copy();
    }

    getRef(i) {
        return this.vals[i - 1];
    }

    getSize() {
        return this.vals.length;
    }

    ///SET///
    set(i, x) {
        try {
            this.vals[i - 1] = x.copy();
        }
        catch (e) {
            throw new Error("Number type is not yet supported for setting in the Vector class. [" + x + "]");
        }
    }

    ///Compilation///

    compileToJS() {
        throw new Error("not implemented yet");
    }

}

class Matrix {
    constructor(x, n, m, noCopy) {
        if (x.constructor.name === "Number" || x.classfication === "scalar") { this.construct_fromScalar(x, n, m);}
        else if (x.constructor.name === "Matrix") { this.construct_fromMatrix(x); }
        else if (x.constructor.name === "Vector") { this.construct_fromVector(x); }
        else if (x.constructor.name === "Array") { this.construct_fromArray(x, noCopy); }
        else { throw new Error(`${x.constructor.name} is not a valid object type to construct a tensor.`); }
    }

    construct_fromScalar(s, n, m) {

        this.classification = "matrix";
        this.vals = [];
        this.m = m;
        this.n = n;

        for (let i = 0; i < this.m; i++) {
            this.vals[i] = [];
            for (let j = 0; j < this.n; j++) {
                if (s.constructor.name === "Number") {
                    this.vals[i][j] = new Real(s);
                }
                else {
                    this.vals[i][j] = s.copy();
                }
            }
        }
    }

    construct_fromMatrix(matrix) {
        let nm = JSON.parse(JSON.stringify(matrix));
        for (const key in nm) {
            this[key] = nm[key];
        }
    }

    construct_fromVector(vector) {

        if (vector.isColumn) {
            this.construct_fromColumnVector(vector);
        }
        else {
            this.construct_fromRowVector(vector);
        }

    }

    construct_fromColumnVector(vector) {

        this.classification = "matrix";
        this.vals = [];
        this.m = vector.getSize();
        this.n = 1;

        let nv = JSON.parse(JSON.stringify(v));
        for (let i = 0; i < this.m; i++) {
            this.vals[i] = [nv.get(i)];
        }

    }

    construct_fromRowVector(vector) {

        this.classification = "matrix";
        this.vals = [];
        this.m = 1;
        this.n = vector.getSize();

        let nv = JSON.parse(JSON.stringify(v));
        for (let j = 0; j < this.n; j++) {
            this.vals[0][j] = [nv.get(j)];
        }

    }

    construct_fromArray(array, noCopy) {

        validateArray(array);

        this.classification = "matrix";
        this.vals = [];
        this.m = array.length;
        this.n = array[0].length;

        for (let i = 0; i < this.m; i++) {
            this.vals[i] = [];
            for (let j = 0; j < this.n; j++) {
                let s = array[i][j];
                if (s.constructor.name === "Number") {
                    this.vals[i][j] = new Real(s);
                }
                else if(noCopy){
                    this.vals[i][j] = s;
                }
                else{
                    this.vals[i][j] = s.copy();
                }
            }
        }

        function assignmentLogic() {

        }

        function validateArray(a) {

            if (a.length < 1) { throw new Error("must not pass in empty array to matrix constructor");}
            if (a[0].length < 1) { throw new Error("must pass 2d array to matrix constructor"); }

            let length = a[0].length;
            for (let i = 0; i < a.length; i++) {
                if (length !== a[i].length) { throw new Error("array argument must be rectangular"); }
                for (let j = 0; j < a[i].length; j++) {
                    if (!(a[i][j].constructor.name === "Number" || a[i][j].classification === "scalar")) {
                        throw new Error("all array values must be either of type Number or a Scalar");
                    }
                }
            }
        }
    }

    map_scalar(op, x) {
        let result = [];
        for (let i = 0; i < this.m; i++) {
            result[i] = [];
            for (let j = 0; j < this.n; j++) {
                result[i][j] = this[i][j][op](x);
            }
        }

        return new Matrix(result, null, null, true);
    }

    map_vector(op, x) {
        if (x.isColumn) {
            this.map_columnVector(op, x);
        }
        else {
            this.map_rowVector(op, x);
        }
    }

    map_columnVector(op, x) {
        let result = [];
        for (let i = 0; i < this.m; i++) {
            result[i] = [];
            for (let j = 0; j < this.n; j++) {
                result[i][j] = this[i][j][op](x.getRef(i + 1));
            }
        }

        return new Matrix(result, null, null, true);
    }

    map_rowVector(op, x) {
        let result = [];
        for (let i = 0; i < this.m; i++) {
            result[i] = [];
            for (let j = 0; j < this.n; j++) {
                result[i][j] = this[i][j][op](x.getRef(j + 1));
            }
        }

        return new Matrix(result, null, null, true);
    }


    map_matrix(op, x) {
        let result = [];
        for (let i = 0; i < this.m; i++) {
            result[i] = [];
            for (let j = 0; j < this.n; j++) {
                result[i][j] = this[i][j][op](x.getRef(i+1, j+1));
            }
        }

        return new Matrix(result, null, null, true);
    }

    ///ADD///

    add(x) {

        try {
            return this["map_" + x.classification]("add", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for addition by the Matrix class. [" + x + "]");
        }
    }


    ///SUBTRACT///
    subtract(x) {
        try {
            return this["map_" + x.classification]("subtract", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for subtraction by the Matrix class. [" + x + "]");
        }
    }

    ///MULTIPLY

    multiply(x) {
        try {
            return this["map_" + x.classification]("multiply", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for multiplication by the Matrix class. [" + x + "]");
        }
    }

    ///DIVIDE///

    divide(x) {
        try {
            return this["map_" + x.classification]("divide", x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for division by the Matrix class. [" + x + "]");
        }
    }

    ///MATRIX MULTIPLICATION///

    matmul(x) {
        try {
            return this["matmul_" + x.classfication](x);
        }
        catch (e) {
            throw new Error("Number type is not yet supported for matrix multiplication by the Matrix class. [" + x + "]");
        }
    }

    matmul_vector(x) {
        throw new Error("not implemented");
    }

    matmul_matrix(x) {
        throw new Error("not implemented");
    }

    ///GETS///

    get(i, j) {
        return this.vals[i - 1][j - 1].copy();
    }

    getRef(i, j) {
        return this.vals[i - 1][j - 1];
    }

    getSize() {
        return [this.m, this.n];
    }

    ///SET///
    set(i, j, x) {
        try {
            this.vals[i - 1][j - 1] = x.copy();
        }
        catch (e) {
            throw new Error("Number type is not yet supported for setting in the Matrix class. [" + x + "]");
        }
    }
}

class Tensor {
    constructor(t) {

        if (t.constructor.name === "Tensor") { this.construct_fromTensor(t); }
        else if (t.constructor.name === "Vector") { this.construct_fromVector(t); }
        else if (t.constructor.name === "Array") {this.construct_fromArray(t); }
        else { throw new Error(`${m.constructor.name} is not a valid object type to construct a tensor.`); }

    }

    construct_fromTensor(tensor) {
        let nt = JSON.parse(JSON.stringify(tensor));
        for (const key in nt) {
            this[key] = nt[key];
        }
    }

    construct_fromVector(vector) {

        this.classfication = "tensor";
        this.tierClass = "scalar";

        this.t = [];
        this.size = [vector.getSize()];
        this.dimension = 1;

        if (!vector.isColumn) { throw new Error("Row vectors construction of a matrix is not implemented yet"); }

        for (const v of vector.v) {
            this.push_scalar(v);
        }
    }

    construct_fromArray(array) {

        this.classification = "tensor";
        this.tierClass = getTierClass(array[0]);
        this.validateInput(array);

        this.t = [];
        this.size = [array.length];
        this.dimension = 1;

        for (const a of array) {
            this["push_" + this.tierClass](a);
        }

    }

    validateInput(a) {

        if (typeof (a.length) === "undefined") { throw new Error("Input for matrix must be an array"); }
        if (a.length === 0) { throw new Error("Cannot construct an empty matrix."); }

        for (const a of array) {
            if (a.constructor.name !== this.tierClass && a.classfication !== this.tierClass) {
                throw new Error("All values in an array must have the same classification to insert to a Matrix.")
            }
        }
    }

    ///PUSH///
    push(x) {
        try {
            this["push_" + x.constructor.name](x);
        }
        catch (e) {
            throw new Error(`The tier class <${this.tierClass}> is not supported by matrix.`);
        }

    }

    push_scalar(s) {
        this["push_" + s.constructor.name](s);
    }

    push_Number(n) {
        this.t.push(new Real(n));
    }

    push_Real(r) {
        this.t.push(new Real(r.r));
    }

    push_Imaginary(i) {
        this.t.push(new Imaginary(i.i));
    }

    push_Complex(c) {
        this.t.push(new Complex(c.r, c.i));
    }

    push_Array(array) {
        this.size.push(array.length);
        this.dimension++;
        this.t.push(new Tensor(a));
    }

    push_vector(v) {
        this.size.push(v.getSize());
        this.dimension++;
        this.t.push(new Tensor(v));
    }

}

///Private Functions for Matrix///
function getTierClass(a) {
    let tierClass = a.classification;
    if (typeof (tierClass) === "undefined") { tierClass = a.constructor.name; }
    return tierClass;
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
    Boolean: Boolean,
    Complex: Complex,
    ComplexPolar: ComplexPolar,
    Imaginary: Imaginary,
    Real: Real,
    Vector: Vector,
    Matrix: Matrix,
    Tensor:Tensor
};

//export {
//    Boolean,
//    Real,
//    Imaginary,
//    Complex,
//    ComplexPolar,
//    Vector
//}
