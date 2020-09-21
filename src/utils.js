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
    }
}

export default Utils;