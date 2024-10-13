import "./globals.css";
import { Nunito } from "next/font/google";
import { Providers } from "./Providers";
import Navbar from "@/components/Elements/Navbar";
import { Toaster } from "@/components/Toaster"

const Nunito_Font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Discover Your Next Ride: Explore Our Collection of Available Cars",
  description: "Browse through our curated selection of cars available for sale. Whether you're in the market for a reliable sedan, a rugged SUV, or a sporty hatchback, we've got something for everyone. Each listing includes detailed information about the car's model, price, mileage, and features, along with high-quality images to help you make an informed decision.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Nunito_Font.className}>
        <Providers><Navbar/>{children}<Toaster/></Providers>
      </body>
    </html>
  );
}
