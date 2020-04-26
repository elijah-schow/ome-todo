import React from 'react';
import PropTypes from 'prop-types';

const AddItem = ({ action }) => {

    const onSubmit = (event) => {
        // Prevent the page from refreshing
        event.preventDefault();

        // Validate form

        // Call `action` with the form data
    };

    return (
        <form onSubmit={onSubmit}>

            {/* Name */}
            <div className="form-group">
                <label for="name">Name</label>
                <input id="name" className="form-control" name="name" />
            </div>

            {/* Description */}
            <div className="form-group">
                <label for="description">Description</label>
                <textarea id="description" className="form-control" name="description" />
            </div>

            {/* Due Date */}
            <div className="form-group">
                <label for="due">Due</label>
                <input type="date" id="due" className="form-control" name="due" />
            </div>

            {/* Done Date */}
            <div className="form-group">
                <label for="done">Done</label>
                <input type="date" id="done" className="form-control" name="done" />
            </div>

            {/* Submit */}
            <button>Add</button>

        </form>
    );
};

AddItem.propTypes = {
    action: PropTypes.func.isRequired,
};

export default AddItem;