import * as React from 'react'

function segmentsForDigit(digit: number): number[] {
    switch (digit) {
        case 1:
            return [2, 5]
        case 2:
            return [0, 2, 3, 4, 6]
        case 3:
            return [0, 2, 3, 5, 6]
        case 4:
            return [1, 2, 3, 5]
        case 5:
            return [0, 1, 3, 5, 6]
        case 6:
            return [0, 1, 3, 4, 5, 6]
        case 7:
            return [0, 2, 5]
        case 8:
            return [0, 1, 2, 3, 4, 5, 6]
        case 9:
            return [0, 1, 2, 3, 5]
        case 0:
            return [0, 1, 2, 4, 5, 6]
    }

    throw new Error("Can only map single digits")
}

type DigitProps = {
    value: number
    digitColor: string;
}
function Digit({ value, digitColor }: DigitProps) {
    const illuminatedSegments = segmentsForDigit(value)

    const disabledDigitColor = "rgba(255,255,255,0.15)"

    const illuminatedDigitStyle = `4px solid ${digitColor}`
    const disabledDigitStyle = `4px solid ${disabledDigitColor}`

    const height = 30
    return (
        <span style={{
            width: 40,
            flexDirection: 'column',
            gap: 2
        }}>
            <div style={{
                borderTop: illuminatedSegments.includes(0) ? illuminatedDigitStyle : disabledDigitStyle,
                width: "100%",
            }}></div>
            <div style={{
                height: height,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <div style={{
                    width: "100%",
                    borderLeft: illuminatedSegments.includes(1) ? illuminatedDigitStyle : disabledDigitStyle,

                }}></div>
                <div style={{
                    borderRight: illuminatedSegments.includes(2) ? illuminatedDigitStyle : disabledDigitStyle,
                    width: "100%"
                }}></div>
            </div>
            <div style={{
                borderTop: illuminatedSegments.includes(3) ? illuminatedDigitStyle : disabledDigitStyle,
                width: "100%",
            }}></div>
            <div style={{
                height: height,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <div style={{
                    width: "100%",
                    borderLeft: illuminatedSegments.includes(4) ? illuminatedDigitStyle : disabledDigitStyle,
                }}></div>
                <div style={{
                    borderRight: illuminatedSegments.includes(5) ? illuminatedDigitStyle : disabledDigitStyle,
                    width: "100%"
                }}></div>
            </div>
            <div style={{
                borderTop: illuminatedSegments.includes(6) ? illuminatedDigitStyle : disabledDigitStyle,
                width: "100%",
            }}></div>
        </span>
    )
}


type SeparatorProps = {
    digitColor: string;
}
function Separator({ digitColor }: SeparatorProps) {
    const size = 8
    return (
        <div style={{
            height: "100%",
            justifyContent: 'space-around',
            padding: "0 6px"
        }}>
            <div style={{
                width: size,
                height: size,
                backgroundColor: digitColor
            }}></div>
            <div style={{
                width: size,
                height: size,
                backgroundColor: digitColor
            }}></div>
        </div>
    )
}

type ClockProps = {
    label: string
    timezone: string
}
function currentTime(timezone: string): string {
    return new Date().toLocaleString("en-US", { timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).replace(/\s[AP]M/, '')
}
export default function Clock({ label, timezone }: ClockProps) {
    const [now, setCurrentTime] = React.useState(currentTime(timezone))

    const color = "orange"

    React.useEffect(() => {
        let timer: number = 0;

        function updateTime() {
            setCurrentTime(currentTime(timezone));
            timer = setTimeout(updateTime, 500)
        }

        updateTime()

        return () => {
            clearTimeout(timer);
        };
    })

    return (
        <div>
            <h2 style={{
                fontSize: 16,
                fontFamily: 'monospace',
                marginBottom: 5
            }}>{label}</h2>
            <div
                className='clock-device'
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    color: 'white',
                    width: 'min-content',
                    padding: "15px 10px",
                    gap: 8,
                    border: "8px solid rgb(160,160,160)",
                    borderRadius: 6,
                    flexWrap: 'nowrap'
                }}>
                {now.split('').map((digit, index) => {
                    if (digit === ":") {
                        return <Separator digitColor={color} key={`separator-${index}`} />
                    }

                    return <Digit digitColor={color} value={parseInt(digit)} key={`digit-${index}`} />
                })}
            </div>
        </div>
    )
}
