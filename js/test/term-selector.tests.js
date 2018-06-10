import DomClient from '../src/client/dom-client.prototype.js';
import TermCollector from '../src/client/term-collector.prototype';
import _ from 'lodash';
import sinon from 'sinon';

QUnit.test( "Term selector retrieves empty array if no tids selected", function( assert ) {
  const domClient = new DomClient,
      termCollector = new TermCollector;
  termCollector.addSelectedTids(domClient.computeTidsByAutocomplete());

  assert.ok(_.isEmpty(termCollector.getSelectedTids()));
});

QUnit.test( "Term selector retrieves array with tids if tids selected", function( assert ) {
  let document = {
    querySelector: sinon.stub().returns({
      val: sinon.stub().returns('(1),(2),(3)')
    })
  }

  const domClient = new DomClient(document),
      termCollector = new TermCollector;
  termCollector.addSelectedTids(domClient.computeTidsByAutocomplete(['first-field', 'second-field']));

  assert.deepEqual(termCollector.getSelectedTids(), [1,2,3]);
});
