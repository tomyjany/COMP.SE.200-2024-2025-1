import { expect } from "chai"
import clamp from "../src/clamp.js"

describe("Clamp tests", () => {

    // MANUAL

    it("It should return values that are described in the example doc string", ()=>
    {
        expect(clamp(-10,-5,5)).to.equal(-5)
        expect(clamp(10,-5,5)).to.equal(5)
    })
    it("test different valid values", ()=>
    {
        expect(clamp(3,1,5)).to.equal(3)
        expect(clamp(3,-5,5)).to.equal(3)
        expect(clamp(-5,-10,-1)).to.equal(-5)
    })
    it("test where the numbe requels to the lower bound", ()=>
    {
        expect(clamp(1,1,5)).to.equal(1)
        expect(clamp(-5,-5,10)).to.equal(-5)
        expect(clamp(-5,-5,-1)).to.equal(-5)
    })
   it("Test where the number equals to the upper bound", ()=>
   {
       expect(clamp(5,1,5)).to.equal(5)
       expect(clamp(10,5,10)).to.equal(10)
       expect(clamp(10,-5,10)).to.equal(10)
   })
    it("Test where the number is lower than the lower bound", ()=>
    {
        expect(clamp(-1,1,5)).to.equal(1)
    })
    it("Test where the number is higher than the higher bound", ()=>
    {
        expect(clamp(6,1,5)).to.equal(5)
    })
    it("Test with maximum and minimum integer values as bounds", ()=>
    {
        expect(clamp(0,Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).to.equal(0)
        expect(clamp(Number.MIN_SAFE_INTEGER,0, Number.MAX_SAFE_INTEGER)).to.equal(0)
        expect(clamp(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,0)).to.equal(0)
    })
    it("Test with invalid range (lower bound higher than upper bound)", ()=>
    {
        expect(() => clamp(1,5,-5)).to.throw(RangeError)
    })
    it("Test with string inputs instead of numbers", ()=>
    {
        expect(() => clamp('a','b','c')).to.throw(TypeError)
    })
    it("Test with not enough arguments", ()=>
    {
        expect(() => clamp(1,2)).to.throw(TypeError)
    })


// })
//
// describe("AI generated Clamp tests", () => {

  it("AI generated: clamps correctly when lower and upper bounds are equal", () => {
    expect(clamp(5, 5, 5)).to.equal(5)
    expect(clamp(10, 5, 5)).to.equal(5)   // above the single bound
    expect(clamp(0, 5, 5)).to.equal(5)    // below the single bound
    expect(clamp(-5, -5, -5)).to.equal(-5)
  })

  it("AI generated: works with negative ranges and decimals", () => {
    expect(clamp(-2.5, -5.5, -1.5)).to.equal(-2.5)   // inside
    expect(clamp(-10.5, -5.5, -1.5)).to.equal(-5.5)  // below
    expect(clamp(0, -5.5, -1.5)).to.equal(-1.5)      // above
  })

  it("AI generated: works with mixed-sign decimal bounds", () => {
    expect(clamp(0.5, -1.0, 2.0)).to.equal(0.5)
    expect(clamp(-5.2, -1.0, 2.0)).to.equal(-1.0)
    expect(clamp(10.7, -1.0, 2.0)).to.equal(2.0)
  })

  it("AI generated: result is always within [lower, upper] for various values", () => {
    const cases = [
      { number: -100, lower: -10, upper: 10 },
      { number: 0,    lower: -10, upper: 10 },
      { number: 100,  lower: -10, upper: 10 },
      { number: 5,    lower: 5,   upper: 10 },
      { number: 5,    lower: -10, upper: 5 },
    ]

    for (const { number, lower, upper } of cases) {
      const result = clamp(number, lower, upper)
      expect(result, `clamp(${number}, ${lower}, ${upper})`).to.be.at.least(lower)
      expect(result, `clamp(${number}, ${lower}, ${upper})`).to.be.at.most(upper)
    }
  })

  it("AI generated: handles Number.POSITIVE_INFINITY and Number.NEGATIVE_INFINITY", () => {
    // finite number with infinite bounds
    expect(clamp(0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).to.equal(0)

    // number is +Infinity / -Infinity
    expect(clamp(Number.POSITIVE_INFINITY, -10, 10)).to.equal(10)
    expect(clamp(Number.NEGATIVE_INFINITY, -10, 10)).to.equal(-10)
  })

  it("AI generated: throws TypeError when any argument is NaN", () => {
    expect(() => clamp(NaN, 0, 10)).to.throw(TypeError)
    expect(() => clamp(5, NaN, 10)).to.throw(TypeError)
    expect(() => clamp(5, 0, NaN)).to.throw(TypeError)
  })

  it("AI generated: throws TypeError when arguments are null or undefined", () => {
    expect(() => clamp(null, 0, 10)).to.throw(TypeError)
    expect(() => clamp(5, null, 10)).to.throw(TypeError)
    expect(() => clamp(5, 0, null)).to.throw(TypeError)

    expect(() => clamp(undefined, 0, 10)).to.throw(TypeError)
    expect(() => clamp(5, undefined, 10)).to.throw(TypeError)
    expect(() => clamp(5, 0, undefined)).to.throw(TypeError)
  })

  it("AI generated: throws TypeError when mixing numbers and numeric strings", () => {
    expect(() => clamp("3", 0, 10)).to.throw(TypeError)
    expect(() => clamp(3, "0", 10)).to.throw(TypeError)
    expect(() => clamp(3, 0, "10")).to.throw(TypeError)
  })

  it("AI generated: throws TypeError when too many arguments are given", () => {
    // this assumes extra args are NOT allowed
    expect(() => clamp(1, 0, 2, 3)).to.throw(TypeError)
  })

})
