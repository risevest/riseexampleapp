export interface TextProps {
  children: JSX.Element | string
  node: Node
}

export interface Props {
  children: JSX.Element[] | JSX.Element | string
  node?: Node
}

export interface Node {
  bold?: boolean
  children?: []
  href?: string
  italic?: boolean
  strikethrough?: boolean
  type: string
  underline?: boolean
  url?: string
}
