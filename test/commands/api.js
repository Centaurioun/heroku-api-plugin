'use strict';

let cli   = require('heroku-cli-util');
let nock  = require('nock');
let sinon = require('sinon');
let cmd   = require('../../commands/app');

describe('api', function () {
  beforeEach(function () {
    this.cliDebug = sinon.stub(cli, 'debug');
  });

  afterEach(function () {
    this.cliDebug.restore();
  });

  it('displays the app info', function () {
    let self   = this;
    let method = "get";
    let path = "/app/myapp";
    let app    = {name: 'myapp', web_url: 'https://myapp.herokuapp.com/'};

    nock('https://api.heroku.com')
    .get('/apps/myapp')
    .reply(200, app);

    return cmd.run({method: method, path: path})
    .then(function () {
      self.cliDebug.should.have.been.calledWith(app);
    });
  });
});