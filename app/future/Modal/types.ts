import React from 'react'

export type ModalT = {
  backgroundColor?: string
  children: React.ReactNode
  headerText: string
  height?: number
  isModalVisible: boolean
  onModalClose: () => void
}
