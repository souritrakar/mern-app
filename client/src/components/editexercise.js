import React from "react"
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class editexercise extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username:"",
            description:"",
            duration:0,
            date: new Date(),            
            users: [],
            not_found:true
          }
          this.editExercise= this.editExercise.bind(this)
    }

    componentDidMount(){
        axios.get("/exercises/"+this.props.match.params.id).then(res=>{
          
            if(res.data){
    
                this.setState({
                    username:res.data.username,
                    duration:res.data.duration,
                    description:res.data.description,
                    date:parseInt(new Date(res.data.date)),
                    not_found:false
                })
                
            }   
            
            else{
                this.setState({not_found:true})
            }
          
        }).catch(err=>console.log(err))

        axios.get("/users/").then(res=>{
            
            if(res.data.length > 0 ){
                this.setState({
                    users: res.data.map(user => user.username),
                  })
            }
        }).catch(err=>console.log(err))
    }

    editExercise = (e) =>{
        e.preventDefault()
        
        const exercise = {
        username: this.state.username,
        description: this.state.description,
        duration: this.state.duration,
        date: this.state.date
      }
      
        axios.post("/exercises/update/"+this.props.match.params.id, exercise).then(res=>{
          
            alert("Exercise edited!")
            window.location.reload()
        })
    }
    render(){
        if(this.state.not_found===true){
            return(
                <center><h1>Exercise not found.</h1></center>
            )
        }
        else{

            return(
                <div>
               <center><h3>Edit Exercise Log</h3></center>
                <form  style={{width:"30%", marginLeft:"auto", marginRight:"auto"}} onSubmit={this.editExercise}>
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
                        className="form-control"
                        value={this.state.description}
                        onChange={(e)=>{this.setState({description:e.target.value})}}
                        />
                  </div>
                  <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                  </div>
                </form>
              </div>
            )
        }
        
    }
}