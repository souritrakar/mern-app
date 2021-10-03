import React from "react"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class createexercise extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:'',
            description:'',
            duration:0,
            users:[],
            date: new Date(),
        }
        this.onSubmit = this.onSubmit.bind(this)
      
    }
    
    componentDidMount() {
        axios.get('/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

       onSubmit =(e) =>{
        e.preventDefault()

        const exercise ={
            username:this.state.username,
            description:this.state.description,
            date:this.state.date,
            duration:this.state.duration

        }
        axios.get("/exercises/").then(res=>{
          if(res.data.length<=10){
            axios.post('/exercises/add', exercise)
            .then(()=>{
              alert("New exercise added!")
              this.setState({description:"", duration:0,})
            
            })
          }
        
          else{
            alert("For database limit reasons, only upto 10 exercises can be added as of now.")
          }
        })
       
        
     
    }

 
    render(){

       

        return(
            <div>
      <center><h3>Create New Exercise Log</h3></center>
      <form style={{width:"30%", marginLeft:"auto", marginRight:"auto"}} onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={(e)=>{this.setState({username:e.target.value})}}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              maxLength="60"
              className="form-control"
              value={this.state.description}
              onChange={(e)=>{this.setState({description:e.target.value})}}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.duration}
              onChange={(e)=>{this.setState({duration:e.target.value})}}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={(date)=>{this.setState({date:date})}}
            />
          </div>
        </div>
       <br/>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-success" />
        </div>
      </form>
    </div>
        )
    }
}