import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const {
    Title,
    Header,
    Body,
    Footer
} = Modal


const NewModal = (props) => {
    return (
        <div className="modal fade" id={props.id} style={{ display: 'none', paddingRight: '17px' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.modaltitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {props.children}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewModal
