import Image from "next/image";

const Logo: React.FC = (): JSX.Element => {
  return (
    <div className="lg:w-1/3">
      <Image
        src="/images/logo.png"
        alt="App Logo"
        height={100}
        width={100}
        className="hidden cursor-pointer md:block"
      />
    </div>
  );
};

export default Logo;
