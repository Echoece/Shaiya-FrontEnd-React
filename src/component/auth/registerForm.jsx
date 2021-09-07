import Form from "../util/form/form";
import * as Joi from "joi-browser";
import {register} from "../../service/userService";
import {loginWithJWT} from "../../service/authService";

class RegisterForm extends Form {
    state ={
        data:{
            username:'',
            password:'',
            name:''
        },
        errors:{}
    }

    schema = {
        username: Joi
            .string()
            .required()
            .label('Username'),
        password: Joi
            .string()
            .required()
            .min(5)
            .label('Password'),
        name: Joi
            .string()
            .required()
            .label('Name')
    };

    doSubmit=async ()=> {
        try{
            const response = await register(this.state.data);
            loginWithJWT(response.headers['x-auth-token']);
            window.location='/';
        }catch (e) {
            if(e.response && e.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});

            }
        }
    }
    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username','Username')}
                    {this.renderInput('password','Password', 'Password Must be at least 6 characters','password')}
                    {this.renderInput('name','Name')}
                    {this.renderButton('Register')}
                </form>

            </div>
        );
    }
}

export default RegisterForm;