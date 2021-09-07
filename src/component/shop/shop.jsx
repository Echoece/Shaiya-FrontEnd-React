import React, {Component} from 'react';

import ListGroup from "../util/listGroup";
import Cart from "./cart/cart";
import Products from "./products/products";
import {paginate} from "../../util/paginate";
import Pagination from "../util/pagination";
import _ from "lodash";

class Shop extends Component {
    state = {
        allProducts: [
            {
                id: 1,
                name: 'product 1',
                category: 'gears',
                price: 300,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },
            {
                id: 2,
                name: 'product 2',
                category: 'gears',
                price: 100,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },
            {
                id: 3,
                name: 'product 3',
                category: 'weapons',
                price: 400,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },
            {
                id: 4,
                name: 'product 4',
                category: 'capes',
                price: 900,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },{
                id: 5,
                name: 'product 1',
                category: 'gears',
                price: 300,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },
            {
                id: 6,
                name: 'product 2',
                category: 'gears',
                price: 100,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },
            {
                id: 7,
                name: 'product 3',
                category: 'weapons',
                price: 400,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            },
            {
                id: 8,
                name: 'product 4',
                category: 'capes',
                price: 900,
                description: ' custom gear made for one player only',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
            }
        ],
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
        cart:[],
        id:0,
        currentPage: 1,
        pageCount: 5,
        selectedCategory: null,
        sortColumn: {path: 'name', order: 'asc'}
    }



    render() {
        if (this.state.allProducts.length === 0)
            return <p>there is no products available</p>

        const {allCategories, selectedCategory, pageCount, currentPage,cart} = this.state;
        const {totalCount, data:products} = this.getPageData();


        return (
            <div className='row m-2'>
                <div className="col-2">
                    <ListGroup Items={allCategories}
                               selectedGenre={selectedCategory}
                               onItemSelect={this.handleOptionSelect}/>
                </div>
                <div className="col-7 row">
                    {products.map(element => <Products key={element.id} product={element} cartHandler={this.AddToCartHandle}/>)}
                    <Pagination itemCount={totalCount}
                                pageSize={pageCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}/>
                </div>
                <div className="col-3">
                    <Cart items={cart}
                          buyAll={this.CartBuyAllHandler}
                          deleteOne={this.RemoveItemHandler}
                          deleteAll={this.CartDeleteAllHandler}/>
                </div>
            </div>
        );
    }

    // category sidebar click handler
    handleOptionSelect = (Level) => {
        this.setState({selectedCategory: Level, searchQuery: '', currentPage: 1})
    }

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
    CartBuyAllHandler= ()=> {

    }


    // removing single item handler
    RemoveItemHandler= (product) =>{
        let allProduct= [...this.state.cart];
        const filtered=allProduct.filter(element => element.product !== product);
        this.setState({cart:filtered});
    }

    // delete all item handler
    CartDeleteAllHandler= ()=>{
        this.setState({cart:[]})
    }

    // adding product in cart, may have some room for improvement in future in the logic
    AddToCartHandle= (product,quantity)=> {

        const cart = [...this.state.cart];
        const productDetail = {
            product: product,
            quantity,
            totalCost: product.price*quantity,
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
                    element.totalCost += product.price*quantity;
                }
            })
            updatedCart= cart;
        }
        // finally update the state with updated cart
        this.setState({cart:updatedCart});
    }
}

export default Shop;