galaxiat-tycoon.console = {};
galaxiat-tycoon.console.typeSpeed = -50;
galaxiat-tycoon.console.inputEnabled = true;
galaxiat-tycoon.console.isTyping = false;

galaxiat-tycoon.console.notAccepted = ['<', '>', '[', ']', '(', ')', ',', ';', '/', '\\', '\'', '"'];

galaxiat-tycoon.console.history = [];
galaxiat-tycoon.console.posInHistory = -1;

galaxiat-tycoon.console.divs = -1;
galaxiat-tycoon.console.divHeight = -1;

galaxiat-tycoon.console.grammarly = false;

galaxiat-tycoon.console.commands = [{
    id: 'help',
    desc: 'show a list of available commands.',
    effect: 'galaxiat-tycoon.console.help()',
    requireArg: false,
    supportList: false,
    supportHelp: false
}, {
    id: 'clear',
    desc: 'remove all the logs from the terminal.',
    effect: 'galaxiat-tycoon.console.clear()',
    requireArg: false,
    supportList: false,
    supportHelp: false
}, {
    id: 'username',
    desc: 'set your username, can only be used in the tutorial.',
    effect: 'galaxiat-tycoon.player.setUsername',
    requireArg: true,
    argsType: ['base', 'string'],
    supportList: false,
    supportHelp: false
}, {
    id: 'script',
    desc: 'execute a script.',
    effect: 'galaxiat-tycoon.script.execute',
    requireArg: true,
    argsType: ['base', 'string'],
    supportList: true,
    listExec: 'galaxiat-tycoon.script.list',
    supportHelp: true,
    helpExec: 'galaxiat-tycoon.script.help'
}, {
    id: 'buy',
    desc: 'buy things such as new scripts, auto-scripts and servers.',
    effect: 'galaxiat-tycoon.buy.execute',
    requireArg: true,
    argsType: ['base', 'string'],
    supportList: true,
    listExec: 'galaxiat-tycoon.buy.list',
    supportHelp: true,
    helpExec: 'galaxiat-tycoon.buy.help'
}, {
    id: 'option',
    desc: 'change in-game options.',
    effect: 'galaxiat-tycoon.options.execute',
    requireArg: true,
    argsType: ['base', 'string', 'string'],
    supportList: true,
    listExec: 'galaxiat-tycoon.options.list',
    supportHelp: true,
    helpExec: 'galaxiat-tycoon.options.help'
}, {
    id: 'achievements',
    desc: 'take a look on your progression.',
    effect: 'galaxiat-tycoon.achievements.list()',
    requireArg: false,
    supportList: false,
    supportHelp: false
}];

galaxiat-tycoon.console.checkStr = function(str) {
    for (var i = 0; i < this.notAccepted.length; i++) {
        if (str.indexOf(this.notAccepted[i]) > -1)
            return false;
    };
    
    return true;
};

galaxiat-tycoon.console.autoScroll = function() {
    var el = (galaxiat-tycoon.tutorial.finish) ? '#logs' : '#intro-logs',
        count = $(el + ' div').length;
    
    if (!galaxiat-tycoon.options.typed && count > galaxiat-tycoon.console.divs) {
        galaxiat-tycoon.console.divs = count;
        $(el).scrollTop(1e6);
    };
    
    if (galaxiat-tycoon.options.typed && galaxiat-tycoon.console.isTyping) {
        galaxiat-tycoon.console.divs = count;
        $(el).scrollTop(1e6);
    };
};

galaxiat-tycoon.console.commandExist = function(base) {
    var exists,
        index,
        obj = {};
    
    for (var cmd in this.commands) {
        var i = cmd,
            cmd = this.commands[cmd];
        
        obj.exists = (cmd.id == base) ? true : false;
        obj.index = (cmd.id == base) ? i : null;
        
        if (obj.exists)
            return obj;
    };
    
    return obj;
};

galaxiat-tycoon.console.help = function() {
    var str = '<y>HELP</y> you can type <b>[command] -help</b> to get a specific help of a command:<br>';
    
    if (!galaxiat-tycoon.tutorial.finish) {
        str += '<b>-</b> <z>help</z>: show a list of available commands.<br>' +
            '<b>-</b> <z>script</z>: execute a script.';
        
        return this.print(str, galaxiat-tycoon.tutorial.switchStep(2));
    }
    else {
        for (var cmd in this.commands) {
            cmd = this.commands[cmd];
            
            str += '<b>-</b> <z>' + cmd.id + '</z>: ' + cmd.desc + '<br>';
        };
        
        return this.print(str);
    };
};

