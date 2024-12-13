import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from '@/utils/cropImageUtils'; // 确保此工具函数支持 base64 输出

type AvatarUploaderProps = {
  onSave: (croppedImage: Blob | string) => void; // 修改为可以接受 Blob 或 Base64 字符串
  aspectRatio?: number; // 添加比例属性
  outputFormat?: 'blob' | 'base64'; // 添加输出格式属性
};

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onSave,
  aspectRatio = 1,
  outputFormat = 'blob',
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // 处理图片上传
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  });

  // 裁剪完成的回调
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  // 自动保存裁剪后的图片
  useEffect(() => {
    const handleAutoSave = async () => {
      try {
        if (imageSrc && croppedAreaPixels) {
          const croppedImage = await getCroppedImg(
            imageSrc,
            {
              x: croppedAreaPixels.x,
              y: croppedAreaPixels.y,
              width: croppedAreaPixels.width,
              height: croppedAreaPixels.height,
            },
            outputFormat,
          );
          onSave(croppedImage); // 根据选择的格式保存图像
        }
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    };

    if (croppedAreaPixels) {
      handleAutoSave();
    }
  }, [croppedAreaPixels, imageSrc, onSave, outputFormat]);

  return (
    <div className='text-center transition-all'>
      {!imageSrc ? (
        <div
          {...getRootProps()}
          className='bg-neutral border-dashed rounded-lg cursor-pointer flex border-2 border-gray-300 h-32 mb-4 center hover:border-secondary'
        >
          <input {...getInputProps()} />
          <p className='text-gray-500'>Drag or Click to choose picture</p>
        </div>
      ) : (
        <div className='bg-neutral h-64 mb-4 w-full relative card-rounded overflow-hidden'>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio} // 使用传递的比例
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />

          <button
            className='rounded-full bg-white/50 text-primary p-4 top-4 right-4 backdrop-blur-sm center absolute hover:bg-hover hover:text-white active:bg-primary active:text-white'
            onClick={() => setImageSrc(null)}
          >
            <i className='flex text-lg fi fi-br-cross'></i>
          </button>
        </div>
      )}
      {imageSrc && (
        <div className='flex mt-12 mb-6 gap-4 justify-center'>
          <input
            type='range'
            min={1}
            max={5}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className='range-slider'
          />
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
