const assert = require('assert');
const greeting = require('../greet.ff'); 
const pgp = require('pg-promise')();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/greetings_test';

const config = { 
	connectionString : DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config);

describe("Greet function", function () {

    beforeEach(async function(){
        console.log("delete * from greeted_names");
        
    });

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
        const greets = greeting(db)

        await greets.setNames('zee')
        await greets.setNames('mako')
  
          assert.equal(0, await greets.nameCount());
  
      })

      
    it("Should return the counter for that specific name", async function () {
        const greets = greeting(db)

       await greets.setNames('zee')
       await greets.setNames('mako')
       await greets.setNames('zee')
       await greets.setNames('zee')
  
          assert.equal(3, await greets.getUsercounter('zee'));
  
      })

      it("Should not count when no language was selected and name", async function () {
        const greets = greeting(db)

          assert.equal(0, await greets.nameCount());
  
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