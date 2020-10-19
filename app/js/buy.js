galaxiat-tycoon.buy = {};
galaxiat-tycoon.buy.secondArgs = [];
galaxiat-tycoon.buy.thirdArgs = [];

galaxiat-tycoon.buy.categories = ['autoscript', 'script', 'server', 'battery'];
galaxiat-tycoon.buy.categoriesList = ['galaxiat-tycoon.autoscript.list', 'galaxiat-tycoon.script.listBuy', 'galaxiat-tycoon.server.list', 'galaxiat-tycoon.battery.list'];
galaxiat-tycoon.buy.categoriesDesc = [
    'buy autoscripts to automatize script execution.',
    'buy new, more powerful scripts.',
    'upgrade your servers to maximize your income.',
    'upgrade your battery level.'
];

galaxiat-tycoon.buy.help = function() {
    var str = '<y>BUY HELP</y> buy new scripts, auto-scripts and upgrade servers:<br>' +
        '<b>-</b> <b>buy</b> command require <b>1 argument</b> of type <b>string</b>.<br>' +
        '<b>-</b> first argument is the <b>category</b> of the thing you want to buy.<br>' +
        '<b>-</b> second argument is optional for some categories, it\'s the <b>name</b> of the specific thing you want to buy.<br>' +
        '<b>-</b> you can add an argument to buy multiple things at once (<b>-q</b> followed by a number or <b>"max"</b> keyword).<br>' +
        '<b>-</b> get a list of all the things you can buy with <b>buy -l/-list</b>.';
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.buy.list = function() {
    var str = '<y>BUY LIST</y>:<br>';
    
    for (var i = 0; i < galaxiat-tycoon.buy.categories.length; i++) {
        var category = galaxiat-tycoon.buy.categories[i],
            categoryList = galaxiat-tycoon.buy.categoriesList[i],
            categoryDesc = galaxiat-tycoon.buy.categoriesDesc[i];
        
        str += '<b>-</b> <z>' + category + '</z>: ' + categoryDesc + '<br><p class="text-bullet">' + eval(categoryList)() + '</p>';
    };
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.buy.execute = function(args) {
    var exists = false,
        c;

    for (var category in galaxiat-tycoon.buy.categories) {
        var i = category,
            category = galaxiat-tycoon.buy.categories[i];
        
        if (args[0] == category) {
            exists = true;
            c = category;
        };
    };
    
    if (!exists)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + args[0] + '</b> is not valid category.');
    
    if (exists) {
        var item = (typeof args[1] == 'undefined') ? undefined : args[1],
            amount = 1,
            qIndex;
        
        if (args.indexOf('-q') > -1) {
            qIndex = args.indexOf('-q');
            
            if (isNaN(args[qIndex + 1]) && args[qIndex + 1] !== 'max')
                return galaxiat-tycoon.console.print('<x>ERR</x> expected a number or \"max\" string after <b>-q</b> argument.');
            if (!isNaN(args[qIndex + 1]))
                amount = parseInt(args[qIndex + 1]);
            if (args[qIndex + 1] == 'max')
                amount = 'max';
        };
        
        switch(c) {
            case 'autoscript':
                galaxiat-tycoon.autoscript.buy(item);
                break;
            
            case 'script':
                galaxiat-tycoon.script.buy(item);
                break;
            
            case 'server':
                galaxiat-tycoon.server.buy(item, amount);
                break;
            
            case 'battery':
                galaxiat-tycoon.battery.buy();
                break;
        };
    };
};

galaxiat-tycoon.buy.init = function() {
    galaxiat-tycoon.buy.categories.forEach(function(i) {
        galaxiat-tycoon.buy.secondArgs.push(i);
    });
    
    galaxiat-tycoon.script.scripts.forEach(function(i) {
        galaxiat-tycoon.buy.thirdArgs.push(i.id);
    });
    
    galaxiat-tycoon.server.servers.forEach(function(i) {
        galaxiat-tycoon.buy.thirdArgs.push(i);
    });
};