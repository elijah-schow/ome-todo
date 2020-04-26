import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const List = ({ list, actions }) => {
    return (
        <ul className="list list-group">
            {list.map((item) => <Item key={item.id} item={item} actions={actions} />)}
        </ul>
    );
};

List.propTypes = {
    list: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

export default List;