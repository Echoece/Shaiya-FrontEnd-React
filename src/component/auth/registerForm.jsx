import Form from "../util/form/form";
import * as Joi from "joi-browser";
import {register} from "../../service/auth/userService";
import {loginWithJWT} from "../../service/auth/authService";

class RegisterForm extends Form {
    state ={
        data:{
            username:'',
            password:'',
            email:''
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
            .min(3)
            .label('Password'),

        email: Joi
            .string()
            .required()
            .email()
            .label('Email')
    };

    doSubmit= async ()=> {
        try{
            const response = await register(this.state.data);
            const data = response.data;
            console.log(data);
            if(data.token){
                console.log('success');
                loginWithJWT(data.token);

                window.location='/';
            }

            else if(!data.username || !data.email){
                const errors = {...this.state.errors};
                if(!data.username && !data.email){
                    errors.username = 'username already taken';
                    errors.email ='Email unavailable';
                }
                else if(!data.username)
                    errors.username = 'username already taken';
                else if(!data.email)
                    errors.email ='Email unavailable';

                this.setState({errors});
            }


        }catch (e) {
            if(e.response && e.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                errors.email = e.response.data;
                console.log(e.response.data);
                this.setState({errors});
            }
        }
    }

    render() {
        return (
            <div className="container w-25">
                <h1 className='text-center'>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username','Username')}
                    {this.renderInput('password','Password', 'Minimum of 6 characters','password')}
                    {this.renderInput('email','Email','','email')}
                    <hr/>
                    <div className="text-end">
                        {this.renderButton('Register')}
                    </div>
                </form>

            </div>
        );
    }
}

export default RegisterForm;