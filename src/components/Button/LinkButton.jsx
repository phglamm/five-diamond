import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function LinkButton({ text, href }) {
    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                href={href}
                sx={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginTop: '10px',
                }}
            >
                {text}
            </Button>
        </Stack>
    );
}
