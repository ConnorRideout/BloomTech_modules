import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledCalendar = styled.input`
    background-color: ${pr => pr.theme.bgLightColor};
    color: ${pr => pr.theme.fgLightColor};
    cursor: pointer;
    margin: 2px 5px;
`
const StyledBtn = styled.button`
    background-color: ${pr => pr.theme.bgLightColor};
    color: ${pr => pr.theme.fgLightColor};
    border: 2px solid ${pr => pr.theme.bgDarkColor};
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:disabled {
        background-color: darkgray;
        color: lightgray;
        transition: all 0.2s ease-in-out;
        cursor: default;
    }
`
const ErrorP = styled.p`
    color: red;
`

function GetDate({ setApodUrl, defaultUrl }) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const now = new Date()
    const today = now.toISOString().slice(0, 10)

    const handleDateChange = (event) => {
        if (!isNaN(Date.parse(event.target.value))) {
            const newDate = new Date(event.target.value)
            setSelectedDate(newDate)
        }
    };
    const updateUrl = () => {
        if (selectedDate <= now) {
            setApodUrl(`${defaultUrl}&date=${selectedDate.toISOString().slice(0, 10)}`)
        }
    }

    return (
        <Container>
            {selectedDate > now && <ErrorP>Date cannot be in the future</ErrorP>}
            <div>
                <StyledCalendar
                    type="date"
                    value={selectedDate.toISOString().slice(0, 10)}
                    max={today}
                    onChange={handleDateChange}
                />
                <StyledBtn onClick={updateUrl} disabled={selectedDate > now}>{"Go→"}</StyledBtn>
            </div>
        </Container>
    );
}

export default GetDate;