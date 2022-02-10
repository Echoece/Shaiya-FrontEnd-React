import React, {Component} from 'react';
import './cart.css';

class Cart extends Component {

    render() {
        const {status,items, deleteAll, deleteOne, buyAll} = this.props;

        if (status!=='shopping' && status=== 'success')
            return <h1 className='text-center text-success'>Purchase Successful</h1>
        else if (status!=='shopping' && status === 'failed')
            return <h1 className='text-center text-danger'>Not Enough Point....</h1>

        else if (items.length === 0)
            return <p>Cart is Empty</p>

        return (
            <div className='container cart'>
                <div className='text-end'>
                    <h4>Balance<br/></h4>
                    <b>100000 </b>DP
                </div>
                <br/> <br/>

                <div className='text-end'>
                     Total <b>{items.length} </b>items in cart
                </div>

                <hr/>
                <table className=" table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col" className="border-0">
                            <div className="p-2 px-3 text-uppercase ">Name</div>
                        </th>
                        <th scope="col" className="border-0 ">
                            <div className="p-2 text-uppercase ">Quantity</div>
                        </th>
                        <th scope="col" className="border-0 ">
                            <div className="p-2 text-uppercase  ">Cost</div>
                        </th>
                        <th scope="col" className="border-0 ">
                            <div className="p-2 text-uppercase  "/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(
                        element => (
                            <tr key={element.product.id}>
                                <td className="border-0 align-middle text-center">{element.product.name} </td>
                                <td className="border-0 align-middle text-center">{element.quantity} </td>
                                <td className="border-0 align-middle text-center"><b>{element.totalCost}</b></td>
                                <td>
                                    <button className='btn btn-sm btn-danger m-2'
                                            onClick={() => deleteOne(element.product)}> Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>

                <hr/>

                <div className='text-end'>
                    Total Price : <b>{this.totalPrice(items)}</b> DP
                </div>

                <div className='flex-row  text-end'>
                    <button className="btn btn-primary btn-sm"
                            onClick={buyAll}>
                        Buy all
                    </button>
                    <button className="btn btn-danger m-2 btn-sm"
                            onClick={deleteAll}>
                        Remove all
                    </button>
                </div>

            </div>


        );
    }


    // calculating total price
    totalPrice = data => {
        return <> {data.reduce((prev, current) => {
            return prev + current.totalCost
        }, 0)}</>;
    }


}

export default Cart;