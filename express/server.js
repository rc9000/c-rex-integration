const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});
   
app.post('/', (req, res) => {

    // C-Rex posts a complex structure, we only extract the rule from it
    var rule = req.body.rule; 
    console.log("got rule:\n", rule);   

    // decide if this is a runtime or startup rule, and pick appropriate 
    // directory
    var type = "before_crs";
    if (rule.match(/(SecRuleRemoveById|SecRuleUpdateTargetById)/)){
        type = "after_crs";
    }
    prefix = "../rules";

    // Generate a filename for our file. We strip potential comments, and then use 
    // a urlencoded version of the rule text. This avoids storing the same rule twice.
    var lines = rule.split("\n");
    var ruletext = lines[lines.length - 1];
    filename = `${type}/${encodeURIComponent(ruletext)}.conf`;
    console.log("use filename:\n", filename);   

    // write the file
    fs.writeFile(`${prefix}/${filename}`, rule, function (err) {
        if (err) return console.log("failed to write file:", err);
    });


    return res.send({'result': "OK", filename: filename});
});

module.exports = app
 