"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type GemstoneCategory = {
  id: string
  name: string
  slug: string
  image: string
  description?: string
}

const gemstoneCategories: GemstoneCategory[] = [
  { id: "1", name: "Sapphire Blue", slug: "sapphire-blue", image: "/assets/img/product/gem-1.jpg", description: "Beautiful blue sapphires from Sri Lanka" },
  { id: "2", name: "Sapphire Yellow", slug: "sapphire-yellow", image: "/assets/img/product/gem-2.jpg", description: "Stunning yellow sapphires" },
  { id: "3", name: "Sapphire White", slug: "sapphire-white", image: "/assets/img/product/gem-3.jpg", description: "Elegant white sapphires" },
  { id: "4", name: "Sapphire Bi-Color", slug: "sapphire-bi", image: "/assets/img/product/gem-4.jpg", description: "Unique bi-color sapphires" },
  { id: "5", name: "Sapphire Green", slug: "sapphire-green", image: "/assets/img/product/gem-5.jpg", description: "Rare green sapphires" },
  { id: "6", name: "Sapphire Pink", slug: "sapphire-pink", image: "/assets/img/product/gem-6.jpg", description: "Delicate pink sapphires" },
  { id: "7", name: "Sapphire Purple", slug: "sapphire-purple", image: "/assets/img/product/gem-7.jpg", description: "Royal purple sapphires" },
  { id: "8", name: "Sapphire Natural", slug: "sapphire-natural", image: "/assets/img/product/gem-8.jpg", description: "Natural unheated sapphires" },
  { id: "9", name: "Spinel", slug: "spinel", image: "/assets/img/product/spinel.jpg", description: "Vibrant spinel gemstones" },
  { id: "10", name: "Garnet", slug: "garnet", image: "/assets/img/product/garnet.jpg", description: "Rich red garnets" },
  { id: "11", name: "Spessartite", slug: "spessartite", image: "/assets/img/product/Spessartite.jpg", description: "Orange spessartite garnets" },
  { id: "12", name: "Topaz", slug: "topaz", image: "/assets/img/product/topaz.jpg", description: "Brilliant topaz gemstones" },
  { id: "13", name: "Quartz", slug: "quartz", image: "/assets/img/product/quarts.jpg", description: "Crystal clear quartz" },
  { id: "14", name: "Aquamarine", slug: "aquamarine", image: "/assets/img/product/aquamarine.jpg", description: "Ocean blue aquamarine" },
  { id: "15", name: "Chrysoberyl", slug: "chrysoberyl", image: "/assets/img/product/chrysoberyl.jpg", description: "Rare chrysoberyl stones" },
  { id: "16", name: "Zircon", slug: "zircon", image: "/assets/img/product/zircon.jpg", description: "Sparkling zircon gemstones" },
]

export default function GemstoneCategoriesPage() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 mb-3">Gemstone Categories</h1>
          <p className="lead text-muted">
            Explore our collection of precious gemstones from Sri Lanka
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {gemstoneCategories.map((category) => (
          <div key={category.id} className="col">
            <LocalizedClientLink
              href={`/store?category=${category.slug}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm category-card">
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "200px" }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-img-top category-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title mb-2">{category.name}</h5>
                  {category.description && (
                    <p className="card-text text-muted small mb-3">
                      {category.description}
                    </p>
                  )}
                  <span className="btn btn-outline-primary btn-sm">
                    View Products
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          </div>
        ))}
      </div>

      {/* Browse All Link */}
      <div className="row mt-5">
        <div className="col-12 text-center">
          <LocalizedClientLink
            href="/store"
            className="btn btn-primary btn-lg"
          >
            Browse All Products
          </LocalizedClientLink>
        </div>
      </div>

      <style jsx>{`
        .category-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
        }

        .category-card:hover .category-img {
          transform: scale(1.1);
        }

        .category-img {
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  )
}