galaxiat-tycoon.console.parse = function() {
    var str = document.querySelector('[contenteditable]').textContent,
        isStrClean = this.checkStr(str),
        parts = str.split(' '),
        base = parts[0],
        exists = this.commandExist(base).exists,
        index = this.commandExist(base).index,
        command = (typeof this.commands[index] == 'object') ? this.commands[index]: null;
    
    document.querySelector('[contenteditable]').textContent = "";
    
    galaxiat-tycoon.console.history.unshift(str);
    galaxiat-tycoon.console.posInHistory = -1;
    
    if (!this.inputEnabled)
        return;
    
    if (!isStrClean)
        return this.print('<w>WARN</w> you can\'t send commands with special characters.');
    
    if (base == '')
        return this.print('<x>ERR</x> you can\'t send empty commands.');
    if (!exists)
        return this.print('<x>ERR</x> <b>' + base + '</b> is an unknown command.');
    
    // first we check if the player put args or not, and if needed or not.
    if (!command.requireArg && parts.length > 1)
        return this.print('<x>ERR</x> <b>' + base + '</b> doesn\'t take any argument.');
    if (command.requireArg && parts.length == 1)
        return this.print('<x>ERR</x> <b>' + base + '</b> require argument(s).');
    
    // if no args: simple command
    if (!command.requireArg && parts.length == 1)
        return eval(command.effect);
    
    // if support help
    if ((parts.indexOf('-h') > -1 || parts.indexOf('-help') > -1) && !command.supportHelp)
        return this.print('<x>ERR</x> <b>' + base + '</b> command doesn\'t support the <b>-h/-help</b> argument.');
    if ((parts.indexOf('-h') > 1 || parts.indexOf('-help') > 1) && command.supportHelp)
        return this.print('<w>WARN</w> <b>-h/-help</b> argument must be the unique argument in the command.');
    if ((parts.indexOf('-h') == 1 || parts.indexOf('-help') == 1) && command.supportHelp)
        return eval(command.helpExec)();
    
    // if support list
    if ((parts.indexOf('-l') > -1 || parts.indexOf('-list') > -1) && !command.supportList)
        return this.print('<x>ERR</x> <b>' + base + '</b> command doesn\'t support the <b>-l/-list</b> argument.');
    if ((parts.indexOf('-l') > 1 || parts.indexOf('-list') > 1) && command.supportList)
        return this.print('<w>WARN</w> <b>-l/-list</b> argument must be the unique argument in the command.');
    if ((parts.indexOf('-l') == 1 || parts.indexOf('-list') == 1) && command.supportList)
        return eval(command.listExec)();
    
    // check args count
    if (parts.length < command.argsType.length)
        return this.print('<x>ERR</x> an argument is missing.');
    
    // args handling
    if (typeof command.argsType == 'object' && command.argsType.length) {
        var toPass = [];
        
        for (var i = 0; i < command.argsType.length; i++) {
            var arg = parts[i],
                isNan = isNaN(arg);
            
            if (command.argsType[i] == 'base')
                continue;
            
            if (command.argsType[i] == 'number' && isNan)
                return this.print('<x>ERR</x> expected an argument of type <b>number</b> in command <b>' + base + '</b>, instead got argument <b>' + arg + '</b>.');
            
            if (command.argsType[i] == 'string' && !isNan)
                return this.print('<x>ERR</x> expected an argument of type <b>string</b> in command <b>' + base + '</b>, instead got argument <b>' + arg + '</b>.');
            
            if (i == command.argsType.length - 1)
                return eval(command.effect)(parts.splice(1, parts.length));
        };
    };
};

galaxiat-tycoon.console.print = function(str, callback, force) {
    var time = moment().format('HH:mm:ss'),
        str = '<t>[' + time + ']</t> ' + str,
        el = (!galaxiat-tycoon.tutorial.finish && galaxiat-tycoon.tutorial.enabled) ? '#intro-logs' : '#logs';
    
    if (galaxiat-tycoon.options.typed && !force) {
        var id = Math.floor(Math.random() * 1e6);
        
        galaxiat-tycoon.console.isTyping = true;
        
        $(el).append('<div id="' + id + '"><span></span></div>');
        
        $('#' + id + ' span').typed({
            strings: [str],
            typeSpeed: galaxiat-tycoon.console.typeSpeed,
            cursorChar: '_',
            callback: function() {
                $('.typed-cursor').remove();
                
                if (typeof callback == 'function')
                    callback();
                
                galaxiat-tycoon.console.isTyping = false;
            }
        });
    }
    else
        $(el).append('<div><span>' + str + '</span></div>');
};

