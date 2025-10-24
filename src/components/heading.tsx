interface HeadingProps {
  text: string;
}

export const Heading = ({ text }: HeadingProps) => {
  return (
    <h1 className="text-8xl font-bold font-badtyp  text-primary">{text}</h1>
  );
};
