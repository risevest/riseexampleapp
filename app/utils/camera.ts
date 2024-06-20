import { Alert, Platform } from 'react-native'
import {
  Asset,
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker'

export interface RisePhotoAsset extends Asset {
  name: string
}

export const defaultOptions: CameraOptions = {
  cameraType: 'front',
  includeBase64: true,
  maxHeight: 500,
  maxWidth: 500,
  mediaType: 'photo',
  quality: 1
}

export function openCamera(options = defaultOptions) {
  return launchCamera(options)
}

export function openMediaLibrary(options = defaultOptions) {
  return launchImageLibrary(options)
}

export function processAsset(asset: Asset): RisePhotoAsset {
  const uri =
    Platform.OS === 'android' ? asset.uri : asset.uri?.replace('file://', '')

  const data: RisePhotoAsset = {
    ...asset,
    name: asset.fileName as string,
    uri
  }
  return data
}

export async function takePhoto(options = defaultOptions) {
  const resp = await openCamera(options)
  if (resp?.didCancel) {
    return
  }
  // handle errors
  if (resp.errorCode) {
    return handleError(resp)
  }
  const firstPhoto = resp.assets?.[0]
  return processAsset(firstPhoto as Asset)
}

export async function pickPhoto(options?: Partial<CameraOptions>) {
  const resp = await openMediaLibrary({ ...defaultOptions, ...options })
  if (resp?.didCancel) {
    return
  }
  // handle errors
  if (resp.errorCode) {
    return handleError(resp)
  }
  const firstPhoto = resp?.assets?.[0]
  return processAsset(firstPhoto as Asset)
}

function handleError(resp: ImagePickerResponse) {
  if (resp.errorCode === 'permission') {
    Alert.alert('Permission denied')
  } else if (resp.errorCode === 'camera_unavailable') {
    Alert.alert('Camera unavailable')
  } else {
    Alert.alert(resp?.errorMessage ?? 'Something went wrong')
  }
}
