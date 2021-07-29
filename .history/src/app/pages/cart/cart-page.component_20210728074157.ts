import { Component } from "@angular/core";
import { CartBaseComponent } from "./cart-base.component";
import { CartService } from "../../services/cart.service";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";

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
    this.dialogRef.close({ data: this.form.value });
    let options: any = {
      key: "rzp_test_PtdYuN9s54bmKz", // change this key in live mode
      amount: 59900,
      name: "Omniversity",
      description: "Pay with ease to get more insights.",
      image: "../assets/Logo.png",
      modal: {
        escape: false
      },
      prefill: {
        // "name": finalObj.customerDetail.name,
        // "contact": finalObj.customerDetail.phone,
        // "email": finalObj.customerDetail.email,
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
      this.service
        .saveAllPaymentDataByStudent(
          options,
          localStorage.getItem("token"),
          localStorage.getItem("localProjectId")
        )
        .subscribe(
          res => {
            // TO DO: Add validation for 200
          },
          error => {
            if (error.status > 399) {
              // this.failure = true;
              // this.message = error.error.message;
              alert("Something went wrong");
            } else {
              this.snackBar.open(
                `something went wrong!! ${
                  error.error ? error.error.message : ""
                }`,
                "",
                { duration: 4000 }
              );
            }
          },
          () => this.spinnerService.hide()
        );

      // ASK ABOUT THIS
      this.service.toggleSuccess();
    };
    options.modal.ondismiss = () => {
      // Can be used for analytics
      // this.loginService.SetLoader = false;
    };
    let rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  checkout() {}
}
