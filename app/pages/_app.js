import Head from 'next/head'
import Link from 'next/link'

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        borderColor: 'white',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        color: 'white'
    },
    searchIcon: {
        color: 'white'
    }
}));

export default function MyApp({ Component, pageProps }) {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>Next Skill Test</title>
                <link rel="icon" href="/logo.jpg" />
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link href="/"><Button color="inherit"><Typography variant="h6" noWrap>Home</Typography></Button></Link>
                    <Link href="/reddit"><Button color="inherit">Reddit</Button></Link>
                    <form>
                        <TextField
                            variant="outlined"
                            placeholder="Search subreddit…"
                            size="small"
                            className={classes.search}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Link href="/reddit/search"><IconButton className={classes.searchIcon}><SearchIcon /></IconButton></Link>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                </Toolbar>
            </AppBar>

            <Component {...pageProps} />

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                }

                * {
                box-sizing: border-box;
                }
            `}</style>
        </>
    )
}