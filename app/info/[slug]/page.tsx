import type { Metadata } from "next";
import { INFO_PAGES } from "@lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return INFO_PAGES.map((page) => ({ slug: page }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/components/info/${slug}.mdx`);
  return metadata ? { title: metadata.title, keywords: metadata.keywords, description: metadata.description } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const InfoPage = await import(`@/components/info/${slug}.mdx`).then((mod) => mod.default);

  return <InfoPage />;
}
