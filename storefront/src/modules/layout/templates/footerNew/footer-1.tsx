import React from "react"
import Image from "next/image"
import Link from "next/link"
// internal
import { Email, Location } from "@svg"

interface FooterProps {
  style_2?: boolean
  style_3?: boolean
  primary_style?: boolean
}

const social_data = [
  {
    id: 1,
    link: "https://www.facebook.com/hamed.y.hasan0",
    icon: "fa-brands fa-facebook-f",
    title: "Facebook",
  },
  {
    id: 2,
    link: "https://twitter.com/HamedHasan75",
    icon: "fa-brands fa-twitter",
    title: "Twitter",
  },
  {
    id: 3,
    link: "nkedin.com/in/hamed-hasan/",
    icon: "fa-brands fa-linkedin-in",
    title: "Linkedin",
  },
  {
    id: 4,
    link: "https://vimeo.com/",
    icon: "fa-brands fa-vimeo-v",
    title: "Vimeo",
  },
]

const NewFooter: React.FC<FooterProps> = ({
  style_2 = false,
  style_3 = false,
  primary_style = false,
}): JSX.Element => {
  return (
    <footer>
      <div
        className={`tp-footer-area ${
          primary_style
            ? "tp-footer-style-2 tp-footer-style-primary tp-footer-style-6"
            : ""
        } ${
          style_2
            ? "tp-footer-style-2"
            : style_3
            ? "tp-footer-style-2 tp-footer-style-3"
            : ""
        }`}
        data-bg-color={`${style_2 ? "footer-bg-white" : "footer-bg-grey"}`}
      >
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row">
              {/* --- Column 1: Logo & Social --- */}
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image
                          src="/assets/img/logo/crowncut-logonb.png"
                          alt="CrownCut Logo"
                          width={200}
                          height={80}
                          priority
                        />
                      </Link>
                    </div>

                    <div className="tp-footer-social">
                      {social_data.map(
                        (s: {
                          id: number | string
                          link: string
                          icon: string
                        }) => (
                          <a
                            href={s.link}
                            key={s.id}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className={s.icon}></i>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Column 2: My Account --- */}
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">My Account</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a href="#">Track Orders</a>
                      </li>
                      <li>
                        <a href="#">Shipping</a>
                      </li>
                      <li>
                        <a href="#">Wishlist</a>
                      </li>
                      <li>
                        <a href="#">My Account</a>
                      </li>
                      <li>
                        <a href="#">Order History</a>
                      </li>
                      <li>
                        <a href="#">Returns</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* --- Column 3: Information --- */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Information</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a href="#">Our Story</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="#">Latest News</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* --- Column 4: Contact --- */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">Talk To Us</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <span>Got Questions? Call us</span>
                      <h4>
                        <a href="tel:+966595035008">+966 595 035 008</a>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a href="mailto:swe.hamedhasan@gmail.com">
                              swe.hamedhasan@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642,+USA/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              79 Sleepy Hollow St. <br /> Jamaica, Jeddah 1432
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Bottom --- */}
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p>
                      © {new Date().getFullYear()} All Rights Reserved | Next.js
                      Template by <Link href="/">❤</Link>.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-footer-payment text-md-end">
                    <p>
                      <Image
                        src="/assets/img/footer/footer-pay.png"
                        alt="Payment Methods"
                        width={250}
                        height={40}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default NewFooter