galaxiat-tycoon.console.clear = function() {
    $('#logs').empty();
};

galaxiat-tycoon.console.navigateHistory = function(how) {
    var str;
    
    if (how == 'up') {
        galaxiat-tycoon.console.posInHistory++;
        
        if (galaxiat-tycoon.console.posInHistory >= galaxiat-tycoon.console.history.length) {
            galaxiat-tycoon.console.posInHistory = galaxiat-tycoon.console.history.length;
            $('#command-input').html(galaxiat-tycoon.console.history[galaxiat-tycoon.console.history.length - 1]);
            return;
        };
        
        if (typeof galaxiat-tycoon.console.history[galaxiat-tycoon.console.posInHistory] == 'string') {
            str = galaxiat-tycoon.console.history[galaxiat-tycoon.console.posInHistory];
            $('#command-input').html(str);
        };
    };
    
    if (how == 'down') {
        galaxiat-tycoon.console.posInHistory--;
        
        if (galaxiat-tycoon.console.posInHistory <= -1) {
            galaxiat-tycoon.console.posInHistory = -1;
            $('#command-input').html('');
            return;
        };
        
        if (typeof galaxiat-tycoon.console.history[galaxiat-tycoon.console.posInHistory] == 'string') {
            str = galaxiat-tycoon.console.history[galaxiat-tycoon.console.posInHistory];
            $('#command-input').html(str);
        };
    };
};

galaxiat-tycoon.console.autocomplete = function() {
    var str = document.querySelector('[contenteditable]').textContent,
        parts = str.split(' '),
        el = (!galaxiat-tycoon.tutorial.finish && galaxiat-tycoon.tutorial.enabled) ? '#intro-input' : '#command-input';
    
    if (parts.length == 1) {
        galaxiat-tycoon.console.commands.forEach(function(cmd) {
            if (str.length <= 1)
                return;
            
            if (cmd.id.indexOf(parts[0]) > -1) {
                document.querySelector('[contenteditable]').textContent = cmd.id;
                $(el).caret('pos', cmd.id.length);
            };
        });
    };
    
    var command = (parts[0] == 'option') ? 'options' : parts[0];
    
    if (parts.length == 2) {
        var secondArgs = (typeof galaxiat-tycoon[command].secondArgs == 'object') ? galaxiat-tycoon[command].secondArgs : undefined;
        
        if (typeof secondArgs == 'undefined')
            return;
        
        secondArgs.forEach(function(i) {
            if (parts[1].length <= 1)
                return;
            
            if (i.indexOf(parts[1]) > -1) {
                var str = parts[0] + ' ' + i;
                document.querySelector('[contenteditable]').textContent = str;
                $(el).caret('pos', str.length);
            };
        });
    };
    
    if (parts.length == 3) {
        var secondArg = parts[1],
            thirdArgs = (typeof galaxiat-tycoon[command].thirdArgs == 'object') ? galaxiat-tycoon[command].thirdArgs : undefined;
        
        if (typeof thirdArgs == 'undefined')
            return;
        
        thirdArgs.forEach(function(i) {
            if (parts[2].length <= 1)
                return;
            
            if (i.indexOf(parts[2]) > -1) {
                var str = parts[0] + ' ' + parts[1] + ' ' + i;
                document.querySelector('[contenteditable]').textContent = str;
                $(el).caret('pos', str.length);
            };
        });
    };
};

galaxiat-tycoon.console.loop = function(times) {
    galaxiat-tycoon.console.autoScroll();
};

galaxiat-tycoon.console.domInit = function() {
    if (!galaxiat-tycoon.console.grammarly) {
        galaxiat-tycoon.console.print('<x>WARNING</x> if you are using the <b>Grammarly</b> extension, I recommend you to disable it since as it can cause <b>severe</b> bugs with the game.');
        galaxiat-tycoon.console.grammarly = true;
    };
};