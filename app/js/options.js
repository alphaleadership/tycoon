galaxiat-tycoon.options = {};
galaxiat-tycoon.options.options = [{
    id: 'theme',
    desc: 'change the terminal theme (text colors, background).',
    accept: ['default', 'stardust', 'matrix'],
    exec: 'galaxiat-tycoon.options.switchTheme'
}, {
    id: 'invert',
    desc: 'toggle color/background inversion on the terminal.',
    accept: ['enable', 'disable'],
    exec: 'galaxiat-tycoon.options.switchInversion'
}, {
    id: 'typed',
    desc: 'toggle the typed text effect.',
    accept: ['enable', 'disable'],
    exec: 'galaxiat-tycoon.options.switchTyped'
}];
galaxiat-tycoon.options.themesUnlocked = [true, false, false];
galaxiat-tycoon.options.typed = true;
galaxiat-tycoon.options.matrixEnabled = false;

galaxiat-tycoon.options.tab = 'overview';
galaxiat-tycoon.options.tabs = ['overview', 'autoscripts', 'battery', 'prestige'];

galaxiat-tycoon.options.secondArgs = [];
galaxiat-tycoon.options.thirdArgs = [];

galaxiat-tycoon.options.list = function() {
    var str = '<y>OPTIONS LIST</y>:<br>';
    
    for (var option in galaxiat-tycoon.options.options) {
        var i = option,
            option = galaxiat-tycoon.options.options[i];
        
        str += '<b>-</b> <z>' + option.id + '</z>: ' + option.desc + ' (<b>' + option.accept.join(', ') + '</b>)<br>';
    };
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.options.help = function() {
    var str = '<y>OPTION HELP</y> change in-game options using this command:<br>' +
        '<b>-</b> Options commands require <b>2 arguments</b>.<br>' +
        '<b>-</b> First argument is the option name.<br>' +
        '<b>-</b> Second argument is one of the supported arguments, displayed with <b>option -l/-list</b> command, between parentheses.';
    
    return galaxiat-tycoon.console.print(str);
};

galaxiat-tycoon.options.execute = function(args) {
    var exists = false,
        o;
    
    for (var option in galaxiat-tycoon.options.options) {
        var i = option,
            option = galaxiat-tycoon.options.options[i];
        
        if (args[0] == option.id) {
            exists = true;
            o = option;
        };
    };
    
    if (!exists)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + args[0] + '</b> is not a valid option name.');
    
    if (exists && args.length == 2)
        return eval(o.exec)(o, args[1]);
};

galaxiat-tycoon.options.switchTheme = function(opt, theme) {
    if (opt.accept.indexOf(theme) == -1)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + theme + '</b> theme doesn\'t exist.');
    
    if (!galaxiat-tycoon.options.themesUnlocked[opt.accept.indexOf(theme)])
        return galaxiat-tycoon.console.print('<x>ERR</x> you need to unlock <b>' + theme + '</b> theme. Themes are only available on the Kongregate version.');
    
    if ($('body').hasClass('inverted'))
        $('body').removeClass().addClass('noselect inverted ' + theme);
    else
        $('body').removeClass().addClass('noselect ' + theme);
    
    $('.game').removeClass().addClass('game ' + theme);
    $('.intro').removeClass().addClass('intro ' + theme);
    
    if (theme == 'matrix' && !galaxiat-tycoon.options.matrixEnabled) {
        galaxiat-tycoon.options.matrixEnabled = true;
        M.initBackground();
    };
    
    if (theme !== 'matrix' && galaxiat-tycoon.options.matrixEnabled) {
        galaxiat-tycoon.options.matrixEnabled = false;
        M.removeBackground();
    };
    
    return galaxiat-tycoon.console.print('<b>' + theme + '</b> theme enabled.');
};

galaxiat-tycoon.options.switchInversion = function(opt, invert, direct) {
    // called from an UI element
    if (direct) {
        if (!$('body').hasClass('inverted')) {
            $('body').addClass('inverted');
            $('.terminal').removeClass().addClass('terminal inverted');
        }
        else {
            $('body').removeClass('inverted');
            $('.terminal').removeClass().addClass('terminal');
        };
        
        return;
    };
    
    if (opt.accept.indexOf(invert) == -1)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + invert + '</b> is not a valid argument for <b>inversion</b> option.');
    
    if (invert == 'disable') {
        if (!$('body').hasClass('inverted'))
            $('body').addClass('inverted');
        $('.terminal').removeClass().addClass('terminal inverted');
    }
    else {
        $('body').removeClass('inverted');
        $('.terminal').removeClass().addClass('terminal');
    }
    
    return galaxiat-tycoon.console.print('Terminal inversion <b>' + invert + 'd</b>.');
};

galaxiat-tycoon.options.switchTyped = function(opt, typed, direct) {
    // called from an UI element
    if (direct) {
        galaxiat-tycoon.options.typed = !galaxiat-tycoon.options.typed;
        return;
    };
    
    if (opt.accept.indexOf(typed) == -1)
        return galaxiat-tycoon.console.print('<x>ERR</x> <b>' + typed + '</b> is not a valid argument for <b>typed</b> option.');
    
    typed == 'enable' ? galaxiat-tycoon.options.typed = true : galaxiat-tycoon.options.typed = false;
    
    return galaxiat-tycoon.console.print('Typed text effect <b>' + typed + 'd</b>.');
};

galaxiat-tycoon.options.changeTab = function(how) {
    if (how == 'right') {
        var i = galaxiat-tycoon.options.tabs.indexOf(galaxiat-tycoon.options.tab),
            tab = (typeof galaxiat-tycoon.options.tabs[i + 1] == 'string') ? galaxiat-tycoon.options.tabs[i + 1] : galaxiat-tycoon.options.tabs[i];
    };

    if (how == 'left') {
        var i = galaxiat-tycoon.options.tabs.indexOf(galaxiat-tycoon.options.tab),
            tab = (typeof galaxiat-tycoon.options.tabs[i - 1] == 'string') ? galaxiat-tycoon.options.tabs[i - 1] : galaxiat-tycoon.options.tabs[i];
    };

    galaxiat-tycoon.options.tab = tab;

    $('.nav-tabs a[href="#stats-' + tab + '"]').tab('show');
};

galaxiat-tycoon.options.domInit = function() {
    $('#option-inversion').on('click', function() {
        galaxiat-tycoon.options.switchInversion(null, null, true)
    });
    
    $('#option-typed').on('click', function() {
        galaxiat-tycoon.options.switchTyped(null, null, true)
    });
    
    $('#option-save').on('click', function() {
        galaxiat-tycoon.save.saveNow(true);
    });
    
    $('#option-erase').on('click', function() {
        galaxiat-tycoon.save.eraseNow();
    });
    
    $('#option-version').html('v' + galaxiat-tycoon.version.toFixed(2));
};

galaxiat-tycoon.options.init = function() {
    galaxiat-tycoon.options.options.forEach(function(i) {
        galaxiat-tycoon.options.secondArgs.push(i.id);
    });
    
    galaxiat-tycoon.options.thirdArgs.push('enable', 'disable');
};