var Utils = {
    get: function ( value ) {
        try{
            return value;
        }catch(e){
            return null;
        }
    },
    isEmpty: function ( value ) {
        try{
            if (
                // null or undefined
                (value == null) ||

                // has length and it's zero
                (value.hasOwnProperty('length') && value.length === 0) ||

                // is an Object and has no keys
                (value.constructor === Object && Object.keys(value).length === 0)
            ){
                return true
            }
            return false
        } catch(e){
            return true;
        }
    },
    notEmpty: function ( value ) {
        return (!this.isEmpty(value))
    },
    invertColor: function (hex) { //Utils.invertColor()
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + this.addZero(r) + this.addZero(g) + this.addZero(b);
    },
    addZero: function (str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}

export default Utils;