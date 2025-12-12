import { expect } from "chai"
import toNumber from "../src/toNumber.js"

describe("toNumber tests", () => {
  it("doc examples", () => {
    expect(toNumber(3.2)).to.equal(3.2)
    expect(toNumber(Number.MIN_VALUE)).to.equal(Number.MIN_VALUE)
    expect(toNumber(Infinity)).to.equal(Infinity)
    expect(toNumber("3.2")).to.equal(3.2)
  })

  it("returns numbers unchanged", () => {
    expect(toNumber(0)).to.equal(0)
    expect(toNumber(-0)).to.equal(-0)
    expect(toNumber(42)).to.equal(42)
    expect(toNumber(-13.5)).to.equal(-13.5)
  })

  it("converts numeric strings", () => {
    expect(toNumber("0")).to.equal(0)
    expect(toNumber("42")).to.equal(42)
    expect(toNumber("-13.5")).to.equal(-13.5)
    expect(toNumber("1e3")).to.equal(1000)
  })

  it("trims whitespace in strings", () => {
    expect(toNumber("  3.2  ")).to.equal(3.2)
    expect(toNumber("\n\t 10 \t")).to.equal(10)
  })

  it("parses binary and octal string values", () => {
    expect(toNumber("0b10")).to.equal(2)
    expect(toNumber("0B101")).to.equal(5)
    expect(toNumber("0o10")).to.equal(8)
    expect(toNumber("0O7")).to.equal(7)
  })

  it("treats signed bad hex as NaN", () => {
    expect(Number.isNaN(toNumber("-0x1"))).to.equal(true)
    expect(Number.isNaN(toNumber("+0x10"))).to.equal(true)
  })

  it("parses normal hex strings via Number", () => {
    expect(toNumber("0x10")).to.equal(16)
    expect(toNumber("0Xff")).to.equal(255)
  })

  it("returns NaN for non-numeric strings", () => {
    expect(Number.isNaN(toNumber("abc"))).to.equal(true)
    expect(Number.isNaN(toNumber("3.2.1"))).to.equal(true)
  })

  it("handles null, undefined and booleans", () => {
    expect(toNumber(null)).to.equal(0)
    expect(Number.isNaN(toNumber(undefined))).to.equal(true)
    expect(toNumber(true)).to.equal(1)
    expect(toNumber(false)).to.equal(0)
  })

  it("handles objects with valueOf returning number or string", () => {
    const numObj = { valueOf() { return 7 } }
    const strObj = { valueOf() { return "3.5" } }

    expect(toNumber(numObj)).to.equal(7)
    expect(toNumber(strObj)).to.equal(3.5)
  })

  it("handles objects whose valueOf returns another object", () => {
    const weirdObj = {
      valueOf() {
        return { x: 1 }
      },
    }

    expect(Number.isNaN(toNumber(weirdObj))).to.equal(true)
  })

  it("handles arrays", () => {
    expect(toNumber([3])).to.equal(3)
    expect(toNumber(["3.2"])).to.equal(3.2)
    expect(Number.isNaN(toNumber([1, 2]))).to.equal(true)
  })

  it("returns NaN for symbols", () => {
    const sym = Symbol("x")
    expect(Number.isNaN(toNumber(sym))).to.equal(true)
  })
})
