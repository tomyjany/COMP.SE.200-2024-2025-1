import { expect } from "chai"
import get from "../src/get.js"

describe("Get tests", () => {
  it("returns values from the example doc string", () => {
    const object = { a: [{ b: { c: 3 } }] }

    expect(get(object, "a[0].b.c")).to.equal(3)
    expect(get(object, ["a", "0", "b", "c"])).to.equal(3)
    expect(get(object, "a.b.c", "default")).to.equal("default")
  })

  it("returns undefined for missing path when no default is provided", () => {
    const object = { a: { b: 1 } }

    expect(get(object, "a.c")).to.equal(undefined)
    expect(get(object, ["a", "c"])).to.equal(undefined)
  })

  it("returns default value when path does not exist", () => {
    const object = { a: { b: 1 } }

    expect(get(object, "a.c", "default")).to.equal("default")
    expect(get(object, ["a", "c"], 42)).to.equal(42)
  })

  it("returns default value when resolved value is explicitly undefined", () => {
    const object = { a: { b: undefined } }

    expect(get(object, "a.b", "default")).to.equal("default")
    expect(get(object, ["a", "b"], "fallback")).to.equal("fallback")
  })

  it("does not use default for falsy but defined values", () => {
    const object = {
      a: 0,
      b: false,
      c: "",
      d: null,
    }

    expect(get(object, "a", "default")).to.equal(0)
    expect(get(object, "b", "default")).to.equal(false)
    expect(get(object, "c", "default")).to.equal("")
    expect(get(object, "d", "default")).to.equal(null)
  })

  it("works with array indices inside object paths", () => {
    const object = { a: [{ b: 1 }, { b: 2 }] }

    expect(get(object, "a[0].b")).to.equal(1)
    expect(get(object, "a[1].b")).to.equal(2)
    expect(get(object, ["a", "1", "b"])).to.equal(2)
  })

  it("works when root is an array", () => {
    const array = [{ a: 1 }, { a: 2 }]

    expect(get(array, "[0].a")).to.equal(1)
    expect(get(array, "[1].a")).to.equal(2)
    expect(get(array, ["0", "a"])).to.equal(1)
  })

  it("returns default when object is null or undefined", () => {
    expect(get(null, "a.b", "default")).to.equal("default")
    expect(get(undefined, "a.b", "default")).to.equal("default")
  })

  it("returns undefined when object is null or undefined and no default is given", () => {
    expect(get(null, "a.b")).to.equal(undefined)
    expect(get(undefined, "a.b")).to.equal(undefined)
  })

  it("returns the object itself when path is an empty array", () => {
    const object = { a: 1 }

    expect(get(object, [])).to.equal(object)
  })

  it("uses default when path is empty string and property does not exist", () => {
    const object = { a: 1 }

    expect(get(object, "", "default")).to.equal("default")
  })
})
