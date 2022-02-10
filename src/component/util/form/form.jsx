import {Component} from "react";
import * as Joi from "joi-browser";
import Input from "./input";
import Select from "./select";


// requires joy-browser to validate,


class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    // submit button onSubmit handler
    handleSubmit = event => {
        // preventing default behaviour of submit button
        event.preventDefault();
        //checking for errors
        const error = this.validates();
        this.setState({errors: error || {}});

        if (error)
            return;
        // if no error proceed with post of form data
        this.doSubmit();
    }

    // method for handling onChange of controlled component
    handleChange = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        const {name, value} = e.currentTarget;

        if (errorMessage)
            errors[name] = errorMessage;
        else
            delete errors[name];

        const data = {...this.state.data};
        data[name] = value;
        this.setState({data, errors});

    }

    // validating single form input/property
    validateProperty(currentTarget) {
        const {name, value} = currentTarget;
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]}
        const {error} = Joi.validate(obj, schema);

        if (!error)
            return null;

        return error.details[0].message;
    }

    // validates the whole form with joi
    validates = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.data, this.schema, options);

        if (!error)
            return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;
    }

    // rendering the button , it only takes a label as prop
    renderButton = (label) => {
        return (
            <button
                className="btn btn-primary"
                disabled={this.validates()}
            >
                {label}
            </button>
        )
    }

    // rendering input field
    renderInput = (name, label, help_text, type = 'text') => {
        const {data, errors} = this.state;
        return (
            <Input name={name}
                   type={type}
                   label={label}
                   value={data[name]}
                   onChange={this.handleChange}
                   help_text={help_text}
                   error={errors[name]}
            />
        )
    }

    // render select field
    renderSelect = (name, label, options) => {
        const {data, errors} = this.state;
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        )
    }
}
export default Form;