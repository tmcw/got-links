const gotLinks = require('../');
const ghGot = require('gh-got');
const t = require('tap');

t
  .test('gotLinks', t => {
    return gotLinks({
      got: ghGot,
      url: 'search/repositories',
      options: {
        query: {
          q: 'happiness'
        },
        token: process.env.GITHUB_TOKEN
      },
      maxPages: 3,
      reducer(memo, response) {
        return memo.concat(response.body.items);
      }
    }).then(result => {
      return t.test('check result', t => {
        t.equal(result.length, 90);
        t.end();
      });
    });
  })
  .catch(t.threw);
