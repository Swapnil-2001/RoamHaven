import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";

interface AvatarProps {
  isUserLoggedIn: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ isUserLoggedIn }): JSX.Element => {
  return isUserLoggedIn ? (
    <BsFillPersonFill size={28} className="text-indigo-500" />
  ) : (
    <Image
      src="/images/placeholder.jpg"
      alt="Avatar"
      height={30}
      width={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
