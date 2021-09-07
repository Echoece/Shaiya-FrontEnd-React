import React, {Component, Fragment} from 'react';
import Input from "../../util/form/input";
import test from '../../../assets/test1.png'

class Products extends Component {
    state={
        product:{},
        quantity: 1
    }

    render() {
        const {product} = this.props;
        return (
            <Fragment>
                <div className="card m-2 w-25 h-auto bg-light">
                    <img
                        src={test}
                        alt=""
                        className="img-fluid h-25 w-25"/>
                    <div className="card-body">
                        <div className="row">
                            <div className="card-title">
                                <h5 className='text-center'>{product.name}</h5>
                                <h6>price: {product.price}</h6>
                                <p>{product.category}</p>
                            </div>
                        </div>
                        <hr/>
                        <p>
                            {product.description}
                        </p>
                        {/* const {name,label,value,onChange,error,help_text,type,placeholder} = this.props;*/}
                        <div className='w-50'>
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
            </Fragment>
        );
    }

    QuantityChangeHandle =(event)=> {
        const value = parseInt(event.currentTarget.value);
        value <= 50? this.setState({quantity:value }): this.setState({quantity: 50});
    }


}

export default Products;