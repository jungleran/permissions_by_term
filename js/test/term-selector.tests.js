import DomClient from '../src/client/dom-client.prototype.js';
import TermCollector from '../src/client/term-collector.prototype';

QUnit.test( "Term selector updates permissions after input change", function( assert ) {

  const domClient = new DomClient;
  const termCollector = new TermCollector;
  termCollector.addSelectedTids(domClient.computeTidsByAutocomplete());

});