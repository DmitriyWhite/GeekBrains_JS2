'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Voter = function () {
    function Voter(options) {
        _classCallCheck(this, Voter);

        this.options = options;
    }

    _createClass(Voter, [{
        key: 'setVote',
        value: function setVote(vote) {
            var elem = this.options.elem;
            elem.children[1].textContent = vote;
            var numberVotes = vote;
            var minus = elem.children[0];
            var plus = elem.children[2];
            minus.addEventListener('click', function () {
                numberVotes--;
                elem.children[1].textContent = numberVotes;
            });

            plus.addEventListener('click', function () {
                numberVotes++;
                elem.children[1].textContent = numberVotes;
            });
        }
    }]);

    return Voter;
}();

var voter = new Voter({
    elem: document.getElementById('voter')
});
voter.setVote(12);