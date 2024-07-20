import { useEffect, useState } from "react";
import Style from "./todo.module.css"

function Todo(){


   //  step:-1 object of array step:-
   
   const AllData =  JSON.parse(localStorage.getItem("Set_Data"))  || [
      {Task:"Buy Car" ,completed:false},
      {Task:"Buy Book", completed:true},
      {Task:"Buy Bike", completed:false},
      {Task:"Buy Mac-Book" ,completed:true},
   ]

    // step:-3 usestate for array

    const[todo,setTodo] =useState(AllData);


   
   const[userinput,setUserInput]= useState("");

  // step:-2 ( onclick :- input function)
   function handleValue(e){
     setUserInput(e.target.value);  
   }

   // step:-4 (onclick :- button function) 
    
     function handleTask(){
      if(userinput){
      setTodo([...todo, {Task:userinput,completed:false}]);
      setUserInput("") ;
      console.log(userinput)
      }}


      // step:-5 (onclick:-  check function  (check and uncheck))

      function handleCheck(index){
          const AddcheckArray = [...todo]

          AddcheckArray[index].completed =! AddcheckArray[index].completed
          setTodo(AddcheckArray)



            // complete and remaining task iteration

             let completeTask = AddcheckArray.filter((value,index)=>{
                     return value.completed 
             })

             SetComplete(completeTask.length)

             let remainingTask = AddcheckArray.filter((value,index)=>{
                 return !value.completed
             })

             SetRemaining(remainingTask.length)

             let TotalTask = AddcheckArray.filter((value,index)=>{
                  return value
             })

             SetTotalTask(TotalTask.length)

      }
  
      // completed and remaining and total task useState
       
      const[complete,SetComplete] = useState(0)
      const[remaining,SetRemaining]= useState(0)
      const[totaltask,SetTotalTask] = useState(0)

      // useEffect Hook use to call Function
      

       useEffect (()=>{
         const AddEffectArray = [...todo]

          let completeTask =AddEffectArray.filter((value,index)=>{
                     return value.completed
         })

         SetComplete(completeTask.length)

         let remainingTask = AddEffectArray.filter((value,index)=>{
                  return !value.completed
         })

         SetRemaining(remainingTask.length)


         let TotalTask = AddEffectArray.filter((value,index)=>{
                  return value
         })
            
         SetTotalTask(TotalTask.length)


         // local storage use

         localStorage.setItem("Set_Data", JSON.stringify(AddEffectArray) )

      },[todo])


      // onclick function delete icon

      function HandleDelete(index){
            const DeleteArray = [...todo]
             let DeleteItem = DeleteArray.filter((value,id)=>{
                        return index !== id
            })
            setTodo(DeleteItem)
      }

      // onclick function Edit task icon 

      function HandleUpdate(index){
         const UpdateArray = [...todo]
         let EditValue = UpdateArray[index].task

         let UpdateEditValue  = prompt("Please Enter New Task:-",EditValue)
         
         let NewValue = {Task:UpdateEditValue,completed:false}
         UpdateArray.splice(index,1,NewValue)

         console.log(UpdateArray)

         setTodo(UpdateArray )

      }


    return(

        <>
        <div className={Style.main_cointainer}>

        <h1>Total Task:-{totaltask}</h1>

      <div >
         <h1 className={Style.Heading}>Todo list</h1>
      </div>

      <div className={Style.Todo}>
            <input type="text" className={Style.input} value={userinput} onChange={handleValue}/>
            <button className={Style.btn} onClick={handleTask}>Add Task</button>
      </div>

      {/* Array iteration:- map loop  use */}
      <div className= {Style.loop}>
      
      {
         todo.map((value, index)=>(
            <ul className={Style.list_Item}>
            <input type="checkbox" checked={value.completed} onClick={()=>{handleCheck(index)}}/>
               <span style={{textDecoration:value.completed ? "line-through": ""}}>{value.Task}</span>
               <span className={Style.edit}> <i class="bi bi-pencil-fill" onClick={()=>{HandleUpdate(index)}}></i> </span>
               <span className={Style.delete}> <i class="bi bi-trash3-fill" onClick={()=>{HandleDelete(index)}}></i> </span>
            </ul>

         ))

      }
      </div>

      

         <div className={Style.Task}>
            <span> Completed Task :- {complete}</span>
            <span> Remaining Task :-{remaining} </span>
         </div>
     



    </div>
        </>
    )
}

export default Todo;