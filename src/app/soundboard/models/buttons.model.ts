export interface SoundboardButton {
    name: string;
    description: string;
    color: string;
    fileName: string;
    fileType: string;
}

export interface UploadedFileApiResponse {
    fileName: string;
    fileType: string;
    size: number;
}