import {Box} from "@mui/material";

export default function  ChipPhone({ phone_numbers }: { phone_numbers: string[] }){
    return(
        <Box
        sx={{
            width: 110,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,

            color: 'rgba(26,18,64,0.85)',
            fontSize: 13,
            fontWeight: 600,

            boxShadow: `
              inset 0 0 20px #ad8bfb
            `,

            border: '2px solid transparent',
            background: 'linear-gradient(#fff, #fff, #fff) padding-box, linear-gradient(to right, #ad8bfb, #ad8bfb, #ad8bfb) border-box',

        }}
    >
        {phone_numbers[0]}
    </Box>)
}