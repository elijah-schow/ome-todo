import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';

import './Item.css';

const Item = ({ item, actions }) => {

    const { handleSubmit, register, reset } = useForm();

    const [editing, setEditing] = useState(false);

    const open = () => {
        // Don't re-render if the item is already open
        if (editing) return;

        setEditing(true);
    };

    const onSubmit = (data) => {
        actions.updateItem({
            id: item.id,
            ...data,
        });
        setEditing(false);
    };

    const cancel = () => {
        reset();
        setEditing(false);
    }

    return (
        <li
            className={classnames(
                "item list-group-item py-3",
                {
                    "list-group-item-action": !editing,
                    "editing": editing,
                },
            )}
            key={item.id}
            onClick={open}
        >
            {editing
                ? (
                    /**
                     * Edit Mode
                     */
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className="form-control"
                                name="name"
                                autoFocus
                                defaultValue={item.name}
                                ref={register}
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="form-control"
                                name="description"
                                defaultValue={item.description}
                                ref={register}
                            />
                        </div>

                        {/* Dates */}
                        <div className="row">

                            {/* Due Date */}
                            <div className="form-group col-6">
                                <label htmlFor="due">Due</label>
                                <input
                                    type="date"
                                    id="due"
                                    className="form-control"
                                    name="due"
                                    defaultValue={item.due}
                                    ref={register}
                                />
                            </div>

                            {/* Done Date */}
                            <div className="form-group col-6">
                                <label htmlFor="done">Done</label>
                                <input
                                    type="date"
                                    id="done"
                                    className="form-control"
                                    name="done"
                                    defaultValue={item.done}
                                    ref={register}
                                />
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="row">
                            <div class="col">
                                <button className="btn btn-primary btn-block">Save</button>
                            </div>
                            <div class="col">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={cancel}
                                >Cancel</button>
                            </div>
                        </div>

                    </form>
                )
                : (
                    /**
                     * View Mode
                     */
                    <div class="row">
                        <div className="col">
                            <div className="item-name mb-2">{item.name}</div>
                            {item.description &&
                                <div className="item-description mb-2">
                                    {item.description}
                                </div>}
                            {(item.due || item.done) &&
                                <div className="item-dates">
                                    {item.due && <span>Due {item.due.toString()}</span>}
                                    {item.due && item.done && <span> &middot; </span>}
                                    {item.done && <span>Done {item.done.toString()}</span>}
                                </div>}
                        </div>
                        <div className="col col-auto">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => actions.removeItem(item.id)}
                            >Delete</button>
                        </div>
                    </div>
                )}
        </li>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export default Item;