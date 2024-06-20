export type Props = {
  getSelectedItem?: (value: string) => void
  items: { label: string; value: string }[]
  label: string
  value: string
}
