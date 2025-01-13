import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";
import Link from "next/link";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${inter.variable} bg-gradient-to-r from-purple-300 to-indigo-500 text-white`}
    >
      <body className="bg-gradient-to-r from-purple-300 to-indigo-500">
        <section className="min-h-screen">
          <AlertBanner />
          <main>{children}</main>
          <footer className="bg-gradient-to-r from-purple-300 to-indigo-500 py-12">
            <div className="container mx-auto px-5">
              {footer.length > 0 ? (
                <PortableText
                  className="prose-sm text-pretty bottom-0 w-full max-w-none bg-white py-12 text-center md:py-20"
                  value={footer as PortableTextBlock[]}
                />
              ) : (
                <div className="flex flex-col items-center py-28 lg:flex-row">
                  <h3 className="mb-10 text-center text-white text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-center lg:text-5xl">
                    Thank You For Visiting
                  </h3>
                  <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
                    {/* Update this href */}
                    <Link href="/">
      <button className="mx-3 mb-6 border rounded-md bg-white py-3 px-12 font-bold text-blue-700 transition-colors duration-200 hover:bg-gray-200">
        Back to Home
      </button>
    </Link>
                  </div>
                </div>
              )}

              {/* Comment Form Section */}
              <div className="bg-purple-500 py-8 px-5 mt-10 rounded-lg shadow-xl max-w-md mx-auto">
                <h3 className="text-xl font-bold text-blue-600 text-center mb-6">
                  Please Leave a Comment
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="mt-4 px-6 py-2 bg-blue-700 text-white font-bold text-lg rounded-md hover:bg-blue-600 transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </footer>
        </section>
        <VisualEditing />
        <SpeedInsights />
      </body>
    </html>
  );
}
