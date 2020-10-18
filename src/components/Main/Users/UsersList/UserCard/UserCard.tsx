import React from "react";
import "./UserCard.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "./Avatar/Avatar";
import { TUser } from "../../../../../types/types";

type Props = {
  user: TUser;
};

export default function UserItem({
  user: { name, email, position, phone, photo },
}: Props) {
  return (
    <div className="user__item">
      <Avatar photo={photo} />

      <OverlayTrigger
        placement="bottom"
        delay={{ show: 100, hide: 200 }}
        overlay={<Tooltip id="tooltip">{name}</Tooltip>}
      >
        <h6 className="user__name">{name}</h6>
      </OverlayTrigger>

      {[email, position, phone].map((item, index) => {
        return (
          <OverlayTrigger
            key={index}
            placement="bottom"
            delay={{ show: 100, hide: 200 }}
            overlay={<Tooltip id="tooltip">{item}</Tooltip>}
          >
            <p>{item}</p>
          </OverlayTrigger>
        );
      })}
    </div>
  );
}
