import React, {Component} from 'react';

import ListGroup from "../util/listGroup";
import Cart from "./cart/cart";
import Products from "./products/products";
import {paginate} from "../../util/paginate";
import Pagination from "../util/pagination";
import _ from "lodash";
import {checkout, getAllProduct} from "../../service/shop/productService";
import Loading from "../util/loading";


class Shop extends Component {
    state = {
        // product and cart data
        allProducts: [],
        cart:[],
        // category for sidebar
        allCategories: [
            {
                _id:null,
                name: 'All Products'
            },
            {
                _id: 'gears',
                name: 'Gears'
            },
            {
                _id: 'weapons',
                name: 'Weapons'
            },
            {
                _id: 'capes',
                name: 'Capes'
            },
            {
                _id: 'accessories',
                name: 'Accessories'
            }
        ],
        // pagination, sorting
        currentPage: 1,
        pageCount: 5,
        selectedCategory: {
            _id:null,
            name: 'All Products'
        },
        sortColumn: {path: 'name', order: 'asc'},

        id:0,
        purchaseStatus: 'shopping'
    }


    async componentDidMount() {
        const {data:productData} = await getAllProduct();
        //const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1'); sample of async await
        this.setState({allProducts:productData});
    }


    render() {
        if (this.state.allProducts.length === 0)
            return (
                <div className='container d-flex justify-content-center'>
                    <Loading color='#79edda' type='spin'/>
                </div>
            )

        // if there is product,
        const {allCategories, selectedCategory, pageCount, currentPage,cart, purchaseStatus,searchQuery} = this.state;
        const {totalCount, data:products} = this.getPageData();


        return (
            <div className='row m-2'>
                <div className="col-2">
                    <ListGroup Items={allCategories}
                               selectedOption={selectedCategory}
                               onItemSelect={this.handleOptionSelect}/>
                </div>
                <div className="col-7 row" >
                    {products.map(element => <Products key={element.id} product={element} cartHandler={this.AddToCartHandle}/>)}
                    <Pagination itemCount={totalCount}
                                pageSize={pageCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}/>
                </div>
                <div className="col-3">
                    <Cart items={cart}
                          status={purchaseStatus}
                          buyAll={this.CartBuyAllHandler}
                          deleteOne={this.RemoveItemHandler}
                          deleteAll={this.CartDeleteAllHandler}/>
                </div>
            </div>
        );
    }

    // category sidebar click handler
    handleOptionSelect = (productCategory) => {
        console.log(productCategory);
        this.setState({selectedCategory: productCategory, currentPage: 1})
    };

    // pagination page change handler
    handlePageChange = (pageNumber)=>{
        this.setState({currentPage:pageNumber});
    };

    //pagination , sorting and list group filtering
    getPageData = () => {
        const {allProducts,currentPage,pageCount,sortColumn,selectedCategory} = this.state;

        let filtered=allProducts;

        // list Group
        if(selectedCategory && selectedCategory._id)
            filtered=allProducts.filter( element=> element.category === selectedCategory._id);

        // sorting
        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);

        // pagination
        const products = paginate(sorted,currentPage,pageCount);

        return {
            totalCount: filtered.length,
            data:products
        };
    }

    //          cart handlers
    //-------------------------------------

    // buy all item handler
    CartBuyAllHandler=async ()=> {
        const goods = [...this.state.cart];

        // creating DTO object for checkout request
        let productList=[];
        goods.map(element=> productList.push({id:element.product.id, quantity:element.quantity}) );

        const {data} = await checkout(productList);

        if(data==='success!')
            this.setState({purchaseStatus:'success', cart: []})
        else if (data === 'failed')
            this.setState({purchaseStatus:'failed'})

     }

    // removing single item handler
    RemoveItemHandler= (product) =>{
        let allProduct= [...this.state.cart];
        allProduct=allProduct.filter(element => element.product !== product);
        this.setState({cart:allProduct});
    }

    // delete all item handler
    CartDeleteAllHandler= ()=>{
        this.setState({cart:[]})
    }

    // adding product in cart, may have some room for improvement in the logic (to-do)
    AddToCartHandle= (product,quantity)=> {

        const cart = [...this.state.cart];
        const productDetail = {
            product: product,
            quantity,
            totalCost: product.price * quantity,
        }

        // checking if the product is already present in the cart
        const isPresent = cart.find(element=> element.product === product);
        let  updatedCart;

        // if product is not present in the cart, add the product
        if(!isPresent){
             updatedCart = [...cart, productDetail];
        }

        // if present, update the product quantity and total price
        else {
            cart.forEach(element => {
                if(element.product=== product){
                    element.quantity += quantity;
                    element.totalCost += product.price * quantity;
                }
            })
            updatedCart= cart;
        }

        // finally update the state with updated cart
        this.setState({cart:updatedCart,purchaseStatus: 'shopping'});
    }
}

export default Shop;