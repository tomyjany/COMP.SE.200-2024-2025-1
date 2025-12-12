import { expect } from "chai"
import filter from "../src/filter.js"

describe("filter tests", () => {
  it("filters objects by predicate as in doc example", () => {
    const users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
    ]

    const result = filter(users, ({ active }) => active)
    expect(result).to.deep.equal([{ user: "barney", active: true }])
  })

  it("filters numbers based on simple predicate", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = filter(arr, (v) => v % 2 === 0)
    expect(result).to.deep.equal([2, 4])
  })

  it("returns empty array when nothing matches", () => {
    const arr = [1, 3, 5]
    const result = filter(arr, (v) => v > 10)
    expect(result).to.deep.equal([])
  })

  it("returns all elements when predicate always true", () => {
    const arr = [1, 2, 3]
    const result = filter(arr, () => true)
    expect(result).to.deep.equal([1, 2, 3])
  })

  it("returns empty array for empty input array", () => {
    const arr = []
    const result = filter(arr, () => true)
    expect(result).to.deep.equal([])
  })

  it("does not mutate the original array", () => {
    const arr = [1, 2, 3, 4]
    const copy = arr.slice()
    const result = filter(arr, (v) => v % 2 === 0)

    expect(result).to.deep.equal([2, 4])
    expect(arr).to.deep.equal(copy)
  })

  it("passes value, index and array to predicate", () => {
    const arr = ["a", "b", "c"]
    const seen = []

    const result = filter(arr, (value, index, array) => {
      seen.push({ value, index, sameArray: array === arr })
      return index === 1
    })

    expect(result).to.deep.equal(["b"])
    expect(seen).to.deep.equal([
      { value: "a", index: 0, sameArray: true },
      { value: "b", index: 1, sameArray: true },
      { value: "c", index: 2, sameArray: true },
    ])
  })

  it("returns empty array when array is null or undefined", () => {
    const predicate = (v) => !!v

    expect(filter(null, predicate)).to.deep.equal([])
    expect(filter(undefined, predicate)).to.deep.equal([])
  })

  it("works with sparse arrays and respects indices", () => {
    const arr = []
    arr[1] = "x"
    arr[3] = "y"

    const result = filter(arr, (v, i) => i % 2 === 1)
    expect(result).to.deep.equal(["x", "y"])
  })
})
