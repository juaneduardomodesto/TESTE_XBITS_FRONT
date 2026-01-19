import { apiClient } from "..";
import { ImageRegisterRequest, ImageResponse, ImageDeleteRequest, ImageSetMainRequest, ImageUpdateAltRequest, ImageUpdateOrderRequest } from "../dto";
import { EEntityType } from "../enums";

export class ImageService {
  private basePath = '/Image';

  async upload(request: ImageRegisterRequest): Promise<ImageResponse | null> {
    const formData = new FormData();
    formData.append('File', request.file);
    formData.append('EntityType', request.entityType.toString());
    formData.append('EntityId', request.entityId.toString());
    formData.append('ImageType', request.imageType.toString());
    formData.append('SetAsMain', request.setAsMain ? 'true' : 'false');
    if (request.alt) {
      formData.append('Alt', request.alt);
    }

    return await apiClient.uploadFile<ImageResponse>(
      `${this.basePath}/upload_image`,
      formData
    );
  }

  async uploadMultiple(files: File[], entityType: EEntityType, entityId: number): Promise<ImageResponse[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('Files', file));
    formData.append('EntityType', entityType.toString());
    formData.append('EntityId', entityId.toString());
    formData.append('ImageType', '0');
    formData.append('SetFirstAsMain', 'true');

    return await apiClient.uploadFile<ImageResponse[]>(
      `${this.basePath}/upload-multiple`,
      formData
    );
  }

  async delete(request: ImageDeleteRequest): Promise<boolean> {
    return await apiClient.delete<boolean>(`${this.basePath}/delete_image`, request);
  }

  async setMain(request: ImageSetMainRequest): Promise<boolean> {
    return await apiClient.put<boolean>(`${this.basePath}/set_main_image`, request);
  }

  async updateAlt(request: ImageUpdateAltRequest): Promise<boolean> {
    return await apiClient.put<boolean>(`${this.basePath}/update-alt`, request);
  }

  async updateOrder(request: ImageUpdateOrderRequest): Promise<boolean> {
    return await apiClient.put<boolean>(`${this.basePath}/update-order`, request);
  }

  async getById(id: number): Promise<ImageResponse | null> {
    return await apiClient.get<ImageResponse | null>(`${this.basePath}/get_by_id/${id}`);
  }

  async getByEntity(entityType: EEntityType, entityId: number): Promise<ImageResponse[]> {
    return await apiClient.get<ImageResponse[]>(
      `${this.basePath}/get_by_id/${entityType}/${entityId}`
    );
  }

  async getMainImage(entityType: EEntityType, entityId: number): Promise<ImageResponse | null> {
    return await apiClient.get<ImageResponse | null>(
      `${this.basePath}/get_main_image/${entityType}/${entityId}/main`
    );
  }

  async download(id: number): Promise<Blob> {
    const response = await apiClient.getClient().get(`${this.basePath}/download/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  }

  async deleteEntityImages(entityType: EEntityType, entityId: number): Promise<boolean> {
    return await apiClient.delete<boolean>(
      `${this.basePath}/entity/${entityType}/${entityId}`
    );
  }
}

export const imageService = new ImageService();