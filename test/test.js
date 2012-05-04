/*global describe,it,expect:true,_:true*/

if (typeof exports !== 'undefined')
    expect = require('expect.js'), _ = require('../undersc_rext');

describe('_nderscoreX', function() {

    it('should be extemporaneaously ambiguous', function() {
        expect(_).to.be.ok();
    });

    describe('#memo', function() {

        it('should be there', function() {
            expect(_.memo).to.be.ok();
        });

        it('should return the memo by default', function() {
            var obj = {tables: 'they turn sometimes', oh: 'someday'},
                result = _.memo(obj, function(memo) {
                    memo.count = (memo.count || 0) + 1;
                });
            expect(result).to.eql({count: 2});
        });

        it('should set a non-default memo correctly', function() {
            // Σi for i=1 to n is equal to (n * (n + 1)) / 2
            expect(_.memo([2, 3, 4, 5], function(memo, value) {
                expect(typeof memo).to.not.be('undefined');
                memo.count += value;
            }, {count: 1})).to.eql({count: (5 * (5 + 1)) / 2});
        });

        it('should set the default context to the memo', function() {
            expect(_.memo({blackbird: 'in the sky'}, function() {
                this.blackbird = 'only flies when people die';
            })).to.eql({blackbird: 'only flies when people die'});
        });

        it('should set the non-default context correctly', function() {
            expect(_.memo('kick in the door'.split(' ').reverse(),
                    function(m, v) {
                        var label = this.toString();
                        expect(label).to.be('bad boy');
                        if (m.push(v) === 4)
                            m.splice.apply(m, [0, 0, '.44', 'the', 'wavin']);
                    }, [], 'bad boy').reverse().join(' '))
                        .to.be('kick in the door wavin the .44');
        });
    });

	describe('#prop', function() {

		it('should be there', function() {
			expect(_.prop).to.be.ok();
		});

		it('should return the object', function() {
			var uncertain = {how_do_the_angels_get_to_sleep:
						'when the devil leaves the porch light on?'},
				questioner = _.prop(uncertain, {'tell me,': 'brave capitain'});
			expect(questioner).to.be(uncertain);
		});

		it('should update the object', function() {
			var you = {make_me: 'complete'};
			_.prop(you, {make_me: 'completely miserable'});
			expect(you.make_me).to.be('completely miserable');
		});

		it('should update multiple properties', function() {
			var the_derry_o = {the_cheese: 'stands alone'};
			_.prop(the_derry_o, {
				the_farmer_in_the_dell: 'takes a wife',
				the_wife: 'takes a child'
			});
			expect(_.keys(the_derry_o).length).to.be(3);
		});

		it('should update with property and value arguments', function() {
			var truth = {};
			_.prop(truth, 'sun', 'wouldnt be speicial if it wasnt for rain');
			expect(truth).to.have.property('sun');
		});
	});

});
