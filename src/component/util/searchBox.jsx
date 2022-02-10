import React, {Component} from 'react';
import Input from "./form/input";


class SearchBox extends Component {
    render() {
        const {value,onChange}=this.props;
        return (
            <Input
                type="text"
                name="query"
                className="form-control my-2"
                placeholder="Search for PlayerName Here..."
                value={value}
                onChange={e=>onChange(e.currentTarget.value)}
            />
        );
    }
}

export default SearchBox;