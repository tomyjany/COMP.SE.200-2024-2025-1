import { expect } from "chai"
import reduce from "../src/reduce.js"

describe("reduce tests", () => {
  it("doc example: sums array with explicit accumulator", () => {
    const result = reduce([1, 2], (sum, n) => sum + n, 0)
    expect(result).to.equal(3)
  })

  it("doc example: groups object keys by value", () => {
    const input = { a: 1, b: 2, c: 1 }

    const result = reduce(
      input,
      (acc, value, key) => {
        ;(acc[value] || (acc[value] = [])).push(key)
        return acc
      },
      {}
    )

    expect(Object.keys(result).sort()).to.deep.equal(["1", "2"])
    expect(result["1"].sort()).to.deep.equal(["a", "c"])
    expect(result["2"].sort()).to.deep.equal(["b"])
  })

  it("uses first array element as accumulator when not provided", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n)
    expect(result).to.equal(6)
  })

  it("uses first object value as accumulator when not provided", () => {
    const input = { a: 1, b: 2, c: 3 }
    const result = reduce(input, (acc, value) => acc + value)
    expect(result).to.equal(6)
  })

  it("reduces array to product", () => {
    const result = reduce([2, 3, 4], (acc, n) => acc * n, 1)
    expect(result).to.equal(24)
  })

  it("reduces array to string concatenation", () => {
    const result = reduce(["a", "b", "c"], (acc, ch) => acc + ch, "")
    expect(result).to.equal("abc")
  })

  it("handles empty array with explicit accumulator", () => {
    const result = reduce([], (acc, n) => acc + n, 10)
    expect(result).to.equal(10)
  })

  it("handles null and undefined collections with explicit accumulator", () => {
    const fn = (acc, v) => acc + v
    expect(reduce(null, fn, 5)).to.equal(5)
    expect(reduce(undefined, fn, 7)).to.equal(7)
  })

  it("iteratee receives accumulator, value, index/key, and collection", () => {
    const collection = [10, 20]
    const seen = []

    const result = reduce(
      collection,
      (acc, value, index, coll) => {
        seen.push({
          acc,
          value,
          index,
          sameCollection: coll === collection,
        })
        return acc + value
      },
      0
    )

    expect(result).to.equal(30)
    expect(seen).to.deep.equal([
      { acc: 0, value: 10, index: 0, sameCollection: true },
      { acc: 10, value: 20, index: 1, sameCollection: true },
    ])
  })

  it("works for cart-like totals (sum of price * quantity)", () => {
    const items = [
      { id: 1, price: 10.5, quantity: 2 },
      { id: 2, price: 3.25, quantity: 1 },
    ]

    const total = reduce(
      items,
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    expect(total).to.equal(10.5 * 2 + 3.25 * 1)
  })
})
