import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../model/product";
import { Http, Response } from "@angular/http";
import { Cart } from "../model/cart";
import { Observable } from "rxjs";

@Injectable()
export class CartService {
  constructor(public http: Http) {}
  public cartListSubject = new BehaviorSubject([]);
  public toggleCartSubject = new BehaviorSubject(false);

  toggleCart = () => {
    this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
  };
  addToCart = (cart: Cart) => {
    let current = this.cartListSubject.getValue();
    console.log(this.cartListSubject.getValue());
    console.log(cart);
    let cartData = this.getCart(
      "http://localhost:3000/cart/60f57f204d25b502bc37cbca"
    ).subscribe(res => {
      return res;
    });

    let dup = current.find(c => c.product.title === cart.product.title);
    if (dup) {
      dup.quantity += cart.quantity;
    } else {
      current.push(cart);
    }
    this.updateCart(
      `http://localhost:3000/cart/${cartData.data._id}`,
      current
    ).subscribe(res => {
      console.log("updated cart ", res);
    });
    this.cartListSubject.next(current);
  };
  reloadCart = cartList => {
    this.cartListSubject.next(cartList);
  };
  removeCart = index => {
    let current = this.cartListSubject.getValue();
    current.splice(index, 1);
    this.cartListSubject.next(current);
  };

  getCart(dataURL: string) {
    return this.http
      .get(dataURL)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  updateCart(dataURL: string, body) {
    return this.http
      .post(dataURL, body)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
}
