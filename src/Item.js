import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';

import './Item.css';

const Item = ({ item, actions }) => {

    const { handleSubmit, register, reset, errors } = useForm();

    const [editing, setEditing] = useState(false);

    const open = () => {
        // Don't re-render if the item is already open
        if (editing) return;

        // Show the editing form
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

    /**
     * Prevent the event from bubbling up the DOM. In this case, it prevents
     * clicking the checkbox from opening the item editor.
     * 
     * @param {*} event 
     */
    const stop = (event) => {
        event.stopPropagation();
    };

    return (
        <li
            className={classnames(
                "item list-group-item",
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
                                className={classnames(
                                    "form-control",
                                    {
                                        "is-invalid": errors.name
                                    })}
                                name="name"
                                defaultValue={item.name}
                                ref={register({ required: true })}
                            />
                            {errors.name &&
                                <div className="invalid-feedback d-block">
                                    Name is required
                                </div>}
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
                            <div className="col">
                                <button className="btn btn-primary btn-block">Save</button>
                            </div>
                            <div className="col">
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
                    <div className="row">

                        {/* Checkbox */}
                        <div className="col col-auto">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    /* Cast `done` to a boolean, otherwise react
                                    will complain about switching between
                                    controlled and uncontrolled inputs.
                                    https://fb.me/react-controlled-components */
                                    checked={!!item.done}
                                    onChange={() => actions.markItem(item.id)}
                                    onClick={stop}
                                />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="col">
                            <div className="item-name">{item.name}</div>
                            {item.description &&
                                <div className="item-description">
                                    {item.description}
                                </div>}
                            {(item.due || item.done) &&
                                <div className="item-dates">
                                    {item.due && <span>Due {item.due.toString()}</span>}
                                    {item.due && item.done && <span> &middot; </span>}
                                    {item.done && <span>Done {item.done.toString()}</span>}
                                </div>}
                        </div>

                        {/* Delete */}
                        <div className="col col-auto">
                            <button
                                type="button"
                                className="close"
                                aria-label="close"
                                onClick={() => actions.removeItem(item.id)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
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