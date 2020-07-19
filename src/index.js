import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import './index.css';
import qBank from "./quizService/index";
import classes from './slider.module.css';

class Myapp extends Component
{
  state={
    questionBank: [],
    progress:0,
    click:0,
    qarray:[], 
    nav:0,
    start_index: 0,
    end_index: 10
};
  
getQuestions= ()=>{
    
  qBank.map(question=>{
    this.setState({
      questionBank: question.question
    });
   });
};

componentDidMount() {
  this.getQuestions();
  }

render(){
  
  const progressHandler= (question,click)=>{
    if(!this.state.qarray.includes(question)){
     const updated = this.state.qarray.slice();
     updated.push(question); 
    this.setState({
      progress: ((click+1)/50)*100,
      click: this.state.click+1,
      qarray: updated
    })}
   }
  
   {
   let incrementPage  = (start_index,end_index) =>{
    this.setState({
    start_index:start_index+10,
    end_index:end_index+10});
   };
   let decrementPage  = (start_index,end_index) =>{
    this.setState({
    start_index:start_index-10,
    end_index:end_index-10});
     };
    return(
           <div className="container">
            <div className="title">MyApp</div>
           <div> 
            <div className="w3-light-grey w3-round-xlarge">
             <div className="w3-container w3-blue w3-round-xlarge" style={{width:this.state.progress+"%"}}>{this.state.progress}
            </div>
           </div>
          </div>
          {
           qBank.slice(this.state.start_index,this.state.end_index).map((question,count) => 
            <div className={"row"} key={count}>
              <div><h4>Q: {question.questionId}. {question.question}</h4></div>
             <div className="slideContainer">
              <input type="range" defaultValue={1} min="1" max="10"  className={classes.Slider} id="myRange" onChange={() => progressHandler(count+1,this.state.click)}/> 
             </div>
            </div>)
          }
        <div><div className="row">
            <div className={classes.View}>
              <div className="col-sm-12 col-md-2">
                {this.state.start_index>0 ? (
                  <button
                    onClick={() => decrementPage(this.state.start_index,this.state.end_index)}>
                      Prev
                  </button>) : null}
              </div>
               <div className="col-sm-12 col-md-8" />
                 <div className="col-sm-12 col-md-2">
                   <button
                     onClick={() => incrementPage(this.state.start_index,this.state.end_index)}>
                      Next
                  </button>
               </div>
             </div>
           </div> 
         </div>
        </div>
     )
   }
 }
}
export default Myapp
const rootElement=document.getElementById('root')
ReactDOM.render(<Myapp></Myapp>,rootElement)


