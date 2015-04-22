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

  defaults = defaults || {};
  defaults.placeholder = defaults.placeholder || "Type something...";
  defaults.firstOption = defaults.firstOption || "Select something...";

  if (Meteor.isServer) return;
  var schema = this._schema;
  Meteor.startup(function() {

    _.each(schema, function(value, key) {

      if (!value) return;
      var keys = getKeys(jsonPath, key);

      schema[key].autoform = schema[key].autoform || {};

      if (schema[key].autoform.placeholder || keys.placeholder) {
        schema[key].autoform.placeholder = schema[key].autoform.placeholder || function() {
          return getKeys(jsonPath, key).placeholder || defaults.placeholder;
        };
      }

      if (schema[key].autoform.options || keys.options) {
        schema[key].autoform.options = schema[key].autoform.options || function() {
          return getKeys(jsonPath, key).options;
        }
      }

      if (schema[key].autoform.firstOption || keys.options) {
        schema[key].autoform.firstOption = schema[key].autoform.firstOption || function() {
          return getKeys(jsonPath, key).placeholder || defaults.firstOption;
        }
      }

      if (schema[key].label || keys.label) {
        schema[key].label = schema[key].label || function() {
          return getKeys(jsonPath, key).label || humanize(key);
        };
      }

    });

  });

}
