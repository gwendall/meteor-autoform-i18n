var humanize = function(property) {
  return property
  .replace(/_/g, " ")
  .replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1);
  });
};

SimpleSchema.prototype.i18n = function(jsonPath) {

  if (Meteor.isServer) return;
  var schema = this._schema;
  Meteor.startup(function() {
    _.each(schema, function(value, key) {
      if (!value) return;
      schema[key].label = schema[key].label || function() {
        return TAPi18n.__([jsonPath, key, "label"].join(".")) || humanize(key);
      };
      schema[key].autoform = schema[key].autoform || {};
      schema[key].autoform.placeholder = schema[key].autoform.placeholder || function() {
        return TAPi18n.__([jsonPath, key, "placeholder"].join(".")) || "Type something...";
      };
      var options = TAPi18n.__([jsonPath, key, "options"].join("."), { returnObjectTrees: true });
      if (!_.isObject(options)) return;
      schema[key].autoform.options = schema[key].autoform.options || function() {
        return TAPi18n.__([jsonPath, key, "options"].join("."), { returnObjectTrees: true });
      }
      schema[key].autoform.firstOption = schema[key].autoform.firstOption || function() {
        return TAPi18n.__([jsonPath, key, "placeholder"].join(".")) || "Select something...";
      }
    });
  });

}
