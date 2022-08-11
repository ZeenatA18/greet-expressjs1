module.exports = function Greetings() {

    var storedNames = {}
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
        }else{
            return "ERROR!! Use Alphabet only"
        }
    }
    
    function setNames(personName) {
        if(alphabet.test(personName) == false){
            return;
        }
        if (storedNames[personName] == undefined) {
            storedNames[personName] =1 
        }
        else {
            storedNames[personName]++
        }
    }

    function validateInputs(name, language) {
        if (name === "" && !language) {
            return "Please enter valid name and select language"
        }
        else {if(name === "") {
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

    function nameCount() {
       var naamlist = Object.keys(storedNames);

        return naamlist.length;
    }

    function naam(){
        var listed = Object.values(storedNames);
        return listed
    }

    function getUsercounter(naam){
    return storedNames[naam]
    }

    // function reseted(){
    //     return storedNames = {}
        
    // }

  

    return {
        greet,
        setNames,
        getNames,
        nameCount,
        validateInputs,
        // reseted,
        naam,
        getUsercounter
    }
}
