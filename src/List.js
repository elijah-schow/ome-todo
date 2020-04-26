import React from 'react';
import PropTypes from 'prop-types';

const List = ({ list, actions }) => {
    return (
        <ul className="list list-group">
            {list.map((item) => (
                <li className="list-item list-group-item" key={item.id}>
                    <div className="list-name">{item.name}</div>
                    <div classNAme="list-description">{item.description}</div>
                    <div classNAme="list-dates">
                        {item.due && <span>Due {item.due.toString()}</span>}
                        {item.due && item.done && <span> &middot; </span>}
                        {item.done && <span>Done {item.done.toString()}</span>}
                    </div>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => actions.removeItem(item.id)}
                    >Delete</button>
                </li>
            ))}
        </ul>
    );
};

List.propTypes = {
    list: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

export default List;