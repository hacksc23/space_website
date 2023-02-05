import React, { useState} from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';

export default function DateSelector(props) {

    const [date, setDate] = useState({});
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.dateSelectorInfo.is_start_date ? 'Start Date' : 'End Date'}
                value={date}
                onChange={(newDate) => {
                    props.onSelectDate(newDate );
                    console.log(newDate);
                    console.log('AHAHAHAHAH');
                    setDate(date => newDate );

                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
        </>
  )
}
