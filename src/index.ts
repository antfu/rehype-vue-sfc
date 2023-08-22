import type { Plugin } from 'unified'
import type { Element, Root } from 'hast'

export interface RehypeVueSfcOptions {
  /**
   * Hoist style tags
   * @default true
   */
  hoistStyle?: boolean

  /**
   * Hoist script tags
   * @default true
   */
  hoistScript?: boolean
}

const rehypeVueSfc: Plugin<[RehypeVueSfcOptions?], Root, Root> = (options) => {
  const {
    hoistStyle = true,
    hoistScript = true,
  } = options || {}

  return (root) => {
    const pres: Element[] = []
    const posts: Element[] = []
    const template: Element = {
      type: 'element',
      tagName: 'template',
      properties: {},
      children: [],
      content: {
        type: 'root',
        children: root.children.filter((node) => {
          if (hoistStyle && node.type === 'element' && node.tagName === 'style') {
            posts.push(node)
            return false
          }
          if (hoistScript && node.type === 'element' && node.tagName === 'script') {
            pres.push(node)
            return false
          }

          return true
        }),
      },
    }
    root.children = [
      ...pres,
      template,
      ...posts,
    ]
    return root
  }
}

export default rehypeVueSfc
