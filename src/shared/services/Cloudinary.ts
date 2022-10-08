import { unlink } from "fs/promises";
import cloudinary from "cloudinary";
import AppError from "../../shared/utils/AppError";

class UploadService {
  private uploader: any;

  constructor() {
    this.uploader = cloudinary.v2.uploader.upload;
  }

  async execute({
    resourceType,
    publicId,
    filePath,
    reqBody,
  }: any): Promise<void> {
    try {
      const image = await this.uploader(filePath, {
        resource_type: resourceType,
        public_id: publicId,
        overwrite: true,
      });
      reqBody.avatar = image.secure_url;
      await unlink(`${filePath}`);
    } catch (error) {
      await unlink(`${filePath}`);
      throw new AppError("An Error occurred while uploading file", 500);
    }
  }
}

export default UploadService;
