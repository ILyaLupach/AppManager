import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { isMobileOnly } from 'react-device-detect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      position: 'absolute',
      top: 30,
      right: 25,
      fontSize: 20,
      fontWeight: 600,
    },
    container: {
      marginTop: isMobileOnly ? 90 : 60,
      padding: isMobileOnly ? 5 : 20,
      paddingBottom: 10,
    },
    paper: {
      padding: 10,
      margin: 5,
    },
    paperAction: {
      paddingBottom: '0 !important',
      flexBasis: '66%'
    },
    large: {
      width: '100% !important',
      height: '100% !important',
      borderRadius: '0 !important',
      '& > img': {
        height: 'auto',
        width: isMobileOnly ? 80 : 90,
      },
    },
    image: {
      width: isMobileOnly ? 80 : 90,
      height: isMobileOnly ? 80 : 90,
      overflow: 'hidden',
    },
    rootPopup: {
      '& > *': {
        margin: theme.spacing(1),
        width: "95%"
      },
    },
  }),
)

export default useStyles
