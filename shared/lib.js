var humanize = function(property) {
  return property
  .replace(/_/g, " ")
  .replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1);
  });
};

var getKeys = function(jsonPath, key) {
  return TAPi18n.__([jsonPath, key].join("."), { returnObjectTrees: true }) || {};
}

SimpleSchema.prototype.i18n = function(jsonPath, defaults) {

  if (Meteor.isServer) return;

  defaults = defaults || {};
  defaults.placeholder = defaults.placeholder || "Type something...";
  defaults.firstOption = defaults.firstOption || "Select something...";

  var schema = this._schema;
  _.each(schema, function(value, key) {
    if (!value) return;
    var keys = getKeys(jsonPath, key);

    schema[key].autoform = schema[key].autoform || {};

    if (typeof keys == 'object') {
      _.each(_.omit(keys, 'label', 'options'), function(v, k) {
        console.log(k, v);
        schema[key].autoform[k] = schema[key].autoform[k] || function() {
          return getKeys(jsonPath, key)[k] || (defaults[k] || '');
        };
      });
    }

    if (schema[key].autoform.options || keys.options) {
      schema[key].autoform.options = schema[key].autoform.options || function() {
        var options = getKeys(jsonPath, key).options;
        _.each(options, function(option, key) {
          if (key.slice(-7) === "_plural") delete options[key];
        });
        return options;
      }
    }

    if (schema[key].label || keys.label) {
      schema[key].label = schema[key].label || function() {
        return getKeys(jsonPath, key).label || humanize(key);
      };
    }

  });
  return schema;

}
