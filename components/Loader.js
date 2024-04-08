import {CircularProgress, circularProgressClasses} from "@mui/material";


export default function Loader(props) {
    return <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
            },
        }}
        size={props.size||64}
        thickness={props.thickness||4}
    />
}