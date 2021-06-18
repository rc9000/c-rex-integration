# [C-Rex](https://c-rex.netnea.com) Example Integration

This is a tiny [C-Rex](https://c-rex.netnea.com) Example Integration that does these things:

 * receive a generated ModSecurity exclusion rule from the C-Rex web hook
 * pick the correct folder and generate a file name
 * save the file to disk and commit the rule to github
 * from there, a build pipeline would typically update the WAF and include all the rules in the before_crs and after_crs folders

 # To use this demo

  * fork the repository, clone your fork and cd into the express directory
  * execute `npm install` once after cloning
  * run `npm start`, this will start the server on http://localhost:8007
  * start C-Rex with these environment variables:
    * `WEBHOOK_1_URL=http://localhost:8007`
    * `WEBHOOK_1_LABEL="Post Example"`
  * configure a new rule and hit the Post Example button. It should be stored locally as well as uploaded into your github fork of the repo.

# Example console output of a successful POST from C-Rex

```
c-rex-integration/express $ npm start

> c-rex-integration-server@1.0.0 start /Users/rcwork/git/c-rex-integration/express
> nodemon index.js

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server has started!

got rule:
 # ModSec Rule Exclusion: 920273 : Invalid character in request (outside of very strict set)
SecRuleRemoveById 920273
use filename:
 after_crs/SecRuleRemoveById%20920273.conf
stderr: To https://github.com/rc9000/c-rex-integration.git
   a215bb0..7373de1  master -> master
```
