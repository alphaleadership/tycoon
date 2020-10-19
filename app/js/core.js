var galaxiat-tycoon = {};
galaxiat-tycoon.fps = 20;
galaxiat-tycoon.interval = 1000 / galaxiat-tycoon.fps;
galaxiat-tycoon.version = 0.33;

galaxiat-tycoon.before = new Date().getTime();
galaxiat-tycoon.now = new Date().getTime();

galaxiat-tycoon.loops = {};

galaxiat-tycoon.update = function(times) {
    galaxiat-tycoon.console.loop(times);
    galaxiat-tycoon.script.loop(times);
    galaxiat-tycoon.autoscript.loop(times);
    galaxiat-tycoon.battery.loop(times);
    galaxiat-tycoon.prestige.loop(times);
    
    galaxiat-tycoon.stats();
};

galaxiat-tycoon.stats = function() {
    $('#stats-overview #player #money').html('$' + fix(this.player.money, 0));
    $('#stats-overview #player #total-money').html('$' + fix(this.player.totalMoney, 0));
    $('#stats-overview #player #exp').html(fix(this.player.exp, 0) + '/' + fix(this.player.expReq, 0));
    $('#stats-overview #player #total-exp').html(fix(this.player.totalExp, 0));
    $('#stats-overview #player #level').html(fix(this.player.level, 0));
    
    $('#stats-overview #script #executed').html(this.script.isExecuted());
    $('#stats-overview #script #name').html(this.script.getName());
    $('#stats-overview #script #time').html(fix(this.script.time, 2) + 's');
    
    $('#stats-overview #telnet #level').html('Lvl. ' + fix(this.server.owned[this.server.telnet.index], 0));
    $('#stats-overview #telnet #price').html('$' + fix(this.server.getPrice('telnet'), 0));
    
    $('#stats-overview #web #level').html('Lvl. ' + fix(this.server.owned[this.server.web.index], 0));
    $('#stats-overview #web #price').html('$' + fix(this.server.getPrice('web'), 0));
    
    $('#stats-overview #mults #money').html('x' + fix(this.player.getMoneyMult(true), 2));
    $('#stats-overview #mults #exp').html('x' + fix(this.player.getExpMult(true), 2));
    $('#stats-overview #mults #time').html('/' + fix(this.player.getTimeMult(), 2));
    
    $('#stats-overview #prestige #botnet').html(fix(galaxiat-tycoon.player.botnet, 0));
    $('#stats-overview #prestige #botnet-reset').html(fix(galaxiat-tycoon.prestige.botnetOnReset, 0));
    $('#stats-overview #prestige #mult').html('x' + fix(galaxiat-tycoon.prestige.getPrestigeMult(), 2));
    
    $('#stats-battery #battery #level').html(fix(galaxiat-tycoon.battery.level, 0));
    $('#stats-battery #battery #upgrade').html('$' + fix(galaxiat-tycoon.battery.getCost(), 0));
    $('#stats-battery #battery #charge').html(fix(galaxiat-tycoon.battery.time, 2) + '/' + fix(galaxiat-tycoon.battery.getMaxCharge(), 2) + 's');
    $('#stats-battery #battery #charge-power').html('+' + fix(galaxiat-tycoon.battery.getChargePower(), 2) + '/s');
    $('#stats-battery #battery #money').html('x' + fix(galaxiat-tycoon.battery.getMoneyEffect(), 2));
    $('#stats-battery #battery #exp').html('x' + fix(galaxiat-tycoon.battery.getExpEffect(), 2));
    $('#stats-battery #battery #time').html('x' + fix(galaxiat-tycoon.battery.getTimeEffect(), 2));
};

galaxiat-tycoon.core = function() {
    galaxiat-tycoon.now = new Date().getTime();
    
    var elapsed = galaxiat-tycoon.now - galaxiat-tycoon.before,
        times = Math.floor(elapsed / galaxiat-tycoon.interval);
    
    elapsed > galaxiat-tycoon.interval ? galaxiat-tycoon.update(times) : galaxiat-tycoon.update(1);
    
    galaxiat-tycoon.before = new Date().getTime();
};

galaxiat-tycoon.loadingScreen = function() {
    $('#loading-text').typed({
        strings: ['galaxiat-tycoon is loading, please wait a bit'],
        typedSpeed: -35,
        cursorChar: "_",
        callback: function() {
            $('.typed-cursor').remove();
            $('#loading-dots').typed({
                strings: ['.^750.^750.^750'],
                cursorChar: "_",
                typedSpeed: 0,
                loop: true
            });
        }
    });
};

galaxiat-tycoon.init = function() {
    galaxiat-tycoon.loops.core = setInterval(function() {
        galaxiat-tycoon.core();
    }, galaxiat-tycoon.interval);

    galaxiat-tycoon.loadingScreen();

    setTimeout(function() {
        $('#loader').fadeOut('slow', function() {
            $('#loader').remove();
        });

        galaxiat-tycoon.script.init();
        galaxiat-tycoon.autoscript.init();
        galaxiat-tycoon.buy.init();
        galaxiat-tycoon.achievements.init();
        galaxiat-tycoon.options.init();
        galaxiat-tycoon.kongregate.init();
        galaxiat-tycoon.save.init();
        
        galaxiat-tycoon.domInit();
        
        galaxiat-tycoon.tutorial.begin();
    }, 3500);
};

galaxiat-tycoon.domInit = function() {
    $(document).keydown(function(e){
        if (e.keyCode == 37 && e.shiftKey)
            galaxiat-tycoon.options.changeTab('left');
        
        if (e.keyCode == 39 && e.shiftKey)
            galaxiat-tycoon.options.changeTab('right');
        
        if (e.keyCode == 76 && e.ctrlKey) {
            e.preventDefault();
            galaxiat-tycoon.console.clear();
        };
        
        if (e.keyCode == 81 && e.ctrlKey) {
            e.preventDefault();
            document.querySelector('[contenteditable]').textContent = "";
        };
    });
    
    $('#command-input, #intro-input').on('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            galaxiat-tycoon.console.parse();
        };
        
        if (e.which == 9) {
            e.preventDefault();
            galaxiat-tycoon.console.autocomplete();
        };
    });
    
    $('.input').keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {
            objEvent.preventDefault();
            galaxiat-tycoon.console.autocomplete();
        };
        
        if (objEvent.keyCode == 38) {
            objEvent.preventDefault();
            galaxiat-tycoon.console.navigateHistory('up');
        };
        
        if (objEvent.keyCode == 40) {
            objEvent.preventDefault();
            galaxiat-tycoon.console.navigateHistory('down');
        };
    });
    
    $('.logs').on('click', function(e) {
        e.preventDefault();
        $('#command-input').focus();
    });
    
    $('.intro').on('click', function(e) {
        e.preventDefault();
        $('#intro-input').focus();
    });
    
    galaxiat-tycoon.console.domInit();
    galaxiat-tycoon.options.domInit();
    galaxiat-tycoon.autoscript.domInit();
    galaxiat-tycoon.achievements.domInit();
    galaxiat-tycoon.battery.domInit();
    galaxiat-tycoon.prestige.domInit();
    galaxiat-tycoon.kongregate.domInit();
    
    galaxiat-tycoon.player.setUsernamePrefix();
    
    $('[data-toggle="tooltip"]').tooltip();
};

$(document).ready(function() {
    galaxiat-tycoon.init();
});