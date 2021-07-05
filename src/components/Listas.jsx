import React, { useState, useEffect } from "react"
import '../App.css';
import  axios from 'axios'

const Listas = () => {
  const [listaBase, setListaBase] = useState([]);
  const BASE_URL = 'http://localhost:3000'

  const trHeadStyle = {
    color: "white",
    marginLeft: "2%",
    height: "150px",
    backgroundColor: "black"
  }

  const titleStyle = {
    color:'#333',
    fontSize:'13pt',
    alignContent:'center',
    paddingLeft:'50px'
  }

  const authorStyle = {
    color:'#999'
  }

  const dateStyle = {
    color:'#333',fontSize:'13pt'
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await fetch(`${BASE_URL}/article`);
      const article = await data.json();
      console.log("article: ", article.articles);
      setListaBase(article.articles);
    };
    obtenerDatos();
  }, []);

 const deleteArticle = async(index,id,e) =>{
    e.preventDefault();
     if(window.confirm('are you sure?')){
        console.log(index)
        listaBase.splice(index,1)
        setListaBase([...listaBase])
       axios.delete(`${BASE_URL}/article/delete?articleID=${id}`).then(res => alert(res.data.message))
     }


 }



 const convertStringToDate =(strFecha)=>{
     let today = new Date()
     let anioToday = today.getFullYear()
     let monthToday = today.getMonth()+1
     let dayToday = today.getDate()

    let strToDate = new Date(strFecha)
    let anioArticle = strToDate.getFullYear()
    let monthArticle = strToDate.getMonth()+1
    let dayArticle = strToDate.getDate()
    let hoursArticle = strToDate.getHours()
    let minutesArticle = strToDate.getMinutes()

    let dayYesterday = today.getDate() - 1
    let fechToday = ''+anioToday+monthToday+dayToday
    let fechYesterday = ''+anioToday+monthToday+dayYesterday
    let fechArticle = ''+anioArticle+monthArticle+dayArticle

    let fechReturn = ''
    let dd = 'am'
    let h = hoursArticle
    if (fechToday === fechArticle){
        if( h >= 12){
            h = hoursArticle -12
            dd = 'pm'
        }
        if (h === 0) {
            h = 12
          }

        minutesArticle = minutesArticle < 10 ? "0" + minutesArticle : minutesArticle
        fechReturn = h+':'+minutesArticle+" "+dd
    }else if(fechArticle === fechYesterday){
        fechReturn = 'Yesterday'
    }
    else{
        fechReturn = months[strToDate.getMonth()] +' '+strToDate.getMonth()
    }

    return fechReturn
   
 }

 const openArticle = (url)=>{
   window.open(url, '_blank');
 }

  return (
    <div>
      <table style={{ width: "100%"}}>
        <thead style={trHeadStyle}>
          <tr>
            <th colSpan={4}>
              <h1 style={{ marginLeft: "2%" }}>HN Feed</h1>
            </th>
          </tr>
          <tr>
            <th colSpan={4}>
              <h4 style={{ marginLeft: "2%" }}>{`We <3 hacker news!`}</h4>
            </th>
          </tr>
        </thead>
        <tbody>

          {listaBase.map((itemFinal, index) => (

              <tr key={index}>
                <td  onClick={()=> openArticle(itemFinal.storyUrl)}>
                 <div style={{display:'flex'}}>   
                    <div style={titleStyle}>
                    {itemFinal.storyTitle
                        ? itemFinal.storyTitle
                        : itemFinal.title}
                    </div>
                    &nbsp; 
                    <div  style={authorStyle}>          
                      - {itemFinal.author} -
                    </div> 
                 </div>
                </td>

                 <td style={dateStyle}  onClick={()=> openArticle(itemFinal.storyUrl)}> 
                  <div style={{paddingRight:'30px'}}>
                   {convertStringToDate(itemFinal.createdAt)}  
                  </div>
                 </td>
                 <td> 
                   <div style={{paddingRight:'30px'}}>
                     <i className="fa fa-trash-o" onClick={(e) => deleteArticle(index,itemFinal._id,e)}></i>
                   </div>
                  
                 </td>
              </tr>
 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listas;