/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { Router } from 'meteor/iron:router';
import { chai } from 'meteor/practicalmeteor:chai';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'sinon';
import { DDP } from 'meteor/ddp-client';
import { Promise } from 'meteor/promise';

import { Ads } from '/imports/shared/ads.js';
import { Pricing } from '/imports/shared/pricing.js';

import './list-of-ads.js';


const assert = require('assert');

let user;

it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  })
    .then(done);
});

it("Login as the user", function (done){
  Meteor.loginWithPassword("nike", "nike", function(err){
    user = Meteor.user();

    expect(user).to.not.equal(null);
    done();
  });
});

describe('Todos_item', function () {
  beforeEach(function () {
    Template.registerHelper('_', key => key);
  });
  afterEach(function () {
    Template.deregisterHelper('_');
  });
  it('renders correctly with simple data', function () {
    const todo = Factory.build('todo', { checked: false });
    const data = {
      todo: Ads._transform(todo),
      onEditingChange: () => 0,
    };
    withRenderedTemplate('Todos_item', data, el => {
      chai.assert.equal($(el).find('input[type=text]').val(), todo.text);
      chai.assert.equal($(el).find('.list-item.checked').length, 0);
      chai.assert.equal($(el).find('.list-item.editing').length, 0);
    });
  });
});