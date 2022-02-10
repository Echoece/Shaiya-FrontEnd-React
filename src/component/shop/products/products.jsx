import React, {Component, Fragment} from 'react';
import Input from "../../util/form/input";
import test from '../../../assets/top1.png'
import './product.css'

class Products extends Component {
    state={
        product:{},
        quantity: 1
    }

    render() {
        const {product} = this.props;
        return (
                <div className="m-2 w-25 h-auto custom_card">
                    <div className="text-center">
                        <img
                            src={test}
                            alt=""
                            className="img-fluid  "/>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="card-title text-white">
                                <h4 className='text-center'>{product.name}</h4>
                                <h6 className='text-center'>Price: {product.price}</h6>
                                <h6 className='text-center'>Type: {product.category}</h6>
                            </div>
                        </div>
                        <hr/>
                        <div className='text-white'>
                            <p className='text-center overflow-hidden'>
                                {product.description}
                            </p>
                        </div>

                        {/* const {name,label,value,onChange,error,help_text,type,placeholder} = this.props;*/}
                        <div className='text-center'>
                            <Input name='quantity'
                                   help_text='max amount : 50'
                                   label='Amount'
                                   onChange={this.QuantityChangeHandle}
                                   type='number'
                                   value={this.state.quantity}
                            />
                        </div>
                        <hr/>
                        <div className="text-center">
                            <button
                               className='btn btn-danger'
                               onClick={()=>this.props.cartHandler(product, this.state.quantity)}>Add to Cart</button>
                        </div>
                    </div>
                </div>

        );
    }

    QuantityChangeHandle =(event)=> {
        const value = parseInt(event.currentTarget.value);
        value <= 50? this.setState({quantity:value }): this.setState({quantity: ''});
    }


}

export default Products;