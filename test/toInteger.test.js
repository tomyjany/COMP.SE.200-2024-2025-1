import { expect } from "chai"
import toInteger from "../src/toInteger.js"

describe("toInteger tests", () => {
  it("doc examples", () => {
    expect(toInteger(3.2)).to.equal(3)
    expect(toInteger(Number.MIN_VALUE)).to.equal(0)
    expect(toInteger(Infinity)).to.equal(1.7976931348623157e+308)
    expect(toInteger("3.2")).to.equal(3)
  })

  it("returns integers unchanged", () => {
    expect(toInteger(0)).to.equal(0)
    expect(toInteger(42)).to.equal(42)
    expect(toInteger(-7)).to.equal(-7)
  })

  it("truncates positive decimals toward zero", () => {
    expect(toInteger(3.9)).to.equal(3)
    expect(toInteger(0.9999)).to.equal(0)
  })

  it("truncates negative decimals toward zero", () => {
    expect(toInteger(-3.9)).to.equal(-3)
    expect(toInteger(-0.9999)).to.equal(0)
  })

  it("handles numeric strings", () => {
    expect(toInteger("10")).to.equal(10)
    expect(toInteger("-10.7")).to.equal(-10)
    expect(toInteger("0.5")).to.equal(0)
  })

  it("returns 0 for NaN-like values", () => {
    expect(toInteger(NaN)).to.equal(0)
    expect(toInteger("abc")).to.equal(0)
  })

  it("handles null, undefined and booleans", () => {
    expect(toInteger(null)).to.equal(0)
    expect(toInteger(undefined)).to.equal(0)
    expect(toInteger(true)).to.equal(1)
    expect(toInteger(false)).to.equal(0)
  })

  it("handles very large numbers and clamps via toFinite", () => {
    const large = 1e309
    expect(toInteger(large)).to.equal(1.7976931348623157e+308)
    expect(toInteger(-1e309)).to.equal(-1.7976931348623157e+308)
  })

  it("handles objects with valueOf", () => {
    const objNum = { valueOf() { return 4.8 } }
    const objStr = { valueOf() { return "9.9" } }

    expect(toInteger(objNum)).to.equal(4)
    expect(toInteger(objStr)).to.equal(9)
  })

  it("handles arrays via coercion", () => {
    expect(toInteger([5.7])).to.equal(5)
    expect(toInteger(["8.3"])).to.equal(8)
    expect(toInteger([1, 2])).to.equal(0)
  })
})
