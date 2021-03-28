import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    let input = null;

    switch (props.type) {
        case 'select':
            input = <Form.Group>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <select
                    className="form-control form-control-sm"
                    defaultValue={props.value}
                    onChange={props.onChange}
                    {...props}
                >
                    <option value="">{props.placeholder}</option>
                    {
                        props.options.length > 0 ?
                            props.options.map((option, index) =>
                                <option key={index} value={option._id}>{option.name || option.topic}</option>
                            ) : null
                    };
                </select>
            </Form.Group>;
            break;
        case 'text':
            break;
        default:
            input = <div className="form-group">
                <label>{props.label}</label>
                <input type={props.type} className="form-control" placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                />
            </div>;
            break;
    }

    return input;
};

export default Input;
