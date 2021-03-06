import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import ServiceModel from 'deacon/models/service';

//import { run } from '@ember/runloop';

module('Unit | Model | service', function (hooks) {
  setupTest(hooks);

  test('dimensions are sane', function (assert) {
    let model = new ServiceModel([
      [2, '*'],
      [2, '*'],
      [2, '*'],
    ]);
    assert.ok(model.height > 100);
    assert.ok(model.width > 100);
  });
  test('counts are sane', function (assert) {
    let model = new ServiceModel([
      [2, '*'],
      [3, '*'],
      [1, '*'],
    ]);
    assert.ok(model.plates.length === 2, 'Right number of plates');
    assert.ok(model.deacons.length === 2, 'Right number of deacons');
  });
  test('seats are sane', function (assert) {
    let model = new ServiceModel([
      [2, '*'],
      [3, '*'],
      [1, '*'],
    ]);
    assert.ok(model.layout.pews[0].seats === 2, 'First row is right');
    assert.ok(model.layout.pews[1].seats === 3, 'Second row is right');
    assert.ok(model.layout.pews[2].seats === 1, 'Third row is right');
  });
});
