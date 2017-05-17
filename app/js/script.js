'use strict';

class Voter {
    constructor(options) {
        this.options = options;
    }

    setVote(vote) {
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
}
let voter = new Voter({
    elem: document.getElementById('voter')
});
voter.setVote(12);
