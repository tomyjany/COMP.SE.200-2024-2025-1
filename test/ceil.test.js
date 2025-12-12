import { expect } from "chai"
import ceil from "../src/ceil.js"

describe("ceil tests", () => {
  it("doc examples", () => {
    expect(ceil(4.006)).to.equal(5)
    expect(ceil(6.004, 2)).to.equal(6.01)
    expect(ceil(6040, -2)).to.equal(6100)
  })

  it("rounds up with default precision 0", () => {
    expect(ceil(4.01)).to.equal(5)
    expect(ceil(4)).to.equal(4)
    expect(ceil(-4.01)).to.equal(-4)
    expect(ceil(-4)).to.equal(-4)
  })

  it("rounds up with positive precision", () => {
    expect(ceil(6.001, 2)).to.equal(6.01)
    expect(ceil(1.234, 1)).to.equal(1.3)
    expect(ceil(-1.234, 1)).to.equal(-1.2)
    expect(ceil(2.1, 0)).to.equal(3)
  })

  it("rounds up with negative precision", () => {
    expect(ceil(1499, -2)).to.equal(1500)
    expect(ceil(1500, -2)).to.equal(1500)
    expect(ceil(1501, -2)).to.equal(1600)
    expect(ceil(-1499, -2)).to.equal(-1400)
  })

  it("coerces string inputs", () => {
    expect(ceil("4.006")).to.equal(5)
    expect(ceil("6.004", 2)).to.equal(6.01)
    expect(ceil("6040", -2)).to.equal(6100)
  })

  it("handles NaN and non-numeric strings", () => {
    expect(Number.isNaN(ceil(NaN))).to.equal(true)
    expect(Number.isNaN(ceil("abc"))).to.equal(true)
  })

  it("handles null, undefined and booleans", () => {
    expect(ceil(null)).to.equal(0)
    expect(Number.isNaN(ceil(undefined))).to.equal(true)
    expect(ceil(true)).to.equal(1)
    expect(ceil(false)).to.equal(0)
  })
})
