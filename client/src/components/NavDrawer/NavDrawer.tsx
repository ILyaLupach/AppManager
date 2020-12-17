import React, { useEffect, useState } from 'react'
import { Link, withRouter, RouteComponentProps, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import SettingsIcon from '@material-ui/icons/Settings'
import Filter from './components/Filter'
import Search from './components/Search'
import { isMobileOnly } from 'react-device-detect'
import FixedBtn from './components/FixedBtn'
import AssessmentIcon from '@material-ui/icons/Assessment';
import { StoreType } from '../../types/store'

import './NavDrawer.scss'
import Acces from './components/Acces'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			width: 260,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: 260,
			left: 'auto',
			overflowX: 'hidden',
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
		username: {
			marginBottom: 30,
		}
	}),
)

const NavDrawer = ({ location }: RouteComponentProps) => {
	const history = useHistory()
	const classes = useStyles()
	const { isGuest } = useSelector(({ user }: StoreType) => user)

	const [open, setOpen] = useState(false)
	const [activeLink, setActiveLink] = useState('completed')

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				return setActiveLink('completed')
			case '/statistics':
				return setActiveLink('statistics')
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
					<Link to='/statistics'>
						<ListItem button >
							<ListItemIcon>
								<EqualizerIcon
									style={{transform: 'scale(1.1)'}}
									color={checkActiveLink('statistics')}
								/>
							</ListItemIcon>
							<ListItemText primary={'Статистика'} />
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
					{!isGuest && (
						<Link to='/settings'>
							<ListItem button>
								<ListItemIcon>
									<SettingsIcon
										color={checkActiveLink('settings')}
									/>
								</ListItemIcon>
								<ListItemText primary={'Настройки'} />
							</ListItem>
						</Link>
					)}
					<Acces />
				</List>
			</Drawer>
			{isMobileOnly && <FixedBtn isOpenHandler={isOpenHandler} isOpen={open} />}
		</nav>
	)
}

export default withRouter(NavDrawer)
