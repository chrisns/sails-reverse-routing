var hook = rewire('../lib/index');

describe('UNIT sails-reverse-routing', () => {
  var sailsMock;
  var reverseRoutes;
  var binding;
  var detectVerbStub;
  before(() => {

    binding = sinon.stub();
    sailsMock = {router: {bind: binding}};
    reverseRoutes = hook(sailsMock);
    reverseRoutes.initialize(() => {
    });
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
      hook.__set__({util: {detectVerb: detectVerbStub}});
      sailsMock.router.bind('helo', null, 'world', {controller: 'foo', action: 'bar'});

    });
    it('should pass arguments to original bind', () =>
        expect(binding).to.be.calledWith('helo', null, 'world', {controller: 'foo', action: 'bar'})
    );
    it('should pass the path to util', () => {
      expect(detectVerbStub).to.be.calledWith('helo');
    });
    it('should populate reverseroutes with the expected content', () =>
      expect(sailsMock.reverseRoutes).to.eql({'foo.bar': 'path'}));
  });

  describe('run reverseRoute', () => {
    var baseUrl = 'http://foo.com';
    before(() => {
      sailsMock.reverseRoutes = {
        'abc.def': 'abc/:arg1/def/:arg2/something',
        'ghi.jkl': '//foo///bar'
      };
      sailsMock.getBaseUrl = sinon.stub().returns(baseUrl);
    });
    it('should return the baseurl if controller undefined.', () => {
      expect(reverseRoutes.reverseRoute({controller: 'donot.exist', args: ['a1', 'a2']}, true)).to.eql(baseUrl);
    });
    it('should strip of spurious slashes', () => {
      expect(reverseRoutes.reverseRoute({controller: 'ghi.jkl', args: []}, false)).to.equal('/foo/bar');
    });
    it('should interpolate arguments into the path', () => {
      expect(reverseRoutes.reverseRoute({
        controller: 'abc.def',
        args: ['a1', 'a2']
      }, false)).to.equal('/abc/a1/def/a2/something');
    })
  });

});

describe('INTEGRATION sails-reverse-routing', () => {
  var comps;
  var reverseRoutes;

  before(() => {
    comps = {
      controller: 'centre.destroy',
      args: [1]
    };
    sailsMock = {
      router: {
        bind: ''
      },
      getBaseUrl: sinon.stub().returns('fo'),
      reverseRoutes: {
        'centre.destroy': 'centre/1'
      }
    };
    reverseRoutes = hook(sailsMock);
    reverseRoutes.initialize(() => {
    });
  });

  it('Should return an absolute URL when absolute = TRUE', () =>
      expect(reverseRouteService(comps, true)).to.equal('fo/centre/1')
  );

  it('Should return a relative URL when absolute = false', () =>
      expect(reverseRouteService(comps, false)).to.equal('/centre/1')
  );

});
