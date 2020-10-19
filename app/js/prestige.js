galaxiat-tycoon.prestige = {};
galaxiat-tycoon.prestige.botnetOnReset = 0;
galaxiat-tycoon.prestige.baseMult = 0.02;

galaxiat-tycoon.prestige.getBotnet = function() {
    return Math.floor(5 * Math.sqrt(galaxiat-tycoon.player.totalMoney / 1e9));
};

galaxiat-tycoon.prestige.getPrestigeMult = function() {
    return 1 + (galaxiat-tycoon.player.botnet * galaxiat-tycoon.prestige.baseMult);
};

galaxiat-tycoon.prestige.loop = function(times) {
    galaxiat-tycoon.prestige.botnetOnReset = galaxiat-tycoon.prestige.getBotnet() - galaxiat-tycoon.player.botnet;
};

galaxiat-tycoon.prestige.domInit = function() {
    $('#prestige-button').on('click', function() {
        galaxiat-tycoon.save.soft();
    });
};