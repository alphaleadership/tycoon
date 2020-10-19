galaxiat-tycoon.autoscript = {};
galaxiat-tycoon.autoscript.unlocked = [false, false, false, false, false, false, false, false];
galaxiat-tycoon.autoscript.time = [0, 0, 0, 0, 0, 0, 0, 0];
galaxiat-tycoon.autoscript.cost = [420, 22500, 315000, 4410000, 61740000, 864360000, 12101040000, 169414560000];

galaxiat-tycoon.autoscript.list = function() {
    return '<b>*</b> autoscripts got the same names as scripts. You can also check the autoscript tab for names.';
};

galaxiat-tycoon.autoscript.buy = function(what) {
    var exists = false,
        s;
    
    for (var script in galaxiat-tycoon.script.scripts) {
        var i = script,
            script = galaxiat-tycoon.script.scripts[i];
        
        if (what == script.id) {
            exists = true;
            s = script;
        };
    };
    
    if (!exists)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + what + '</b> is not a known autoscript name.');
    
    if (exists) {
        if (galaxiat-tycoon.autoscript.unlocked[s.i])
            return galaxiat-tycoon.console.print('<x>ERR</x> you already unlocked <b>' + s.id + '</b> autoscript.');
        if (!galaxiat-tycoon.script.unlocked[s.i])
            return galaxiat-tycoon.console.print('<x>ERR</x> you can\'t buy an autoscript for a script you don\'t own (<b>' + s.id + '</b> script).');
        if (galaxiat-tycoon.player.money < galaxiat-tycoon.autoscript.cost[s.i])
            return galaxiat-tycoon.console.print('<x>ERR</x> not enough money to buy <b>' + s.id + '</b> autoscript (cost <b>$' + fix(galaxiat-tycoon.autoscript.cost[s.i]) + '</b>).');
        else {
            galaxiat-tycoon.player.money -= galaxiat-tycoon.autoscript.cost[s.i];
            galaxiat-tycoon.autoscript.unlocked[s.i] = true;
            
            return galaxiat-tycoon.console.print('You bought <b>' + s.id + '</b> autoscript.');
        };
    };
};

galaxiat-tycoon.autoscript.loop = function(times) {
    for (var i = 0; i < galaxiat-tycoon.script.scripts.length; i++) {
        var script = galaxiat-tycoon.script.scripts[i];

        if (galaxiat-tycoon.autoscript.unlocked[script.i]) {
            galaxiat-tycoon.autoscript.time[script.i] += times / galaxiat-tycoon.fps;
            
            var maxTime = script.time / galaxiat-tycoon.player.getTimeMult(),
                percent = galaxiat-tycoon.autoscript.time[script.i] / maxTime * 100;
            
            $('#autoscript-' + script.i + ' #time').html(fix(galaxiat-tycoon.autoscript.time[script.i], 2) + 's <small>(' + fix(percent, 0) + '%)</small>');

            if (galaxiat-tycoon.autoscript.time[script.i] >= (script.time / galaxiat-tycoon.player.getTimeMult()))
                galaxiat-tycoon.autoscript.finish(script);
        };
    };
    
    galaxiat-tycoon.autoscript.update();
};

galaxiat-tycoon.autoscript.finish = function(script) {
    var money = script.money * galaxiat-tycoon.player.getMoneyMult(),
        exp = script.exp * galaxiat-tycoon.player.getExpMult();
    
    galaxiat-tycoon.player.earn('money', money);
    galaxiat-tycoon.player.earn('exp', exp);
    
    galaxiat-tycoon.script.completed[script.i]++;
    galaxiat-tycoon.script.totalCompleted = galaxiat-tycoon.script.completed.reduce((a, b) => a + b, 0);
    galaxiat-tycoon.autoscript.time[script.i] = 0;
};

galaxiat-tycoon.autoscript.update = function() {
    for (var i = 0; i < galaxiat-tycoon.script.scripts.length; i++) {
        var script = galaxiat-tycoon.script.scripts[i],
            scriptUnlocked = galaxiat-tycoon.script.unlocked[script.i],
            unlocked = galaxiat-tycoon.autoscript.unlocked[i],
            time = script.time / galaxiat-tycoon.player.getTimeMult(),
            income = script.money * galaxiat-tycoon.player.getMoneyMult(),
            incomePerSec = income / time,
            exp = script.exp * galaxiat-tycoon.player.getExpMult(),
            expPerSec = exp / time;
        
        if (unlocked) {
            $('#autoscript-' + script.i + ' #money').html('Money');
            $('#autoscript-' + script.i + ' #experience').html('Experience');
            $('#autoscript-' + script.i + ' #income').html('$' + fix(income, 0) + ' <small>($' + fix(incomePerSec, 0) + '/s)</small>');
            $('#autoscript-' + script.i + ' #exp').html(fix(exp, 0) + ' exp. <small>(' + fix(expPerSec, 0) + ' exp/s)</small>');
        }
        else {
            if (scriptUnlocked)
                $('#autoscript-' + script.i + ' #income').html('bought');
            else
                $('#autoscript-' + script.i + ' #income').html('cost <b>$' + fix(script.cost, 0) + '</b>');
            
            $('#autoscript-' + script.i + ' #money').html('Script');
            $('#autoscript-' + script.i + ' #experience').html('Autoscript');
            $('#autoscript-' + script.i + ' #exp').html('cost $' + fix(galaxiat-tycoon.autoscript.cost[i], 0) + '</b>');
        };
    };
};

galaxiat-tycoon.autoscript.domInit = function() {
    for (var i = 0; i < galaxiat-tycoon.script.scripts.length; i++) {
        var script = galaxiat-tycoon.script.scripts[i],
            unlocked = galaxiat-tycoon.autoscript.unlocked[i];
        
        $('#stats-autoscripts').append('<div id="autoscript-' + script.i + '" class="stat-container big-content">' +
            '<div id="autoscript-' + script.i + '-name" class="names">' +
                '<p><b>' + script.id + '</b></p>' +
                '<p id="money">Money</p>' +
                '<p id="experience">Experience</p>' +
            '</div>' +
            '<div class="content">' +
                '<p id="time">0.00s</p>' +
                '<p id="income">$0.00</p>' +
                '<p id="exp">$0.00</p>' +
            '</div>' +
        '</div>');
    };
};

galaxiat-tycoon.autoscript.init = function() {
    if (galaxiat-tycoon.script.scripts.length !== galaxiat-tycoon.autoscript.unlocked.length) {
        galaxiat-tycoon.autoscript.unlocked = [];
        
        galaxiat-tycoon.script.scripts.forEach(function(i) {
            galaxiat-tycoon.autoscript.unlocked.push(false);
        });
    };

    if (galaxiat-tycoon.script.scripts.length !== galaxiat-tycoon.autoscript.time.length) {
        galaxiat-tycoon.autoscript.time = [];
        
        galaxiat-tycoon.script.scripts.forEach(function(i) {
            galaxiat-tycoon.autoscript.time.push(0);
        });
    };
};

galaxiat-tycoon.autoscript.prestige = function() {
    galaxiat-tycoon.autoscript.unlocked = [];
    galaxiat-tycoon.autoscript.time = [];

    galaxiat-tycoon.script.scripts.forEach(function(i) {
        galaxiat-tycoon.autoscript.unlocked.push(false);
        galaxiat-tycoon.autoscript.time.push(0);
    });
};