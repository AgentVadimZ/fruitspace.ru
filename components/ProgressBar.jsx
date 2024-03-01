import {Backdrop, CircularProgress, circularProgressClasses} from "@mui/material";
import Image from "next/image";
import logo_sm from "@/components/assets/ava.png";


export default function LoadingAnim() {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open>
        <div className="bg-gray-700 p-8 rounded-lg w-fit glassb bg-opacity-40">
            <div className="relative">
            <CircularProgress
                variant="determinate"
                sx={{
                    color: "var(--btn-color)",
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
                <div className="absolute top-0">
                    <Image src={logo_sm.src} alt="progress" width={64} height={64}/>
                </div>
            </div>
        </div>
        </Backdrop>
    );
}