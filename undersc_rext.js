// # `underscore extensions`
//
// version 0.0.2 ([source](https://github.com/aaronj1335/undersc_rext))
//
// a couple extemporaneous additions to everyone's fav\_rite javascript library
//
// ---
//
// ex•tem•po•ra•ne•ous |ikˌstempəˈrānēəs|
// <br />*<small>ajective</small>*
//
// spoken or done without preparation: *an extemporaneous speech.*
//
// ---
//

// those are cobras, man
//

/*globals exports:true,module*/
;(function() {
    var undersc_re = this._;
    if (typeof exports !== 'undefined') 
        undersc_re = exports = module.exports = require('underscore');

    undersc_re.mixin({

        // ### _.memo(list, iterator, [memo], [context])
        //
        // just like `reduce` except it automatically returns `memo` for you
        // each time.  and if you leave out the initial `memo` parameter, it
        // defaults to a new object.
        //
        // params:
        //
        //  - `list`: an array or object or something
        //
        //  - `iterator`: a function that will be called as follows for each
        //    item in `list`:
        //  
        //      iterator.call(context, memo, value, key)
        //
        //  - `memo` (optional): return value of previous call to `iterator`.
        //    defaults to an empty object literal `{}`
        //
        //  - `context`: the context in which `iterator` will be called.
        //    defaults to 'this'
        //
        // returns: the return value from the last call of `iterator`
        //
        memo: function(list, iterator, memo, context) {
            memo = typeof memo === 'undefined'? {} : memo;
            context = typeof context === 'undefined'? memo : context;
            return undersc_re.reduce(list, function(memo) {
                iterator.apply(context, arguments);
                return memo;
            }, memo);
        },

        // ### _.prop(obj, value, [key])
        //
        // kinda like jquery `prop()` or `attr()`.  in fact it's a lot like
        // jquery `prop()` and `attr()`.  except for strait up js objects.
        //
        // `obj` is updated w/ the properties using `_.extend()`:
        //
        //      _.extend(obj, props);
        //
        // params:
        //
        //  - `obj`: any js object
        //
        //  - `key`: either a string for the property name or an object
        //  
        //  - `value` (optional): the value of the property (if a string was
        //    given for `key`)
        //
        // returns: the object.  what did you expect?
        //
        prop: function(obj, key, value) {
            var props = {};
            typeof value === 'undefined'? props = key : props[key] = value;
            return undersc_re.extend(obj, props);
        }
    });
}).apply(this);
