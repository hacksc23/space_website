import React from 'react'
import DateSelector from './DateSelector'
import AstroEventCard from './AstroEventCard'
import '../styles/DisplayEventsPage.css'


class DisplayEventsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            events: [],
            errorMsg: ''
        };
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleStartDate(date) {
        let month = date.$M + 1;
        let day = date.$D;
        let year = date.$y;
        this.setState({
            startDate: (year + '') + (month < 10 ? '0' + month : month + '') + (day < 10 ? '0' + day : day + '')
        }, () => {
            // callback function, this gets actual updated value of startDate

        })


    }

    handleEndDate(date) {
        let month = date.$M + 1;
        let day = date.$D;
        let year = date.$y;
        this.setState({
            endDate: (year + '') + (month < 10 ? '0' + month : month + '') + (day < 10 ? '0' + day : day + '')
        }, () => {
            // callback function, this gets actual updated value of startDate

        })
    }

    handleSearch(date) {
        console.log(typeof date);
        const BACKEND_API = 'https://space-api.cool2645.com';
        let start = this.state.startDate;
        let end = this.state.endDate;
        if (!end) {
            end = parseInt(start) + 10000
        }
        const url = `${BACKEND_API}/events?start_date=${start ? start : '20150101'}&end_date=${end ? end : start + 10000}`;
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(eventsData => {
                console.log(eventsData)
                if ('data' in eventsData) {
                    console.log(eventsData.data)
                    this.setState({
                        events: eventsData.data,
                        errorMsg: ''
                    })
                }
                else {
                    this.state.setState({
                        errorMsg: 'Error searching events'
                    })
                }

            })
            .catch(error => {
                // handle error here
                console.log('error');
            });
    }

    render() {
        return (
            <>
                <div id="display_events_page_container">
                    <div className="date_selector_section">
                        <div className="date_selector_wrapper">
                            <DateSelector
                                onSelectDate={this.handleStartDate}
                                dateSelectorInfo={{ is_start_date: true }}
                            />
                        </div>
                        <div className="date_selector_wrapper">
                            <DateSelector
                                onSelectDate={this.handleEndDate}
                                dateSelectorInfo={{ is_start_date: false }}
                            />
                        </div>
                        <button id="search_btn" className="btn" onClick={this.handleSearch}>
                            <span className="buy">Search</span>
                        </button>
                    </div>

                    <small id="error_message">{this.state.errorMsg}</small>


                    <div>
                        {this.state.events.map(event => (
                            <AstroEventCard key={event.start_date} eventInfo={event} />
                        ))}
                    </div>

                </div>
            </>
        )
    }

}

export default DisplayEventsPage;