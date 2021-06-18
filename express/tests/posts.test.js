const request = require('supertest')
const app = require('../server')

describe('Test the Post API', () => {

  it('should save a rule without any comments', async () => {
    const res = await request(app) .post('/').send({
        rule: "SecRuleRemoveById 942410",
        otherstuff: 'not important',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.filename).toEqual("after_crs/SecRuleRemoveById%20942410.conf")
  }),

  it('should save a rule with the default comment', async () => {
    const res = await request(app) .post('/').send({
        rule: "# ModSec Rule Exclusion: 942410 : SQL Injection Attack\nSecRuleRemoveById 942410",
        otherstuff: 'not important',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.filename).toEqual("after_crs/SecRuleRemoveById%20942410.conf")
  }),

  it('should use the correct folder for runtime rules', async () => {
    const res = await request(app) .post('/').send({
        rule: '# ModSec Rule Exclusion: 942410 : SQL Injection Attack\n'
            +'SecRule REQUEST_URI "@beginsWith /drupal/index.php/search/node" "phase:1,nolog,pass,id:1000,ctl:ruleRemoveById=942410"',
        otherstuff: 'not important',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.filename).toMatch(/before_crs/)
  }),

  it('should save a rule with metainfo', async () => {
    const res = await request(app) .post('/').send({
        rule:
`
# ModSec Rule Exclusion: 942410 : SQL Injection Attack
# Based on following alert:
# //localhost/drupal/index.php/search/node
# timestamp: 2016-11-03 22:54:45.858724 id: WBuyJX8AAQEAAEdWTgQAAACL
# alert: 942410 Matched Data: union select found within ARGS:keys: union...
# ruleset/version: OWASP_CRS/3.0.0
SecRuleRemoveById 942410`,
        otherstuff: 'not important',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.filename).toEqual("after_crs/SecRuleRemoveById%20942410.conf")
  })

})
