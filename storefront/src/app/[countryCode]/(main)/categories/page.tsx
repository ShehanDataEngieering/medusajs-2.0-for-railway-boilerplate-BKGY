import { Metadata } from "next"
import GemstoneCategoriesPage from "@modules/categories/components/gemstone-categories"

export const metadata: Metadata = {
  title: "Gemstone Categories",
  description: "Browse our collection of precious gemstones by category.",
}

export default async function CategoriesPage({
  params,
}: {
  params: { countryCode: string }
}) {
  return <GemstoneCategoriesPage />
}
