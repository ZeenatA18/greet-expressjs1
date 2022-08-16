const assert = require('assert');

const greeting = require('../greet.ff'); 

describe("Greet function", function () {

    it("Should greet the name that was entered and greet with the english language selected", function () {
        const greets = greeting()
       
        assert.equal("Hello, Joe", greets.greet("Joe", "eng"));

    })

    it("Should greet the name that was entered and greet with the afrikaans language selected", function () {
        const greets = greeting()
       
        assert.equal("Goeie dag, Nonkululeko", greets.greet("Nonkululeko", "afr"));

    })

    it("Should greet the name that was entered and greet with the isiXhosa language selected", function () {
        const greets = greeting()
       
        assert.equal("Molo, Lukhanyo", greets.greet("Lukhanyo", "isi"));

    })
})


    describe("Greet counter", function () {

    it("Should get the length of the names stored", async function () {
        const greets = greeting()

        await greets.setNames('zee')
        await greets.setNames('mako')
  
          assert.equal(2, await greets.nameCount());
  
      })

      
    it("Should return the counter for that specific name", function () {
        const greets = greeting()

        greets.setNames('zee')
        greets.setNames('mako')
        greets.setNames('zee')
        greets.setNames('zee')
  
          assert.equal(3, greets.getUsercounter('zee'));
  
      })

      it("Should not count when no language was selected and name", function () {
        const greets = greeting()

        
  
          assert.equal(0, greets.nameCount());
  
      })

})

describe("Error messages", function () {

it("Should return error message if language is not selected", function () {
    const greets = greeting()
   
    assert.equal("Please select language", greets.validateInputs("Joe", ""));

})

it("Should return error message if name is not entered", function () {
    const greets = greeting()
   
    assert.equal("Please Enter name", greets.validateInputs("", "afr"));

})

it("Should return error message if name is not entered and language is not selected", function () {
    const greets = greeting()
   
    assert.equal("Please enter valid name and select language", greets.validateInputs("", ""));

})

it("Should return error message if name is not just using alphabets", function () {
    const greets = greeting()
   
    assert.equal("ERROR!! Use Alphabet only", greets.greet("Joe12", "eng"));   

})

})