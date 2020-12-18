import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { isMobileOnly } from 'react-device-detect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      padding: isMobileOnly ? '20px 0px 0 0px' : '20px 20px 0 60px',
      justifyContent: 'space-around',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    datepikerWrapper: {
      display: 'flex',
    },
    title: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      marginBottom: 40,
      marginLeft: isMobileOnly ? 90 : 20,
      '& > h5': {
        display: 'inline-flex',
      },
      flexWrap: 'wrap',
      zIndex: 3,
    },
    gridContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden'
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
      justifyContent: 'flex-start',
      paddingRight: 10,
      marginBottom: 60,
      overflowX: 'visible',
      overflowY: 'hidden',
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
    rotateWarning: {
      background: 'rgba(255, 255, 255, .6)',
      '& > img': {
        width: 200,
      }
    }
  }),
)

export default useStyles
