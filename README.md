# sails-reverse-routing

[![Build](https://travis-ci.org/chrisns/sails-reverse-routing.png)](https://travis-ci.org/chrisns/sails-reverse-routing)
[![Coverage](https://coveralls.io/repos/chrisns/sails-reverse-routing/badge.png)](https://coveralls.io/r/chrisns/sails-reverse-routing)
[![Quality](https://codeclimate.com/github/chrisns/sails-reverse-routing.png)](https://codeclimate.com/github/chrisns/sails-reverse-routing)
[![Dependencies](https://david-dm.org/chrisns/sails-reverse-routing.png)](https://david-dm.org/chrisns/sails-reverse-routing)

Ability to generate a uri given controller, action and arguments

## Install

```bash
$ npm install sails-reverse-routing
```

## Usage

#### Configure Strategy

```js
passport.use(new POISEStrategy(
  function(userid, done) {
    User.findOne({ userid: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

## Tests

```bash
$ npm install
$ npm test
```
