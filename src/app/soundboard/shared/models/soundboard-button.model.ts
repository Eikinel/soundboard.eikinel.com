export interface SoundboardButton {
  id: string;
  name: string;
  description?: string;
  tags?: Tag[];
  category: string;
  color: string;
  fileName: string;
  fileType: string;
  gain: number;
  hide?: boolean;
}

export enum SoundboardButtonEvent {
  CREATED,
  UPDATED,
  DELETED,
}

export interface Tag {
  id: string;
  name: string;
}

export interface UploadedFileApiResponse {
  fileName: string;
  fileType: string;
  size: number;
}
