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

  checkout() {}
}
