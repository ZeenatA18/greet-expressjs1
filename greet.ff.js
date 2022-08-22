module.exports = function Greetings(db) {

    let alphabet = /^[a-z A-Z]+$/

    function greet(personName, language) {

        if (alphabet.test(personName)) {
            if (language === "eng") {
                return "Hello, " + personName
            } else if (language === "afr") {
                return "Goeie dag, " + personName
            } else if (language === "isi") {
                return "Molo, " + personName
            }
        } else {
            return "ERROR!! Use Alphabet only"
        }
    }

    async function setNames(personName) {
        if (alphabet.test(personName) == false) {
            return toLowerCase()
        }

        let result = await db.oneOrNone('SELECT name_text FROM greeted_names WHERE name_text =$1', [personName])

        if (result == null) {

            await db.none('INSERT INTO greeted_names(name_text, count) values($1,$2)', [personName, 1])
        }
        else {
            await db.none('UPDATE greeted_names SET count = count+1 WHERE name_text =$1', [personName])
        }


    }

    function validateInputs(name, language) {
        if (name === "" && !language) {
            return "Please enter valid name and select language"
        }
        else {
            if (name === "") {
                return "Please Enter name"
            }
            if (!language) {
                return "Please select language"
            }
        }
    }


    async function getNames() {

        let storedNames = await db.manyOrNone('SELECT name_text from greeted_names;')
        return storedNames

    }

    async function nameCount() {
        let counts = await db.one('select count(*) from greeted_names;')

        return counts.count
    }



    async function getUsercounter(naam) {
        let telly = await db.one('SELECT count FROM greeted_names WHERE name_text=$1', [naam])

        return telly.count
    }

    async function reseted() {
        await db.none('DELETE FROM greeted_names');
        // await db.none('ALTER table greeted_names ALTER COLUMN id RESTART WITH 1')
     

    }



    return {
        greet,
        setNames,
        getNames,
        nameCount,
        validateInputs,
        reseted,
        getUsercounter
    }
}
