import { add } from "./calculator.js"; 
import { calculateTotal } from "./calculator.js"


describe("calculateTotal", () => {
  it("returns number", function() {
    let foo = new calculateTotal(Meteor);
    let bar = calculateTotal(['rule001'],['classic',,'classic','classic']);
    expect(bar).to.is(Number);
  });
});

describe('add()', function() {
  let tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      let res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
