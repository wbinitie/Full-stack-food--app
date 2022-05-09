import React from "react";
import { useAlert } from "react-alert";

import { removeSingleItem } from "../userComponents/api-user.js";
import auth from "../../auth/auth-helper";

const Remove = ({ foodId, setNewRefresh, newRefresh }) => {
  const jwt = auth.isAuthenticated();
  const alert = useAlert();

  const onClick = () => {
    const { _id } = foodId;
    removeSingleItem(_id, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        alert.error(data.error);
      } else {
        setNewRefresh(!newRefresh);
        alert.success("Removed from cart");
      }
    });
  };
  return (
    <div
      onClick={onClick}
      className="text-xs pl-3 hover:underline cursor-pointer"
    >
      X REMOVE
    </div>
  );
};

export default Remove;
