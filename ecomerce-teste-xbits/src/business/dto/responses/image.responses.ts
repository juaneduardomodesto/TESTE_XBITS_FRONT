import { EImageType } from "@/business/enums";

export interface ImageResponse {
  id: number;
  fileName: string;
  contentType: string;
  sizeInBytes: number;
  imageType: EImageType;
  isMain: boolean;
  alt?: string;
  displayOrder: number;
  originalUrl?: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
  createdAt: string;
}

export interface ImageUploadResult {
  storagePath: string;
  publicUrl: string;
  sizeInBytes: number;
}

export interface ImageCollectionResponse {
  images: ImageResponse[];
  mainImage?: ImageResponse;
  totalCount: number;
}

export interface ImageUrlsResponse {
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
}

export const getImageUrlBySize = (
  image: ImageResponse,
  size: 'thumbnail' | 'medium' | 'large' | 'original'
): string => {
  switch (size) {
    case 'thumbnail':
      return image.thumbnailUrl || image.mediumUrl || image.largeUrl || image.originalUrl || '';
    case 'medium':
      return image.mediumUrl || image.largeUrl || image.originalUrl || '';
    case 'large':
      return image.largeUrl || image.originalUrl || '';
    case 'original':
      return image.originalUrl || '';
    default:
      return image.originalUrl || '';
  }
};