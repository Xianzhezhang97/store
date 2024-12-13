// utils/cropImageUtils.ts
export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  format: 'blob' | 'base64',
): Promise<Blob | string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Failed to get canvas context'));
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      if (format === 'base64') {
        const base64Image = canvas.toDataURL('image/png'); // 输出 PNG 格式，确保透明度
        resolve(base64Image);
      } else {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          'image/png', // 使用 PNG 格式输出，确保透明度
          1,
        );
      }
    };

    image.onerror = (error) => {
      reject(new Error('Failed to load image'));
    };
  });
};
