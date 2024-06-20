import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse
} from 'react-native-document-picker'

export interface RiseFileAsset extends DocumentPickerResponse {}

export const defaultOptions: DocumentPickerOptions<'android' | 'ios'> = {
  allowMultiSelection: false,
  type: [DocumentPicker.types.pdf]
}

export async function pickSingleFile(options = defaultOptions) {
  const resp = await DocumentPicker.pickSingle(options)
  return resp
}
