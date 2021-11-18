import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/products.service";
import { Product } from "../../model/product";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  public products: Array<Product>;
  private sub;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }
  productdata = [
    {
      _id: "60fa1fd81872c62d109adf90",
      title: "Blue Stripe Stoneware Plate",
      brand: "Kiriko",
      price: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at pu...",
      image: "blue-stripe-stoneware-plate.jpg"
    },
    {
      _id: "60fa1fd81872c62d109adf90",
      title: "Blue Stripe Stware Plate",
      brand: "Kio",
      price: 20,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at pu...",
      image: "hand-painted-blue-flat-dish.jpg"
    }
  ];
  load = () => {
    this.products = this.productdata;
    // this.productService
    //   .getProducts("http://localhost:3000/products")
    //   .subscribe(res => {
    //     this.products = res["data"];
    //   });
  };
  addToCart = product => {
    this.cartService.addToCart({ product, quantity: 1 });
  };
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
