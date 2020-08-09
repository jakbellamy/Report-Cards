/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  Shield as ShieldIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon
} from 'react-feather';
import OPEN_Logo from 'src/components/OPEN_Logo';
import NavItem from './NavItem';

const navConfig = [

  {
    subheader: 'Dashboard',
    items: [
      // {
      //   title: 'Account Information',
      //   href: '/404'
      // },
      // {
      //   title: 'Overview',
      //   // icon: BarChartIcon,
      //   href: '/app/dashboard/dashboard'
      // },
      // {
      //   title: 'Test Summaries',
      //   // icon: PieChartIcon,
      //   href: '/app/dashboard/summaries'
      // },
      {
        title: 'Sales Manager Dashboard',
        href: '/app/dashboard/summaries-live'
      }
    ]
  },
  {
    subheader: 'View Data',
    items: [
      {
        title: 'SalesForce',
        // icon: UsersIcon,
        href: '/app/management/customers',
        items: [
          {
            title: 'Account Information',
            href: '/404'
          },
          {
            title: 'Account Leads',
            href: '/404'
          },
          {
            title: 'Account Reports',
            href: '/404'
          }
        ]
      },
      {
        title: 'Flat Files',
        // icon: FolderIcon,
        href: '/404',
        items: [
          {
            title: 'Production Reports',
            href: '/404'
          },
          {
            title: 'Continuing Education',
            href: '/404'
          }
        ]
      },
      {
        title: 'Report Cards',
        href: '/404',
        // icon: TrelloIcon
      },
    ]
  },
  {
    subheader: 'Data Entry',
    items: [
      // {
      //   title: 'Market Share Report',
      //   href: '/app/kanban',
      //   // icon: TrelloIcon
      // },
      // {
      //   title: 'Operation Cycle',
      //   href: '/app/kanban',
      //   // icon: TrelloIcon
      // },
      // {
      //   title: 'Continuing Education',
      //   href: '/app/kanban',
      //   // icon: TrelloIcon
      // },
      // {
      //   title: 'Personal & Professional Best',
      //   href: '/app/kanban',
      //   // icon: TrelloIcon
      // },
    ]
  },
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        {/*<Divider />*/}
        {/*<Box p={2}>*/}
        {/*  <Box*/}
        {/*    p={2}*/}
        {/*    borderRadius="borderRadius"*/}
        {/*    bgcolor="background.dark"*/}
        {/*  >*/}
        {/*    <Typography*/}
        {/*      variant="h6"*/}
        {/*      color="textPrimary"*/}
        {/*    >*/}
        {/*      Need Help?*/}
        {/*    </Typography>*/}
        {/*    <Link*/}
        {/*      variant="subtitle1"*/}
        {/*      color="secondary"*/}
        {/*      component={RouterLink}*/}
        {/*      to="/docs"*/}
        {/*    >*/}
        {/*      Check our docs*/}
        {/*    </Link>*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
