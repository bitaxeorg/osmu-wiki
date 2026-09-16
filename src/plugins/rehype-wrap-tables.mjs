/**
 * Wrap every Markdown table in a scroll container, and drop a `<thead>` whose
 * cells are all empty.
 *
 * Starlight scrolls the `<table>` element itself (`display: block; overflow:
 * auto`), so a decorated table draws its frame at full column width while the
 * rows hug the left. The frame and the scroll box have to be separate
 * elements; this adds the outer one so the table can stay `display: table`.
 *
 * GFM has no way to spell "no header", so a headerless spec table still emits
 * an empty `<thead>` — a grey band across the top once the header has a
 * background.
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

      // Do not descend: recursing into the wrapper would find this table again.
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
