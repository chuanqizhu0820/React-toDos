import React from "react";

class TodoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            todos: [{id: 1,title: "Setup development environment",completed: true},
                {id: 2,title: "Develop website and add content",completed: false},
                {id: 3,title: "Deploy to live server",completed: true}],
            itemnum: 3
        }
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleStatusChange(e, arr){
        let itemStatus = arr[e.target.id-1].completed;
        if (itemStatus){
            arr[e.target.id-1].completed = false;
        }else{
            arr[e.target.id-1].completed = true;
        }
        this.setState({
            todos: arr
        })
    }

    handleInput(e){
        this.setState(
            {
                title: e.target.value
            }
        )
    }

    handleSubmit(e){
        e.preventDefault(); 
        let newItem = {
            id: this.state.itemnum+1, title:e.target.newitem.value, completed: false
        };
        console.log(newItem);
        this.setState(
             {
                title:"",
                todos: [...this.state.todos, newItem],
                itemnum: this.state.itemnum+1
            }
        )       
    }


    render(){
        return (
            <>
            <form action="" onSubmit={(e)=>this.handleSubmit(e)}>
                <input type="text" placeholder="Add to do" name="newitem" value={this.state.title} onChange={(e)=>this.handleInput(e)} />
            </form>
            <ul>
                {this.state.todos.map((item,idx,arr)=><li>
                    {item.completed ? <input type="checkbox" id={item.id} onChange={(e)=>this.handleStatusChange(e, arr)} checked/> 
                                    : <input type="checkbox" id={item.id} onChange={(e)=>this.handleStatusChange(e, arr)} unchecked/>}
                    {item.title}
                    </li>)}
            </ul>
            </>
        )
    }
}
export default TodoContainer; 