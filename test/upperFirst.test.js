import { expect, assert } from "chai"
import upperFirst from "../src/upperFirst.js"

describe("Upper first tests", () => {

    it("It should return values that are described in the example doc string", ()=>
    {
        expect(upperFirst('fred')).to.equal('Fred')
        expect(upperFirst('FRED')).to.equal('FRED')
    })
    it("behaviour with numbers in the text", ()=>
    {
        expect(upperFirst('fred5')).to.equal('Fred5')
        expect(upperFirst('FRED5')).to.equal('FRED5')
    })
    it("behaviour with numbers as the first characters", ()=>
    {
        expect(upperFirst('5fred5')).to.equal('5fred5')
        expect(upperFirst('5FRED5')).to.equal('5FRED5')
    })
    it("empty string", ()=>
    {
        expect(upperFirst('')).to.equal('')
    })
    it("number (as string) only", ()=>
    {
        expect(upperFirst('5')).to.equal('5')
        expect(upperFirst('0')).to.equal('0')
    })
    it("number (as string) only", ()=>
    {
        assert.throws(() => upperFirst(5), TypeError)
    })
    it("Wierd character as a begining of the string", ()=>
    {
        expect(upperFirst('@')).to.equal('@')
        expect(upperFirst('@fred')).to.equal('@fred')
    })
    it("Text with wierd character inside string", ()=>
    {
        expect(upperFirst('fred@fred')).to.equal('Fred@fred')
        expect(upperFirst('Fred@fred')).to.equal('Fred@fred')
    })
    it("Test 0 coerce, should throw an error", ()=>
    {
        // expect(upperFirst(0)).to.equal('1')
        assert.throws(() => upperFirst(0), TypeError)
    })
    it("Test NaN coerce, should throw an error", ()=>
    {
        // expect(upperFirst(NaN)).to.equal('1')
        assert.throws(() => upperFirst(NaN), TypeError)
    })

    it("Test unicode characters that can be capitalized", ()=>
    {
        expect(upperFirst('čeština')).to.equal('Čeština')
        expect(upperFirst('řečtina')).to.equal('Řečtina')
    })
    it("Leading white space characters", ()=>
    {
        expect(upperFirst('  leading space')).to.equal('  leading space')
        expect(upperFirst('\tleading tab')).to.equal('\tleading tab')
    })
})
