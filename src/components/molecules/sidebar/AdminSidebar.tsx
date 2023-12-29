import React from 'react';
import { useAdminSidebarStyles } from "@/static/stylesheets/adminSidebarStyles";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import classNames from "classnames";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { useAuthInfo } from "@/hooks/custom";

interface AdminSidebarProps {
  open?: boolean,
  variant?: "desktop" | "mobile",

  onToggle?(): void,
}

const AdminSidebar: React.FC<AdminSidebarProps> = (props) => {
  const classes = useAdminSidebarStyles();
  const router = useRouter();
  const { userData } = useAuthInfo();
  const { open, onToggle } = props;
  const { userData: authUser } = useAuthInfo();
  const userid = authUser?._id;
  const adminactive = authUser?.adminactive;

  const openMenu = (url: string) => router.push(url);

  const MenuItem = ({ label, icon, href, active }: {
    label: string,
    icon: React.ReactNode,
    href?: string,
    active?: boolean,
  }) => (
    <div
      className={classNames({
        'menu-item': true,
        'closed': !open,
        'active': active,
      })}
      onClick={() => {
        if (href) {
          openMenu(href);
        }
      }}
    >
      <span>{icon}</span>
      <span className={classNames({
        'menu-label': true,
        'show': true,
      })}>
        {label}
      </span>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <div className={"top-bar"}>
          <span>
            <IconButton
              style={{ color: "#ffffff" }}
              onClick={onToggle}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </span>
          {open && (
            <span>Collapse</span>
          )}
        </div>

        <div className={"menu-items"}>
          {adminactive === true && (
            <MenuItem
              label={"Post a Job"}
              icon={<AddIcon />}
              active={true}
              href={(typeof userData?.companyname !== 'undefined') ? routePaths.employer.postJob : routePaths.employer.employerAccount}
            />
          )}

          <MenuItem
            label={"Jobs"}
            icon={<WorkIcon />}
            href={routePaths.employer.dashboard}
          />

          <MenuItem
            label={"Search Resumes"}
            icon={<PersonSearchIcon />}
            href={routePaths.employer.searchResume}
          />
        </div>
      </div>
    </>
  );
};

export { AdminSidebar };
