import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function ErrorAlert({ errorMessage }) {
    return (
        <Alert variant="filled" severity="error">
        {errorMessage}
      </Alert>
    )
}
