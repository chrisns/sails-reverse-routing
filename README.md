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
Call reverseRouteService() anywhere like so:
```js
   var arguments = [arg1, arg2];
   var components =  { controller: "someController.someMethod", args: arguments };
   var absoluteUrl = true;
   var link = reverseRouteService(components, absoluteUrl);
```
Set absoluteUrl to false to get a relative URI. The return value is an object with a 'uri' and a 'verb' property.

## Tests

```bash
$ npm install
$ npm test
```
