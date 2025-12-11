import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <section className="tp-cart-area pt-60 pb-60">
      <div className="container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="row">
            <div className="col-lg-8">
              <div className="tp-cart-table">
                {!customer && (
                  <div className="mb-20">
                    <SignInPrompt />
                    <Divider />
                  </div>
                )}
                <ItemsTemplate items={cart?.items} />
              </div>
            </div>
            <div className="col-lg-4">
              {cart && cart.region && (
                <div className="tp-cart-checkout-wrapper">
                  <Summary cart={cart as any} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <EmptyCartMessage />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartTemplate
