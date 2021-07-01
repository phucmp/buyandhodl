const Patches = require('Patches');
const Random = require('Random');
const Time = require('Time');
export const Diagnostics = require('Diagnostics');

var price = 8.01;
const timeInMilliseconds = 300;

// Calculate Price Multiplier
function getMulitplier(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Calculate Price Change
function changePrice() {
    var random = Random.random();
    if (random >= 0.3) 
    {
        var multiplier = getMulitplier(1,3);
        price = price * multiplier;
    } 
    else 
    {
        var decreaser = Random.random();
        price = price * decreaser;
    }

    Patches.inputs.setString('priceText', price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

// Function that connects to Patch
(async function() {
    var intervalTimer;
    const input1 = await Patches.outputs.getBoolean('isPulse');
    input1.monitor().subscribe(function (pulse) {
        if (pulse.newValue == true)
        {
            intervalTimer = Time.setInterval(changePrice, timeInMilliseconds);
        }
        else
        {
            Time.clearInterval(intervalTimer);
        }
    });
})();