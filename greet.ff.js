module.exports = function Greetings(pool) {

// var data = pool
    
    // var storedNames = {}
    let alphabet = /^[a-z A-Z]+$/

    async function greet(personName, language) {
        let names = await pool.query('select * from greeted_names')
        console.log(names.rows);

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

    let result = await pool.query('SELECT name_text FROM greeted_names WHERE name =$1', [personName])
    if(result.rowCount == 0){
        await pool.query('INSERT INTO greeted_names(name, counter) values($1,$2)', [personName,1])
    }{
        await pool.query('UPDATE greeted_names counter = counter+1 WHERE name_text =$1',[personName])
    }

        // if (alphabet.test(personName) == false) {
        //     return;
        // }
        // if (storedNames[personName] == undefined) {
        //     storedNames[personName] = 1
        // }
        // else {
        //     storedNames[personName]++
        // }
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


    function getNames() {
        return Object.keys(storedNames)
    }

    async function nameCount() {
        let counts = await pool.query('select count(*) from greeted_names;')

        console.log(counts)
        return counts.rows[0].count

        // var naamlist = Object.keys(storedNames);

        // return naamlist.length;
    }

    function naam() {
        var listed = Object.values(storedNames);
        return listed
    }

    function getUsercounter(naam) {
        return storedNames[naam]
    }

    async function reseted() {
        return data.none('DELETE FROM users_greeted');
        
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
