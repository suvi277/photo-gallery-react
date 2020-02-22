import React, { useEffect, useState, Fragment } from "react";

const AlertBox = props => {
  const [showDiv, setshowDiv] = useState(true);
  useEffect(() => {
    return () => {
      setshowDiv(!showDiv);
    };
  });
  return (
    <Fragment>
      {showDiv && (
        <div
          className={`alert alert-${props.type}`}
          style={props.style}
          role="alert"
        >
          <h4 className="alert-heading">Ahh!</h4>
          <p>{props.children}</p>
          {props.type !== "danger" && (
            <button
              className="btn btn-secondary"
              onClick={() => setshowDiv(!showDiv)}
              type="button"
            >
              Close
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default AlertBox;
