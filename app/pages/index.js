import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  accent: {
    color: '#3f50b5'
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className="container">
      <Box justifyContent="center">
          <h1 className="title">
            Welcome on this <span className={classes.accent}>skill TEST</span> !
          </h1>
      </Box >

      <style jsx>{`
      .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .title {
        margin: 0 0 2rem 0;
        line-height: 1.15;
        font-size: 4rem;
      }
      `}</style>
    </div>
  )
}
