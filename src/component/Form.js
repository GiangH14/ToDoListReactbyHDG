import React, {Component} from 'react';
import './Form.css'
class Form extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            task_id: "",
            task_name: "",
            task_level: 0
        }
        
       

        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount(){
         let item = this.props.itemSelected;
    //     //  let name = this.state.task_name
    //     //  let level = this.state.task_level
        if(item !== null){
                //    name = item.name,
                //     level = item.level
             this.setState({
                 task_id: item.id,
                 task_name: item.name,
                 task_level: item.level,
             });
          }
    }
    
    componentWillReceiveProps(nextProps){
        let item = nextProps.itemSelected;
        if(nextProps !== null){
            //    name = item.name,
            //     level = item.level
         this.setState({
             task_id: item.id,
             task_name: item.name,
             task_level: item.level,
         });
      }
    }


    handleCancel(){
        this.props.onClickCancel();
    }

    handleChange(event){
        const target = event.target
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        let item = {
            name: this.state.task_name,
            level: this.state.task_level,
            id: this.state.task_id
        }
        this.props.onClickSubmit(item);
        event.preventDefault();
    }
    
    
    render(){
        return(
            <div className ="row">
                <div className="col-md-offset-7 col-md-5">
                    <form onSubmit={this.handleSubmit} className="form-inline">
                        <div className="form-group">
                            <label className="sr-only">label</label>
                            <input value={this.state.task_name} onChange={this.handleChange} name="task_name" type="text" className= "form-control" placeholder="Task Name"/>
                        </div>
                        
                        <div className="form-group">
                            <label className="sr-only">label</label>
                            <select value={this.state.task_level} onChange={this.handleChange} name = "task_level" className="form-control" required="required">
                            Small
                                <option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button onClick={this.handleCancel} type="button" className="btn btn-default">Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Form