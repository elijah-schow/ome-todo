import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

const Item = ({ item, actions }) => {
    return (
        <li className="list-group-item py-3" key={item.id}>
            <div class="row">
                <div className="col">
                    <div className="item-name mb-2">{item.name}</div>
                    <div className="item-description mb-2">{item.description}</div>
                    <div className="item-dates">
                        {item.due && <span>Due {item.due.toString()}</span>}
                        {item.due && item.done && <span> &middot; </span>}
                        {item.done && <span>Done {item.done.toString()}</span>}
                    </div>
                </div>
                <div className="col col-auto">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => actions.removeItem(item.id)}
                    >Delete</button>
                </div>
            </div>
        </li>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export default Item;