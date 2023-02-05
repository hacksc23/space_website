import React from 'react'
import { Helmet } from 'react-helmet';
import '../styles/AstroEventCard.css'

export default function AstroEventCard({ eventInfo }) {

    const handleAddToCalendar = () => {
        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventInfo.summary}&details=${eventInfo.description}&location=&dates=${eventInfo.date_start}T000000Z%2F${eventInfo.date_end}T000000Z&ctz=UTC`;
        window.location.href = url;
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </Helmet>
            <div id="container">
                <div className="product-details">
                    <h1>{eventInfo.summary}</h1>

                    <div className="dates">
                        <h5>{(eventInfo.date_start+'').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} - { (eventInfo.date_end+'').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') }</h5>
                    </div>

                    <p className="information">{eventInfo.description}</p>

                    <div className="control">
                        <button className="btn" onClick={ handleAddToCalendar }>
                            <span className="buy">Add To Calendar</span>
                        </button>
                    </div>

                </div>

            </div>
        </>



    )
}
