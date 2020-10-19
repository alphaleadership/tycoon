galaxiat-tycoon.achievements = {};
galaxiat-tycoon.achievements.categories = [];
galaxiat-tycoon.achievements.owned = [];
galaxiat-tycoon.achievements.ach = [];

galaxiat-tycoon.achievements.getOwnedAmount = function() {
    var owned = 0;
    
    for (var i = 0; i < galaxiat-tycoon.achievements.owned.length; i++) {
        if (galaxiat-tycoon.achievements.owned[i])
            owned++;
    };
    
    return owned;
};

galaxiat-tycoon.achievements.getLast = function() {
    var list = [];
    
    for (var e = 0; e < galaxiat-tycoon.achievements.categories.length; e++) {
        var category = galaxiat-tycoon.achievements.categories[e];
        
        for (var i = 0; i < galaxiat-tycoon.achievements.ach.length; i++) {
            var achievement = galaxiat-tycoon.achievements.ach[i],
                owned = galaxiat-tycoon.achievements.owned[i];
            
            if (!owned && achievement.category == category) {
                list.push(achievement);
                i = galaxiat-tycoon.achievements.ach.length;
            };
        };
    };
    
    return list;
};

galaxiat-tycoon.achievements.create = function(name, desc, category, icon, varCheck, typeCheck, amount) {
    this.name = name;
    this.desc = desc;
    this.category = category;
    this.icon = icon;
    this.varCheck = varCheck;
    this.typeCheck = typeCheck;
    this.amount = amount;
};

