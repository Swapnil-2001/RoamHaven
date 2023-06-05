import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageInputProps {
  url: string;
  handleChange: (url: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  url,
  handleChange,
}): JSX.Element => {
  const handleImageUpload = (result: any) => {
    handleChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleImageUpload}
      uploadPreset="lfloxsc6"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              if (open) open();
            }}
            className="
              relative
              flex
              cursor-pointer
              flex-col 
              items-center
              justify-center 
              gap-4 
              border-2
              border-dashed
              border-neutral-300
              p-20
              text-neutral-600
              transition
              hover:opacity-70
            "
          >
            <TbPhotoPlus size={40} />
            <div className="text-lg font-semibold">Click to upload</div>
            {url && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={url}
                  alt="Listing"
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageInput;
