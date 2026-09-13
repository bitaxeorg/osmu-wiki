/**
 * Wrap every Markdown table in a scroll container.
 *
 * Starlight makes the `<table>` itself the scrollable box:
 *
 *     .sl-markdown-content table { display: block; overflow: auto; }
 *
 * That works while the table is undecorated, because a `display: block` table
 * lays its rows out in an anonymous table box that shrink-wraps the content and
 * nobody can see the difference. The moment the element gets a border, a
 * background or a radius, the frame stretches to the full column width while
 * the rows stay hugging the left — and any rule that replaces `overflow: auto`
 * to make the radius clip will also clip a wide table instead of scrolling it.
 *
 * The frame and the scroll container have to be two different boxes, so this
 * adds the second one. The table then goes back to being a real `display: table`
 * at `width: 100%`, which is what makes the cells fill the frame and the row
 * rules reach both edges.
 *
 * It also drops a header row that has nothing in it. Every ASIC page writes its
 * spec table headerless, which GitHub-flavoured Markdown spells as a row of
 * empty cells above the delimiter:
 *
 *     |                 |                |
 *     | --------------- | -------------- |
 *     | Price           | New: ~$unknown |
 *
 * There is no way to express "no header" in GFM, so the renderer emits an empty
 * `<thead>` either way. Undecorated that is a blank line nobody notices; with a
 * header background on it, it is a grey band across the top of the table that
 * reads as a rendering fault. Dropping it here keeps the Markdown idiom intact
 * rather than asking five pages to work around the stylesheet.
 *
 * Written as a plain tree walk rather than pulling in `unist-util-visit`: it is
 * a few dozen lines and this is the only place in the project that needs it.
 */
export default function rehypeWrapTables() {
  return (tree) => wrap(tree)
}

function wrap(node) {
  const children = node.children
  if (!Array.isArray(children)) return

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.type !== 'element') continue

    if (child.tagName === 'table') {
      dropEmptyHead(child)

      // Replace in place and do not descend: the table's own subtree holds no
      // further tables, and recursing into the wrapper we just made would find
      // this same table again.
      children[i] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'] },
        children: [child],
      }
      continue
    }

    wrap(child)
  }
}

/** Remove a `<thead>` whose every cell is blank. A partly-filled one stays. */
function dropEmptyHead(table) {
  const head = table.children.find(
    (n) => n.type === 'element' && n.tagName === 'thead',
  )
  if (!head) return

  const cells = []
  collectCells(head, cells)
  if (cells.length === 0 || cells.some((c) => textOf(c).trim() !== '')) return

  table.children = table.children.filter((n) => n !== head)
}

function collectCells(node, out) {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    if (child.tagName === 'th' || child.tagName === 'td') out.push(child)
    else collectCells(child, out)
  }
}

function textOf(node) {
  if (node.type === 'text') return node.value
  return (node.children ?? []).map(textOf).join('')
}
