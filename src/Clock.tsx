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
}
function Digit({ value }: DigitProps) {
    const illuminatedSegments = segmentsForDigit(value)

    const digitColor = "red";
    const disabledDigitColor = "rgba(255,255,255,0.2)"

    const illuminatedDigitStyle = `10px solid ${digitColor}`
    const disabledDigitStyle = `10px solid ${disabledDigitColor}`
    return (
        <span style={{
            fontSize: 80,
            fontFamily: 'monospace',
            width: 55,
            flexDirection: 'column',
            gap: 2
        }}>
            <div style={{
                borderTop: illuminatedSegments.includes(0) ? illuminatedDigitStyle : disabledDigitStyle,
                width: "100%",
            }}></div>
            <div style={{
                height: 35,
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
                height: 35,
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



function Separator() {
    return (
        <span style={{
            fontSize: 80,
            fontFamily: 'monospace',
            width: 30,
            position: 'relative',
            left: -5,
            color: 'red'
        }}>:</span>
    )
}

function digits(value: number): number[] {
    return value.toString().padStart(2, "0").split("").map(x => parseInt(x))
}

export default function Clock() {
    const [now, setCurrentTime] = React.useState(new Date())

    const hours = digits(now.getHours())
    const minutes = digits(now.getMinutes())
    const seconds = digits(now.getSeconds())

    React.useEffect(() => {
        let timer: number = 0;

        function updateTime() {
            setCurrentTime(new Date());
            timer = setTimeout(updateTime, 100)
        }

        updateTime()

        return () => {
            clearTimeout(timer);
        };
    })

    return (
        <div style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            color: 'white',
            width: 'min-content',
            padding: "15px 10px",
            gap: 8,
            border: "4px solid rgb(160,160,160)",
            borderRadius: 6,
        }}>
            {hours.map(digit => (<Digit value={digit} />))}
            <Separator />
            {minutes.map(digit => (<Digit value={digit} />))}
            <Separator />
            {seconds.map(digit => (<Digit value={digit} />))}
        </div>
    )
}
