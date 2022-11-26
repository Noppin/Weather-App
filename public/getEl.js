const get = (selection)=>{
    const el = document.querySelector(selection);
    
    if(el)return el; 
    else console.log(`${selection} does not exist`);
};

export default get;