import React from "react";

const BoySummary = ({ boy, handleClickToChangeBoy, handleClickToLikeBoy }) => {
  return (
    <div className="card center">
      <div className="card-image center">
        <img className="responsive-img" src={boy.imgFileURL} />
      </div>
      <div className="card-content">
        <h5 className="boy-name">{boy.firstName}</h5>
        <p className="boy-school blue-color-accent">{boy.school}</p>
        <button
          className="waves-effect btn-floating waves-light btn-large white"
          onClick={() => handleClickToChangeBoy()}
        >
          <i class="large material-icons grey-text">close</i>
        </button>
        <button
          className="waves-effect btn-floating waves-light btn-large white"
          onClick={() => handleClickToLikeBoy()}
        >
          <i class="large material-icons blue-text text-darken-4">check</i>
        </button>
      </div>
    </div>
  );
};

export default BoySummary;
