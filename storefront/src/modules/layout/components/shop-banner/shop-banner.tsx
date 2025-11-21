import React from "react"
import Link from "next/link"
import type { StaticImageData } from "next/image"
// internal
import { ArrowRightLong } from "@svg"
import banner_bg_1 from "@assets/img/banner/4/banner-1.jpg"
import banner_bg_2 from "@assets/img/banner/4/banner-2.jpg"
import banner_bg_3 from "@assets/img/banner/4/banner-3.jpg"
import banner_bg_4 from "@assets/img/banner/4/banner-4.png"

type BannerItemProps = {
  cls?: string
  bg_clr: string
  bg: StaticImageData
  content: string
  title: React.ReactNode
  isBtn?: boolean
}

// BannerItem
function BannerItem({
  cls,
  bg_clr,
  bg,
  content,
  title,
  isBtn = false,
}: BannerItemProps) {
  return (
    <div
      className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`#${bg_clr}`}
      style={{ backgroundColor: `#${bg_clr}` }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: `#${bg_clr}`,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      ></div>
      <div
        className="tp-banner-thumb-4 include-bg transition-3"
        style={{ 
          backgroundImage: `url(${bg.src})`,
          opacity: 0.8,
          zIndex: 0
        }}
      ></div>
      <div className="tp-banner-content-4" style={{ position: 'relative', zIndex: 10 }}>
        <span>{content}</span>
        <h3 className="tp-banner-title-4">
          <Link href="/shop">{title}</Link>
        </h3>
        {isBtn && (
          <div className="tp-banner-btn-4">
            <Link href="/shop" className="tp-btn tp-btn-border">
              Shop Now <ArrowRightLong />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const ShopBanner: React.FC = () => {
  return (
    <>
      <section className="tp-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="row">
                <div className="col-xl-12">
                <BannerItem
                    cls="has-brown mb-25"
                    bg_clr="C5C7BC"
                    bg={banner_bg_3}
                    content="New Arrival"
                    title={
                        <>
                          Ardeco pearl <br /> Rings style 2023
                        </>
                      }
                      isBtn={true}
                  />
                 
                </div>
                <div className="col-md-6 col-sm-6">
                <BannerItem
                    cls="has-brown sm-banner"
                    bg_clr="C5C7BC"
                    bg={banner_bg_3}
                    content="New Arrival"
                    title="Gold Jewelry"
                  />
                </div>
                <div className="col-md-6 col-sm-6">
                  <BannerItem
                    cls="has-brown sm-banner"
                    bg_clr="C5C7BC"
                    bg={banner_bg_3}
                    content="New Arrival"
                    title="Gold Jewelry"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="tp-banner-full tp-banner-full-height fix p-relative z-index-1">
                <div
                  className="tp-banner-full-thumb include-bg black-bg transition-3"
                  style={{ backgroundImage: `url(${banner_bg_4.src})` }}
                ></div>
                <div className="tp-banner-full-content">
                  <span>Collection</span>
                  <h3 className="tp-banner-full-title">
                    <Link href="/shop">
                      Ring gold with <br /> diamonds
                    </Link>
                  </h3>
                  <div className="tp-banner-full-btn">
                    <Link href="/shop" className="tp-btn tp-btn-border">
                      Shop Now <ArrowRightLong />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopBanner
