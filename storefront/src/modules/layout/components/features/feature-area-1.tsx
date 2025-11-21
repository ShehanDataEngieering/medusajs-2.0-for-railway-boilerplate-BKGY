import React from 'react';
import { Delivery, Discount, Refund, Support } from '@svg';

interface FeatureItem {
  id: string;
  Icon: React.ComponentType;
  title: string;
  subtitle: string;
}

export const feature_data: FeatureItem[] = [
  {
    id: 'delivery',
    Icon: Delivery,
    title: 'Free Delivery',
    subtitle: 'Orders from all item'
  },
  {
    id: 'refund',
    Icon: Refund,
    title: 'Return & Refund',
    subtitle: 'Money back guarantee'
  },
  {
    id: 'discount',
    Icon: Discount,
    title: 'Member Discount',
    subtitle: 'Onevery order over $140.00'
  },
  {
    id: 'support',
    Icon: Support,
    title: 'Support 24/7',
    subtitle: 'Contact us 24 hours a day'
  },
];

const FeatureAreaOne: React.FC = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tp-feature-area.tp-feature-border-2 .tp-feature-icon-2 span {
              color: #B6AE9F !important;
            }
            .tp-feature-area.tp-feature-border-2 .tp-feature-icon-2 span svg {
              color: #B6AE9F !important;
              stroke: #B6AE9F !important;
            }
          `,
        }}
      />
      <section className={`tp-feature-area tp-feature-border-2 pb-80`}>
        <div className="container">
          <div className="row align-items-center">
            {feature_data.map((item) => (
              <div key={item.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="tp-feature-item-2 d-flex align-items-start mb-40">
                  <div className="tp-feature-icon-2 mr-10">
                    <span>
                      <item.Icon />
                    </span>
                  </div>
                  <div className="tp-feature-content-2">
                    <h3 className="tp-feature-title-2">{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureAreaOne;