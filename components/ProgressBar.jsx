import {Backdrop, CircularProgress, circularProgressClasses} from "@mui/material";
import Image from "next/image";
import logo_sm from "@/assets/ava.png";


export default function LoadingAnim() {
    return (
        <div className="flex w-screen h-screen justify-center items-center fixed top-0 left-0 bg-active bg-opacity-25 backdrop-blur z-[99999]">
            <div className="bg-subtle p-8 rounded-xl w-fit glassb bg-opacity-50">
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
        </div>
    );
}