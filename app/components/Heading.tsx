interface HeadingProps {
  title: string;
  center?: boolean;
  subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  center,
  subtitle,
}): JSX.Element => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle && (
        <div className="my-2 font-normal text-neutral-700">{subtitle}</div>
      )}
    </div>
  );
};

export default Heading;
