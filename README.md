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
 