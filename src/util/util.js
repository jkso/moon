/* ======= Global Utilities ======= */

/**
 * Creates a Virtual DOM Node
 * @param {String} type
 * @param {String} val
 * @param {Object} props
 * @param {Array} children
 * @param {Object} meta
 * @return {Object} Virtual DOM Node
 */
var createElement = function(type, val, props, children, meta) {
  return {
    type: type,
    val: val,
    props: props,
    children: children,
    meta: meta || {
      shouldRender: true
    }
  };
}

/**
 * Adds Nodes to Rendered Virtual DOM
 * @param {Object} rdom
 * @param {Object} vdom
 * @return {Object} Rendered Virtual DOM with Nodes
 */
var addNodes = function(rdom, vdom) {
  rdom.node = vdom.node;
  for(var vnode in rdom.children) {
    rdom.children[vnode] = addNodes(rdom.children[vnode], vdom.children[vnode]);
  }
  return rdom;
}

/**
  * Gets Root Element
  * @param {String} html
  * @return {Node} Root Element
  */
var getRootElement = function(html) {
  var dummy = document.createElement('div');
  dummy.innerHTML = html;
  return dummy.firstChild;
}

/**
 * Merges two Objects
 * @param {Object} obj
 * @param {Object} obj2
 * @return {Object} Merged Objects
 */
function merge(obj, obj2) {
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) obj[key] = obj2[key];
  }
  return obj;
}

/**
 * Compiles JSX to Virtual DOM
 * @param {String} tag
 * @param {Object} attrs
 * @param {Array} children
 * @return {String} Object usable in Virtual DOM
 */
var h = function() {
  var args = Array.prototype.slice.call(arguments);
  var tag = args.shift();
  var attrs = args.shift() || {};
  var children = args;
  if(typeof children[0] === "string") {
    children[0] = createElement("#text", children[0], {}, [], defaultMeta())
  }
  return createElement(tag, children.join(""), attrs, children, defaultMeta());
};

/**
 * Sets the Elements Initial Value
 * @param {Node} el
 * @param {String} value
 */
var setInitialElementValue = function(el, value) {
  el.innerHTML = value;
}

/**
 * Does No Operation
 */
var noop = function() {

}
