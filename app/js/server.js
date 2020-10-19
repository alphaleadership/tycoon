galaxiat-tycoon.server = {};
galaxiat-tycoon.server.servers = ['telnet', 'web'];
galaxiat-tycoon.server.owned = [0, 0];
galaxiat-tycoon.server.telnet = {
    id: 'telnet',
    index: 0,
    price: 1e6,
    inflation: 2,
    max: 100,
    effects: {
        time: 0.05
    }
};
galaxiat-tycoon.server.web = {
    id: 'web',
    index: 1,
    price: 800,
    inflation: 1.18,
    max: Infinity,
    effects: {
        money: 0.12,
        exp: 0.05
    }
};

galaxiat-tycoon.server.getPrice = function(what) {
    var server = galaxiat-tycoon.server[what];
    
    return Math.floor(server.price * Math.pow(server.inflation, galaxiat-tycoon.server.owned[server.index]));
};

galaxiat-tycoon.server.getMultibuyPrice = function(what, amount) {
    var server = galaxiat-tycoon.server[what];
    
    return Math.floor(server.price * Math.pow(server.inflation, amount));
};

galaxiat-tycoon.server.getEffects = function(what) {
    var server = galaxiat-tycoon.server[what],
        size = Object.keys(server.effects).length,
        obj = {};
    
    for (var effect in server.effects) {
        var i = effect,
            effect = server.effects[effect];
        
        obj[i] = 1 + effect * galaxiat-tycoon.server.owned[server.index];
    };
    
    return obj;
};

galaxiat-tycoon.server.getEffectsToStr = function(what) {
    var server = galaxiat-tycoon.server[what],
        size = Object.keys(server.effects).length,
        e = 0,
        str = '';
    
    for (var effect in server.effects) {
        var i = effect,
            effect = server.effects[effect];
        
        str += '<b>+' + fix(effect) + '</b> to ' + i + ' multiplier';
        
        e++;
        
        (e == size) ? str += '' : str += ', ';
    };
    
    return str;
};

galaxiat-tycoon.server.list = function() {
    var str = '';
    
    for (var i = 0; i < galaxiat-tycoon.server.servers.length; i++) {
        var server = galaxiat-tycoon.server[galaxiat-tycoon.server.servers[i]],
            cost = galaxiat-tycoon.server.getPrice(server.id),
            effects = galaxiat-tycoon.server.getEffectsToStr(server.id);
        
        str += '<b>*</b> <z>' + server.id + '</z>: cost <b>$' + fix(cost) + '</b>, ' + effects + '.<br>';
    };
    
    return str;
};

galaxiat-tycoon.server.buy = function(item, amount) {
    if (galaxiat-tycoon.server.servers.indexOf(item) == -1)
        return galaxiat-tycoon.console.print('<x>ERR</x> server type <b>' + item + '</b> doesn\`t exist.');
    
    if (typeof amount == 'number' && amount == 1) {
        var cost = galaxiat-tycoon.server.getPrice(item),
            server = galaxiat-tycoon.server[item];
        
        if (galaxiat-tycoon.player.money >= cost && galaxiat-tycoon.server.owned[server.index] + 1 <= server.max) {
            galaxiat-tycoon.player.money -= cost;
            galaxiat-tycoon.server.owned[server.index]++;
            return galaxiat-tycoon.console.print('<z>SERVER</z> you successfully upgraded your <b>' + server.id + '</b> server.');
        };
        
        if (galaxiat-tycoon.server.owned[server.index] + 1 > server.max)
            return galaxiat-tycoon.console.print('<x>ERR</x> this server have a max level which is <b>' + server.max + '</b>.');
        else if (galaxiat-tycoon.player.money < cost)
            return galaxiat-tycoon.console.print('<x>ERR</x> not enough money to upgrade your <b>' + server.id + '</b> server (cost <b>$' + fix(cost, 0) + '</b>).');
    };
    
    if (typeof amount == 'number' && amount > 1) {
        var server = galaxiat-tycoon.server[item],
            owned = galaxiat-tycoon.server.owned[server.index],
            tempOwned = owned,
            i = 0,
            totalCost = 0;
        
        while (i < amount) {
            tempOwned++;
            totalCost += galaxiat-tycoon.server.getMultibuyPrice(item, tempOwned);
            i++;
        };
        
        if (galaxiat-tycoon.player.money >= totalCost && tempOwned <= server.max) {
            galaxiat-tycoon.player.money -= totalCost;
            galaxiat-tycoon.server.owned[server.index] += amount;
            return galaxiat-tycoon.console.print('<z>SERVER</z> you successfully upgraded your <b>' + server.id + '</b> server by <b>' + amount + ' levels</b>.');
        };
        
        if (galaxiat-tycoon.server.owned[server.index] + amount > server.max)
            return galaxiat-tycoon.console.print('<x>ERR</x> this server have a max level (<b>' + server.max + '</b>) that will be exceeded if you upgrade it <b>' + amount + ' times</b>.');
        if (galaxiat-tycoon.player.money < totalCost)
            return galaxiat-tycoon.console.print('<x>ERR</x> not enough money to upgrade your <b>' + server.id + '</b> server <b>' + amount + ' times</b> (total cost of <b>$' + fix(totalCost, 0) + '</b>).');
    };
    
    if (typeof amount == 'string' && amount == 'max') {
        var server = galaxiat-tycoon.server[item],
            owned = galaxiat-tycoon.server.owned[server.index],
            tempOwned = owned,
            toBuy = 0,
            totalCost = 0;
        
        while (galaxiat-tycoon.player.money >= totalCost + galaxiat-tycoon.server.getMultibuyPrice(item, tempOwned + 1)) {
            tempOwned++;
            toBuy++;
            totalCost += galaxiat-tycoon.server.getMultibuyPrice(item, tempOwned);
        };
        
        if (galaxiat-tycoon.player.money >= totalCost && tempOwned <= server.max) {
            galaxiat-tycoon.player.money -= totalCost;
            galaxiat-tycoon.server.owned[server.index] += toBuy;
            return galaxiat-tycoon.console.print('<z>SERVER</z> you successfully upgraded your <b>' + server.id + '</b> server by <b>' + toBuy + ' levels</b>, it cost you <b>$' + fix(totalCost, 0) + '</b>.');
        };
        
        if (galaxiat-tycoon.server.owned[server.index] + toBuy > server.max)
            return galaxiat-tycoon.console.print('<x>ERR</x> this server have a max level (<b>' + server.max + '</b>) that will be exceeded if you upgrade it <b>' + toBuy + ' times</b>.');
        if (galaxiat-tycoon.player.money < totalCost)
            return galaxiat-tycoon.console.print('<x>ERR</x> not enough money to upgrade your <b>' + server.id + '</b> server <b>' + toBuy + ' times</b> (total cost of <b>$' + fix(totalCost, 0) + '</b>).');
    };
};

galaxiat-tycoon.server.prestige = function() {
    galaxiat-tycoon.server.owned = [];
    
    galaxiat-tycoon.server.servers.forEach(function(i) {
        galaxiat-tycoon.server.owned.push(0);
    });
};