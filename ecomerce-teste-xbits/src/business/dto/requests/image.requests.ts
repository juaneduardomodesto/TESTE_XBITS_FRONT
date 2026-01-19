import { EEntityType, EImageType } from "@/business/enums";

export interface ImageRegisterRequest {
  file: File;
  entityType: EEntityType;
  entityId: number;
  imageType: EImageType;
  setAsMain?: boolean;
  alt?: string;
}

export interface ImageMultipleUploadRequest {
  files: File[];
  entityType: EEntityType;
  entityId: number;
  imageType: EImageType;
  setFirstAsMain?: boolean;
  alts?: string[];
}

export interface ImageUpdateRequest extends ImageRegisterRequest {
  id: number;
}

export interface ImageDeleteRequest {
  id: number;
}

export interface ImageSetMainRequest {
  imageId: number;
}

export interface ImageUpdateAltRequest {
  imageId: number;
  alt: string;
}

export interface ImageUpdateOrderRequest {
  items: ImageOrderItem[];
}

export interface ImageOrderItem {
  imageId: number;
  displayOrder: number;
}

export interface ImageSearchParams {
  entityType?: EEntityType;
  entityId?: number;
  imageType?: EImageType;
  isMain?: boolean;
}