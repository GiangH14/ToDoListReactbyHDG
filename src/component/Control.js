import React, {Component} from 'react';
import './Control.css'

class Control extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            strSearch : ""
        }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }
    handleSearch(){
        this.props.onClickSearch(this.state.strSearch)
    }

    handleAdd(){
        this.props.onClickAdd();
    }
    handleClear(){
        this.setState({strSearch: ""})
        this.props.onClickSearch("")
    }
    handleChange(event){
        this.setState({strSearch: event.target.value})
    }
    
    handleSort(orderBy, orderDirection){  
        this.props.onClickSort(orderBy, orderDirection) 
    }

    render(){
        // let {orderBy, orderDirection} = this.props;
        // // let strSort = orderBy + "-" + orderDirection

        let elmButton = <button onClick= {this.handleAdd} type="button" className="btn btn-info btn-block">ADD TASK</button>
        if (this.props.isShowForm === true) {
           elmButton =  <button onClick= {this.handleAdd} type="button" className="btn btn-info btn-block">CLOSE</button>
        }

        return(
            <div className ="row">
                <div className= "col-sx-4 col-sm-4 col-md-4 col-lg-4">
                    <div className = "input-group">
                        <input value = {this.state.strSearch} onChange= {this.handleChange} type="text" className="form-control" placeholder="Search to task"/>
                        <span className = "input-group-btn">
                            <button onClick={this.handleSearch} id="but" className = "btn btn-info" type= "button">Search</button>
                            <button onClick={this.handleClear} id="but" className = "btn btn-danger" type= "button">Clear</button>
                        </span>
                    </div>
                </div>
    
                <div className = "col-sx-3 col-sm-3 col-md-3 col-lg-3">
                    {elmButton}
                </div>
                <div><h4>Sort By</h4></div>
                <div className = "col-sx-3 col-sm-3 col-md-3 col-lg-3">  
                            <button id ="but"className="btn btn-info " onClick = {() => this.handleSort("name", 'asc')} >name ASC</button>
                            <button id ="but" className="btn btn-danger" onClick = {() => this.handleSort("name", 'desc')}>name DESC</button>
                            <button id ="but1" className="btn btn-info" onClick = {() => this.handleSort("level", 'asc')}>level ASC</button>
                            <button id ="but1" className="btn btn-danger" onClick = {() => this.handleSort("level", 'desc')}>level DESC</button>
                </div>
        </div>
        )
    }
}
export default Control