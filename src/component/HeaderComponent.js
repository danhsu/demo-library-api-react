import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class HeaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            book: {}
        }
        this.handleClickToAdd = this.handleClickToAdd.bind(this)
    }


    // Click to Add Book
    handleClickToAdd() {
        // id of -1 will trigger the add new condition in save() in java
        this.props.history.push(`/books/-1/edit`)
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-5">

                <div className="container-fluid">

                    <a className="navbar-brand" href="/">BookClub</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse  navbarSupportedContent">
                        <ul className="navbar-nav me-auto">


                            {/* ADMIN ONLY ACCESS */}
                            <li><Link to="/books/-1/edit" className="nav-link"
                                onClick={() => this.handleClickToAdd}>Add A Book</Link></li>
                        </ul>

                    </div>



                    {/* <div className="collapse navbar-collapse  navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">

                            <li><Link to="/" className="nav-link">Login</Link></li>

                        </ul>
                    </div> */}






                </div>
            </nav >
        )
    }
}
export default withRouter(HeaderComponent)