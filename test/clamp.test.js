import { expect } from "chai"
import clamp from "../src/clamp.js"

describe("Clamp tests", () => {

    it("It should return values that are described in the example doc string", ()=>
    {
        expect(clamp(-10,-5,5)).to.equal(-5)
        expect(clamp(10,-5,5)).to.equal(5)
    })
})
