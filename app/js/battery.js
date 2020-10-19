galaxiat-tycoon.battery = {};
galaxiat-tycoon.battery.level = 1;
galaxiat-tycoon.battery.levelCharge = 30;
galaxiat-tycoon.battery.time = 0;
galaxiat-tycoon.battery.price = 50000;
galaxiat-tycoon.battery.inflation = 1.5;
galaxiat-tycoon.battery.maxCharge = 120;

galaxiat-tycoon.battery.chargePower = 7;
galaxiat-tycoon.battery.chargePowerMult = 1;
galaxiat-tycoon.battery.chargeTimeMult = 1;

galaxiat-tycoon.battery.moneyPerLevel = 0.06;
galaxiat-tycoon.battery.expPerLevel = 0.04;
galaxiat-tycoon.battery.timePerLevel = 0.02;

galaxiat-tycoon.battery.moneyEffect = 1.25;
galaxiat-tycoon.battery.expEffect = 1.15;
galaxiat-tycoon.battery.timeMult = 1.10;

galaxiat-tycoon.battery.cursorEnter = false;
galaxiat-tycoon.battery.cursorLeave = true;
galaxiat-tycoon.battery.oldState = 'null';

galaxiat-tycoon.battery.getExpEffect = function() {
    if (galaxiat-tycoon.battery.time > 0.01)
        return galaxiat-tycoon.battery.expEffect + (galaxiat-tycoon.battery.level * galaxiat-tycoon.battery.expPerLevel);
    else
        return 1;
};

galaxiat-tycoon.battery.getMoneyEffect = function() {
    if (galaxiat-tycoon.battery.time > 0.01)
        return galaxiat-tycoon.battery.moneyEffect + (galaxiat-tycoon.battery.level * galaxiat-tycoon.battery.moneyPerLevel);
    else
        return 1;
};

galaxiat-tycoon.battery.getTimeEffect = function() {
    if (galaxiat-tycoon.battery.time > 0.01)
        return galaxiat-tycoon.battery.timeMult + (galaxiat-tycoon.battery.level * galaxiat-tycoon.battery.timePerLevel);
    else
        return 1;
};

galaxiat-tycoon.battery.getCost = function() {
    return Math.floor(galaxiat-tycoon.battery.price * Math.pow(galaxiat-tycoon.battery.inflation, galaxiat-tycoon.battery.level));
};

galaxiat-tycoon.battery.getMaxCharge = function() {
    return (galaxiat-tycoon.battery.maxCharge * galaxiat-tycoon.battery.chargeTimeMult) + (galaxiat-tycoon.battery.level * galaxiat-tycoon.battery.levelCharge);
};

galaxiat-tycoon.battery.getChargePower = function() {
    return (galaxiat-tycoon.battery.chargePower * galaxiat-tycoon.battery.chargePowerMult) + galaxiat-tycoon.battery.level - 1;
};

galaxiat-tycoon.battery.list = function() {
    var str = '* increase max charge capacity.<br>' +
        '* increase your charge power.<br>' +
        '* reduce your scripts time.';
    
    return str;
};

galaxiat-tycoon.battery.display = function() {
    var maxCharge = galaxiat-tycoon.battery.getMaxCharge();
    
    $('#battery-level').css('width', galaxiat-tycoon.battery.time / maxCharge * 100 + '%');
    
    if (galaxiat-tycoon.battery.time <= (maxCharge * 0.33) && galaxiat-tycoon.battery.oldState !== 'low') {
        galaxiat-tycoon.battery.oldState = 'low';
        
        $('#battery, #battery-level').removeClass('low medium high').addClass('low');
        $('#stats-battery-title i').removeClass().addClass('fa fa-battery-empty');
    };
    
    if (galaxiat-tycoon.battery.time > (maxCharge * 0.33) && galaxiat-tycoon.battery.oldState !== 'medium') {
        galaxiat-tycoon.battery.oldState = 'medium';
        
        $('#battery, #battery-level').removeClass('low medium high').addClass('medium');
        $('#stats-battery-title i').removeClass().addClass('fa fa-battery-half');
    };
    
    if (galaxiat-tycoon.battery.time > (maxCharge * 0.66) && galaxiat-tycoon.battery.oldState !== 'high') {
        galaxiat-tycoon.battery.oldState = 'high';
        
        $('#battery, #battery-level').removeClass('low medium high').addClass('high');
        $('#stats-battery-title i').removeClass().addClass('fa fa-battery-full');
    };
};

galaxiat-tycoon.battery.buy = function() {
    var cost = galaxiat-tycoon.battery.getCost();
    
    if (galaxiat-tycoon.player.money < cost)
        return galaxiat-tycoon.console.print('<x>ERR</x> not enough money to upgrade your <b>battery</b> (cost <b>$' + fix(cost, 0) + '</b>).');
    if (galaxiat-tycoon.player.money >= cost) {
        galaxiat-tycoon.player.money -= cost;
        galaxiat-tycoon.battery.level++;
        return galaxiat-tycoon.console.print('<z>BATTERY</z> you successfully upgraded your battery to <b>level ' + galaxiat-tycoon.battery.level + '</b>.');
    };
};

galaxiat-tycoon.battery.loop = function(times) {
    if (galaxiat-tycoon.battery.cursorEnter && !galaxiat-tycoon.battery.cursorLeave) {
        var maxCharge = galaxiat-tycoon.battery.getMaxCharge(),
            chargePower = galaxiat-tycoon.battery.getChargePower();
        
        if (galaxiat-tycoon.battery.time < maxCharge)
            galaxiat-tycoon.battery.time += (times / galaxiat-tycoon.fps) * chargePower;
    };
    
    if (galaxiat-tycoon.battery.time > 0)
        galaxiat-tycoon.battery.time -= (times / galaxiat-tycoon.fps);
    else if (galaxiat-tycoon.battery.time <= 0)
        galaxiat-tycoon.battery.time = 0;
    
    galaxiat-tycoon.battery.display();
};

galaxiat-tycoon.battery.domInit = function() {
    $('#battery').mouseenter(function() {
        galaxiat-tycoon.battery.cursorEnter = true;
        galaxiat-tycoon.battery.cursorLeave = false;
    }).mouseleave(function() {
        galaxiat-tycoon.battery.cursorEnter = false;
        galaxiat-tycoon.battery.cursorLeave = true;
    });
};

galaxiat-tycoon.battery.prestige = function() {
    galaxiat-tycoon.battery.level = 1;
    galaxiat-tycoon.battery.time = 0;
};