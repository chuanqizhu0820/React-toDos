import React from "react";

class TodoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            todos: [{id: 1,title: "Setup development environment",completed: true, editting: false},
                {id: 2,title: "Develop website and add content",completed: false, editting: false},
                {id: 3,title: "Deploy to live server",completed: true, editting: false}],
            itemnum: 3,
            editText:""
        }
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
    }

    handleStatusChange(e, arr){
        let itemStatus = arr[e.target.id-1].completed;
        if (itemStatus){
            arr[e.target.id-1].completed = false;
        }else{
            arr[e.target.id-1].completed = true;
        }
        console.log(arr);
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
            id: this.state.itemnum+1, title:e.target.newitem.value, completed: false, editting: false
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

    handleDelete(e){
        let idx = e.target.className -1;
        let newArr = this.state.todos;
        newArr.splice(idx,1);
        newArr.forEach((item,index)=>{
            item.id = index+1
        })
        console.log(newArr);
        this.setState(
            {
                todos: newArr,
                itemnum: this.state.itemnum-1
            }
        )
       
    }

    handleEdit(e){
        // console.log(e.target.editItem.value);
        this.setState({
            editText: e.target.value
        })
    }

    handleEditSubmit(e,idx){
        console.log(e.target.editItem.value);
        e.preventDefault();
        let newArr = this.state.todos;
        newArr[idx].title = e.target.editItem.value;
        newArr[idx].editting = false;
        this.setState({
            todos: newArr
        })

    }

    changeEditStatus(idx){
        let todoArr = this.state.todos;
        todoArr[idx].editting = true;
        this.setState({
            todos: todoArr,
            editText: todoArr[idx].title
        })
    }


    render(){
        return (
            <>
            <form action="" onSubmit={(e)=>this.handleSubmit(e)}>
                <input type="text" placeholder="Add to do" name="newitem" value={this.state.title} onChange={this.handleInput}/>
            </form>
            <ul>
                {this.state.todos.map((item,idx,arr)=><li><div id="item-container">
                    {<input type="checkbox" id={item.id} onChange={(e)=>this.handleStatusChange(e, arr)} checked={item.completed} />}
                    {item.editting ? <form onSubmit={(e)=>{this.handleEditSubmit(e,idx)}} ><input name="editItem" value={this.state.editText} onChange={this.handleEdit}/></form> 
                                   : <p onDoubleClick={()=>this.changeEditStatus(idx)}>{item.title}</p> }
                <button id="de-btn"className={item.id} onClick={(e)=>this.handleDelete(e)}>delete</button>
                </div></li>)}
            </ul>
            </>
        )
    }
}
export default TodoContainer; 