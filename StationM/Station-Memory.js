// CONFIG //

// TUTORIAL: 1. Select your station country (avaliable: ALB, ALG, AND, AUT, BEL, BLR, BUL, CYP, CZE, D, E, EST, F, FIN, G, GRC, HNG, HOL, HRV, I, IRL, LTU, LUX, LVCA, MCO, MDA, MKD, MLT, MRC, POL, POR, RKS, ROU, RUS, S, SRB, SUI, SVK, SVN, TUN, TUR, UKR, USA), 2. Type your station PI, 3. If your logo is not found (default openradio logo is showing) try to change "format" to svg, most likely this logo is in svg format or it isn't available in the database!,  4. AFTER ANY CHANGE IN THIS CONFIG RESTART YOUR WEBSERVER!

var presets = [
    { country: 'changeme', PI: '0000', format: 'png' }, // preset 1 
    { country: 'changeme', PI: '0000', format: 'png' }, // preset 2
    { country: 'changeme', PI: '0000', format: 'png' }, // preset 3 
    { country: 'changeme', PI: '0000', format: 'png' }  // preset 4
];

// CONFIG END //

//////////////////////////////////////////////////////////////////////////
// Webserver Station Memory Plugin (Ver: Developer Beta)                //
//                                                                      //
// Thanks to OpenRadio Community and Highpoint2000 for picons database! //
//                                                                      //
// Basing on webserver-station-logos                                    //
//                                                                      //
//                                                   5.06.2024 mateuszz //
//////////////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function() {
    var buttonHeight = 100;
    var buttonMargin = 20;
    var totalButtonHeight = 4 * buttonHeight + 3 * buttonMargin;
    var screenWidth = window.innerWidth;


    function buildButton(preset, index) {
        var button = document.createElement('button');
        button.style.position = 'fixed';
        button.style.right = '20px';
        button.style.top = 'calc(50% - ' + (totalButtonHeight / 2) + 'px + ' + (index * (buttonHeight + buttonMargin)) + 'px)';
        button.style.width = '100px';
        button.style.height = '100px';
        button.style.borderRadius = '10px';
        button.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
        button.style.marginBottom = buttonMargin + 'px';
        button.style.padding = '0';
        button.style.backgroundColor = 'var(--color-1)';
        button.classList.add('button');

        button.onmouseover = function() {
            this.style.backgroundColor = 'var(--color-3)';
        };

        button.onmouseout = function() {
            this.style.backgroundColor = 'var(--color-1)';
        };

        var tune = [
            { freq: Number(localStorage.getItem('preset1')) },
            { freq: Number(localStorage.getItem('preset2')) },
            { freq: Number(localStorage.getItem('preset3')) },
            { freq: Number(localStorage.getItem('preset4')) }
        ];

        var img = document.createElement('img');
        img.src = buildImageUrl(preset.country, preset.PI, preset.format);
        img.alt = 'Button Image ' + tune[index].freq;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '10px';

        img.onerror = function() {
            img.src = 'https://tef.noobish.eu/logos/default-logo.png';
        };

        button.appendChild(img);
        document.body.appendChild(button);

        button.addEventListener('click', function() {
            tuneTo(tune[index].freq);
        });
    }

    function buildImageUrl(country, PI, format) {
        var baseUrl = 'https://tef.noobish.eu/logos/';
        var region = getRegionFromCountry(country);
        var stationImageUrl = baseUrl + region + '/' + PI + '.' + format;
        return stationImageUrl;
    }

    function getRegionFromCountry(country) {
        return country;
    }

    presets.forEach(function(preset, index) {
        buildButton(preset, index);
    });
  
   
    var screenWidth = window.innerWidth;

    window.addEventListener('resize', function() {
        screenWidth = window.innerWidth;

        if (screenWidth <= 1400) {
            var buttons = document.querySelectorAll('.button');
            buttons.forEach(function(button) {
                button.style.display = 'none'; 
            });
        } else {
            var buttons = document.querySelectorAll('.button');
            buttons.forEach(function(button) {
                button.style.display = ''; 
            });
        }
    });

    
    if (screenWidth <= 1400) {
        var buttons = document.querySelectorAll('.button');
        buttons.forEach(function(button) {
            button.style.display = 'none'; 
        });
    }
});
    