const h = require('snabbdom/h').default;
const init = require('snabbdom-to-html/init')
const attributes = require('snabbdom-to-html/modules/attributes')
const toHTML = init([attributes])

const output = toHTML(
  h('svg', {attrs: {width: 100, height: 100}}, [
    h('circle', {attrs: {cx: 50, cy: 50, r: 40, stroke: 'green', 'stroke-width': 4, fill: 'yellow'}})
  ])
);

console.log(output)
