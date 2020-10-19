galaxiat-tycoon.script = {};
galaxiat-tycoon.script.secondArgs = [];

galaxiat-tycoon.script.available = true;
galaxiat-tycoon.script.current = null;
galaxiat-tycoon.script.time = 0;
galaxiat-tycoon.script.maxTime = 0;
galaxiat-tycoon.script.maxBar = 40;

galaxiat-tycoon.script.unlocked = [true, false, false, false, false, false, false, false];
galaxiat-tycoon.script.completed = [0, 0, 0, 0, 0, 0, 0, 0];
galaxiat-tycoon.script.totalCompleted = 0;
galaxiat-tycoon.script.scripts = [{
    id: 'hare.ctx',
    cost: 0,
    money: 118,
    exp: 8,
    time: 4,
    i: 0
}, {
    id: 'yerg.trj',
    cost: 3750,
    money: 1298,
    exp: 56,
    time: 16,
    i: 1
}, {
    id: 'acid.pl',
    cost: 52500,
    money: 14278,
    exp: 392,
    time: 64,
    i: 2
}, {
    id: 'memz.rsm',
    cost: 735000,
    money: 157058,
    exp: 2744,
    time: 256,
    i: 3
}, {
    id: 'gruel.vbs',
    cost: 10290000,
    money: 1727638,
    exp: 19208,
    time: 1024,
    i: 4
}, {
    id: 'cih.win',
    cost: 144060000,
    money: 19004018,
    exp: 134456,
    time: 4096,
    i: 5
}, {
    id: 'worm.cs',
    cost: 2016840000,
    money: 209044198,
    exp: 941192,
    time: 16384,
    i: 6
}, {
    id: 'blazer.dos',
    cost: 28235760000,
    money: 2299486178,
    exp: 6588344,
    time: 65536,
    i: 7
}];

galaxiat-tycoon.script.isExecuted = function() {
    var executed = !this.available;
    return executed.toString();
};

galaxiat-tycoon.script.getName = function() {
    if (this.available)
        return 'none';
    else
        return this.current.id;
};

