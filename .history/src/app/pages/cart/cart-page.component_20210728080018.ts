import { Component } from "@angular/core";
import { CartBaseComponent } from "./cart-base.component";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart-page",
  styleUrls: ["cart-page.component.css"],
  templateUrl: "cart-page.component.html"
})
export class CartPageComponent extends CartBaseComponent {
  constructor(protected cartService: CartService) {
    super(cartService);
  }

  razorpayResponse: boolean;
  changeQuantity = (cart, quantity) => {
    cart.quantity = quantity;
    this.cartService.reloadCart(this.cartList);
  };

  payWithRazor() {
    let options: any = {
      key: "rzp_test_PtdYuN9s54bmKz", // change this key in live mode
      amount: 59900,
      name: "Sample Company",
      description: "Pay with ease to get more insights.",
      image: "../../../assets/imgs/logo.png",
      modal: {
        escape: false
      },
      prefill: {
        name: "Hyse Academy",
        contact: "919812618920",
        email: "hyse@gmail.com"
        // "method": 'card',
        // 'card[number]': finalObj.cardDetail.cardNumber,
        // 'card[expiry]': finalObj.cardDetail.cardExpDate,
        // 'card[cvv]': finalObj.cardDetail.cardCvv
      },
      notes: {
        // "address": finalObj.addressDetail.address + ', ' + finalObj.addressDetail.landmark + ', ' + finalObj.addressDetail.city + ', ' + finalObj.addressDetail.state + '-' + finalObj.addressDetail.pincode
      },
      theme: {
        color: "#2c50ee"
      }
    };
    options.handler = response => {
      options["payment_response_id"] = response.razorpay_payment_id;
      console.log(options);
      // Send options information to backend

      // ASK ABOUT THIS
    };
    options.modal.ondismiss = () => {
      // Can be used for analytics
      // this.loginService.SetLoader = false;
    };
    let rzp = new this.cartService.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
