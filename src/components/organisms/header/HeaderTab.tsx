import React from 'react';
import { useHeaderStyles } from "@/static/stylesheets";
import classNames from "classnames";

interface HeaderTabProps {
  tabItems: {
    label?: string,
    active?: boolean,
    hidden?: boolean,
    onClick?(): void,
  }[],
}

const HeaderTab: React.FC<HeaderTabProps> = (props) => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.headerTab}>
      {props?.tabItems?.map((item, index) => (
        <React.Fragment key={index}>
          {!item?.hidden && (
            <div
              className={classNames({
                'tab-item': true,
                'active': item?.active,
              })}
              onClick={item?.onClick}
            >
              {item?.label}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export { HeaderTab };
