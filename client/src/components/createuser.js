import React from "react"
import axios from "axios"



export default class createuser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            user_length:null

        }
        this.addUser = this.addUser.bind(this)
    }

    addUser = (e) =>{
        e.preventDefault()
    
        const user_obj={
            username:this.state.username
        }

        axios.get("/users/").then(res=>{
            if(res.data.length<=10){
                axios.post("/users/add", user_obj).then(res=>{
                
                    alert("New user added!")
                    this.setState({username:""})
                })
            }
            else{
                alert("For database limit reasons, only upto 10 users can be added as of now.")
            }
        })
   
      
    }
  
       
    
    render(){
        return(
            <div>
            <center><h3>Create New User</h3></center>
            <form style={{width:"30%", marginLeft:"auto", marginRight:"auto"}} onSubmit={this.addUser}>
              <div className="form-group"> 
                <label>Username: </label>
                <input 
                    type="text"
                    maxLength="15"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={(e)=>{
                        const res = e.target.value.replace(/ /g, '')
                        this.setState({username:res})}
                    
                    }
                    />
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