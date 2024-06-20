export type Scrollable = {
  scrollToEnd(options?: { animated?: boolean | undefined }): void
}

export type ScrollLabelProps = {
  scrollRef: React.MutableRefObject<Scrollable | null>
}