galaxiat-tycoon.script.help = function() {
    var str = '<y>SCRIPT HELP</y> execute scripts to earn money and experience:<br>' +
        '<b>-</b> to execute a script you must put the <b>script name</b> as the first argument.<br>' +
        '<b>-</b> you can get a list of all available scripts with <b>-l/-list</b> argument.<br>' +
        '<b>-</b> to stop a script, use the argument <b>-c/-cancel</b>.';
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.script.list = function() {
    var str = '<y>SCRIPT LIST</y>:<br>';
    
    for (var script in galaxiat-tycoon.script.scripts) {
        var i = script,
            script = galaxiat-tycoon.script.scripts[i],
            unlocked = galaxiat-tycoon.script.unlocked[script.i],
            money = script.money * galaxiat-tycoon.player.getMoneyMult(),
            exp = script.exp * galaxiat-tycoon.player.getExpMult(),
            time = script.time / galaxiat-tycoon.player.getTimeMult();
        
        str += '<b>-</b> <b>';
        
        if (!unlocked)
            str += '<red>' + script.id + '</red>';
        else
            str += '<green>' + script.id + '</green>';
        
        str += '</b>: <b>+$' + fix(money, 0) + '</b> and <b>+' + fix(exp, 0) + ' exp</b>, cost <b>$' + fix(script.cost, 0) + '</b>, execution takes <b>' + fix(time, 0) + ' sec</b>.<br>';
    };
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.script.listBuy = function() {
    return '<b>*</b> type <b>script -l/-list</b> for a detailed list of scripts.';
};

galaxiat-tycoon.script.execute = function(args) {
    var exists = false,
        s;
    
    for (var script in galaxiat-tycoon.script.scripts) {
        var i = script,
            script = galaxiat-tycoon.script.scripts[i];
        
        if (args[0] == script.id) {
            exists = true;
            s = script;
        };
    };
    
    if (!exists)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + args[0] + '</b> is not valid script name.');
    
    if ((args[1] == '-c' || args[1] == '-cancel') && args.length > 1)
        return galaxiat-tycoon.script.stop(s);
    
    if (exists && args.length == 1)
        return galaxiat-tycoon.script.start(s);
};

galaxiat-tycoon.script.start = function(script) {
    if (!galaxiat-tycoon.script.available)
        return galaxiat-tycoon.console.print('<x>ERR</x> you can\'t execute multiple scripts at once.');
    
    if (galaxiat-tycoon.autoscript.unlocked[script.i])
        return galaxiat-tycoon.console.print('<x>ERR</x> you already have an autoscript for <b>' + script.id + '</b> script.');
        
    if (!galaxiat-tycoon.script.unlocked[script.i])
        return galaxiat-tycoon.console.print('<x>ERR</x> you haven\'t unlocked the <b>' + script.id + '</b> script.');
    
    var el = (!galaxiat-tycoon.tutorial.finish && galaxiat-tycoon.tutorial.enabled) ? '#intro-logs' : '#logs';
    
    galaxiat-tycoon.script.available = false;
    galaxiat-tycoon.script.current = script;
    galaxiat-tycoon.script.time = script.time / galaxiat-tycoon.player.getTimeMult();
    galaxiat-tycoon.script.maxTime = script.time / galaxiat-tycoon.player.getTimeMult();
    galaxiat-tycoon.console.print('<z>SCRIPT STARTED</z>: <b>' + script.id + '</b>.');
    
    
    $(el).append('<span id="script-bar">|========================================|</span>');
};

galaxiat-tycoon.script.stop = function(script) {
    if (galaxiat-tycoon.script.available)
        return galaxiat-tycoon.console.print('<x>ERR</x> there are no script executed.');
    
    if (galaxiat-tycoon.autoscript.unlocked[script.i])
        return galaxiat-tycoon.console.print('<x>ERR</x> you can\'t stop the autoscript for <b>' + script.id + '</b> script.');
    
    if (script.id !== galaxiat-tycoon.script.current.id)
        return galaxiat-tycoon.console.print('<x>ERR</x> this script is not executed.');
    
    galaxiat-tycoon.console.print('<y>SCRIPT STOPPED</y>: <b>' + galaxiat-tycoon.script.scripts[galaxiat-tycoon.script.current.i].id + '</b>.');
    galaxiat-tycoon.script.available = true;
    galaxiat-tycoon.script.current = null;
    galaxiat-tycoon.script.time = 0;
    galaxiat-tycoon.script.maxTime = 0;
};

galaxiat-tycoon.script.finish = function() {
    var script = galaxiat-tycoon.script.current,
        money = script.money * galaxiat-tycoon.player.getMoneyMult(),
        exp = script.exp * galaxiat-tycoon.player.getExpMult(),
        bar = '|';
    
    for (var i = 0; i < this.maxBar; i++)
        bar += '#';
    
    bar += '| <y>100%</y>.';
    
    galaxiat-tycoon.player.earn('money', money);
    galaxiat-tycoon.player.earn('exp', exp);
    
    galaxiat-tycoon.script.completed[script.i]++;
    galaxiat-tycoon.script.totalCompleted = galaxiat-tycoon.script.completed.reduce((a, b) => a + b, 0);
    
    galaxiat-tycoon.script.available = true;
    galaxiat-tycoon.script.current = null;
    galaxiat-tycoon.script.time = 0;
    galaxiat-tycoon.script.maxTime = 0;
    
    if (galaxiat-tycoon.tutorial.enabled && galaxiat-tycoon.tutorial.step == 2)
        galaxiat-tycoon.tutorial.switchStep(3);
    
    $('#script-bar').html(bar).attr('id', 'old-script-bar');
    
    return galaxiat-tycoon.console.print('<y>SCRIPT FINISHED</y>: <b>' + script.id + '</b> just finished its execution, you earned <b>$' + fix(money, 0) + '</b> and <b>' + fix(exp, 0) + ' exp</b>.');
};

galaxiat-tycoon.script.bar = function() {
    if ($('#script-bar').length == 1) {
        var bar = '|',
            percent = (this.maxTime - this.time) / this.maxTime * 100,
            left = Math.floor(this.time / this.maxTime * this.maxBar),
            filled = Math.ceil(this.maxBar - left);
    
        for (var i = 0; i < filled; i++)
            bar += '#';
    
        for (var e = 0; e < left; e++)
            bar += '=';
    
        bar += '| <y>' + fix(percent, 0) + '%</y>.';
    
        $('#script-bar').html(bar);
    };
};

galaxiat-tycoon.script.buy = function(what) {
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
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + what + '</b> is not a known script name.');
    
    if (exists) {
        if (galaxiat-tycoon.script.unlocked[s.i])
            return galaxiat-tycoon.console.print('<x>ERR</x> you already unlocked <b>' + s.id + '</b> script.');
        if (galaxiat-tycoon.player.money < s.cost)
            return galaxiat-tycoon.console.print('<x>ERR</x> not enough money to buy <b>' + s.id + '</b> script (cost <b>$' + fix(s.cost) + '</b>).');
        else {
            galaxiat-tycoon.player.money -= s.cost;
            galaxiat-tycoon.script.unlocked[s.i] = true;
            return galaxiat-tycoon.console.print('You bought <b>' + s.id + '</b> script.');
        };
    };
};

galaxiat-tycoon.script.loop = function(times) {
    if (!galaxiat-tycoon.script.available && typeof galaxiat-tycoon.script.current == 'object') {
        galaxiat-tycoon.script.time -= times / galaxiat-tycoon.fps;
        
        galaxiat-tycoon.script.bar();
        
        if (galaxiat-tycoon.script.time <= 0)
            galaxiat-tycoon.script.finish();
    };
};

galaxiat-tycoon.script.init = function() {
    if (galaxiat-tycoon.script.scripts.length !== galaxiat-tycoon.script.unlocked.length) {
        galaxiat-tycoon.script.unlocked = [];
        
        galaxiat-tycoon.script.scripts.forEach(function(i) {
            galaxiat-tycoon.script.unlocked.push(false);
        });
        
        galaxiat-tycoon.script.unlocked[0] = true;
    };
    
    if (galaxiat-tycoon.script.scripts.length !== galaxiat-tycoon.script.completed.length) {
        galaxiat-tycoon.script.completed = [];
        
        galaxiat-tycoon.script.scripts.forEach(function(i) {
            galaxiat-tycoon.script.completed.push(0);
        });
    };
    
    galaxiat-tycoon.script.scripts.forEach(function(script) {
        galaxiat-tycoon.script.secondArgs.push(script.id);
    });
};

galaxiat-tycoon.script.prestige = function() {
    galaxiat-tycoon.script.unlocked = [];

    galaxiat-tycoon.script.scripts.forEach(function(i) {
        galaxiat-tycoon.script.unlocked.push(false);
    });

    galaxiat-tycoon.script.unlocked[0] = true;
    galaxiat-tycoon.script.available = true;
    galaxiat-tycoon.script.current = null;
    galaxiat-tycoon.script.time = 0;
    galaxiat-tycoon.script.maxTime = 0;
};