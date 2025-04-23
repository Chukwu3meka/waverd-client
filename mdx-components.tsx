import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    hr: () => <hr className="my-2.5" />,
    a: ({ children, ...props }) => (
      <a className="font-bold cursor-pointer" {...props}>
        {children}
      </a>
    ),
    p: ({ children }) => <p className="text-base">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-2.5 mb-1">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-2.5 mb-1">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-2.5 mb-1">{children}</h3>,
    img: (props) => <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...(props as ImageProps)} />,

    ...components,
  };
}
