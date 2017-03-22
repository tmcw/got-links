# got-links

[![CircleCI](https://circleci.com/gh/tmcw/got-links/tree/master.svg?style=svg)](https://circleci.com/gh/tmcw/got-links/tree/master)

Download multiple pages of results from an API that supports
the Link header.

## example

```js
var result = gotLinks({
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
});
```

## Used in

* I wrote this library to support [Unfollow everyone on GitHub](https://unfollow-everyone.glitch.me/), an app that does exactly that.
