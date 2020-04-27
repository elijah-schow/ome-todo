import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import classnames from 'classnames';

const AddItem = ({ action }) => {

    const { handleSubmit, register, reset, errors } = useForm();

    const onSubmit = (data) => {
        action({
            id: uuid(),
            ...data,
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card card-body mb-4">

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
                        ref={register}
                    />
                </div>

            </div>

            {/* Submit */}
            <button className="btn btn-primary btn-block">Add</button>

        </form>
    );
};

AddItem.propTypes = {
    action: PropTypes.func.isRequired,
};

export default AddItem;