galaxiat-tycoon.tutorial = {};
galaxiat-tycoon.tutorial.enabled = true;
galaxiat-tycoon.tutorial.finish = false;
galaxiat-tycoon.tutorial.step = 0;

galaxiat-tycoon.tutorial.switchStep = function(step) {
    galaxiat-tycoon.tutorial.step = step;
    galaxiat-tycoon.tutorial.core();
};

galaxiat-tycoon.tutorial.begin = function() {
    if (!this.enabled || this.finish) {
        $('.intro').remove();
        $('.game').fadeIn('fast', function() {
            $('#command-input').focus();
        });
        
        return;
    };
    
    this.core();
};

galaxiat-tycoon.tutorial.finished = function() {
    galaxiat-tycoon.tutorial.enabled = false;
    galaxiat-tycoon.tutorial.finish = true;

    $('.intro').fadeOut('fast', function() {
        $('.intro').remove();
        $('.game').fadeIn('fast', function() {
            $('#command-input').focus();
        });
    });
};

galaxiat-tycoon.tutorial.skip = function() {
    galaxiat-tycoon.console.inputEnabled = true;
    galaxiat-tycoon.tutorial.finished();
};

galaxiat-tycoon.tutorial.core = function() {
    switch(this.step) {
        case 0:
            galaxiat-tycoon.console.inputEnabled = false;
            
            galaxiat-tycoon.console.print('<h>INTRODUCTION</h> Welcome to <b>galaxiat-tycoon</b>, an idle-game with an hacking theme! I\'m a small tutorial explaining how to play this game. Before starting, you don\'t need to have any knowledge in programming or other stuff like this to understand and enjoy the game.', function() {
                galaxiat-tycoon.console.print('<h>TUTORIAL</h> So, if you didn\'t noticed it, this is the terminal. This is where everything takes place. Terminal is divided into <b>2 parts</b>, <b>logs</b> (where things are written) and <b>input</b> where you write things (next to the <b>galaxiat-tycoon@root</b> thing).', function() {
                    galaxiat-tycoon.console.print('<h>TUTORIAL</h> Before starting this adventure, we need to know your username. To set your username, you need to type a command, which require an argument. This command is <b>username [yourUsername]</b>, where <b>username</b> is the command, and <b>[yourUsername]</b> is the argument of the command <b>(put your username without the [])</b> (you can\'t change your username later!).', function() {
                        galaxiat-tycoon.console.inputEnabled = true;
                    });
                });
            });
            break;
        
        case 1:
            galaxiat-tycoon.console.inputEnabled = false;
            
            galaxiat-tycoon.console.print('<h>TUTORIAL</h> You can get a list of all available commands by entering <b>help</b>. Try it and take a look at the available commands.', function() {
                galaxiat-tycoon.console.inputEnabled = true;
            });
            break;
        
        case 2:
            setTimeout(function() {
                galaxiat-tycoon.console.inputEnabled = false;
                
                galaxiat-tycoon.console.print('<h>TUTORIAL</h> We are going to take a look at the <b>script</b> command. This command will execute a script, which will take some time, but when it will finish we will earn some money and experience. You can get a list of available scripts if you add the argument <b>-l/-list</b>, so it will looks like <b>script -l</b> or <b>script -list</b>. Now try to execute your first script.', function() {
                    galaxiat-tycoon.console.inputEnabled = true;
                });
            }, 5000);
            break;
        
        case 3:
            galaxiat-tycoon.console.inputEnabled = false;
            
            setTimeout(function() {
                galaxiat-tycoon.console.print('<h>TUTORIAL COMPLETE</h> Nice, you are ready to play the real game now.', function() {
                    setTimeout(function() {
                        galaxiat-tycoon.console.inputEnabled = true;
                        galaxiat-tycoon.tutorial.finished();
                    }, 5000);
                });
            }, 2000);
            break;
    };
};