define(['hbs/handlebars'], function ( Handlebars ) {
    console.log("this module loaded for grouped columns");
    function grouped_each (every, context, options) {
        var out = "", subcontext = [], i;
        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    out += options.fn(subcontext);
                    subcontext = [];
                }
                subcontext.push(context[i]);
            }
            out += options.fn(subcontext);
        }
        return out;
    }

    Handlebars.registerHelper('grouped_each', grouped_each); 
    return grouped_each;
});