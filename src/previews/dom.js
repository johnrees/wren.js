const snabbdom = require('snabbdom');
const patch = snabbdom.init([
  require('snabbdom/modules/attributes').default,
]);
const h = require('snabbdom/h').default;

const container = document.getElementById('container');

const vnode = h('svg', {attrs: {width: 100, height: 100}}, [
  h('circle', {attrs: {cx: 50, cy: 50, r: 40, stroke: 'green', 'stroke-width': 4, fill: 'yellow'}})
]);

patch(container, vnode);

const newVnode = h('svg', {attrs: {width: 100, height: 100}}, [
  h('circle', {attrs: {cx: 50, cy: 50, r: 20, stroke: 'black', 'stroke-width': 1, fill: 'tomato'}})
]);

setTimeout(() => patch(vnode, newVnode), 1000)
