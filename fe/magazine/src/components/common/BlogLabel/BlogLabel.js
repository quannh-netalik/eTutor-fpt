import React from 'react';

const BlogLabel = ({ className, style, status }) => {
    return (
        <div className={className} style={style}>
            {
                status === 'approve' ? <span className="badge badge-success shadow-success m-1 rounded py-2 px-2">Published</span> :
                    status === 'pending' ? <span className="badge badge-dark shadow-dark m-1 rounded py-2 px-2">Pending</span> :
                        <span className="badge badge-danger shadow-danger m-1 rounded py-2 px-2">Reject</span>
            }
        </div>
    );
};

export default BlogLabel;
