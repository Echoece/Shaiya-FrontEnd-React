import React from 'react';


const ListGroup = (props) => {
    const {Items,textProperty,valueProperty,selectedOption,onItemSelect}=props;

    return (
        <ul className="list-group btn" >
            {Items.map(element=>
                <li key={element[valueProperty]}
                    className={selectedOption===element?"clickable list-group-item active":"clickable list-group-item text-black"}
                    style = {selectedOption===element? {background:'#9b9b65'} :{background: '#535024'}}
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
