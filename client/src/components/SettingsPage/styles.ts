import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    title: {
      margin: 20,
      textAlign: 'right',
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 40,
      marginTop: 20,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    gridContainer: {
      flexDirection: 'column',
      width: '100%',
      maxHeight: '100vh',
      overflowY: 'auto',
    },
    list: {

    },
    listItem: {
      width: '100%',
      marginTop: 20,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    userText: {
      maxWidth: '75%'
    }
  }),
)

export default useStyles
