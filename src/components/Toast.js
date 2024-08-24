import React from 'react'

const Toast = (props) => {
    return (
        <div>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div className="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" id="liveToast">
                    <div className="d-flex">
                        <div className="toast-body">
                            {props.message}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast
