module.exports = function geet(greets) {

    async function home(req, res) {
        let count = await greets.nameCount()

        res.render('index', {
            count

        });
    }

    async function groet(req, res) {
        let name = req.body.text_name.toUpperCase();
        let language = req.body.language
    
    
        if (name && language) {
            var msg = greets.greet(name, language)
        }else {
            req.flash('error', greets.validateInputs(name,language))
        }
    
        if (name && language) {
            await greets.setNames(name);
            var count = await greets.nameCount()
        }
    
        res.render('index', {
            msg,
            count,
        })
    }

    async function naams(req, res) {
        let names = await greets.getNames()
        // console.log(names)
        res.render('actions', {
            names: names
        })
    
    }

    function getNaams(req, res) {

        let listedNames = req.body.text
    
        res.render("getNames", {
            getNames: listedNames
            
        })
    }

    async function count(req, res) {
        let username = req.params.naam
        let counter = await greets.getUsercounter(username);
        let output = `${username} has been greeted ${counter} times.`;
    
        // console.log(output)
    
        res.render('count', {
            output
        })
    }

    async function reset(req, res) {
        await greets.reseted();
        // console.log("-------------");

        req.flash('error', 'You have just reset your counter')

        res.redirect('/')
    }

    return {
        home,
        groet,
        naams,
        getNaams,
        count,
        reset
    }
}