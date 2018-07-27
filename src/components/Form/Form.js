import React,{Component} from 'react'
import axios from 'axios'
import './../../styles/form.css'


class Form extends Component{
    constructor(props){
    super(props);

    this.state={
        productId:null,
        productName:'',
        productImg: '',
        productPrice:0
    }
    
}

imageInput(e){
    var img = new Image();
    img.onload=()=>this.setState({productImg:e})
    img.src=e;
}

nameInput(text){
    if(text.length<=20){
        this.setState({productName: text})
    }
}

numberInput(val){
    if(val[0]==='.');
    val=''+val
    this.setState({productPrice:val})
}


clearInput(){
    if(this.state.productId){
        this.props.editProduct({})
    }
}

numberSubmit(num){
    num ? num = Number(num) : num = 0
    return Math.round(num)
}



handleSubmit(){
    let{productName, productImg, productPrice} = this.state;
    let newProduct = {
        productName,
        productImg,
        productPrice: this.numberSubmit(productPrice)
    }
    axios.post('/api/product', newProduct)
    .then(res => {
      this.props.getInventory();
      this.clearInputs();
    })
}


 render(){
     return(
         <div className='Form'>Form
         <p>Image URL:</p>
        <input type='text' value={this.state.productImg} onChange={e=>this.imageInput(e.target.value)}/>
         <p>Product Name:</p>
         <input type='text' value ={this.state.productName} onChange={e => this.nameInput(e.target.value)}/>
         <p>Price</p>
         <input type='text' value={this.state.productPrice} onChange={e=> this.numberInput(e.target.value)}/>
             <div className='formButtonBox'>
             <button onClick={()=>this.clearInput()}>Cancel</button>
             <button onClick={()=>this.handleSubmit()}>Add to Invintory</button>
             </div>
             
         </div>
         
     )
 }}

 export default Form