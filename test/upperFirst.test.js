import { expect, assert } from "chai"
import upperFirst from "../src/upperFirst.js"

describe("MANUALLY WRITTEN Upper first tests", () => {

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

    it("AI generated: single-character strings are handled correctly", () => {
        expect(upperFirst('a')).to.equal('A')
        expect(upperFirst('z')).to.equal('Z')
        expect(upperFirst('A')).to.equal('A')
        expect(upperFirst('Ž')).to.equal('Ž')
    })

    it("AI generated: only the very first character is changed, rest of the string stays intact", () => {
        expect(upperFirst('javascript')).to.equal('Javascript')
        expect(upperFirst('jAVASCRIPT')).to.equal('JAVASCRIPT') // does not fix the rest
        expect(upperFirst('hello world')).to.equal('Hello world')
        expect(upperFirst('český jazyk')).to.equal('Český jazyk')
    })

    it("AI generated: strings starting with emoji or symbol are unchanged", () => {
        expect(upperFirst('😀smile')).to.equal('😀smile')
        expect(upperFirst('#hashtag')).to.equal('#hashtag')
        expect(upperFirst('😊')).to.equal('😊')
    })

    it("AI generated: whitespace-only strings remain unchanged", () => {
        expect(upperFirst('   ')).to.equal('   ')
        expect(upperFirst('\t')).to.equal('\t')
        expect(upperFirst('\n')).to.equal('\n')
    })

    it("AI generated: string with leading newline but alphabetic after newline", () => {
        expect(upperFirst('\nhello')).to.equal('\nhello')
        expect(upperFirst('\nHello')).to.equal('\nHello')
    })

    it("AI generated: null and undefined inputs should throw TypeError", () => {
        assert.throws(() => upperFirst(null), TypeError)
        assert.throws(() => upperFirst(undefined), TypeError)
    })

    it("AI generated: boolean inputs should throw TypeError", () => {
        assert.throws(() => upperFirst(true), TypeError)
        assert.throws(() => upperFirst(false), TypeError)
    })

    it("AI generated: long string – only first character is affected", () => {
        const longText = 'l' + 'orem ipsum dolor sit amet, consectetur adipiscing elit'
        const expected = 'L' + 'orem ipsum dolor sit amet, consectetur adipiscing elit'
        expect(upperFirst(longText)).to.equal(expected)
    })

    it("AI generated: additional accented characters are capitalized correctly", () => {
        expect(upperFirst('áhoj')).to.equal('Áhoj')
        expect(upperFirst('žlutý')).to.equal('Žlutý')
        expect(upperFirst('österreich')).to.equal('Österreich')
    })
})
