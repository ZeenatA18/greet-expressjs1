module.exports = function Greetings(db) {

    // var data = pool

    var storedNames = {}
    let alphabet = /^[a-z A-Z]+$/

    function greet(personName, language) {
        // let names = await pool.query('select * from greeted_names')
        // console.log(names.rows);

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

        // return Object.keys(storedNames)
    }

    async function nameCount() {
        let counts = await db.one('select count(*) from greeted_names;')

        console.log(counts)
        return counts.count

        // var naamlist = Object.keys(storedNames);

        // return naamlist.length;
    }

    function naam() {
        var listed = Object.values(storedNames);
        return listed
    }

    async function getUsercounter(naam) {
        let telly = await db.one('select count(*) from greeted_names;')

        return telly.count
        // return storedNames[naam]
    }

    async function reseted() {
        return db.none('DELETE FROM greeted_names');

        // storedNames = {}

    }



    return {
        greet,
        setNames,
        getNames,
        nameCount,
        validateInputs,
        reseted,
        naam,
        getUsercounter
    }
}