galaxiat-tycoon.achievements.init = function() {
    galaxiat-tycoon.achievements.ach = [
        new galaxiat-tycoon.achievements.create('Kiddie I', 'Execute 10 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 10),
        new galaxiat-tycoon.achievements.create('Kiddie II', 'Execute 50 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 50),
        new galaxiat-tycoon.achievements.create('Kiddie III', 'Execute 250 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 250),
        new galaxiat-tycoon.achievements.create('Kiddie IV', 'Execute 1,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 1000),
        new galaxiat-tycoon.achievements.create('Kiddie V', 'Execute 2,500 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 2500),
        new galaxiat-tycoon.achievements.create('Hacker I', 'Execute 10,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 10000),
        new galaxiat-tycoon.achievements.create('Hacker II', 'Execute 75,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 75000),
        new galaxiat-tycoon.achievements.create('Hacker III', 'Execute 500,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 500000),
        new galaxiat-tycoon.achievements.create('Hacker IV', 'Execute 2,500,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 2500000),
        new galaxiat-tycoon.achievements.create('Hacker V', 'Execute 10,000,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'galaxiat-tycoon.script.totalCompleted', '>=', 10000000),
        
        new galaxiat-tycoon.achievements.create('Experienced I', 'Reach level 5.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 5),
        new galaxiat-tycoon.achievements.create('Experienced II', 'Reach level 10.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 10),
        new galaxiat-tycoon.achievements.create('Experienced III', 'Reach level 25.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 25),
        new galaxiat-tycoon.achievements.create('The Answer', 'Reach level 42.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 42),
        new galaxiat-tycoon.achievements.create('Mentor I', 'Reach level 50.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 50),
        new galaxiat-tycoon.achievements.create('Mentor II', 'Reach level 60.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 60),
        new galaxiat-tycoon.achievements.create('Mentor III', 'Reach level 70.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 70),
        new galaxiat-tycoon.achievements.create('Mentor IV', 'Reach level 80.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 80),
        new galaxiat-tycoon.achievements.create('Mentor V', 'Reach level 90.', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 90),
        new galaxiat-tycoon.achievements.create('Maximam Solis', 'Reach level 100 (max level).', 'levelReached', 'fa-star', 'galaxiat-tycoon.player.level', '>=', 100),
        
        new galaxiat-tycoon.achievements.create('Earner I', 'Earn a total of $15,000.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 15000),
        new galaxiat-tycoon.achievements.create('Earner II', 'Earn a total of $500,000.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 500000),
        new galaxiat-tycoon.achievements.create('Earner III', 'Earn a total of $1,000,000.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 1000000),
        new galaxiat-tycoon.achievements.create('Earner VI', 'Earn a total of $50,000,000.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 50000000),
        new galaxiat-tycoon.achievements.create('Earner V', 'Earn a total of $750,000,000.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 750000000),
        new galaxiat-tycoon.achievements.create('Banker I', 'Earn a total of $10.000b.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 10000000000),
        new galaxiat-tycoon.achievements.create('Banker II', 'Earn a total of $100.000b.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 100000000000),
        new galaxiat-tycoon.achievements.create('Banker III', 'Earn a total of $1.000t.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 1000000000000),
        new galaxiat-tycoon.achievements.create('Banker IV', 'Earn a total of $100.000t.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 100000000000000),
        new galaxiat-tycoon.achievements.create('Banker V', 'Earn a total of $10.000q.', 'totalMoney', 'fa-money', 'galaxiat-tycoon.player.totalMoney', '>=', 10000000000000000),
        
        new galaxiat-tycoon.achievements.create('Webmaster I', 'Upgrade your web server to level 1.', 'webLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("web")]', '>=', 1),
        new galaxiat-tycoon.achievements.create('Webmaster II', 'Upgrade your web server to level 25.', 'webLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("web")]', '>=', 25),
        new galaxiat-tycoon.achievements.create('Webmaster III', 'Upgrade your web server to level 50.', 'webLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("web")]', '>=', 50),
        new galaxiat-tycoon.achievements.create('Webmaster IV', 'Upgrade your web server to level 100.', 'webLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("web")]', '>=', 100),
        new galaxiat-tycoon.achievements.create('Webmaster V', 'Upgrade your web server to level 200.', 'webLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("web")]', '>=', 200),
        
        new galaxiat-tycoon.achievements.create('Virtualization I', 'Upgrade your telnet server to level 1.', 'telnetLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("telnet")]', '>=', 1),
        new galaxiat-tycoon.achievements.create('Virtualization II', 'Upgrade your telnet server to level 25.', 'telnetLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("telnet")]', '>=', 25),
        new galaxiat-tycoon.achievements.create('Virtualization III', 'Upgrade your telnet server to level 50.', 'telnetLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("telnet")]', '>=', 50),
        new galaxiat-tycoon.achievements.create('Virtualization IV', 'Upgrade your telnet server to level 75.', 'telnetLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("telnet")]', '>=', 75),
        new galaxiat-tycoon.achievements.create('Virtualization V', 'Upgrade your telnet server to level 100 (max level).', 'telnetLevel', 'fa-server', 'galaxiat-tycoon.server.owned[galaxiat-tycoon.server.servers.indexOf("telnet")]', '>=', 100),
        
        new galaxiat-tycoon.achievements.create('Charge I', 'Upgrade your battery to level 5.', 'batteryLevel', 'fa-battery-full', 'galaxiat-tycoon.battery.level', '>=', 5),
        new galaxiat-tycoon.achievements.create('Charge II', 'Upgrade your battery to level 10.', 'batteryLevel', 'fa-battery-full', 'galaxiat-tycoon.battery.level', '>=', 10),
        new galaxiat-tycoon.achievements.create('Charge III', 'Upgrade your battery to level 25.', 'batteryLevel', 'fa-battery-full', 'galaxiat-tycoon.battery.level', '>=', 25),
        new galaxiat-tycoon.achievements.create('Charge IV', 'Upgrade your battery to level 50.', 'batteryLevel', 'fa-battery-full', 'galaxiat-tycoon.battery.level', '>=', 50),
        new galaxiat-tycoon.achievements.create('Charge V', 'Upgrade your battery to level 75.', 'batteryLevel', 'fa-battery-full', 'galaxiat-tycoon.battery.level', '>=', 75)
    ];
    
    for (var i = 0; i < galaxiat-tycoon.achievements.ach.length; i++) {
        var achievement = galaxiat-tycoon.achievements.ach[i];
        
        galaxiat-tycoon.achievements.owned.push(false);
        
        if (galaxiat-tycoon.achievements.categories.indexOf(achievement.category) == -1)
            galaxiat-tycoon.achievements.categories.push(achievement.category);
    };
    
    galaxiat-tycoon.loops.achievements = setInterval(function() {
        galaxiat-tycoon.achievements.loop();
    }, 1000);
};

galaxiat-tycoon.achievements.list = function() {
    var str = '',
        achievements = galaxiat-tycoon.achievements.getLast(),
        owned = galaxiat-tycoon.achievements.getOwnedAmount(),
        max = galaxiat-tycoon.achievements.ach.length;
    
    str += '<y>ACHIEVEMENTS</y> ' + owned + '/' + max + ' completed:<br>';
    
    for (var i = 0; i < achievements.length; i++) {
        var ach = achievements[i];
        
        str += '<b>*</b> <z>' + ach.name + '</z>: ' + ach.desc + '<br>';
    };
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.achievements.saveInit = function() {
    if (galaxiat-tycoon.achievements.ach.length !== galaxiat-tycoon.achievements.owned.length) {
        var diff = galaxiat-tycoon.achievements.ach.length - galaxiat-tycoon.achievements.owned.length;
        
        for (var i = 0; i < diff; i++)
            galaxiat-tycoon.achievements.owned.push(false);
    };
};

galaxiat-tycoon.achievements.update = function() {
    var achievements = galaxiat-tycoon.achievements.getLast(),
        owned = galaxiat-tycoon.achievements.getOwnedAmount(),
        max = galaxiat-tycoon.achievements.ach.length;
    
    $('#achievements-owned').html('Achievements owned (' + owned + '/' + max + '):');
    
    for (var i = 0; i < achievements.length; i++) {
        var ach = achievements[i];
        
        // tether.io change title attr to data-original-title when loaded...
        $('#achievement-' + ach.category + '-tooltip').attr('data-original-title', ach.desc);
        $('#achievement-' + ach.category + '-name').html(ach.name);
    };
};

galaxiat-tycoon.achievements.domInit = function() {
    var achievements = galaxiat-tycoon.achievements.getLast(),
        owned = galaxiat-tycoon.achievements.getOwnedAmount(),
        max = galaxiat-tycoon.achievements.ach.length;
    
    $('#achievements-owned').html('Achievements owned (' + owned + '/' + max + '):');
    $('#achievements-content').append('<div id="achievements-row" class="row"></div>');
    
    for (var i = 0; i < achievements.length; i++) {
        $('#achievements-row').append('<div id="achievement-' + achievements[i].category + '" class="col-md-2 achievement-col">' +
            '<div id="achievement-' + achievements[i].category + '-tooltip" class="achievement-block" data-animation="false" data-toggle="tooltip" data-placement="top" title="' + achievements[i].desc + '">' +
                '<i class="fa ' + achievements[i].icon + '" aria-hidden="true"></i>' +
            '</div>' +
            '<p id="achievement-' + achievements[i].category + '-name">' + achievements[i].name + '</p>' +
        '</div>');
    };
};

galaxiat-tycoon.achievements.loop = function() {
    for (var i = 0; i < galaxiat-tycoon.achievements.ach.length; i++) {
        var achievement = galaxiat-tycoon.achievements.ach[i],
            owned = galaxiat-tycoon.achievements.owned[i];
        
        if (!owned) {
            var test = eval(achievement.varCheck + achievement.typeCheck + achievement.amount);
            
            if (test) {
                galaxiat-tycoon.achievements.owned[i] = true;
                galaxiat-tycoon.console.print('<y>ACHIEVEMENT</y> you earned a new achievement: <b>' + achievement.name + ', ' + achievement.desc.toLowerCase() + '</b>');
                
                galaxiat-tycoon.achievements.update();
            };
        };
    };
};