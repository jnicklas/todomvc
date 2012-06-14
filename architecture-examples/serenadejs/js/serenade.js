/**
 * Serenade.js JavaScript Framework v0.1.3
 * http://github.com/elabs/serenade.js
 *
 * Copyright 2011, Jonas Nicklas, Elabs AB
 * Released under the MIT License
 */
(function(a){var b=function(){function b(a){return b[a]}return b["./events"]=new function(){var a=this;((function(){var b=[].slice;a.Events={bind:function(a,b){var c,d,e,f,g;d=a.split(" "),c=this.hasOwnProperty("_callbacks")&&this._callbacks||(this._callbacks={});for(f=0,g=d.length;f<g;f++)e=d[f],c[e]||(c[e]=[]),c[e].push(b);return this},one:function(a,b){return this.bind(a,function(){return this.unbind(a,arguments.callee),b.apply(this,arguments)})},trigger:function(){var a,c,d,e,f,g,h;a=1<=arguments.length?b.call(arguments,0):[],d=a.shift(),e=this.hasOwnProperty("_callbacks")&&((h=this._callbacks)!=null?h[d]:void 0);if(!e)return!1;for(f=0,g=e.length;f<g;f++)c=e[f],c.apply(this,a);return!0},unbind:function(a,b){var c,d,e,f,g,h;if(!a)return this._callbacks={},this;e=(h=this._callbacks)!=null?h[a]:void 0;if(!e)return this;if(!b)return delete this._callbacks[a],this;for(d=f=0,g=e.length;f<g;d=++f){c=e[d];if(c!==b)continue;e=e.slice(),e.splice(d,1),this._callbacks[a]=e;break}return this}}})).call(this)},b["./helpers"]=new function(){var a=this;((function(){var b,c={}.hasOwnProperty;b={extend:function(a,b){var d,e,f;f=[];for(d in b){if(!c.call(b,d))continue;e=b[d],f.push(a[d]=e)}return f},get:function(a,b,c){return typeof (a!=null?a.get:void 0)=="function"?a.get(b,c):a!=null?a[b]:void 0},set:function(a,b,c){return(a!=null?a.set:void 0)?a.set(b,c):a[b]=c},isArray:function(a){return Object.prototype.toString.call(a)==="[object Array]"},pairToObject:function(a,b){var c;return c={},c[a]=b,c},serializeObject:function(a){var c,d,e,f;if(a&&typeof a.serialize=="function")return a.serialize();if(b.isArray(a)){f=[];for(d=0,e=a.length;d<e;d++)c=a[d],f.push(b.serializeObject(c));return f}return a},getFunctionName:function(a){var b,c,d;return b=a.modelName,b||(b=a.name),b||(b=(c=a.toString().match(/\[object (.+?)\]/))!=null?c[1]:void 0),b||(b=(d=a.toString().match(/function (.+?)\(\)/))!=null?d[1]:void 0),b},preventDefault:function(a){return a.preventDefault?a.preventDefault():a.returnValue=!1}},b.extend(a,b)})).call(this)},b["./cache"]=new function(){var a=this;((function(){var c,d,e,f;f=b("./helpers"),e=f.serializeObject,d=f.getFunctionName,c={_storage:typeof window!="undefined"&&window!==null?window.localStorage:void 0,_identityMap:{},get:function(a,b){var c,e;c=d(a);if(c&&b)return((e=this._identityMap[c])!=null?e[b]:void 0)||this.retrieve(a,b)},set:function(a,b,c){var e,f;e=d(a);if(e&&b)return(f=this._identityMap)[e]||(f[e]={}),this._identityMap[e][b]=c},store:function(a,b,c){var f;f=d(a);if(f&&b&&typeof JSON!="undefined"&&JSON!==null)return this._storage.setItem(""+f+"_"+b,JSON.stringify(e(c)))},retrieve:function(a,b){var c,e;e=d(a);if(e&&b&&a.localStorage&&typeof JSON!="undefined"&&JSON!==null){c=this._storage.getItem(""+e+"_"+b);if(c)return new a(JSON.parse(c),!0)}}},a.Cache=c})).call(this)},b["./collection"]=new function(){var a=this;((function(){var c,d,e,f,g,h,i,j=[].slice;c=b("./events").Events,i=b("./helpers"),d=i.extend,h=i.serializeObject,e=i.get,g=function(a){return a.match(/^\d+$/)},f=function(a){var b,c,d;return c=function(){var c;c=[];for(b in a)d=a[b],g(b)&&c.push(parseInt(b,10));return c}(),c.length?Math.max.apply(Math,c)+1:0},a.Collection=function(){function a(a){var b,c,d,e;for(b=d=0,e=a.length;d<e;b=++d)c=a[b],this[b]=c;this.length=f(this)}return a.name="Collection",d(a.prototype,c),a.prototype.get=function(a){return this[a]},a.prototype.set=function(a,b){return this[a]=b,this.length=f(this),this.trigger("change:"+a,b),this.trigger("set",a,b),this.trigger("change",this),b},a.prototype.push=function(a){return this[this.length]=a,this.length=f(this),this.trigger("add",a),this.trigger("change",this),a},a.prototype.pop=function(){return this.deleteAt(this.length-1)},a.prototype.unshift=function(a){return this.insertAt(0,a)},a.prototype.shift=function(){return this.deleteAt(0)},a.prototype.update=function(a){var b,c,d,e,h,i;c=this.clone();for(b in this)e=this[b],g(b)&&delete this[b];for(b=h=0,i=a.length;h<i;b=++h)d=a[b],this[b]=d;return this.length=f(this),this.trigger("update",c,this),this.trigger("change",this),a},a.prototype.splice=function(){var b,c,d,e,g;return g=arguments[0],b=arguments[1],d=3<=arguments.length?j.call(arguments,2):[],e=this.clone(),c=Array.prototype.splice.apply(this,[g,b].concat(j.call(d))),this.length=f(this),this.trigger("update",e,this),this.trigger("change",this),new a(c)},a.prototype.sort=function(a){var b;return b=this.clone(),Array.prototype.sort.call(this,a),this.trigger("update",b,this),this.trigger("change",this),this},a.prototype.sortBy=function(a){return this.sort(function(b,c){return e(b,a)<e(c,a)?-1:1})},a.prototype.reverse=function(){var a;return a=this.clone(),Array.prototype.reverse.call(this),this.trigger("update",a,this),this.trigger("change",this),this},a.prototype.forEach=function(a){if(typeof Array.prototype.forEach=="function")return Array.prototype.forEach.call(this,a);this.map(a);return},a.prototype.map=function(b){var c,d;return typeof Array.prototype.map=="function"?new a(Array.prototype.map.call(this,b)):new a(function(){var a,e,f;f=[];for(d=a=0,e=this.length;a<e;d=++a)c=this[d],f.push(b(c,d));return f}.call(this))},a.prototype.indexOf=function(a){var b,c,d,e;if(typeof Array.prototype.indexOf=="function")return Array.prototype.indexOf.call(this,a);for(b=d=0,e=this.length;d<e;b=++d){c=this[b];if(c===a)return b}return-1},a.prototype.lastIndexOf=function(a){var b,c,d;return typeof Array.prototype.lastIndexOf=="function"?Array.prototype.lastIndexOf.call(this,a):(d=function(){var d,e,f;f=[];for(b=d=0,e=this.length;d<e;b=++d)c=this[b],c===a&&f.push(b);return f}.call(this).pop(),d!=null?d:-1)},a.prototype.includes=function(a){return this.indexOf(a)>=0},a.prototype.find=function(a){var b,c,d;for(c=0,d=this.length;c<d;c++){b=this[c];if(a(b))return b}},a.prototype.insertAt=function(a,b){return Array.prototype.splice.call(this,a,0,b),this.length=f(this),this.trigger("insert",a,b),this.trigger("change",this),b},a.prototype.deleteAt=function(a){var b;return b=this[a],Array.prototype.splice.call(this,a,1),this.length=f(this),this.trigger("delete",a,b),this.trigger("change",this),b},a.prototype["delete"]=function(a){return this.deleteAt(this.indexOf(a))},a.prototype.serialize=function(){return h(this.toArray())},a.prototype.filter=function(b){var c;return typeof Array.prototype.filter=="function"?new a(Array.prototype.filter.call(this,b)):new a(function(){var a,d,e;e=[];for(a=0,d=this.length;a<d;a++)c=this[a],b(c)&&e.push(c);return e}.call(this))},a.prototype.join=function(){var a;return a=1<=arguments.length?j.call(arguments,0):[],Array.prototype.join.apply(this,a)},a.prototype.toString=function(){return this.toArray().toString()},a.prototype.toLocaleString=function(){return this.toArray().toLocaleString()},a.prototype.concat=function(){var b,c;return b=1<=arguments.length?j.call(arguments,0):[],new a((c=this.toArray()).concat.apply(c,b))},a.prototype.slice=function(){var b,c;return b=1<=arguments.length?j.call(arguments,0):[],new a((c=this.toArray()).slice.apply(c,b))},a.prototype.every=function(a){var b,c,d;if(typeof Array.prototype.every=="function")return Array.prototype.every.call(this,a);for(c=0,d=this.length;c<d;c++){b=this[c];if(!a(b))return!1}return!0},a.prototype.some=function(a){var b,c,d;if(typeof Array.prototype.some=="function")return Array.prototype.some.call(this,a);for(c=0,d=this.length;c<d;c++){b=this[c];if(a(b))return!0}return!1},a.prototype.reduce=function(a,b){var c,d,e,f,g;if(typeof Array.prototype.reduce=="function")return Array.prototype.reduce.apply(this,arguments);c=b?b:this[0];for(d=f=0,g=this.length;f<g;d=++f){e=this[d];if(b||d!==0)c=a(c,e,d,this)}return c},a.prototype.reduceRight=function(a,b){var c,d,e,f,g,h;if(typeof Array.prototype.reduceRight=="function")return Array.prototype.reduceRight.apply(this,arguments);f=this.toArray().reverse(),c=b?b:f[0];for(d=g=0,h=f.length;g<h;d=++g){e=f[d];if(b||d!==0)c=a(c,e,f.length-d-1,this)}return c},a.prototype.first=function(){return this[0]},a.prototype.last=function(){return this[this.length-1]},a.prototype.toArray=function(){var a,b,c;a=[];for(b in this)c=this[b],g(b)&&(a[b]=c);return a},a.prototype.toJSON=function(){return this.serialize()},a.prototype.clone=function(){return new a(this.toArray())},a.prototype._useDefer=!0,a}()})).call(this)},b["./association_collection"]=new function(){var a=this;((function(){var c,d,e={}.hasOwnProperty,f=function(a,b){function d(){this.constructor=a}for(var c in b)e.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};d=b("./collection").Collection,c=function(a){function b(a,c){var d;this.ctor=a,b.__super__.constructor.call(this,function(){var a,b,e;e=[];for(a=0,b=c.length;a<b;a++)d=c[a],e.push(this._convert(d));return e}.call(this))}return f(b,a),b.name="AssociationCollection",b.prototype.set=function(a,c){return b.__super__.set.call(this,a,this._convert(c))},b.prototype.push=function(a){return b.__super__.push.call(this,this._convert(a))},b.prototype.update=function(a){var c;return b.__super__.update.call(this,function(){var b,d,e;e=[];for(b=0,d=a.length;b<d;b++)c=a[b],e.push(this._convert(c));return e}.call(this))},b.prototype._convert=function(a){return a.constructor===Object&&this.ctor?new(this.ctor())(a):a},b}(d),a.AssociationCollection=c})).call(this)},b["./properties"]=new function(){var a=this;((function(){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1},v={}.hasOwnProperty;e=b("./collection").Collection,c=b("./association_collection").AssociationCollection,f=b("./events").Events,t=b("./helpers"),o=t.pairToObject,q=t.serializeObject,l=t.extend,m=t.get,p="_prop_",k=/^_prop_/,j=Object.defineProperties,n={},i=function(a,b,c){var d,e,f,g,h,i,j,k;if(!a["_glb_"+b]){a["_glb_"+b]=!0,k=[];for(g=0,h=c.length;g<h;g++)d=c[g],d.match(/\./)?(f="singular",i=d.split("."),d=i[0],e=i[1]):d.match(/:/)&&(f="collection",j=d.split(":"),d=j[0],e=j[1]),e?(n[e]||(n[e]=[]),k.push(n[e].push({object:a,dependency:b,subname:e,name:d,type:f}))):k.push(void 0);return k}},h=function(a,b,c){var d,e,f,g,h,i,j;c=[].concat(c),j=[];for(f=0,g=c.length;f<g;f++)d=c[f],d.match(/[:\.]/)&&(i=d.split(/[:\.]/),d=i[0],e=i[1]),a[h="_dep_"+d]||(a[h]=[]),a["_dep_"+d].indexOf(b)===-1?j.push(a["_dep_"+d].push(b)):j.push(void 0);return j},s=function(a,b){var c,d,e,f,g;g=[];for(e=0,f=b.length;e<f;e++)d=b[e],n[d]?g.push(function(){var b,e,f,g;f=n[d],g=[];for(b=0,e=f.length;b<e;b++)c=f[b],c.type==="singular"?a===c.object.get(c.name)?g.push(r(c.object,[c.dependency])):g.push(void 0):c.type==="collection"?u.call(c.object.get(c.name),a)>=0?g.push(r(c.object,[c.dependency])):g.push(void 0):g.push(void 0);return g}()):g.push(void 0);return g},r=function(a,b){var c,d,e,f,g,h,i,j,k;d=function(c){var e,f,g,h,i;e=a["_dep_"+c];if(e){i=[];for(g=0,h=e.length;g<h;g++)f=e[g],b.indexOf(f)===-1?(b.push(f),i.push(d(f))):i.push(void 0);return i}};for(g=0,i=b.length;g<i;g++)e=b[g],d(e);c={};for(h=0,j=b.length;h<j;h++)e=b[h],c[e]=a.get(e);a.trigger("change",c),s(a,b),k=[];for(e in c){if(!v.call(c,e))continue;f=c[e],k.push(a.trigger("change:"+e,f))}return k},g={property:function(a,b){b==null&&(b={}),this[p+a]=b,this[p+a].name=a,this.hasOwnProperty(a)&&this.set(a,this[a]),b.dependsOn&&h(this,a,b.dependsOn),j&&Object.defineProperty(this,a,{get:function(){return g.get.call(this,a)},set:function(b){return g.set.call(this,a,b)},configurable:!0});if(typeof b.serialize=="string")return this.property(b.serialize,{get:function(){return this.get(a)},set:function(b){return this.set(a,b)},configurable:!0})},collection:function(a,b){return b==null&&(b={}),l(b,{get:function(){var b=this;return this.attributes[a]||(this.attributes[a]=new e([]),this.attributes[a].bind("change",function(){return r(b,[a])})),this.attributes[a]},set:function(b){return this.get(a).update(b)}}),this.property(a,b)},set:function(a,b){var c,d,e;typeof a=="string"&&(a=o(a,b)),d=[];for(c in a)b=a[c],d.push(c),this.attributes||(this.attributes={}),this[p+c]||g.property.call(this,c),((e=this[p+c])!=null?e.set:void 0)?this[p+c].set.call(this,b):this.attributes[c]=b;return r(this,d)},get:function(a,b){var c,d,e,f,g,h;return((e=this[p+a])!=null?e.dependsOn:void 0)&&i(this,a,[].concat(this[p+a].dependsOn)),this.attributes||(this.attributes={}),d=((f=this[p+a])!=null?f.get:void 0)?this[p+a].get.call(this):((g=this[p+a])!=null?g.hasOwnProperty("default"):void 0)&&!this.attributes.hasOwnProperty(a)?this[p+a]["default"]:this.attributes[a],c=(h=this[p+a])!=null?h.format:void 0,b&&typeof c=="function"?c.call(this,d):d},serialize:function(){var a,b,c,d,e,f;d={};for(b in this)c=this[b],b.match(k)&&(typeof c.serialize=="string"?d[c.serialize]=q(this.get(c.name)):typeof c.serialize=="function"?(f=c.serialize.call(this),a=f[0],e=f[1],d[a]=q(e)):c.serialize&&(d[c.name]=q(this.get(c.name))));return d}},l(g,f),d={belongsTo:function(a,b){return b==null&&(b={}),l(b,{set:function(c){return c.constructor===Object&&b.as&&(c=new(b.as())(c)),this.attributes[a]=c}}),this.property(a,b),this.property(a+"Id",{get:function(){return m(this.get(a),"id")},set:function(c){return this.attributes[a]=b.as().find(c)},dependsOn:a,serialize:b.serializeId})},hasMany:function(a,b){return b==null&&(b={}),l(b,{get:function(){var d=this;return this.attributes[a]||(this.attributes[a]=new c(b.as,[]),this.attributes[a].bind("change",function(){return r(d,[a])})),this.attributes[a]},set:function(b){return this.get(a).update(b)}}),this.property(a,b),this.property(a+"Ids",{get:function(){return(new e(this.get(a))).map(function(a){return m(a,"id")})},set:function(c){var d,e;return e=function(){var a,e,f;f=[];for(a=0,e=c.length;a<e;a++)d=c[a],f.push(b.as().find(d));return f}(),this.get(a).update(e)},dependsOn:a,serialize:b.serializeIds})}},a.Properties=g,a.Associations=d,a.globalDependencies=n})).call(this)},b["./model"]=new function(){var a=this;((function(){var c,d,e,f,g,h,i={}.hasOwnProperty,j=function(a,b){function d(){this.constructor=a}for(var c in b)i.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};d=b("./cache").Cache,h=b("./properties"),c=h.Associations,f=h.Properties,g=b("./helpers").extend,e=function(){function a(a,b){var c,e=this;b==null&&(b=!1);if(!b)if(a!=null?a.id:void 0){c=d.get(this.constructor,a.id);if(c)return c.set(a),c;d.set(this.constructor,a.id,this)}this.constructor.localStorage==="save"?this.bind("saved",function(){return d.store(e.constructor,e.get("id"),e)}):this.constructor.localStorage&&this.bind("change",function(){return d.store(e.constructor,e.get("id"),e)}),this.set(a)}return a.name="Model",g(a.prototype,f),g(a.prototype,c),a.property=function(){var a;return(a=this.prototype).property.apply(a,arguments)},a.collection=function(){var a;return(a=this.prototype).collection.apply(a,arguments)},a.belongsTo=function(){var a;return(a=this.prototype).belongsTo.apply(a,arguments)},a.hasMany=function(){var a;return(a=this.prototype).hasMany.apply(a,arguments)},a.find=function(a){return d.get(this,a)||new this({id:a})},a.property("id",{serialize:!0}),a.extend=function(a,b){var c;return c=function(c){function d(){d.__super__.constructor.apply(this,arguments),b&&b.apply(this,arguments)}return j(d,c),d.name="New",d.modelName=a,d}(this)},a.prototype.save=function(){return this.trigger("saved")},a}(),a.Model=e})).call(this)},b["./serenade"]=new function(){var c=this;((function(){var d,e,f,g,h,i;d=b("./cache").Cache,g=b("./helpers").extend,i=b("./properties"),e=i.Properties,h=i.globalDependencies,f=function(b){return this===a?new f(b):(this.set(b),this)},g(f.prototype,e),g(f,{VERSION:"0.1.3",_views:{},_controllers:{},document:typeof window!="undefined"&&window!==null?window.document:void 0,view:function(a,c){var d;return d=b("./view").View,c?this._views[a]=new d(a,c):new d(void 0,a)},render:function(a,b,c,d){return this._views[a].render(b,c,d)},controller:function(a,b){return this._controllers[a]=b},controllerFor:function(a){return this._controllers[a]},clearIdentityMap:function(){return d._identityMap={}},clearLocalStorage:function(){return d._storage.clear()},clearCache:function(){var a,b,c,d,e;f.clearIdentityMap(),f.clearLocalStorage(),e=[];for(a=c=0,d=h.length;c<d;a=++c)b=h[a],e.push(delete h[a]);return e},unregisterAll:function(){return f._views={},f._controllers={}},bindEvent:function(a,b,c){return typeof a.addEventListener=="function"?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},useJQuery:function(){return this.bindEvent=function(a,b,c){return jQuery(a).bind(b,c)}},Events:b("./events").Events,Model:b("./model").Model,Collection:b("./collection").Collection,Helpers:{}}),c.Serenade=f,c.compile=function(){var a,c,d;return a=b("jsdom").jsdom(null,null,{}),c=b("fs"),d=a.createWindow(),f.document=a,function(b){var d,e,g,h;return g=b.model,h=b.filename.split("/").reverse()[0].replace(/\.serenade$/,""),f.view(h,c.readFileSync(b.filename).toString()),d=f.render(h,g,{}),a.body.appendChild(d),e=a.body.innerHTML,b.doctype!==!1&&(e="<!DOCTYPE html>\n"+e),e}}})).call(this)},b["./lexer"]=new function(){var a=this;((function(){var b,c,d,e,f,g,h,i=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};b=/^[a-zA-Z][a-zA-Z0-9\-_]*/,d=/^[\[\]=\:\-!#\.@]/,g=/^"((?:\\.|[^"])*)"/,f=/^(?:\r?\n[^\r\n\S]*)+/,h=/^[^\r\n\S]+/,c=["IF","COLLECTION","IN","VIEW","UNLESS"],e=function(){function a(){}return a.name="Lexer",a.prototype.tokenize=function(a,b){var c,d;b==null&&(b={}),this.code=a.replace(/^\s*/,"").replace(/\s*$/,""),this.line=b.line||0,this.indent=0,this.indents=[],this.ends=[],this.tokens=[],c=0;while(this.chunk=this.code.slice(c))c+=this.identifierToken()||this.whitespaceToken()||this.lineToken()||this.stringToken()||this.literalToken();while(d=this.ends.pop())d==="OUTDENT"?this.token("OUTDENT"):this.error("missing "+d);return this.tokens},a.prototype.whitespaceToken=function(){var a;return(a=h.exec(this.chunk))?(this.token("WHITESPACE",a[0].length),a[0].length):0},a.prototype.token=function(a,b){return this.tokens.push([a,b,this.line])},a.prototype.identifierToken=function(){var a,d;return(a=b.exec(this.chunk))?(d=a[0].toUpperCase(),i.call(c,d)>=0?this.token(d,a[0]):this.token("IDENTIFIER",a[0]),a[0].length):0},a.prototype.stringToken=function(){var a;return(a=g.exec(this.chunk))?(this.token("STRING_LITERAL",a[1]),a[0].length):0},a.prototype.lineToken=function(){var a,b,c,d,e;if(!(c=f.exec(this.chunk)))return 0;b=c[0],this.line+=this.count(b,"\n"),d=this.last(this.tokens,1),e=b.length-1-b.lastIndexOf("\n"),a=e-this.indent;if(e===this.indent)this.newlineToken();else if(e>this.indent)this.token("INDENT"),this.indents.push(a),this.ends.push("OUTDENT");else{while(a<0)this.last(this.ends)!=="OUTDENT"&&this.error("Should be an OUTDENT, yo"),this.ends.pop(),a+=this.indents.pop(),this.token("OUTDENT");this.token("TERMINATOR","\n")}return this.indent=e,b.length},a.prototype.literalToken=function(){var a;return(a=d.exec(this.chunk))?(this.token(a[0]),1):this.error("WUT??? is '"+this.chunk.charAt(0)+"'")},a.prototype.newlineToken=function(){if(this.tag()!=="TERMINATOR")return this.token("TERMINATOR","\n")},a.prototype.tag=function(a,b){var c;return(c=this.last(this.tokens,a))&&(b?c[0]=b:c[0])},a.prototype.value=function(a,b){var c;return(c=this.last(this.tokens,a))&&(b?c[1]=b:c[1])},a.prototype.error=function(a){throw SyntaxError(""+a+" on line "+(this.line+1))},a.prototype.count=function(a,b){var c,d;c=d=0;if(!b.length)return 1/0;while(d=1+a.indexOf(b,d))c++;return c},a.prototype.last=function(a,b){return a[a.length-(b||0)-1]},a}(),a.Lexer=e})).call(this)},b["./node"]=new function(){var a=this;((function(){var c,d;d=b("./serenade").Serenade,c=function(){function a(a,b){this.ast=a,this.element=b}return a.name="Node",a.prototype.append=function(a){return a.appendChild(this.element)},a.prototype.insertAfter=function(a){return a.parentNode.insertBefore(this.element,a.nextSibling)},a.prototype.remove=function(){var a;return(a=this.element.parentNode)!=null?a.removeChild(this.element):void 0},a.prototype.lastElement=function(){return this.element},a}(),a.Node=c})).call(this)},b["./dynamic_node"]=new function(){var a=this;((function(){var c,d,e;e=b("./serenade").Serenade,c=b("./collection").Collection,d=function(){function a(a){this.ast=a,this.anchor=e.document.createTextNode(""),this.nodeSets=new c([])}return a.name="DynamicNode",a.prototype.eachNode=function(a){var b,c,d,e,f,g;f=this.nodeSets,g=[];for(d=0,e=f.length;d<e;d++)c=f[d],g.push(function(){var d,e,f;f=[];for(d=0,e=c.length;d<e;d++)b=c[d],f.push(a(b));return f}());return g},a.prototype.rebuild=function(){var a;if(this.anchor.parentNode)return a=this.anchor,this.eachNode(function(b){return b.insertAfter(a),a=b.lastElement()})},a.prototype.replace=function(a){var b;return this.clear(),this.nodeSets.update(function(){var d,e,f;f=[];for(d=0,e=a.length;d<e;d++)b=a[d],f.push(new c(b));return f}()),this.rebuild()},a.prototype.appendNodeSet=function(a){return this.insertNodeSet(this.nodeSets.length,a)},a.prototype.deleteNodeSet=function(a){var b,c,d,e;e=this.nodeSets[a];for(c=0,d=e.length;c<d;c++)b=e[c],b.remove();return this.nodeSets.deleteAt(a)},a.prototype.insertNodeSet=function(a,b){var d,e,f,g,h,i;d=((h=this.nodeSets[a-1])!=null?(i=h.last())!=null?i.lastElement():void 0:void 0)||this.anchor;for(f=0,g=b.length;f<g;f++)e=b[f],e.insertAfter(d),d=e.lastElement();return this.nodeSets.insertAt(a,new c(b))},a.prototype.clear=function(){return this.eachNode(function(a){return a.remove()})},a.prototype.remove=function(){return this.clear(),this.anchor.parentNode.removeChild(this.anchor)},a.prototype.append=function(a){return a.appendChild(this.anchor),this.rebuild()},a.prototype.insertAfter=function(a){return a.parentNode.insertBefore(this.anchor,a.nextSibling),this.rebuild()},a.prototype.lastElement=function(){var a,b;return((a=this.nodeSets.last())!=null?(b=a.last())!=null?b.lastElement():void 0:void 0)||this.anchor},a}(),a.DynamicNode=d})).call(this)},b["./compile"]=new function(){var a=this;((function(){var c,d,e,f,g,h,i,j,k,l,m,n;h=b("./serenade").Serenade,c=b("./collection").Collection,f=b("./node").Node,e=b("./dynamic_node").DynamicNode,n=b("./helpers"),j=n.get,m=n.set,l=n.preventDefault,k=function(a,b){return a.bound&&a.value?j(b,a.value,!0):a.value?a.value:b},g={style:function(a,b,c,d){var e;e=function(){return b.element.style[a.name]=k(a,c)},e();if(a.bound)return typeof c.bind=="function"?c.bind("change:"+a.value,e):void 0},event:function(a,b,c,d){var e=this;return h.bindEvent(b.element,a.name,function(e){return a.preventDefault&&l(e),d[a.value](c,b.element,e)})},binding:function(a,b,c,d){var e,f,g,i,k=this;return f=b.element,(i=b.ast.name)==="input"||i==="textarea"||i==="select"||function(){throw SyntaxError("invalid node type "+b.ast.name+" for two way binding")}(),a.value||function(){throw SyntaxError("cannot bind to whole model, please specify an attribute to bind to")}(),e=function(){if(f.type==="checkbox")return m(c,a.value,f.checked);if(f.type!=="radio")return m(c,a.value,f.value);if(f.checked)return m(c,a.value,f.getAttribute("value"))},g=function(){var b;if(f.type==="checkbox")return b=j(c,a.value),f.checked=!!b;if(f.type!=="radio")return b=j(c,a.value),b===void 0&&(b=""),f.value=b;b=j(c,a.value);if(b===f.getAttribute("value"))return f.checked=!0},g(),typeof c.bind=="function"&&c.bind("change:"+a.value,g),a.name==="binding"?h.bindEvent(h.document,"submit",function(a){if(f.form===(a.target||a.srcElement))return e()}):h.bindEvent(f,a.name,e)},attribute:function(a,b,c,d){var e,f;return a.name==="binding"?g.binding(a,b,c,d):(e=b.element,f=function(){var d,f;return f=k(a,c),a.name==="value"?e.value=f||"":b.ast.name==="input"&&a.name==="checked"?e.checked=!!f:a.name==="class"?(d=b.ast.classes,f!==void 0&&(d=d.concat(f)),d.length?e.setAttribute(a.name,d.join(" ")):e.removeAttribute(a.name)):f===void 0?e.removeAttribute(a.name):(f===0&&(f="0"),e.setAttribute(a.name,f))},a.bound&&typeof c.bind=="function"&&c.bind("change:"+a.value,f),f())}},d={element:function(a,b,c){var d,e,j,k,l,m,n,o,p,q,r,s;j=h.document.createElement(a.name),k=new f(a,j),a.id&&j.setAttribute("id",a.id),((q=a.classes)!=null?q.length:void 0)&&j.setAttribute("class",a.classes.join(" ")),r=a.properties;for(m=0,o=r.length;m<o;m++){l=r[m],d=g[l.scope];if(d)d(l,k,b,c);else throw SyntaxError(""+l.scope+" is not a valid scope")}s=a.children;for(n=0,p=s.length;n<p;n++)e=s[n],i(e,b,c).append(j);return k},view:function(a,b,c){var d,e;return d=h.controllerFor(a.arguments[0])||c,e=h.render(a.arguments[0],b,d,c),new f(a,e)},helper:function(a,b,c){var d,e,g,j;return j=function(b,c){var d,e,f,g,j,k;b==null&&(b=b),c==null&&(c=c),e=h.document.createDocumentFragment(),k=a.children;for(g=0,j=k.length;g<j;g++)d=k[g],f=i(d,b,c),f.append(e);return e},g=h.Helpers[a.command]||function(){throw SyntaxError("no helper "+a.command+" defined")}(),d={render:j,model:b,controller:c},e=g.apply(d,a.arguments),new f(a,e)},text:function(a,b,c){var d,e;return d=function(){var c;return c=k(a,b),c===0&&(c="0"),c||""},e=h.document.createTextNode(d()),a.bound&&typeof b.bind=="function"&&b.bind("change:"+a.value,function(){return e.nodeValue=d()}),new f(a,e)},collection:function(a,b,c){var d,f,g,h,k=this;return f=function(b){var d,e,f,g,h;g=a.children,h=[];for(e=0,f=g.length;e<f;e++)d=g[e],h.push(i(d,b,c));return h},g=new e(a),d=j(b,a.arguments[0]),typeof d.bind=="function"&&(d.bind("set",function(){var a;return g.replace(function(){var b,c,e;e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(f(a));return e}())}),d.bind("update",function(){var a;return g.replace(function(){var b,c,e;e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(f(a));return e}())}),d.bind("add",function(a){return g.appendNodeSet(f(a))}),d.bind("insert",function(a,b){return g.insertNodeSet(a,f(b))}),d.bind("delete",function(a){return g.deleteNodeSet(a)})),g.replace(function(){var a,b,c;c=[];for(a=0,b=d.length;a<b;a++)h=d[a],c.push(f(h));return c}()),g},"in":function(a,b,c){var d,f;return d=new e(a),f=function(){var e,f,g;return g=j(b,a.arguments[0]),g?(f=function(){var b,d,f,h;f=a.children,h=[];for(b=0,d=f.length;b<d;b++)e=f[b],h.push(i(e,g,c));return h}(),d.replace([f])):d.clear()},f(),typeof b.bind=="function"&&b.bind("change:"+a.arguments[0],f),d},"if":function(a,b,c){var d,f;return d=new e(a),f=function(){var e,f,g;return g=j(b,a.arguments[0]),g?(f=function(){var d,f,g,h;g=a.children,h=[];for(d=0,f=g.length;d<f;d++)e=g[d],h.push(i(e,b,c));return h}(),d.replace([f])):d.clear()},f(),typeof b.bind=="function"&&b.bind("change:"+a.arguments[0],f),d},unless:function(a,b,c){var d,f;return d=new e(a),f=function(){var e,f,g;return g=j(b,a.arguments[0]),g?d.clear():(f=function(){var d,f,g,h;g=a.children,h=[];for(d=0,f=g.length;d<f;d++)e=g[d],h.push(i(e,b,c));return h}(),d.replace([f]))},f(),typeof b.bind=="function"&&b.bind("change:"+a.arguments[0],f),d}},i=function(a,b,c){var e;e=d[a.type];if(e)return e(a,b,c);throw SyntaxError("unknown type '"+a.type+"'")},a.compile=i})).call(this)},b["./parser"]=new function(){var a=this,c=function(){undefined;var a={trace:function(){},yy:{},symbols_:{error:2,Root:3,Element:4,ElementIdentifier:5,AnyIdentifier:6,"#":7,".":8,"[":9,"]":10,PropertyList:11,WHITESPACE:12,Text:13,INDENT:14,ChildList:15,OUTDENT:16,TextList:17,Bound:18,STRING_LITERAL:19,Child:20,TERMINATOR:21,Instruction:22,Property:23,"=":24,"!":25,":":26,"-":27,VIEW:28,COLLECTION:29,IF:30,UNLESS:31,IN:32,IDENTIFIER:33,"@":34,$accept:0,$end:1},terminals_:{2:"error",7:"#",8:".",9:"[",10:"]",12:"WHITESPACE",14:"INDENT",16:"OUTDENT",19:"STRING_LITERAL",21:"TERMINATOR",24:"=",25:"!",26:":",27:"-",28:"VIEW",29:"COLLECTION",30:"IF",31:"UNLESS",32:"IN",33:"IDENTIFIER",34:"@"},productions_:[0,[3,0],[3,1],[5,1],[5,3],[5,2],[5,2],[5,3],[4,1],[4,3],[4,4],[4,3],[4,4],[17,1],[17,3],[13,1],[13,1],[15,1],[15,3],[20,1],[20,1],[20,1],[11,1],[11,3],[23,3],[23,3],[23,4],[23,4],[23,3],[23,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,4],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[18,2],[18,1]],performAction:function(b,c,d,e,f,g,h){var i=g.length-1;switch(f){case 1:this.$=null;break;case 2:return this.$;case 3:this.$={name:g[i],classes:[]};break;case 4:this.$={name:g[i-2],id:g[i],classes:[]};break;case 5:this.$={name:"div",id:g[i],classes:[]};break;case 6:this.$={name:"div",classes:[g[i]]};break;case 7:this.$=function(){return g[i-2].classes.push(g[i]),g[i-2]}();break;case 8:this.$={name:g[i].name,id:g[i].id,classes:g[i].classes,properties:[],children:[],type:"element"};break;case 9:this.$=g[i-2];break;case 10:this.$=function(){return g[i-3].properties=g[i-1],g[i-3]}();break;case 11:this.$=function(){return g[i-2].children=g[i-2].children.concat(g[i]),g[i-2]}();break;case 12:this.$=function(){return g[i-3].children=g[i-3].children.concat(g[i-1]),g[i-3]}();break;case 13:this.$=[g[i]];break;case 14:this.$=g[i-2].concat(g[i]);break;case 15:this.$={type:"text",value:g[i],bound:!0};break;case 16:this.$={type:"text",value:g[i],bound:!1};break;case 17:this.$=[].concat(g[i]);break;case 18:this.$=g[i-2].concat(g[i]);break;case 19:this.$=g[i];break;case 20:this.$=g[i];break;case 21:this.$=g[i];break;case 22:this.$=[g[i]];break;case 23:this.$=g[i-2].concat(g[i]);break;case 24:this.$={name:g[i-2],value:g[i],bound:!0,scope:"attribute"};break;case 25:this.$={name:g[i-2],value:g[i],bound:!0,scope:"attribute"};break;case 26:this.$={name:g[i-3],value:g[i-1],bound:!0,scope:"attribute",preventDefault:!0};break;case 27:this.$={name:g[i-3],value:g[i-1],bound:!0,scope:"attribute",preventDefault:!0};break;case 28:this.$={name:g[i-2],value:g[i],bound:!1,scope:"attribute"};break;case 29:this.$=function(){return g[i].scope=g[i-2],g[i]}();break;case 30:this.$={arguments:[],children:[],type:"view"};break;case 31:this.$={arguments:[],children:[],type:"collection"};break;case 32:this.$={arguments:[],children:[],type:"if"};break;case 33:this.$={arguments:[],children:[],type:"unless"};break;case 34:this.$={arguments:[],children:[],type:"in"};break;case 35:this.$={command:g[i],arguments:[],children:[],type:"helper"};break;case 36:this.$=function(){return g[i-2].arguments.push(g[i].value),g[i-2]}();break;case 37:this.$=function(){return g[i-3].children=g[i-1],g[i-3]}();break;case 38:this.$=g[i];break;case 39:this.$=g[i];break;case 40:this.$=g[i];break;case 41:this.$=g[i];break;case 42:this.$=g[i];break;case 43:this.$=g[i];break;case 44:this.$=g[i];break;case 45:this.$=function(){}()}},table:[{1:[2,1],3:1,4:2,5:3,6:4,7:[1,5],8:[1,6],28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{1:[3]},{1:[2,2],9:[1,13],12:[1,14],14:[1,15]},{1:[2,8],8:[1,16],9:[2,8],12:[2,8],14:[2,8],16:[2,8],21:[2,8]},{1:[2,3],7:[1,17],8:[2,3],9:[2,3],12:[2,3],14:[2,3],16:[2,3],21:[2,3]},{6:18,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{6:19,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{1:[2,38],7:[2,38],8:[2,38],9:[2,38],10:[2,38],12:[2,38],14:[2,38],16:[2,38],21:[2,38],24:[2,38],25:[2,38],26:[2,38]},{1:[2,39],7:[2,39],8:[2,39],9:[2,39],10:[2,39],12:[2,39],14:[2,39],16:[2,39],21:[2,39],24:[2,39],25:[2,39],26:[2,39]},{1:[2,40],7:[2,40],8:[2,40],9:[2,40],10:[2,40],12:[2,40],14:[2,40],16:[2,40],21:[2,40],24:[2,40],25:[2,40],26:[2,40]},{1:[2,41],7:[2,41],8:[2,41],9:[2,41],10:[2,41],12:[2,41],14:[2,41],16:[2,41],21:[2,41],24:[2,41],25:[2,41],26:[2,41]},{1:[2,42],7:[2,42],8:[2,42],9:[2,42],10:[2,42],12:[2,42],14:[2,42],16:[2,42],21:[2,42],24:[2,42],25:[2,42],26:[2,42]},{1:[2,43],7:[2,43],8:[2,43],9:[2,43],10:[2,43],12:[2,43],14:[2,43],16:[2,43],21:[2,43],24:[2,43],25:[2,43],26:[2,43]},{6:23,10:[1,20],11:21,23:22,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{13:24,18:25,19:[1,26],34:[1,27]},{4:30,5:3,6:4,7:[1,5],8:[1,6],13:34,15:28,17:32,18:25,19:[1,26],20:29,22:31,27:[1,33],28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12],34:[1,27]},{6:35,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{6:36,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{1:[2,5],8:[2,5],9:[2,5],12:[2,5],14:[2,5],16:[2,5],21:[2,5]},{1:[2,6],8:[2,6],9:[2,6],12:[2,6],14:[2,6],16:[2,6],21:[2,6]},{1:[2,9],9:[2,9],12:[2,9],14:[2,9],16:[2,9],21:[2,9]},{10:[1,37],12:[1,38]},{10:[2,22],12:[2,22]},{24:[1,39],26:[1,40]},{1:[2,11],9:[2,11],12:[2,11],14:[2,11],16:[2,11],21:[2,11]},{1:[2,15],9:[2,15],12:[2,15],14:[2,15],16:[2,15],21:[2,15]},{1:[2,16],9:[2,16],12:[2,16],14:[2,16],16:[2,16],21:[2,16]},{1:[2,45],6:41,9:[2,45],10:[2,45],12:[2,45],14:[2,45],16:[2,45],21:[2,45],25:[2,45],28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{16:[1,42],21:[1,43]},{16:[2,17],21:[2,17]},{9:[1,13],12:[1,14],14:[1,15],16:[2,19],21:[2,19]},{12:[1,44],14:[1,45],16:[2,20],21:[2,20]},{12:[1,46],16:[2,21],21:[2,21]},{12:[1,47]},{12:[2,13],16:[2,13],21:[2,13]},{1:[2,7],8:[2,7],9:[2,7],12:[2,7],14:[2,7],16:[2,7],21:[2,7]},{1:[2,4],8:[2,4],9:[2,4],12:[2,4],14:[2,4],16:[2,4],21:[2,4]},{1:[2,10],9:[2,10],12:[2,10],14:[2,10],16:[2,10],21:[2,10]},{6:23,23:48,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{6:49,18:50,19:[1,51],28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12],34:[1,27]},{6:23,23:52,28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12]},{1:[2,44],9:[2,44],10:[2,44],12:[2,44],14:[2,44],16:[2,44],21:[2,44],25:[2,44]},{1:[2,12],9:[2,12],12:[2,12],14:[2,12],16:[2,12],21:[2,12]},{4:30,5:3,6:4,7:[1,5],8:[1,6],13:34,17:32,18:25,19:[1,26],20:53,22:31,27:[1,33],28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12],34:[1,27]},{13:54,18:25,19:[1,26],34:[1,27]},{4:30,5:3,6:4,7:[1,5],8:[1,6],13:34,15:55,17:32,18:25,19:[1,26],20:29,22:31,27:[1,33],28:[1,7],29:[1,8],30:[1,9],31:[1,10],32:[1,11],33:[1,12],34:[1,27]},{13:56,18:25,19:[1,26],34:[1,27]},{28:[1,57],29:[1,58],30:[1,59],31:[1,60],32:[1,61],33:[1,62]},{10:[2,23],12:[2,23]},{10:[2,24],12:[2,24],25:[1,63]},{10:[2,25],12:[2,25],25:[1,64]},{10:[2,28],12:[2,28]},{10:[2,29],12:[2,29]},{16:[2,18],21:[2,18]},{12:[2,36],14:[2,36],16:[2,36],21:[2,36]},{16:[1,65],21:[1,43]},{12:[2,14],16:[2,14],21:[2,14]},{12:[2,30],14:[2,30],16:[2,30],21:[2,30]},{12:[2,31],14:[2,31],16:[2,31],21:[2,31]},{12:[2,32],14:[2,32],16:[2,32],21:[2,32]},{12:[2,33],14:[2,33],16:[2,33],21:[2,33]},{12:[2,34],14:[2,34],16:[2,34],21:[2,34]},{12:[2,35],14:[2,35],16:[2,35],21:[2,35]},{10:[2,26],12:[2,26]},{10:[2,27],12:[2,27]},{12:[2,37],14:[2,37],16:[2,37],21:[2,37]}],defaultActions:{},parseError:function(b,c){throw new Error(b)},parse:function(b){function o(a){d.length=d.length-2*a,e.length=e.length-a,f.length=f.length-a}function p(){var a;return a=c.lexer.lex()||1,typeof a!="number"&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0,l=2,m=1;this.lexer.setInput(b),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,typeof this.lexer.yylloc=="undefined"&&(this.lexer.yylloc={});var n=this.lexer.yylloc;f.push(n),typeof this.yy.parseError=="function"&&(this.parseError=this.yy.parseError);var q,r,s,t,u,v,w={},x,y,z,A;for(;;){s=d[d.length-1],this.defaultActions[s]?t=this.defaultActions[s]:(q==null&&(q=p()),t=g[s]&&g[s][q]);if(typeof t=="undefined"||!t.length||!t[0]){if(!k){A=[];for(x in g[s])this.terminals_[x]&&x>2&&A.push("'"+this.terminals_[x]+"'");var B="";this.lexer.showPosition?B="Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+A.join(", ")+", got '"+this.terminals_[q]+"'":B="Parse error on line "+(i+1)+": Unexpected "+(q==1?"end of input":"'"+(this.terminals_[q]||q)+"'"),this.parseError(B,{text:this.lexer.match,token:this.terminals_[q]||q,line:this.lexer.yylineno,loc:n,expected:A})}if(k==3){if(q==m)throw new Error(B||"Parsing halted.");j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,n=this.lexer.yylloc,q=p()}for(;;){if(l.toString()in g[s])break;if(s==0)throw new Error(B||"Parsing halted.");o(1),s=d[d.length-1]}r=q,q=l,s=d[d.length-1],t=g[s]&&g[s][l],k=3}if(t[0]instanceof Array&&t.length>1)throw new Error("Parse Error: multiple actions possible at state: "+s+", token: "+q);switch(t[0]){case 1:d.push(q),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(t[1]),q=null,r?(q=r,r=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,n=this.lexer.yylloc,k>0&&k--);break;case 2:y=this.productions_[t[1]][1],w.$=e[e.length-y],w._$={first_line:f[f.length-(y||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(y||1)].first_column,last_column:f[f.length-1].last_column},v=this.performAction.call(w,h,j,i,this.yy,t[1],e,f);if(typeof v!="undefined")return v;y&&(d=d.slice(0,-1*y*2),e=e.slice(0,-1*y),f=f.slice(0,-1*y)),d.push(this.productions_[t[1]][0]),e.push(w.$),f.push(w._$),z=g[d[d.length-2]][d[d.length-1]],d.push(z);break;case 3:return!0}}return!0}};return a}();typeof b!="undefined"&&typeof a!="undefined"&&(a.parser=c,a.parse=function(){return c.parse.apply(c,arguments)},a.main=function(d){if(!d[1])throw new Error("Usage: "+d[0]+" FILE");if(typeof process!="undefined")var e=b("fs").readFileSync(b("path").join(process.cwd(),d[1]),"utf8");else var f=b("file").path(b("file").cwd()),e=f.join(d[1]).read({charset:"utf-8"});return a.parser.parse(e)},typeof module!="undefined"&&b.main===module&&a.main(typeof process!="undefined"?process.argv.slice(1):b("system").args))},b["./view"]=new function(){var a=this;((function(){var c,d,e,f,g;g=b("./parser").parser,c=b("./lexer").Lexer,f=b("./compile").compile,d=b("./serenade").Serenade,g.lexer={lex:function(){var a,b;return b=this.tokens[this.pos++]||[""],a=b[0],this.yytext=b[1],this.yylineno=b[2],a},setInput:function(a){return this.tokens=a,this.pos=0},upcomingInput:function(){return""}},e=function(){function a(a,b){this.name=a,this.view=b}return a.name="View",a.prototype.parse=function(){return typeof this.view=="string"?g.parse((new c).tokenize(this.view)):this.view},a.prototype.render=function(a,b,c){var e;return this.name&&(b||(b=d.controllerFor(this.name,a))),b||(b={}),typeof b=="function"&&(b=new b(a,c)),e=f(this.parse(),a,b),typeof b.loaded=="function"&&b.loaded(a,e.element),e.element},a}(),a.View=e})).call(this)},b["./serenade"].Serenade}();typeof define=="function"&&define.amd?define(function(){return b}):a.Serenade=b})(this)