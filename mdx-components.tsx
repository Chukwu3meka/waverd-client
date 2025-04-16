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
    h1: ({ children }) => <h1 className="text-4xl font-extrabold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold  mt-2.5">{children}</h2>,
    img: (props) => <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...(props as ImageProps)} />,
    ...components,
  };
}
