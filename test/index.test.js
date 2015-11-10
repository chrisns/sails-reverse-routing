var rewire = require('rewire');
var sinon = require('sinon');
var ReverseRoutesHook = rewire('../lib/index');
describe('UNIT sails-reverse-routing', () => {
  var sailsMock;
  var reverseRoutes;
  var binding;
  var detectVerbStub;
  before(() => {
    binding = sinon.stub();
    sailsMock = {router: {bind: binding}};
    reverseRoutes = ReverseRoutesHook(sailsMock);
    reverseRoutes.initialize(() => {
    });
  });
  after(() => {
  });

  it('should insert our decorated bind function', () =>
      expect(sailsMock.router.bind).to.equal(reverseRoutes.wrapper)
  );
  it('should set the reverse routes param', () =>
      expect(sailsMock).to.have.property('reverseRoutes').and.to.be.empty
  );
  describe('run bind', () => {
    before(() => {
      detectVerbStub = sinon.stub().returns({path: 'path'});
      ReverseRoutesHook.__set__({util: {detectVerb: detectVerbStub}});
      sailsMock.router.bind('helo', null, 'world', {controller: 'foo', action: 'bar'});

    });
    it('should pass arguments to original bind', () =>
        expect(binding).to.be.calledWith('helo', null, 'world', {controller: 'foo', action: 'bar'})
    );
    it('should pass the path to util', () => {
      expect(detectVerbStub).to.be.calledWith('helo');
    });
    it('should populate reverseroutes with the expected content', () =>
      expect(sailsMock.reverseRoutes).to.eql({'foo.bar': {path: 'path', verb: 'world'}}));
  });

});

describe('INTEGRATION sails-reverse-routing', () => {
  var baseurl,
    comps;

  before(() => {
    baseurl = sails.getBaseUrl();
    comps = {
      controller: 'centre.destroy',
      args: [1]
    };

  });

  it('Should return an absolute URL when absolute = TRUE', () =>

      expect(reverseRouteService(comps, true)).to.eql({uri: baseurl + '/centre/1', verb: 'delete'})
  );
  it('Should return a relative URL when absulute = false', () =>
      expect(reverseRouteService(comps, false)).to.eql({uri: '/centre/1', verb: 'delete'})
  );

});
