import React, { Component } from 'react';
// import logo from './logo.svg';
import Title from './component/Title'
import Control from './component/Control'
import Form from './component/Form'
import List from './component/List'
// import ToDoItems from "./ToDoItems"
// import "./ToDoList.css"
import {remove, orderBy as funcOrderBy} from 'lodash';
const uuidv4 = require('uuid/v4')

class ToDoList extends Component {
    
    state = {
        items: null,
        itemSelected: null,
        isShowForm: false ,
        strSearch : "",
        orderBy : "",
        orderDirection : ""
    }

    constructor(props){
        super(props)
        this.handleToggleForm = this.handleToggleForm.bind(this)
        this.closeForm  = this.closeForm.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    componentWillMount(){
        let items = JSON.parse(localStorage.getItem('task')) || [];
        this.setState({
            items: items
        })
    }

    handleSort(orderBy, orderDirection){
        this.setState({
           orderBy: orderBy,
           orderDirection: orderDirection
        })
    }

    handleEdit(item){
        this.setState({
            itemSelected: item,
            isShowForm: true
        })
    }

    handleSubmit(item){
        let items = this.state.items
        console.log(item)
        if(item.id !== "") {
            items.forEach((elm,key) => {
                 if(elm.id === item.id){
                    items[key].name = item.name;
                     items[key].level = +item.level;
                }
             })
        }else{  
            items.push({
                id: uuidv4(),
                name: item.name,
                level: +item.level
        })
        }

        this.setState({
             items: items,
             isShowForm: false
         })

        localStorage.setItem('task', JSON.stringify(items));
    }

    handleDelete(id){
        let items = this.state.items
        remove(items, (item) => {
            return item.id === id;
        });
        this.setState({
            items: items
        });
        localStorage.setItem('task', JSON.stringify(items));
    }

    handleToggleForm(){
        this.setState({
            isShowForm: !this.state.isShowForm,
            itemSelected: null
        })
    }

    closeForm(){
        this.setState({
            isShowForm: false
        })
    }

    handleSearch(value){
        this.setState({
            strSearch: value
        })
    }

    // constructor(props){

    //     super(props);

    //     this.state = {
    //         items : []
    //     };
    //     this.addItem = this.addItem.bind(this);
    //     this.deleteItem = this.deleteItem.bind(this);
    // }
    
    // addItem(e){
    //     if (this.inputElement.value !== ""){
    //         var newItem = {
    //             text: this.inputElement.value,
    //             key: Date.now()
    //         }

    //         this.setState((prevState) => {
    //             return{
    //                 items: prevState.items.concat(newItem)
    //             }
    //         })
    //     }

    //     this.inputElement.value = "";
    //     console.log(this.state.items);

    //     e.preventDefault();
    // }

    // deleteItem(key){
    //     var filteredItems = this.state.items.filter(function(item){
    //         return (item.key !== key)
    //     })

    //     this.setState({
    //         items: filteredItems
    //     });
    // }

    render(){
        let itemsOrigin =(this.state.items !== null) ? [...this.state.items]: []
        let items = []
        //let isShowForm = this.state.isShowForm
        let elmForm = null;
        let {isShowForm, strSearch, itemSelected, orderBy, orderDirection} = this.state
        //const search = this.state.strSearch;

        if(strSearch.length > 0){
            itemsOrigin.forEach((item) => {
                if(item.name.toLowerCase().indexOf(strSearch) !== -1){
                    items.push(item);
                }
            })
        }else {
            items = itemsOrigin;
        }
        //SORT

        items = funcOrderBy(items, [orderBy], [orderDirection]);



        if(isShowForm){
            elmForm = <Form 
                        itemSelected={itemSelected}
                        onClickSubmit={this.handleSubmit}
                        onClickCancel={this.closeForm}/>
        }

        return(
            <div className = "todoList_main">
                {/* <div className = "header">
                    <form onSubmit = {this.addItem}>
                        <input ref = {(a) => this.inputElement = a} placeholder = "enter Task" />
                        <button type = "submit"> add</button>
                    </form>
                </div>
                <ToDoItems entries = {this.state.items}
                           delete = {this.deleteItem}/> */}
                <Title/>
                <Control 
                orderBy={orderBy}
                orderDirection={orderDirection}
                onClickSearch={this.handleSearch}
                isShowForm={isShowForm}
                onClickAdd ={this.handleToggleForm}
                onClickSort = {this.handleSort}/>
                {elmForm}
                <List 
                onClickEdit = {this.handleEdit}
                onClickDelete = {this.handleDelete}
                items={items}/>
            </div>
        )
    }
}

export default ToDoList;