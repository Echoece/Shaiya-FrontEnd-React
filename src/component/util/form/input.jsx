import React, {Component} from 'react';

class Input extends Component {

    render() {
        const {name,label,value,onChange,error,help_text,type,placeholder} = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name} className='text-info'>{label}</label>
                <input id={name}
                       type={type}
                       name={name}
                       value={value}
                       onChange={onChange}
                       placeholder={placeholder}
                       className="form-control"/>
                <small id="passwordHelp" className="form-text text-muted">{help_text}</small>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default Input;