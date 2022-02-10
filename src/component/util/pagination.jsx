import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Pagination = (props) => {
    const {itemCount,pageSize,currentPage,onPageChange}=props;

    //getting pages array  (lodash function)
    const pagesCount = Math.ceil(itemCount/pageSize);
    if(pagesCount === 1)
        return null;
    const pages=_.range(1,pagesCount+1);

    // returning the component
    return (
        <nav>
            <ul className="pagination">
                {pages.map(element =>
                    <li key={element} className={element===currentPage?"page-item active  m-1": "page-item m-1"}>
                        <Link to="#" className="page-link"
                           onClick={()=> onPageChange(element)}>
                            {element}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pagination;
