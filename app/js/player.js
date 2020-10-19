galaxiat-tycoon.player = {};
galaxiat-tycoon.player.username = 'kiddie';

galaxiat-tycoon.player.money = 0;
galaxiat-tycoon.player.totalMoney = 0;
galaxiat-tycoon.player.exp = 0;
galaxiat-tycoon.player.totalExp = 0;
galaxiat-tycoon.player.expReq = 100;
galaxiat-tycoon.player.level = 1;
galaxiat-tycoon.player.botnet = 0;

galaxiat-tycoon.player.getTimeMult = function() {
    return galaxiat-tycoon.server.getEffects('telnet').time * galaxiat-tycoon.battery.getTimeEffect();
};

galaxiat-tycoon.player.getMoneyMult = function(display) {
    if (display)
        return galaxiat-tycoon.server.getEffects('web').money * galaxiat-tycoon.battery.getMoneyEffect();
    
    return (galaxiat-tycoon.server.getEffects('web').money * galaxiat-tycoon.battery.getMoneyEffect()) * galaxiat-tycoon.prestige.getPrestigeMult();
};

galaxiat-tycoon.player.getExpMult = function(display) {
    if (display)
        return galaxiat-tycoon.server.getEffects('web').exp * galaxiat-tycoon.battery.getExpEffect();
    
    return (galaxiat-tycoon.server.getEffects('web').exp * galaxiat-tycoon.battery.getExpEffect()) * galaxiat-tycoon.prestige.getPrestigeMult();
};

galaxiat-tycoon.player.setUsernamePrefix = function() {
    $('body').append('<p id="username-width" style="display: none; font-size: 26px;">' + galaxiat-tycoon.player.username + '</p>');

    var usernameWidth = Math.floor($('#username-width').width());

    $('#username-width').remove();
    $('#input-session').html(galaxiat-tycoon.player.username);
    $('#command-input').css('width', 'calc(100% - 25px - 115px - ' + usernameWidth + 'px)');
};

galaxiat-tycoon.player.setUsername = function(args) {
    if (galaxiat-tycoon.tutorial.step == 0 && !galaxiat-tycoon.tutorial.finish) {
        if (args[0].length < 1)
            return galaxiat-tycoon.console.print('<x>ERR</x> put a valid username.');
        
        if (args[0].length > 12)
            return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + args[0] + '</b> is too long (> 12 char).');
        
        $('body').append('<p id="username-width" style="display: none; font-size: 26px;">' + args[0] + '</p>');
        
        var usernameWidth = Math.floor($('#username-width').width());
        
        galaxiat-tycoon.player.username = args[0];
        
        $('#username-width').remove();
        $('#input-session').html(args[0]);
        $('#command-input').css('width', 'calc(100% - 25px - 115px - ' + usernameWidth + 'px)');
        
        galaxiat-tycoon.console.print('Your new username is now <b>' + args[0] + '</b>.', function() {
            if (galaxiat-tycoon.tutorial.enabled)
                galaxiat-tycoon.tutorial.switchStep(1);
        });
    };
};

galaxiat-tycoon.player.earn = function(type, amount) {
    if (type == 'money') {
        this.money += amount;
        this.totalMoney += amount;
    };
    
    if (type == 'exp') {
        this.exp += amount;
        this.totalExp += amount;
        
        while (this.exp >= this.expReq) {
            this.level++;
            this.exp -= this.expReq;
            this.expReq = Math.floor(100 * Math.pow(1.5, this.level));
            galaxiat-tycoon.console.print('<z>LEVEL-UP!</z> You are now level <b>' + this.level + '</b>!');
        };
    };
};

galaxiat-tycoon.player.prestige = function() {
    galaxiat-tycoon.before = new Date().getTime();
    galaxiat-tycoon.now = new Date().getTime();
    
    galaxiat-tycoon.player.money = 0;
    galaxiat-tycoon.player.expReq = 100;
    galaxiat-tycoon.player.exp = 0;
    galaxiat-tycoon.player.level = 1;
};