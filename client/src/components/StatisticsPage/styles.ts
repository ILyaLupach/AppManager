import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      padding: '20px 20px 0 60px',
      justifyContent: 'space-around',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    title: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      marginBottom: 40
    },
    gridContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    itemTitle: {
      display: 'flex',
      width: '100%',
      paddingRight: 10,
      justifyContent: 'center',
      zIndex: 2,
    },
    itemWrapper: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      paddingRight: 10,
      marginBottom: 60,
    },
    dataPicker: {
      margin: '5px 10px 0',
      border: 'none',
      borderBottom: '1px solid #666',
      cursor: 'pointer',
      width: 115,
      fontSize: 22,
      overflow: 'hidden',
      fontWeight: 700,
    },
  }),
)

export default useStyles
