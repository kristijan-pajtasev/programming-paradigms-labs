class Complex {
    constructor(r, i) {
        this.real = r;
        this.imaginary = i;
    }

    print() {
        console.log(`Number: ${this.real} + ${this.imaginary}i`)
    }

    conjugate() {
        return new Complex(this.real, -1 * this.imaginary);
    }

    add(other) {
        return new Complex(this.real + other.real, this.imaginary + other.imaginary );
    }

    subtract(other) {
        return new Complex(this.real - other.real, this.imaginary - other.imaginary );
    }

    multiply(other) {
        return new Complex(
            this.real * other.real - this.imaginary * other.imaginary,
            this.real * other.imaginary + this.imaginary * other.real
        );
    }

    magnitude() {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary).toFixed(2);
    }

    angle() {
        return Math.atan2(1, 1) * 180 / Math.PI;
    }

    polar() {
        const angle = this.angle();
        return `z = ${this.magnitude()}(cos(${angle}) + isin(${angle}))`
    }

    static maximumMagnitude(numbers) {
        return numbers
            .map(n => n.magnitude())
            .sort((a, b) => a < b ? 1 : -1)[0];
    }

    reciprocal() {
        const t = this.real * this.real + this.imaginary * this.imaginary;
        return new Complex(this.real / t, -1 * this.imaginary / t);
    }

}

let complexNum = new Complex(2, 3);
complexNum.print();
complexNum.reciprocal()
    .print();
complexNum.conjugate().print();
complexNum.add(new Complex(2,2)).print();
complexNum.subtract(new Complex(2,2)).print();
complexNum.multiply(new Complex(2,2)).print();
console.log((new Complex(1,1)).polar());
console.log((new Complex(1,1)).magnitude());

const maxMagnitude = Complex.maximumMagnitude([
    new Complex(1,1),
    new Complex(2,2),
    new Complex(1,2),
    new Complex(4,5),
    new Complex(99,11)
]);
console.log(`Max magnitude is: ${maxMagnitude}`);