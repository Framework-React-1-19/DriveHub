import { Button } from '@mui/material'
//https://www.30secondsofcode.org/css/s/hover-underline-animation/
function UnderlineButton({ label }: {label : string}) {
    return (
        <Button
            color="inherit"
            sx={{
                display: 'inline-block',
                position: 'relative',

                '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    transform: 'scaleX(0)',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#ffffff',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out'
                },

                '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left'
                },

                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
        {label}
    </Button>
  )
}

export default UnderlineButton