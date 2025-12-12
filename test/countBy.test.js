import { expect } from "chai"
import countBy from "../src/countBy.js"

describe("countBy tests", () => {
  it("doc example: counts users by active flag", () => {
    const users = [
      { user: "barney", active: true },
      { user: "betty", active: true },
      { user: "fred", active: false },
    ]

    const result = countBy(users, (value) => value.active)
    expect(result).to.deep.equal({ true: 2, false: 1 })
  })

  it("counts numbers by even/odd", () => {
    const nums = [1, 2, 3, 4, 5]

    const result = countBy(nums, (n) => n % 2 === 0)
    expect(result).to.deep.equal({ true: 2, false: 3 })
  })

  it("counts products by category (facet-style)", () => {
    const products = [
      { id: 1, category: "phone" },
      { id: 2, category: "laptop" },
      { id: 3, category: "phone" },
      { id: 4, category: "accessory" },
    ]

    const result = countBy(products, (p) => p.category)
    expect(result).to.deep.equal({
      phone: 2,
      laptop: 1,
      accessory: 1,
    })
  })

  it("counts by first letter of strings", () => {
    const names = ["alice", "adam", "bob", "brian", "carol"]

    const result = countBy(names, (name) => name[0])
    expect(result).to.deep.equal({
      a: 2,
      b: 2,
      c: 1,
    })
  })

  it("works with object collections", () => {
    const obj = { a: "x", b: "y", c: "x" }

    const result = countBy(obj, (value) => value)
    expect(result).to.deep.equal({
      x: 2,
      y: 1,
    })
  })

  it("returns empty object for empty array and empty object", () => {
    const byArray = countBy([], (v) => v)
    const byObject = countBy({}, (v) => v)

    expect(byArray).to.deep.equal({})
    expect(byObject).to.deep.equal({})
  })

  it("returns empty object for null or undefined collection", () => {
    const iteratee = (v) => v
    const byNull = countBy(null, iteratee)
    const byUndef = countBy(undefined, iteratee)

    expect(byNull).to.deep.equal({})
    expect(byUndef).to.deep.equal({})
  })

  it("supports bucketing into 'missing' vs 'present'", () => {
    const values = [1, null, 2, undefined, 3]

    const result = countBy(values, (v) =>
      v == null ? "missing" : "present"
    )

    expect(result).to.deep.equal({
      present: 3,
      missing: 2,
    })
  })
})
