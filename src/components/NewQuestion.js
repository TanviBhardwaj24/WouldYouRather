import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router';
import {handleSaveNewQuestion} from "../actions/shared";
import NavBar from "./NavBar";

class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionOneText: '',
            optionTwoText: '',
            isSubmit: false,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onOptionOneValueChange = this.onOptionOneValueChange.bind(this);
        this.onOptionTwoValueChange = this.onOptionTwoValueChange.bind(this);
    }

    onOptionOneValueChange(event) {
        this.setState({
            optionOneText: event.target.value
        });
    }

    onOptionTwoValueChange(event) {
        this.setState({
            optionTwoText: event.target.value
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.handleSaveNewQuestion(this.props.authedUser, this.state.optionOneText, this.state.optionTwoText)

        this.setState(() => ({
            optionA: '',
            optionB: '',
            isSubmit:true,
        }))
    }

    render() {
        if(this.state.isSubmit === true){
            return <Redirect to="/" />;
        }
        return (
            <div>
                <NavBar></NavBar>
                <Card>
                    <Card.Title style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        Create New Question
                    </Card.Title>
                    <br/>
                    <Card.Text style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        Complete the question:
                    </Card.Text>
                    <Card.Header style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <b><em> Would you rather .. </em></b>
                    </Card.Header>
                    <br/>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Label style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>Option One Text</Form.Label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter option one text"
                            value ={this.state.optionOneText}
                            onChange={this.onOptionOneValueChange}/>
                        <br/>
                        <span style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}><b>----OR----</b></span>
                        <br/>
                        <Form.Label style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>Option Two Text</Form.Label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter option two text"
                            value ={this.state.optionTwoText}
                            onChange={this.onOptionTwoValueChange}/>
                            <br/>
                        <button
                            type='submit'
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            Submit
                        </button>
                    </Form>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps, {handleSaveNewQuestion})(NewQuestion)