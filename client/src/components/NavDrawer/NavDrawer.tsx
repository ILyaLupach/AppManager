import React, { useEffect, useState } from 'react'
import { Link, withRouter, RouteComponentProps, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import SettingsIcon from '@material-ui/icons/Settings'
import Filter from './components/Filter'
import Search from './components/Search'

import './NavDrawer.scss'
import { isMobileOnly } from 'react-device-detect'
import FixedBtn from './components/FixedBtn'
import { getAllWorkshops } from '../../actions/workshopsActions'

const drawerWidth = 260

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: drawerWidth,
			left: 'auto',
			transition: theme.transitions.create('all', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('all', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: 60,
			overflowX: 'hidden',
			left: isMobileOnly ? -60 : 'auto',
		},
	}),
)

const NavDrawer: React.FC<RouteComponentProps> = ({ location }: RouteComponentProps) => {
	const history = useHistory()
	const classes = useStyles()
	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)
	const [activeLink, setActiveLink] = useState('completed')

	useEffect(() => {
		dispatch(getAllWorkshops())
	}, [])

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				return setActiveLink('completed')
			case '/board':
				return setActiveLink('board')
			case '/persons':
				return setActiveLink('persons')
			case '/settings':
				return setActiveLink('settings')
			default:
				return history.push('/')
		}
	}, [location.pathname])

	const isOpenHandler = () => {
		setOpen(!open)
	}

	const checkActiveLink = (link: string): 'inherit' | 'error' => (
		link === activeLink ? 'error' : 'inherit'
	)

	return (
		<nav
			className={clsx('nav-drawer', classes.root)}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<List>
					<Link to='/'>
						<ListItem button>
							<ListItemIcon>
								<CheckCircleIcon
									color={checkActiveLink('completed')}
								/>
							</ListItemIcon>
							<ListItemText primary={'Выполненные задачи'} />
						</ListItem>
					</Link>
					<Link to='/board'>
						<ListItem button >
							<ListItemIcon>
								<ReceiptIcon
									color={checkActiveLink('board')}
								/>
							</ListItemIcon>
							<ListItemText primary={'Текущие задачи'} />
						</ListItem>
					</Link>
					<Link to='/persons'>
						<ListItem button >
							<ListItemIcon>
								<PeopleAltIcon
									color={checkActiveLink('persons')}
								/>
							</ListItemIcon>
							<ListItemText primary={'Персонал КИПиСА'} />
						</ListItem>
					</Link>
				</List>
				<Search />
				<Filter isOpen={open} />
				<List>
					<Link to='/settings'>
						<ListItem button >
							<ListItemIcon>
								<SettingsIcon
									color={checkActiveLink('settings')}
								/>
							</ListItemIcon>
							<ListItemText primary={'Настройки'} />
						</ListItem>
					</Link>
				</List>
			</Drawer>
			{isMobileOnly && <FixedBtn isOpenHandler={isOpenHandler} isOpen={open} />}
		</nav>
	)
}

export default withRouter(NavDrawer)
