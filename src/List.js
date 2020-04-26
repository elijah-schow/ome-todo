import React from 'react';
import PropTypes from 'prop-types';

const List = ({ list }) => {
    return (
        <ul className="list">
            {list.map((item) => (
                <li className="list-item" key={item.id}>
                    <div className="list-name">{item.name}</div>
                    <div classNAme="list-description">{item.description}</div>
                    <div classNAme="list-dates">
                        {item.due && <span>Due {item.due.toString()}</span>}
                        {item.due && item.done && <span> &mid; </span>}
                        {item.done && <span>Done {item.done.toString()}</span>}
                    </div>
                </li>
            ))}
        </ul>
    );
};

List.propTypes = {
    list: PropTypes.array.isRequired
};

export default List;