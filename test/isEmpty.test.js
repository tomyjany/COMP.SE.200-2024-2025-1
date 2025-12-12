import { expect } from "chai"
import isEmpty from "../src/isEmpty.js"

describe("isEmpty tests", () => {
  it("doc examples", () => {
    expect(isEmpty(null)).to.equal(true)
    expect(isEmpty(true)).to.equal(true)
    expect(isEmpty(1)).to.equal(true)
    expect(isEmpty([1, 2, 3])).to.equal(false)
    expect(isEmpty("abc")).to.equal(false)
    expect(isEmpty({ a: 1 })).to.equal(false)
  })

  it("arrays: empty vs non-empty", () => {
    expect(isEmpty([])).to.equal(true)
    expect(isEmpty([0])).to.equal(false)
    expect(isEmpty([undefined])).to.equal(false)
  })

  it("strings: empty vs non-empty", () => {
    expect(isEmpty("")).to.equal(true)
    expect(isEmpty(" ")).to.equal(false)
    expect(isEmpty("0")).to.equal(false)
  })

  it("plain objects: empty vs with own properties", () => {
    expect(isEmpty({})).to.equal(true)
    expect(isEmpty({ a: undefined })).to.equal(false)
    expect(isEmpty({ a: 1, b: 2 })).to.equal(false)
  })

  it("objects with only prototype properties are treated as empty", () => {
    const proto = { a: 1 }
    const obj = Object.create(proto)
    expect(isEmpty(obj)).to.equal(true)
  })

  it("Map: empty vs non-empty", () => {
    const m1 = new Map()
    const m2 = new Map()
    m2.set("k", 1)

    expect(isEmpty(m1)).to.equal(true)
    expect(isEmpty(m2)).to.equal(false)
  })

  it("Set: empty vs non-empty", () => {
    const s1 = new Set()
    const s2 = new Set([1])

    expect(isEmpty(s1)).to.equal(true)
    expect(isEmpty(s2)).to.equal(false)
  })

  it("arguments object: empty vs non-empty", () => {
    function makeArgs() {
      return arguments
    }
    const emptyArgs = makeArgs()
    const nonEmptyArgs = makeArgs(1, 2, 3)

    expect(isEmpty(emptyArgs)).to.equal(true)
    expect(isEmpty(nonEmptyArgs)).to.equal(false)
  })

  it("array-like objects with splice (jQuery-like collections)", () => {
    const emptyLike = { length: 0, splice() {} }
    const nonEmptyLike = { 0: "x", length: 1, splice() {} }

    expect(isEmpty(emptyLike)).to.equal(true)
    expect(isEmpty(nonEmptyLike)).to.equal(false)
  })

  it("Node Buffer: empty vs non-empty", () => {
    const emptyBuf = Buffer.alloc(0)
    const nonEmptyBuf = Buffer.from("abc")

    expect(isEmpty(emptyBuf)).to.equal(true)
    expect(isEmpty(nonEmptyBuf)).to.equal(false)
  })

  it("typed arrays: empty vs non-empty", () => {
    const emptyTA = new Uint8Array(0)
    const nonEmptyTA = new Uint8Array([1, 2, 3])

    expect(isEmpty(emptyTA)).to.equal(true)
    expect(isEmpty(nonEmptyTA)).to.equal(false)
  })

  it("prototype objects: empty vs non-empty prototype", () => {
    function FooEmpty() {}
    function FooNonEmpty() {}
    FooNonEmpty.prototype.a = 1

    expect(isEmpty(FooEmpty.prototype)).to.equal(true)
    expect(isEmpty(FooNonEmpty.prototype)).to.equal(false)
  })

  it("boxed primitives", () => {
    expect(isEmpty(new String(""))).to.equal(true)
    expect(isEmpty(new String("x"))).to.equal(false)
    expect(isEmpty(new Number(0))).to.equal(true)
    expect(isEmpty(new Boolean(false))).to.equal(true)
  })

  it("null and undefined are empty", () => {
    expect(isEmpty(null)).to.equal(true)
    expect(isEmpty(undefined)).to.equal(true)
  })

  it("other primitives (number, boolean, symbol) are empty", () => {
    expect(isEmpty(0)).to.equal(true)
    expect(isEmpty(-1)).to.equal(true)
    expect(isEmpty(false)).to.equal(true)
    expect(isEmpty(Symbol("x"))).to.equal(true)
  })
})
