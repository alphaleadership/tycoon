galaxiat-tycoon.kongregate = {};

galaxiat-tycoon.kongregate.init = function() {
    if (window.location.search.indexOf('kongregate') > -1) {
        kongregateAPI.loadAPI(function() {
            window.kongregate = kongregateAPI.getAPI();
            
            galaxiat-tycoon.kongregate.isGuest = kongregate.services.isGuest();
            
            if (galaxiat-tycoon.kongregate.isGuest) {
                kongregate.services.addEventListener("login", galaxiat-tycoon.kongregate.userLogin);
                
                $('#modal-themes4kong, #modal-themes4logged').hide();
                $('#modal-themes4guests').show();
            }
            else
                galaxiat-tycoon.kongregate.userLogin();
            
            setTimeout(function() {
                galaxiat-tycoon.kongregate.initAds();
            }, 5000);
        });
    };
    
    if (typeof galaxiat-tycoon.kongregate.isGuest == 'undefined' && window.location.search.indexOf('kongregate') == -1)  {
        $('#modal-themes4guests, #modal-themes4logged').hide();
        $('#modal-themes4kong').show();
    };
};

galaxiat-tycoon.kongregate.watchAd = function() {
    if (typeof galaxiat-tycoon.kongregate.isGuest == 'undefined' && window.location.search.indexOf('kongregate') == -1)
        return galaxiat-tycoon.console.print('<x>ERR</x> this feature is only available for Kongregate players.');
    
    kongregate.mtx.showIncentivizedAd();
};

galaxiat-tycoon.kongregate.initAds = function() {
    kongregate.mtx.initializeIncentivizedAds();
    
    kongregate.mtx.addEventListener("adsAvailable", function() {
        console.warn('ads available');
    });
    
    kongregate.mtx.addEventListener("adsUnavailable", function() {
        return galaxiat-tycoon.console.print('<x>ERR</x> no ads available, make sure your adblocker is disabled or try again later.');
    });
    
    kongregate.mtx.addEventListener("adOpened", function() {
        console.warn('ad opened');
    });
    
    kongregate.mtx.addEventListener("adCompleted", function() {
        console.warn('ad completed');
    });
    
    kongregate.mtx.addEventListener("adAbandoned", function() {
        return galaxiat-tycoon.console.print('<w>WARN</w> you closed the ad before it end, you are not awarded of your boost.');
    });
};

galaxiat-tycoon.kongregate.userLogin = function() {
    galaxiat-tycoon.kongregate.username = kongregate.services.getUsername();
    galaxiat-tycoon.kongregate.userID = kongregate.services.getUserId();
    
    $('#modal-themes4kong, #modal-themes4guests').hide();
    $('#modal-themes4logged').show();

    for (var z = 0; z < galaxiat-tycoon.options.themesUnlocked.length; z++) {
        $("#theme-" + z).click(function() {
            var id = $(this).attr('id'),
                num = parseInt(id.substring(id.indexOf('-') + 1, id.length));
            
            galaxiat-tycoon.kongregate.buyTheme(num);
        });
    };
    
    galaxiat-tycoon.kongregate.requestItemInventory();
};

galaxiat-tycoon.kongregate.requestItemInventory = function() {
    kongregate.mtx.requestUserItemList(null, onUserItems);
    
    function onUserItems(res) {
        if (!res.success)
            return galaxiat-tycoon.console.print('<x>ERR</x> there was an error when requesting the player item inventory. Please report this as a bug, thanks.');
        
        for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            
            console.log((i + 1) + ': ' + item.identifier + ', ' + item.id);
            
            switch(item.identifier) {
                case 'stardust_theme':
                    galaxiat-tycoon.options.themesUnlocked[1] = true;
                    break;
                
                case 'matrix_theme':
                    galaxiat-tycoon.options.themesUnlocked[2] = true;
                    break;
            };
        };
    };
};

galaxiat-tycoon.kongregate.buyTheme = function(i) {
    if (galaxiat-tycoon.kongregate.isGuest)
        return galaxiat-tycoon.console.print('<x>ERR</x> guests can\'t purchase things, you need to login to Kongregate.');
    
    switch(i) {
        case 1:
            kongregate.mtx.purchaseItems(['stardust_theme'], onPurchaseDone);
            break;
        
        case 2:
            kongregate.mtx.purchaseItems(['matrix_theme'], onPurchaseDone);
            break;
    };
    
    function onPurchaseDone(res) {
        if (!res.success)
            return galaxiat-tycoon.console.print('<x>ERR</x> there was an error during the payment process. Please report this as a Powerup Reward bug, thanks.');
        
        switch(i) {
            case 1:
                galaxiat-tycoon.options.themesUnlocked[1] = true;
                galaxiat-tycoon.console.print('<y>PURCHASE DONE</y> to enable your new theme, type <b>option theme stardust</b>.');
                break;
            
            case 2:
                galaxiat-tycoon.options.themesUnlocked[2] = true;
                galaxiat-tycoon.console.print('<y>PURCHASE DONE</y> to enable your new theme, type <b>option theme matrix</b>.');
                break;
        };
        
        galaxiat-tycoon.kongregate.requestItemInventory();
    };
};

galaxiat-tycoon.kongregate.domInit = function() {
    $('#cog-watchad').on('click', function() {
        galaxiat-tycoon.kongregate.watchAd();
    });
};