import React, {Component} from 'react';

class Select extends Component {

    render() {
        const {name,label,options,error,...rest}=this.props;
        return (
            <div className='form-group'>
                <label htmlFor={name}>{label}</label>
                <select name={name} id={name} {...rest} className="form-control">
                    <option value=""/>
                    {options.map(element=>(
                        <option key={element._id} value={element._id}>
                            {element.name}
                        </option>
                    ))}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default Select;