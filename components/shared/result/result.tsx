import Image from "next/image";

interface ResultProps {
  title?: string;
  children: React.ReactNode;
  variant: 404 | 403 | 500 | 200;
}

const resultTitle = {
  "200": "Success",
  "500": "Sorry, something went wrong.",
  "404": "Sorry, the page you have visited does not exist.",
  "403": "Sorry, you are not authorized to access this page.",
};

const Result = ({ variant, children, title }: ResultProps) => {
  return (
    <main className="flex items-center justify-center flex-col gap-5 py-10 px-5">
      <Image src={`/images/layouts/${variant}.svg`} width={200} height={200} priority alt="Page not found" className="w-auto h-auto" />

      <p className="font-mono">{title || resultTitle[variant]}</p>

      {children}
    </main>
  );
};

export default Result;
