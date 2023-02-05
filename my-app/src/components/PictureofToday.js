import React from "react";
import './PictureofToday.css'

class PictureofToday extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            img_url: "",
        };
    }

    componentDidMount() {
        fetch("https://space-api.cool2645.com/images")
        .then((res) => res.json())
        .then((json) => {this.setState({
            img_url: json.data.image_url,
        });
        console.log(json)});
    }


    render() {
        return (
            <div className="background-wrapper">
                <img src={this.state.img_url} className="background"  />
            </div>);
    }
}

export default PictureofToday;