Ext.define("E4desk.model.User",
{
  extend : "Ext.data.Model",
  fields : [ {
    name : "email",
    type : "string"
  }, {
    name : "name",
    type : "string"
  }, {
    name : "firstName",
    type : "string"
  }, {
    name : "locale",
    type : "string"
  }, {
    name : "enabled",
    type : "boolean"
  }, {
    name : "id",
    type : "int"
  } ],
  proxy : {
    type : "direct",
    api : {
      read : userService.read,
      create : null,
      update : null,
      destroy : userService.destroy
    },
    reader : {
      root : "records"
    }
  }
});