import React from 'react';

const ListGroup = (props) => {
    const {Items,textProperty,valueProperty,selectedOption,onItemSelect}=props;
    return (
        <ul className="list-group btn">
            {Items.map(element=>
                <li key={element[valueProperty]}
                    className={selectedOption===element?"clickable list-group-item active":"clickable list-group-item text-primary"}
                    onClick={()=>onItemSelect(element)}
                >
                    {element[textProperty]}
                </li>
            )}
        </ul>
    );
};

ListGroup.defaultProps ={
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;
