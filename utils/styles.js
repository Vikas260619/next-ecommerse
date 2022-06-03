import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#fffff',
            marginLeft: 10,
        },
    },
    brand: {
        fontWeight: "bold",
        fontSize: "1.5rem",
        color: 'white !important'
    },
    grow: {
        flexGrow: '1'
    },
    cart: {
        // fontWeight: "bold",
        color: 'white !important'
    },
    login: {
        // fontWeight: "bold",
        color: 'white !important'
    },
    main: {
        minHeight: '80vh'
    },
    footer: {
        marginTop: 10,
        textAlign: 'center'
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    detailCard: {
        padding: '10px'
    }
}) 

export default useStyles;