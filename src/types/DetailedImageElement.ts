import { ImageElement } from './ImageElement'

export type ImageDetails = {
  longDescription?: string
  shortDescription: string
}

export type DetailedImageElement =
  & ImageDetails
  & ImageElement
