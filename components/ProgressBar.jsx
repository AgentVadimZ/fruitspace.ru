import {Backdrop, CircularProgress, circularProgressClasses} from "@mui/material";


export default function LoadingAnim() {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open>
        <div className={"loading"}>
            <div style={{position:"relative"}}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: "var(--btn-color)"
                }}
                size={64}
                thickness={4}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={64}
                thickness={4}
            />
            </div>
        </div>
        </Backdrop>
    );
}