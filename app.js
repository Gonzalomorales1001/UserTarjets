class user{
    constructor (first_name,last_name,email,URLimage,id){
        this.id=id
        this.email=email
        this.first_name=first_name
        this.last_name=last_name
        this.avatar=URLimage
    }
}

let defaultUsers = [
    {
      id: 1,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/8-image.jpg",
    },
    {
      id: 2,
      email: "lindsay.ferguson@reqres.in",
      first_name: "Lindsay",
      last_name: "Ferguson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
    {
      id: 3,
      email: "tobias.funke@reqres.in",
      first_name: "Tobias",
      last_name: "Funke",
      avatar: "https://reqres.in/img/faces/9-image.jpg",
    },
    {
      id: 4,
      email: "byron.fields@reqres.in",
      first_name: "Byron",
      last_name: "Fields",
      avatar: "https://reqres.in/img/faces/10-image.jpg",
    },
    {
      id: 5,
      email: "george.edwards@reqres.in",
      first_name: "George",
      last_name: "Edwards",
      avatar: "https://reqres.in/img/faces/11-image.jpg",
    },
    {
      id: 6,
      email: "rachel.howell@reqres.in",
      first_name: "Rachel",
      last_name: "Howell",
      avatar: "https://reqres.in/img/faces/12-image.jpg",
    },
  ];

let data=JSON.parse(localStorage.getItem('users'))

if(!data||data.length<1){
  localStorage.setItem('users',JSON.stringify(defaultUsers))
  data=JSON.parse(localStorage.getItem('users'))
}

  let cards=document.querySelector('#users')
  
  const ListUsers=()=>{
    cards.innerHTML=''
    data.forEach((user)=>{
        let divcard=document.createElement('div')
        let card=`
        <div class="card">
        <div class="card-header">
            <small>ID: ${user.id}</small>
            <img src="${user.avatar}" class="img-card" alt="${user.first_name} ${user.last_name}">
        </div>
        <div class="card-body">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
        </div>
    </div>
        `
        divcard.innerHTML=card
        cards.appendChild(divcard)
    })
  }

      ListUsers()

  const OrderUsers=(value=0)=>{
    data.sort((u1,u2)=>{
        if(u1.last_name<u2.last_name){
            return -1
        }
        if(u2.last_name<u1.last_name){
            return 1
        }
        if(u1.last_name==u2.last_name){
            return 0
        }
    })
    if(value>0){data.reverse()}
    ListUsers()
  }

  const OrderUsersByID=()=>{
    data.sort((u1,u2)=>u1.id-u2.id)
    ListUsers()
  }

  const AddUser=(event)=>{
    event.preventDefault()

    let first_name=document.querySelector('#first_name').value
    let last_name=document.querySelector('#last_name').value
    let email=document.querySelector('#email').value
    let avatar=document.querySelector('#imageURL').value

    const ids=data.map((user)=>user.id)
    let id=0
    if(ids.length>0){
      id=Math.max(...ids)+1
    }else{
      id=1
    }

    let NewUser=new user (first_name,last_name,email,avatar,id)

    data.push(NewUser)

    localStorage.setItem('users',JSON.stringify(data))

    ListUsers()

    document.querySelector('#first_name').value=""
    document.querySelector('#last_name').value=""
    document.querySelector('#email').value=""
    document.querySelector('#imageURL').value=""
  }

  const DeleteUser=(event)=>{
    event.preventDefault()

    let id=parseInt(document.querySelector('#ID').value)
    let userToDelete=data.find((user)=>user.id===id)
    let userToDeleteIndex=data.findIndex((user)=>user===userToDelete)
    if(userToDelete){
      data.splice(userToDeleteIndex,1)
      localStorage.setItem('users',JSON.stringify(data))
    }else{
      alert('User not found ⚠')
    }

    ListUsers()
  }