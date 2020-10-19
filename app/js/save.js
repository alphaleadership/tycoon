galaxiat-tycoon.save = {};
galaxiat-tycoon.save.name = 'SKINC',

galaxiat-tycoon.save.b64uEncode = function(what) {
	return btoa(encodeURIComponent(what).replace(/%([0-9A-F]{2})/g, function(match, p1) {
	    return String.fromCharCode('0x' + p1);
	}));
};

galaxiat-tycoon.save.b64uDecode = function(what) {
	return decodeURIComponent(atob(what).split('').map(function(c) {
	    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
};

galaxiat-tycoon.save.saveNow = function(direct) {
    var str = galaxiat-tycoon.save.b64uEncode(JSON.stringify(galaxiat-tycoon));
    
    localStorage.setItem(galaxiat-tycoon.save.name, str);
    
    if (direct)
        return galaxiat-tycoon.console.print('<z>SAVE</z> game saved.');
};

galaxiat-tycoon.save.eraseNow = function() {
    var conf = confirm('If you do this you will reset from scratch (no prestige by doing this)!');
    
    if (!conf)
        return;
    
    window.onbeforeunload = function() {};
    clearInterval(galaxiat-tycoon.loops.save);
    
    localStorage.removeItem(galaxiat-tycoon.save.name);
    location.reload();
};

galaxiat-tycoon.save.loadNow = function() {
    if (localStorage.getItem(galaxiat-tycoon.save.name) == null)
        return console.info('No save found...');
    
    var str = localStorage.getItem(galaxiat-tycoon.save.name),
        save = JSON.parse(galaxiat-tycoon.save.b64uDecode(str));
    
    galaxiat-tycoon.before = save.before;
    
    galaxiat-tycoon.achievements.owned = save.achievements.owned;
    
    galaxiat-tycoon.autoscript.unlocked = save.autoscript.unlocked;
    
    galaxiat-tycoon.options.typed = save.options.typed;
    
    galaxiat-tycoon.script.unlocked = save.script.unlocked;
    galaxiat-tycoon.script.completed = save.script.completed;
    galaxiat-tycoon.script.totalCompleted = save.script.totalCompleted;
    galaxiat-tycoon.script.available = save.script.available;
    galaxiat-tycoon.script.current = save.script.current;
    galaxiat-tycoon.script.time = save.script.time;
    galaxiat-tycoon.script.maxTime = save.script.maxTime;
    
    galaxiat-tycoon.server.owned = save.server.owned;
    
    galaxiat-tycoon.tutorial.finish = save.tutorial.finish;
    
    galaxiat-tycoon.player.username = save.player.username;
    galaxiat-tycoon.player.money = save.player.money;
    galaxiat-tycoon.player.totalMoney = save.player.totalMoney;
    galaxiat-tycoon.player.exp = save.player.exp;
    galaxiat-tycoon.player.totalExp = save.player.totalExp;
    galaxiat-tycoon.player.expReq = save.player.expReq;
    galaxiat-tycoon.player.level = save.player.level;
    
    if (save.version >= 0.31) {
        galaxiat-tycoon.player.botnet = save.player.botnet;
        galaxiat-tycoon.player.prestigeCount = save.player.prestigeCount;
    };
    
    if (save.version >= 0.32) {
        galaxiat-tycoon.battery.level = save.battery.level;
        galaxiat-tycoon.battery.time = save.battery.time;
    };
    
    if (save.version >= 0.33)
        galaxiat-tycoon.console.grammarly = save.console.grammarly;
    
    return console.info('Save found and loaded.', save.version);
};

galaxiat-tycoon.save.soft = function() {
    if (galaxiat-tycoon.prestige.botnetOnReset == 0) {
        $('#prestige-button').html('You need to gain at least 1 botnet').removeClass('btn-outline-info').addClass('btn-outline-danger');
        
        setTimeout(function() {
            $('#prestige-button').html('Prestige now').removeClass('btn-outline-danger').addClass('btn-outline-info');
        }, 5000);
        
        return;
    };
    
    clearInterval(galaxiat-tycoon.loops.core);
    clearInterval(galaxiat-tycoon.loops.achievements);
    clearInterval(galaxiat-tycoon.loops.save);
    
    galaxiat-tycoon.player.botnet += galaxiat-tycoon.prestige.botnetOnReset;
    
    galaxiat-tycoon.autoscript.prestige();
    galaxiat-tycoon.script.prestige();
    galaxiat-tycoon.server.prestige();
    galaxiat-tycoon.player.prestige();
    galaxiat-tycoon.battery.prestige();
    
    galaxiat-tycoon.save.saveNow();
    location.reload();
};

galaxiat-tycoon.save.init = function() {
    galaxiat-tycoon.save.loadNow();
    
    galaxiat-tycoon.achievements.saveInit();
    
    galaxiat-tycoon.loops.save = setInterval(function() {
        galaxiat-tycoon.save.saveNow();
    }, 500);
    
    window.onbeforeunload = function() {
        galaxiat-tycoon.save.saveNow();
    };
};